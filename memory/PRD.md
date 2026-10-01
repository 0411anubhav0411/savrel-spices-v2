# PRD — Savrel Natural Spices Website

## Original Problem Statement
Build a website of at least 10 landing pages for spices factory "Savrel Natural Spices" showing products, founder, team. Description: "Manufacturer of premium Indian spices, including whole spices, powders, and masala blends. Hygienically processed and packed for bulk, wholesale, and private-label supply. Quality ingredients, consistent taste, and timely delivery across India. Contact us for samples and bulk orders." Use provided brand images; reference Catch Masala site; subtle design, white base color everywhere, logo (extracted from provided images) on top of site; no obvious AI floaty text/animations.

## User Personas
- Wholesale/distribution buyers looking for bulk spice supply
- Private-label brand owners evaluating a manufacturing partner
- HoReCa / food business purchasers requesting samples
- Retail visitors checking the brand, founder and certifications

## Core Requirements (static)
- 11 pages: Home, About Us, Our Founder, Our Team, Products Overview, Whole Spices, Spice Powders, Masala Blends, Private Label & Bulk Supply, Quality & Certifications, Contact Us
- White background everywhere; subtle, trustworthy FMCG look (Catch Masala reference)
- Savrel oval logo (extracted from user images) in the header; tagline "Masale Jo Swaad Banaye"
- Real contact details: +91 98103 31067, savrelnaturalspices@gmail.com, G-418/419 UPSIDC M.G. Road UP 201015
- Founder: Rohit Jha
- Product catalog from user pack images (Red Chilli, Turmeric, Black Pepper, Cloves, Bay Leaves) + standard range
- Enquiry capture for samples/bulk/private-label orders

## Architecture
- React (CRA/craco) + react-router-dom multi-page frontend; framer-motion reveals; lenis smooth scroll
- FastAPI backend, routes under /api; MongoDB (motor) via MONGO_URL/DB_NAME
- Enquiries: POST /api/enquiries (public), GET /api/enquiries (X-Admin-Key header)
- Brand assets in /app/frontend/public/assets (logo extracted from banner via PIL flood-fill transparency)

## Implemented (2026-10-01)
- All 11 pages live with shared header (logo top-left, Products dropdown), footer, breadcrumbs
- Home: masked line-by-line hero reveal, parallax banner image, slow spice marquee, categories, stats, best sellers, B2B CTA band
- Products overview with category filter tabs; 22 SKUs (5 with real pack photography, others on brand-color panels)
- Category pages with per-category specification tables and enquiry CTAs
- Private Label: 5-step process flow, capability cards, enquiry form
- Quality: certification cards (ISO 9001:2015, FSSAI, Organic, QC lab), 6-step plant process
- Founder page (Rohit Jha) with quote card, story, principles; Team page (founder + 3 placeholder leads)
- Contact page with click-to-call/email cards, address block with Google Maps directions, working enquiry form
- Admin enquiries viewer at /admin-enquiries (key: savrel-admin-2026)
- SVG favicon (red oval + leaf), brand title/meta
- Verified: backend endpoints (health, POST/GET enquiries, 401 without key), form submission e2e, responsive 375/768/1366
- 2026-10-01 (update): Product detail pages at /product/:id for all 22 SKUs (breadcrumbs, description, uses, pack sizes, spec table, bulk/private-label CTA, related products); product cards now link to detail pages
- 2026-10-01 (update): Email alerts via Emergent-managed Resend — owner notification to savrelnaturalspices@gmail.com + thank-you confirmation to the enquirer on every form submission (verified, HTTP 202 on both)
- Downloadable code zip regenerated: /savrel-natural-spices.zip

## Backlog
- P0: Replace placeholder team names/photos with real ones; founder photo
- P1: Real pack images for remaining 17 SKUs (currently color-panel placeholders)
- P1: Wire enquiry notifications to email (Resend) so owner is alerted
- P2: Individual product detail pages with full spec sheets
- P2: Hindi language toggle
- P2: Google Maps embed on Contact page

## Next Tasks
1. Collect real team/founder photos and product pack shots from owner
2. Email notification on new enquiry
3. Product detail pages
