import { Boxes, Printer, ShieldCheck, Timer } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { EnquiryForm } from "../components/EnquiryForm";

const STEPS = [
    ["Consultation", "Share your target product, market and price point. We shortlist spices or blends from our range — or develop a custom recipe with you."],
    ["Sampling", "Lab-packed samples ship to you within days. We iterate on taste, grind and colour until you sign off the reference sample."],
    ["Packaging & Branding", "Choose pouches, jars or bulk bags. We print your label, logo and FSSAI-compliant declarations on food-grade material."],
    ["Production & QC", "Your order is produced in a controlled batch, tested against your approved reference, metal-detected and sealed."],
    ["Dispatch & Reorder", "Batch-coded cartons ship pan-India on schedule. Your recipe and specs stay on file for one-call reorders."],
];

const CAPABILITIES = [
    { icon: Boxes, title: "Flexible Volumes", text: "Retail pouches from 50g to bulk bags up to 30kg, with MOQs friendly to first-time brands." },
    { icon: Printer, title: "Your Label, Done Right", text: "Full private-label printing — your brand, your design, FSSAI-compliant declarations, batch coding and MRP." },
    { icon: ShieldCheck, title: "Certified Facility", text: "ISO 9001:2015 processes and FSSAI licensing, so your brand carries documentation a buyer can audit." },
    { icon: Timer, title: "Reliable Lead Times", text: "Committed production and dispatch schedules, with pan-India logistics arranged from our Ghaziabad unit." },
];

export default function PrivateLabel() {
    return (
        <div data-testid="private-label-page">
            <PageHero
                eyebrow="Private Label & Bulk Supply"
                title="Launch your spice brand on our production line"
                sub="From a single SKU to a full range — we manufacture, pack and ship premium Indian spices under your label, or in bulk for your business."
            />

            <section className="bg-white py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal className="max-w-2xl">
                        <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#C8102E]">The Process</span>
                        <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                            Sample to shelf in five steps
                        </h2>
                    </Reveal>
                    <div className="mt-12 relative">
                        <div className="hidden lg:block absolute left-0 right-0 top-7 h-px bg-gray-200" />
                        <div className="grid lg:grid-cols-5 gap-8">
                            {STEPS.map(([title, text], i) => (
                                <Reveal key={title} delay={i * 0.08}>
                                    <div data-testid={`process-step-${i + 1}`} className="relative">
                                        <span className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#C8102E] text-white font-display text-xl font-bold shadow-md">
                                            {i + 1}
                                        </span>
                                        <h3 className="mt-4 font-display text-lg font-bold text-gray-900">{title}</h3>
                                        <p className="mt-2 text-sm text-gray-600 leading-relaxed">{text}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-[#FDFBF8] border-y border-gray-100 py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal className="max-w-2xl">
                        <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#C8102E]">Capabilities</span>
                        <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                            Built for brands, wholesalers and HoReCa
                        </h2>
                    </Reveal>
                    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {CAPABILITIES.map((c, i) => (
                            <Reveal key={c.title} delay={i * 0.07}>
                                <div data-testid={`capability-${c.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                                    className="h-full bg-white rounded-xl border border-gray-200 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#FEF2F2] text-[#C8102E]">
                                        <c.icon className="h-5 w-5" />
                                    </span>
                                    <h3 className="mt-4 font-display text-lg font-bold text-gray-900">{c.title}</h3>
                                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{c.text}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
                    <Reveal>
                        <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                            Tell us what you're building
                        </h2>
                        <p className="mt-4 text-base text-gray-600 leading-relaxed">
                            Share a few details and our partnerships team will come back with samples, MOQs and
                            pricing within one working day. Prefer to talk it through first? Call us — a person
                            picks up.
                        </p>
                        <div className="mt-8 rounded-xl border border-gray-200 bg-[#FDFBF8] p-6 text-sm text-gray-600 leading-relaxed" data-testid="private-label-moq-note">
                            <strong className="text-gray-900">Good to know:</strong> private-label runs start at
                            friendly MOQs per SKU, bulk supply starts from a single 25–30kg bag per spice, and
                            samples are couriered before you commit to anything.
                        </div>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <EnquiryForm title="Start a private-label / bulk enquiry" />
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
