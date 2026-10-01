import { Link } from "react-router-dom";
import { ArrowRight, Factory, FlaskConical, Handshake, Wheat } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";

const VALUES = [
    { icon: Wheat, title: "Sourcing Discipline", text: "We buy whole spices at origin during harvest season, grade them at our gate, and reject lots that don't meet our moisture and aroma standards." },
    { icon: Factory, title: "Process Control", text: "Cleaning, destoning, low-temperature grinding and sieving happen under one roof in Ghaziabad — nothing is outsourced." },
    { icon: FlaskConical, title: "Batch Testing", text: "Every batch is checked for colour, pungency and purity before packing, so the tenth carton tastes like the first." },
    { icon: Handshake, title: "Partnership First", text: "Distributors, HoReCa buyers and private-label brands get the same thing: honest specs, fair pricing and on-time dispatch." },
];

const TIMELINE = [
    ["The Beginning", "Savrel Spices is founded by Rohit Jha with a single conviction — Indian kitchens deserve spices that taste the way they smell at the mandi."],
    ["The Facility", "A dedicated processing and packing unit is set up at UPSIDC, M.G. Road, Uttar Pradesh with cleaning, grinding and packing lines under one roof."],
    ["Certification", "The unit earns ISO 9001:2015 certification and FSSAI licensing, formalising the hygiene standards the factory was built on."],
    ["Today", "A 20+ product range across whole spices, powders and masala blends, shipped to wholesalers, retailers and private-label partners across India."],
];

export default function About() {
    return (
        <div data-testid="about-page">
            <PageHero
                eyebrow="About Us"
                title="A spice factory with one job — honest flavour"
                sub="Savrel Spices manufactures premium Indian whole spices, powders and masala blends for bulk, wholesale and private-label supply across India."
            />

            <section className="bg-white py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
                    <Reveal>
                        <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                            From the mandi to your kitchen, without losing what matters
                        </h2>
                        <p className="mt-5 text-base text-gray-600 leading-relaxed">
                            Most spices lose their soul between the farm and the shelf — over-dried, over-ground,
                            blended with fillers. We started Savrel Natural to do the opposite: buy well, process
                            gently, pack hygienically, and deliver on time.
                        </p>
                        <p className="mt-4 text-base text-gray-600 leading-relaxed">
                            Our facility at UPSIDC, M.G. Road, Uttar Pradesh handles the full journey — cleaning,
                            sorting, grinding, blending and packing — so nothing about your product is left to
                            chance or to a third party.
                        </p>
                        <p className="mt-4 text-base text-gray-600 leading-relaxed">
                            Whether you need a 100g retail pouch under your own label or a 25kg bulk bag for your
                            kitchen operations, the standard stays the same: quality ingredients, consistent taste,
                            timely delivery.
                        </p>
                        <Link to="/quality" data-testid="about-quality-link"
                            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#C8102E] hover:gap-3 transition-all">
                            See how we control quality <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                            <img src="/assets/banner.webp" alt="Savrel Natural product range" className="w-full h-auto" data-testid="about-range-image" />
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="bg-[#FDFBF8] border-y border-gray-100 py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal className="max-w-2xl">
                        <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#C8102E]">How We Work</span>
                        <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">Four habits we never skip</h2>
                    </Reveal>
                    <div className="mt-10 grid sm:grid-cols-2 gap-6">
                        {VALUES.map((v, i) => (
                            <Reveal key={v.title} delay={i * 0.07}>
                                <div data-testid={`value-card-${v.title.toLowerCase().replace(/\s+/g, "-")}`}
                                    className="h-full bg-white rounded-xl border border-gray-200 p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#FEF2F2] text-[#C8102E]">
                                        <v.icon className="h-5 w-5" />
                                    </span>
                                    <h3 className="mt-4 font-display text-lg font-bold text-gray-900">{v.title}</h3>
                                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{v.text}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal className="max-w-2xl">
                        <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#C8102E]">Our Journey</span>
                        <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">Built batch by batch</h2>
                    </Reveal>
                    <div className="mt-10 relative">
                        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200" />
                        <div className="space-y-10">
                            {TIMELINE.map(([title, text], i) => (
                                <Reveal key={title} delay={i * 0.06}>
                                    <div className="relative pl-10" data-testid={`timeline-${i}`}>
                                        <span className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-[#C8102E] bg-white" />
                                        <h3 className="font-display text-lg font-bold text-gray-900">{title}</h3>
                                        <p className="mt-1.5 text-sm text-gray-600 leading-relaxed max-w-2xl">{text}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
