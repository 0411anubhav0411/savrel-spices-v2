import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const EMPTY = { name: "", company: "", email: "", phone: "", interest: "Whole Spices", quantity: "", message: "" };

const inputCls =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#C8102E] focus:outline-none focus:ring-2 focus:ring-[#C8102E]/15 transition";

export const EnquiryForm = ({ title = "Send us an enquiry", compact = false }) => {
    const [form, setForm] = useState(EMPTY);
    const [busy, setBusy] = useState(false);

    const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

    const submit = async (e) => {
        e.preventDefault();
        setBusy(true);
        try {
            await axios.post(`${API}/enquiries`, form);
            toast.success("Enquiry received. Our team will reach out within one working day.");
            setForm(EMPTY);
        } catch (err) {
            toast.error(err?.response?.data?.detail?.[0]?.msg || "Could not send your enquiry. Please call us directly.");
        } finally {
            setBusy(false);
        }
    };

    return (
        <form data-testid="enquiry-form" onSubmit={submit}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900">{title}</h3>
            <p className="mt-1.5 text-sm text-gray-500">Samples, pricing and bulk orders — we reply within one working day.</p>

            <div className={`mt-6 grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
                <div>
                    <label htmlFor="enq-name" className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name *</label>
                    <input id="enq-name" data-testid="enquiry-name-input" required minLength={2} className={inputCls}
                        placeholder="Your name" value={form.name} onChange={set("name")} />
                </div>
                <div>
                    <label htmlFor="enq-company" className="block text-xs font-semibold text-gray-700 mb-1.5">Company / Firm</label>
                    <input id="enq-company" data-testid="enquiry-company-input" className={inputCls}
                        placeholder="Business name" value={form.company} onChange={set("company")} />
                </div>
                <div>
                    <label htmlFor="enq-email" className="block text-xs font-semibold text-gray-700 mb-1.5">Email *</label>
                    <input id="enq-email" data-testid="enquiry-email-input" type="email" required className={inputCls}
                        placeholder="you@company.com" value={form.email} onChange={set("email")} />
                </div>
                <div>
                    <label htmlFor="enq-phone" className="block text-xs font-semibold text-gray-700 mb-1.5">Phone *</label>
                    <input id="enq-phone" data-testid="enquiry-phone-input" required minLength={8} className={inputCls}
                        placeholder="+91 ..." value={form.phone} onChange={set("phone")} />
                </div>
                <div>
                    <label htmlFor="enq-interest" className="block text-xs font-semibold text-gray-700 mb-1.5">Interested In</label>
                    <select id="enq-interest" data-testid="enquiry-interest-select" className={inputCls}
                        value={form.interest} onChange={set("interest")}>
                        <option>Whole Spices</option>
                        <option>Spice Powders</option>
                        <option>Masala Blends</option>
                        <option>Private Label Manufacturing</option>
                        <option>Bulk / Wholesale Supply</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="enq-quantity" className="block text-xs font-semibold text-gray-700 mb-1.5">Estimated Quantity</label>
                    <input id="enq-quantity" data-testid="enquiry-quantity-input" className={inputCls}
                        placeholder="e.g. 500 kg / month" value={form.quantity} onChange={set("quantity")} />
                </div>
                <div className={compact ? "" : "sm:col-span-2"}>
                    <label htmlFor="enq-message" className="block text-xs font-semibold text-gray-700 mb-1.5">Message</label>
                    <textarea id="enq-message" data-testid="enquiry-message-input" rows={4} className={inputCls}
                        placeholder="Tell us about your requirement..." value={form.message} onChange={set("message")} />
                </div>
            </div>

            <button type="submit" data-testid="enquiry-submit-btn" disabled={busy}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C8102E] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#A50B24] disabled:opacity-60 transition-colors duration-200">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {busy ? "Sending..." : "Submit Enquiry"}
            </button>
        </form>
    );
};
