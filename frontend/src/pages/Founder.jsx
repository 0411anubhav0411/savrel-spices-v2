import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { BRAND } from "../data/site";

const PRINCIPLES = [
    ["Buy at origin, not at auction", "The best lots go early. We buy whole spices directly in the growing regions at harvest, when aroma and oil content are at their peak."],
    ["Grind slow, grind cool", "Heat kills flavour. Our grinding lines run at controlled low temperatures so the natural volatile oils stay inside the powder, not in the air."],
    ["A batch is a promise", "A wholesaler's reputation rides on our consistency. Every batch is tasted and tested against a retained reference sample before it ships."],
];

export default function Founder() {
    return (
        <div data-testid="founder-page">
            <PageHero
                eyebrow="Our Founder"
                title="The man behind the masala"
                sub="Rohit Jha founded Savrel Natural Spices to bring factory-grade discipline to a category that runs on trust."
            />

            <section className="bg-white py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[2fr_3fr] gap-12 items-start">
                    <Reveal>
                        <div data-testid="founder-card" className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center sticky top-28">
                            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-[#C8102E] to-[#D9531E] shadow-lg">
                                <span className="font-display text-4xl font-bold text-white">RJ</span>
                            </div>
                            <h2 className="mt-6 font-display text-2xl font-bold text-gray-900" data-testid="founder-name">Rohit Jha</h2>
                            <p className="mt-1 text-sm font-medium text-[#C8102E]">Founder & Managing Director</p>
                            <p className="mt-1 text-xs text-gray-500">Savrel Natural Spices, Ghaziabad (U.P.)</p>
                            <div className="mt-6 border-t border-gray-100 pt-6">
                                <a href={BRAND.phoneHref} data-testid="founder-call-link"
                                    className="text-sm font-semibold text-gray-800 hover:text-[#C8102E] transition-colors">
                                    {BRAND.phone}
                                </a>
                            </div>
                        </div>
                    </Reveal>

                    <div>
                        <Reveal>
                            <div className="rounded-2xl bg-[#FDFBF8] border border-gray-200 p-8 sm:p-10">
                                <Quote className="h-8 w-8 text-[#C8102E]" />
                                <blockquote className="mt-4 font-display text-xl sm:text-2xl font-semibold text-gray-900 leading-relaxed italic" data-testid="founder-quote">
                                    "In the spice business, you are only as good as your last batch. I built Savrel
                                    so that our last batch is always one we're proud to put our name on."
                                </blockquote>
                                <p className="mt-4 text-sm font-semibold text-gray-700">— Rohit Jha</p>
                            </div>
                        </Reveal>

                        <Reveal delay={0.08} className="mt-10">
                            <h3 className="font-display text-2xl font-bold text-gray-900">His story</h3>
                            <p className="mt-4 text-base text-gray-600 leading-relaxed">
                                Rohit grew up around the spice trade and saw the same pattern everywhere: a great
                                product at the source, and a tired, adulterated version of it on the shelf. The gap
                                wasn't demand — it was discipline.
                            </p>
                            <p className="mt-4 text-base text-gray-600 leading-relaxed">
                                Savrel Natural Spices is his answer. A factory where sourcing, cleaning, grinding
                                and packing all happen under one roof, to one standard, with one person accountable
                                for the taste in every pack — him.
                            </p>
                            <p className="mt-4 text-base text-gray-600 leading-relaxed">
                                Today he works directly with wholesalers, distributors and private-label brands
                                across India, and still personally approves the reference sample every production
                                batch is measured against.
                            </p>
                        </Reveal>

                        <div className="mt-10 space-y-5">
                            {PRINCIPLES.map(([title, text], i) => (
                                <Reveal key={title} delay={i * 0.06}>
                                    <div data-testid={`principle-${i}`} className="flex gap-5 rounded-xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                                        <span className="font-display text-3xl font-bold text-[#C8102E]/25 shrink-0">0{i + 1}</span>
                                        <div>
                                            <h4 className="font-display text-lg font-bold text-gray-900">{title}</h4>
                                            <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">{text}</p>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>

                        <Reveal delay={0.1} className="mt-10">
                            <Link to="/team" data-testid="founder-meet-team-btn"
                                className="inline-flex items-center gap-2 rounded-full bg-[#C8102E] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#A50B24] transition-colors">
                                Meet the Team <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </section>
        </div>
    );
}
