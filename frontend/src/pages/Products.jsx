import { useState } from "react";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { ProductCard } from "../components/ProductCard";
import { PRODUCTS, CATEGORIES } from "../data/site";

const TABS = [{ slug: "all", name: "All Products" }, ...CATEGORIES.map((c) => ({ slug: c.slug, name: c.name }))];

export default function Products() {
    const [tab, setTab] = useState("all");
    const list = tab === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === tab);

    return (
        <div data-testid="products-page">
            <PageHero
                eyebrow="Our Products"
                title="The complete Savrel range"
                sub="Whole spices, spice powders and masala blends — available in retail pouches, 1kg packs and 10–30kg bulk bags. Custom pack sizes on request."
            />

            <section className="bg-white py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal>
                        <div data-testid="product-filter-tabs" className="flex flex-wrap gap-2.5">
                            {TABS.map((t) => (
                                <button key={t.slug} onClick={() => setTab(t.slug)}
                                    data-testid={`filter-tab-${t.slug}`}
                                    className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                                        tab === t.slug
                                            ? "bg-[#C8102E] text-white shadow-sm"
                                            : "bg-white border border-gray-300 text-gray-700 hover:border-[#C8102E] hover:text-[#C8102E]"
                                    }`}>
                                    {t.name}
                                </button>
                            ))}
                        </div>
                    </Reveal>

                    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
                        {list.map((p, i) => (
                            <Reveal key={p.id} delay={Math.min(i * 0.04, 0.3)}>
                                <ProductCard p={p} />
                            </Reveal>
                        ))}
                    </div>

                    <Reveal className="mt-14">
                        <div className="rounded-2xl bg-[#FDFBF8] border border-gray-200 px-8 py-8 text-sm text-gray-600 leading-relaxed" data-testid="products-bulk-note">
                            <strong className="text-gray-900">Buying in bulk?</strong> All products are available in
                            10–30kg food-grade bulk bags with batch coding and labelling to your specification.
                            Private-label packing with your own branding is available across the full range —{" "}
                            <a href="/contact" className="font-semibold text-[#C8102E] hover:underline">contact us for samples and pricing</a>.
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
