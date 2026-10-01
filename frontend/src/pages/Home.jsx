import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BadgeCheck, Leaf, Package, Truck, ShieldCheck, Phone } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { Marquee } from "../components/Marquee";
import { ProductCard } from "../components/ProductCard";
import { BRAND, CATEGORIES, PRODUCTS } from "../data/site";

const line = {
    hidden: { y: "110%" },
    show: (i) => ({ y: "0%", transition: { delay: 0.15 + i * 0.13, duration: 0.75, ease: [0.22, 1, 0.36, 1] } }),
};

const MaskedLine = ({ i, children, className }) => (
    <span className="block overflow-hidden pb-1">
        <motion.span className={`block ${className}`} custom={i} variants={line} initial="hidden" animate="show">
            {children}
        </motion.span>
    </span>
);

const WHY = [
    { icon: ShieldCheck, title: "Hygienic Processing", text: "Cleaned, sorted, ground and packed in a controlled facility with metal detection at every batch." },
    { icon: Leaf, title: "Quality Ingredients", text: "Raw spices sourced from trusted growing regions, graded and tested before they enter production." },
    { icon: Package, title: "Bulk & Private Label", text: "Retail packs to 25kg bulk bags, plus complete private-label manufacturing with your branding." },
    { icon: Truck, title: "Timely Pan-India Delivery", text: "Reliable dispatch schedules for wholesalers, distributors and food businesses across India." },
];

const STATS = [
    ["20+", "Spice Products"],
    ["3", "Product Categories"],
    ["100%", "Natural Ingredients"],
    ["Pan-India", "Supply Network"],
];

