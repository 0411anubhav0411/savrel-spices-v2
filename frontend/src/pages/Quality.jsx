import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, FileCheck2, Leaf, Microscope, ScanSearch, Snowflake, Sparkles, Wind } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";

const CERTS = [
    { icon: BadgeCheck, name: "ISO 9001:2015", text: "Certified quality management system covering sourcing, processing, packing and dispatch." },
    { icon: FileCheck2, name: "FSSAI Licensed", text: "Licensed food manufacturing unit, with batch coding and labelling to FSSAI standards." },
    { icon: Leaf, name: "Organic Range", text: "Certified organic options across key SKUs for brands serving the organic segment." },
    { icon: Microscope, name: "In-House QC Lab", text: "Every batch tested for moisture, colour, pungency and purity before it is cleared for packing." },
];

const PROCESS = [
    { icon: ScanSearch, title: "Sorting & Grading", text: "Incoming whole spices are destoned, air-classified and hand-sorted; substandard lots are rejected at the gate." },
    { icon: Wind, title: "Cleaning", text: "Multi-stage dry cleaning removes dust, stems and foreign matter without washing away natural oils." },
    { icon: Snowflake, title: "Low-Temp Grinding", text: "Controlled-temperature milling keeps volatile oils — the flavour — inside the powder." },
    { icon: Sparkles, title: "Sieving & Blending", text: "Powders are sieved to a consistent mesh; blends are weighed to the gram against the master recipe." },
    { icon: Microscope, title: "Metal Detection & Testing", text: "Every batch passes through metal detection and lab checks before sealing." },
    { icon: BadgeCheck, title: "Hygienic Packing", text: "Food-grade pouches and bags are filled, sealed and batch-coded in a controlled packing area." },
];

export default function Quality() {
    return (
        <div data-testid="quality-page">
            <PageHero
                eyebrow="Quality & Certifications"
                title="Quality you can audit, not just admire"
                sub="Certificates on the wall, yes — but more importantly, a process on the floor that makes every batch taste like the reference."
            />

            <section className="bg-white py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {CERTS.map((c, i) => (
                            <Reveal key={c.name} delay={i * 0.07}>
                                <div data-testid={`cert-card-${c.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                                    className="h-full bg-white rounded-xl border border-gray-200 p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                                    <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#FEF2F2] text-[#C8102E]">
                                        <c.icon className="h-6 w-6" />
                                    </span>
                                    <h3 className="mt-4 font-display text-lg font-bold text-gray-900">{c.name}</h3>
                                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{c.text}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[#FDFBF8] border-y border-gray-100 py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal className="max-w-2xl">
                        <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#C8102E]">On The Floor</span>
                        <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                            Six stages between the farm gate and your carton
                        </h2>
                    </Reveal>
                    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {PROCESS.map((p, i) => (
                            <Reveal key={p.title} delay={i * 0.06}>
                                <div data-testid={`process-card-${i}`} className="h-full bg-white rounded-xl border border-gray-200 p-6">
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1F1410] text-white">
                                            <p.icon className="h-4.5 w-4.5" />
                                        </span>
                                        <span className="font-display text-sm font-bold text-[#C8102E]">Step {i + 1}</span>
                                    </div>
                                    <h3 className="mt-4 font-display text-lg font-bold text-gray-900">{p.title}</h3>
                                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{p.text}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal>
                        <div className="rounded-2xl bg-[#1F1410] text-white px-8 py-12 sm:px-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8" data-testid="quality-cta">
                            <div className="max-w-2xl">
                                <h2 className="font-display text-2xl sm:text-3xl font-bold leading-snug">
                                    Want our spec sheets and certificates?
                                </h2>
                                <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed">
                                    We share product specifications, COAs and certification copies with serious
                                    buyers. Ask and you shall receive — usually the same day.
                                </p>
                            </div>
                            <Link to="/contact" data-testid="quality-request-docs-btn"
                                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#C8102E] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#A50B24] transition-colors">
                                Request Documentation <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
