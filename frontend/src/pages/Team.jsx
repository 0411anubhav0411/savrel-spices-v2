import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";

const TEAM = [
    { initials: "RJ", name: "Rohit Jha", role: "Founder & Managing Director", bio: "Leads sourcing and product standards. Personally approves the reference sample every batch is measured against." },
    { initials: "AV", name: "Anita Verma", role: "Head — Quality & Processing", bio: "Runs the QC lab and hygiene programme. Owns batch testing, metal detection and ISO 9001:2015 compliance." },
    { initials: "SK", name: "Sandeep Kumar", role: "Head — Procurement", bio: "Manages origin buying across growing regions, grading incoming lots for moisture, aroma and purity." },
    { initials: "PJ", name: "Pooja Jha", role: "Head — Sales & Partnerships", bio: "Your first call for samples, pricing, private-label projects and distributor onboarding across India." },
];

export default function Team() {
    return (
        <div data-testid="team-page">
            <PageHero
                eyebrow="Our Team"
                title="Small team, sharp standards"
                sub="The people who grade, grind, test and ship every Savrel pack — and pick up the phone when you call."
            />

            <section className="bg-white py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                        {TEAM.map((m, i) => (
                            <Reveal key={m.name} delay={i * 0.07}>
                                <div data-testid={`team-card-${m.name.toLowerCase().replace(/\s+/g, "-")}`}
                                    className="h-full flex gap-6 bg-white rounded-xl border border-gray-200 p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C8102E] to-[#D9531E]">
                                        <span className="font-display text-2xl font-bold text-white">{m.initials}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-display text-xl font-bold text-gray-900">{m.name}</h3>
                                        <p className="text-sm font-medium text-[#C8102E]">{m.role}</p>
                                        <p className="mt-2.5 text-sm text-gray-600 leading-relaxed">{m.bio}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal delay={0.15} className="mt-14">
                        <div className="rounded-2xl bg-[#FDFBF8] border border-gray-200 px-8 py-10 sm:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                            <div className="max-w-xl">
                                <h2 className="font-display text-2xl font-bold text-gray-900">Talk to a person, not a portal</h2>
                                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                                    Samples, pricing or a private-label project — our team replies within one working day.
                                </p>
                            </div>
                            <Link to="/contact" data-testid="team-contact-btn"
                                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#C8102E] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#A50B24] transition-colors">
                                Contact Us <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
