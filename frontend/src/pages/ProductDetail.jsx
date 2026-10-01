import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BadgeCheck, ChefHat, Package, ShieldCheck } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { ProductCard } from "../components/ProductCard";
import { CATEGORIES, CATEGORY_SPECS, PRODUCTS } from "../data/site";

export default function ProductDetail() {
    const { id } = useParams();
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return <Navigate to="/products" replace />;

    const cat = CATEGORIES.find((c) => c.slug === p.category);
    const specs = CATEGORY_SPECS[p.category];
    const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);

    return (
        <div data-testid="product-detail-page">
            <section className="spice-grain bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
                    <Reveal>
                        <nav data-testid="breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 mb-8">
                            <Link to="/" className="hover:text-[#C8102E] transition-colors">Home</Link>
                            <span>/</span>
                            <Link to="/products" className="hover:text-[#C8102E] transition-colors">Products</Link>
                            <span>/</span>
                            <Link to={`/products/${cat.slug}`} className="hover:text-[#C8102E] transition-colors">{cat.name}</Link>
                            <span>/</span>
                            <span className="text-gray-800 font-medium">{p.name}</span>
                        </nav>
                    </Reveal>

                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                        <Reveal>
                            {p.image ? (
                                <div className="rounded-2xl bg-[#FAF6EF] border border-gray-200 p-8 sm:p-12 flex items-center justify-center">
                                    <img src={p.image} alt={`${p.name} — Savrel Spices pack`} data-testid="product-detail-image"
                                        className="max-h-[420px] w-auto object-contain drop-shadow-lg" />
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-gray-200 relative flex flex-col items-center justify-center min-h-[380px] overflow-hidden"
                                    style={{ backgroundColor: p.bg }} data-testid="product-detail-image">
                                    <span className="font-display text-[11rem] leading-none font-bold text-white/15 select-none">{p.name.charAt(0)}</span>
                                    <span className="absolute bottom-10 inset-x-0 text-center px-6">
                                        <span className="block font-display text-white text-3xl font-semibold">{p.name}</span>
                                        <span className="block text-white/70 text-lg italic mt-1">{p.hindi}</span>
                                    </span>
                                </div>
                            )}
                        </Reveal>

                        <Reveal delay={0.08}>
                            <Link to={`/products/${cat.slug}`} data-testid="product-category-chip"
                                className="inline-block rounded-full bg-[#FEF2F2] text-[#991B1B] text-xs font-semibold tracking-wide px-3.5 py-1.5 hover:bg-[#FDE3E0] transition-colors">
                                {cat.name} · {cat.hindi}
                            </Link>
                            <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight" data-testid="product-detail-name">
                                {p.name}
                            </h1>
                            <p className="mt-1.5 text-lg italic text-gray-500">{p.hindi}</p>

                            <p className="mt-6 text-base text-gray-600 leading-relaxed" data-testid="product-detail-desc">{p.desc}</p>

                            <div className="mt-7 flex items-start gap-3 rounded-xl border border-gray-200 bg-[#FDFBF8] p-5">
                                <ChefHat className="h-5 w-5 mt-0.5 shrink-0 text-[#C8102E]" />
                                <div>
                                    <span className="block text-xs font-semibold uppercase tracking-wide text-gray-500">Best used for</span>
                                    <span className="mt-1 block text-sm text-gray-700 leading-relaxed" data-testid="product-detail-uses">{p.uses}</span>
                                </div>
                            </div>

                            <div className="mt-6 flex items-start gap-3 rounded-xl border border-gray-200 bg-[#FDFBF8] p-5">
                                <Package className="h-5 w-5 mt-0.5 shrink-0 text-[#C8102E]" />
                                <div>
                                    <span className="block text-xs font-semibold uppercase tracking-wide text-gray-500">Available pack sizes</span>
                                    <span className="mt-1 block text-sm text-gray-700" data-testid="product-detail-packs">{p.packs}</span>
                                </div>
                            </div>

                            <div className="mt-7 flex flex-wrap gap-4">
                                <Link to="/contact" data-testid="product-enquiry-btn"
                                    className="inline-flex items-center gap-2 rounded-full bg-[#C8102E] px-7 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#A50B24] transition-colors duration-200">
                                    Request Samples & Pricing <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link to={`/products/${cat.slug}`} data-testid="product-back-link"
                                    className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-7 py-3.5 text-sm font-semibold text-gray-800 hover:border-[#C8102E] hover:text-[#C8102E] transition-colors duration-200">
                                    <ArrowLeft className="h-4 w-4" /> Back to {cat.name}
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="bg-white py-14 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 items-start">
                    <Reveal>
                        <div data-testid="spec-table" className="rounded-2xl border border-gray-200 overflow-hidden">
                            <div className="bg-[#1F1410] px-6 py-4 flex items-center gap-3">
                                <ShieldCheck className="h-5 w-5 text-[#E69B00]" />
                                <h2 className="font-display text-lg font-bold text-white">Specifications & Standards</h2>
                            </div>
                            <table className="w-full text-sm">
                                <tbody>
                                    {specs.map(([k, v], i) => (
                                        <tr key={k} className={i % 2 ? "bg-[#FDFBF8]" : "bg-white"}>
                                            <td className="px-6 py-3.5 font-semibold text-gray-900 w-2/5">{k}</td>
                                            <td className="px-6 py-3.5 text-gray-600">{v}</td>
                                        </tr>
                                    ))}
                                    <tr className={specs.length % 2 ? "bg-[#FDFBF8]" : "bg-white"}>
                                        <td className="px-6 py-3.5 font-semibold text-gray-900">Pack sizes</td>
                                        <td className="px-6 py-3.5 text-gray-600">{p.packs}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <div className="rounded-2xl border border-gray-200 bg-[#FDFBF8] p-8">
                            <BadgeCheck className="h-8 w-8 text-[#C8102E]" />
                            <h2 className="mt-4 font-display text-xl font-bold text-gray-900">Bulk & private-label ready</h2>
                            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                                {p.name} is available in 10–30kg food-grade bulk bags with batch coding, or packed
                                under your own label with FSSAI-compliant declarations. Spec sheets and COAs are
                                shared with serious buyers on request.
                            </p>
                            <Link to="/private-label" data-testid="product-private-label-link"
                                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#C8102E] hover:gap-2.5 transition-all">
                                Private label options <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {related.length > 0 && (
                <section className="bg-[#FDFBF8] border-t border-gray-100 py-14 sm:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Reveal className="flex flex-wrap items-end justify-between gap-4">
                            <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">More in {cat.name}</h2>
                            <Link to={`/products/${cat.slug}`} data-testid="related-view-all-link"
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C8102E] hover:gap-2.5 transition-all">
                                View all <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Reveal>
                        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
                            {related.map((r, i) => (
                                <Reveal key={r.id} delay={i * 0.05}>
                                    <ProductCard p={r} />
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