export default function Home() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const imgY = useTransform(scrollYProgress, [0, 1], [0, 48]);

    return (
        <div data-testid="home-page">
            {/* Hero */}
            <section ref={heroRef} className="spice-grain bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16 sm:pt-20 sm:pb-24 grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 rounded-full bg-[#FEF2F2] text-[#991B1B] text-xs font-semibold tracking-wide px-3.5 py-1.5"
                            data-testid="hero-badge">
                            <BadgeCheck className="h-3.5 w-3.5" /> ISO 9001:2015 Certified Manufacturer
                        </motion.span>
                        <h1 className="mt-6 font-display font-bold text-gray-900 text-4xl sm:text-5xl lg:text-6xl leading-[1.08]">
                            <MaskedLine i={0}>Masale Jo</MaskedLine>
                            <MaskedLine i={1} className="text-[#C8102E] italic">Swaad Banaye.</MaskedLine>
                        </h1>
                        <motion.p
                            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl"
                            data-testid="hero-description">
                            {BRAND.description}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.65, duration: 0.6 }}
                            className="mt-8 flex flex-wrap items-center gap-4">
                            <Link to="/products" data-testid="hero-explore-products-btn"
                                className="inline-flex items-center gap-2 rounded-full bg-[#C8102E] px-7 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#A50B24] transition-colors duration-200">
                                Explore Products <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link to="/contact" data-testid="hero-bulk-samples-btn"
                                className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-7 py-3.5 text-sm font-semibold text-gray-800 hover:border-[#C8102E] hover:text-[#C8102E] transition-colors duration-200">
                                Request Bulk Samples
                            </Link>
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85, duration: 0.6 }}
                            className="mt-6 text-xs tracking-wide text-gray-500">
                            FSSAI Licensed &nbsp;·&nbsp; 100% Natural &nbsp;·&nbsp; Organic Range Available
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative">
                        <motion.div style={{ y: imgY }} className="rounded-2xl overflow-hidden border border-gray-200 shadow-xl shadow-red-900/5">
                            <img src="/assets/banner.webp" alt="Savrel Natural spice collection — Red Chilli, Turmeric, Bay Leaves, Black Pepper, Cloves"
                                className="w-full h-auto" data-testid="hero-banner-image" />
                        </motion.div>
                        <div className="absolute -bottom-5 -left-4 sm:-left-8 bg-white rounded-xl border border-gray-200 shadow-lg px-5 py-4"
                            data-testid="hero-stat-card">
                            <span className="block font-display text-2xl font-bold text-[#C8102E]">Bulk · Wholesale</span>
                            <span className="block text-xs text-gray-500 mt-0.5">Private-label supply across India</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Marquee />

            {/* Categories */}
            <section className="bg-white py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal className="max-w-2xl">
                        <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#C8102E]">Our Range</span>
                        <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
                            Three families of flavour, one standard of purity
                        </h2>
                    </Reveal>
                    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {CATEGORIES.map((c, i) => (
                            <Reveal key={c.slug} delay={i * 0.08}>
                                <Link to={`/products/${c.slug}`} data-testid={`category-card-${c.slug}`}
                                    className="group block bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                                    <div className="aspect-[16/10] bg-[#FAF6EF] flex items-center justify-center p-6">
                                        <img src={c.image} alt={c.name} loading="lazy"
                                            className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-[1.04]" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-display text-xl font-bold text-gray-900 group-hover:text-[#C8102E] transition-colors">{c.name}</h3>
                                        <p className="text-sm italic text-gray-500">{c.hindi}</p>
                                        <p className="mt-3 text-sm text-gray-600 leading-relaxed">{c.blurb}</p>
                                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#C8102E]">
                                            View range <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                                        </span>
                                    </div>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="border-y border-gray-100 bg-[#FDFBF8]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {STATS.map(([num, label], i) => (
                        <Reveal key={label} delay={i * 0.06} className="text-center">
                            <span className="block font-display text-3xl sm:text-4xl font-bold text-[#C8102E]" data-testid={`stat-${label.toLowerCase().replace(/\s+/g, "-")}`}>{num}</span>
                            <span className="mt-1 block text-sm text-gray-600">{label}</span>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* Featured products */}
            <section className="bg-white py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal className="flex flex-wrap items-end justify-between gap-4">
                        <div className="max-w-xl">
                            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#C8102E]">Best Sellers</span>
                            <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
                                Packed fresh. Trusted by kitchens and businesses alike.
                            </h2>
                        </div>
                        <Link to="/products" data-testid="featured-view-all-link"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C8102E] hover:gap-2.5 transition-all">
                            View all products <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Reveal>
                    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
                        {PRODUCTS.filter((p) => p.image).slice(0, 5).map((p, i) => (
                            <Reveal key={p.id} delay={i * 0.06}>
                                <ProductCard p={p} />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Savrel */}
            <section className="bg-[#FDFBF8] border-y border-gray-100 py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal className="max-w-2xl">
                        <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#C8102E]">Why Savrel</span>
                        <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
                            A factory built around consistency
                        </h2>
                    </Reveal>
                    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {WHY.map((w, i) => (
                            <Reveal key={w.title} delay={i * 0.07}>
                                <div data-testid={`why-card-${w.title.toLowerCase().replace(/\s+/g, "-")}`}
                                    className="h-full bg-white rounded-xl border border-gray-200 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#FEF2F2] text-[#C8102E]">
                                        <w.icon className="h-5 w-5" />
                                    </span>
                                    <h3 className="mt-4 font-display text-lg font-bold text-gray-900">{w.title}</h3>
                                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{w.text}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* B2B CTA */}
            <section className="bg-white py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal>
                        <div data-testid="b2b-cta-band"
                            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#8E0C21] via-[#C8102E] to-[#D9531E] text-white px-8 py-12 sm:px-14 sm:py-16 shadow-lg">
                            <div className="absolute inset-0 spice-grain opacity-40" />
                            <div className="relative max-w-2xl">
                                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug">
                                    Your brand. Our spices. One reliable supply line.
                                </h2>
                                <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed">
                                    From 25kg bulk bags to fully custom private-label packs — samples and pricing on request.
                                </p>
                                <div className="mt-8 flex flex-wrap gap-4">
                                    <Link to="/private-label" data-testid="cta-private-label-btn"
                                        className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#C8102E] hover:bg-gray-100 transition-colors">
                                        Private Label & Bulk <ArrowRight className="h-4 w-4" />
                                    </Link>
                                    <a href={BRAND.phoneHref} data-testid="cta-call-btn"
                                        className="inline-flex items-center gap-2 rounded-full border border-white/50 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                                        <Phone className="h-4 w-4" /> {BRAND.phone}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
