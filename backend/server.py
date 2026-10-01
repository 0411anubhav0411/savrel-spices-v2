import asyncio
import ipaddress
import logging
import os
import re
import uuid
from datetime import datetime, timezone
from html import escape
from html.parser import HTMLParser
from pathlib import Path
from typing import List, Optional
from urllib.parse import urlparse

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException, Header
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]
ADMIN_KEY = os.environ['ADMIN_KEY']

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
OWNER_EMAIL = os.environ["OWNER_EMAIL"]

app = FastAPI()
api_router = APIRouter(prefix="/api")
logger = logging.getLogger(__name__)


# ---- Email guardrail gate (G2/G3 structural checks — call on every send) ----
_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    async with httpx.AsyncClient(timeout=30) as http:
        resp = await http.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY},
            json=payload,
        )
    resp.raise_for_status()
    return resp.json().get("id")


class EnquiryCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    company: Optional[str] = Field(default=None, max_length=160)
    email: EmailStr
    phone: str = Field(min_length=8, max_length=20)
    interest: Optional[str] = Field(default=None, max_length=120)
    quantity: Optional[str] = Field(default=None, max_length=120)
    message: Optional[str] = Field(default=None, max_length=2000)


class Enquiry(EnquiryCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


def _row(label: str, value: Optional[str]) -> str:
    if not value:
        return ""
    return (f'<tr><td style="padding:8px 12px;font-weight:bold;color:#444;'
            f'border-bottom:1px solid #eee">{escape(label)}</td>'
            f'<td style="padding:8px 12px;color:#222;border-bottom:1px solid #eee">{escape(value)}</td></tr>')


async def _notify_enquiry(e: Enquiry) -> None:
    try:
        owner_html = (
            '<table role="presentation" width="100%"><tr><td style="padding:24px;font-family:Arial,sans-serif">'
            f'<h2 style="color:#C8102E;margin:0 0 12px">New enquiry — {escape(EMAIL_FROM_NAME)}</h2>'
            '<table role="presentation" width="100%" style="border-collapse:collapse;font-size:14px">'
            + _row("Name", e.name) + _row("Company", e.company) + _row("Email", e.email)
            + _row("Phone", e.phone) + _row("Interested in", e.interest)
            + _row("Estimated quantity", e.quantity) + _row("Message", e.message)
            + '</table>'
            f'<p style="font-size:12px;color:#888;margin-top:16px">Submitted on the {escape(EMAIL_FROM_NAME)} '
            f'website at {escape(e.created_at)}. Reply directly to this email to reach the enquirer.</p>'
            '</td></tr></table>'
        )
        await send_email(
            to=OWNER_EMAIL,
            subject=f"New enquiry from {e.name} — {EMAIL_FROM_NAME}",
            html=owner_html,
            reply_to=e.email,
        )

        guest_html = (
            '<table role="presentation" width="100%"><tr><td style="padding:24px;font-family:Arial,sans-serif">'
            f'<h2 style="color:#C8102E;margin:0 0 12px">Thank you, {escape(e.name)}</h2>'
            f'<p style="font-size:14px;color:#222">We have received your enquiry'
            + (f' about <strong>{escape(e.interest)}</strong>' if e.interest else '')
            + ' and our team will reach out within one working day with samples, pricing and next steps.</p>'
            f'<p style="font-size:14px;color:#222">Need us sooner? Call <a href="tel:+919810331067" '
            f'style="color:#C8102E">+91 98103 31067</a>.</p>'
            f'<p style="font-size:12px;color:#888;margin-top:16px">Sent by {escape(EMAIL_FROM_NAME)} — '
            'Masale Jo Swaad Banaye. We never ask for passwords or payment details by email.</p>'
            '</td></tr></table>'
        )
        await send_email(
            to=e.email,
            subject=f"We received your enquiry — {EMAIL_FROM_NAME}",
            html=guest_html,
        )
    except Exception as exc:
        logger.error(f"Enquiry email notification failed: {exc}")


@api_router.get("/")
async def root():
    return {"message": "Savrel Natural Spices API"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


@api_router.post("/enquiries", status_code=201)
async def create_enquiry(input: EnquiryCreate):
    enquiry = Enquiry(**input.model_dump())
    await db.enquiries.insert_one(enquiry.model_dump())
    asyncio.create_task(_notify_enquiry(enquiry))
    return {"success": True, "id": enquiry.id}


@api_router.get("/enquiries", response_model=List[Enquiry])
async def list_enquiries(x_admin_key: str = Header(default="")):
    if x_admin_key != ADMIN_KEY:
        raise HTTPException(status_code=401, detail="Unauthorized")
    docs = await db.enquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return docs


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
