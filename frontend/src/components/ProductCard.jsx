import { Link } from "react-router-dom";

export const ProductCard = ({ p }) => (
    <Link
        to={`/product/${p.id}`}
        data-testid={`product-card-${p.id}`}
        className="group block bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
    >
        {p.image ? (
            <div className="aspect-[4/5] bg-[#FAF6EF] flex items-center justify-center p-5">
                <img
                    src={p.image}
                    alt={`${p.name} — Savrel Natural`}
                    loading="lazy"
                    className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                />
            </div>
        ) : (
            <div className="aspect-[4/5] relative flex flex-col items-center justify-center" style={{ backgroundColor: p.bg }}>
                <span className="font-display text-[7rem] leading-none font-bold text-white/15 select-none">
                    {p.name.charAt(0)}
                </span>
                <span className="absolute bottom-6 inset-x-0 text-center px-4">
                    <span className="block font-display text-white text-xl font-semibold">{p.name}</span>
                    <span className="block text-white/70 text-sm italic mt-0.5">{p.hindi}</span>
                </span>
            </div>
        )}
        <div className="p-5 border-t border-gray-100">
            <h3 className="font-display text-lg font-bold text-gray-900 group-hover:text-[#C8102E] transition-colors">{p.name}</h3>
            <p className="text-sm text-gray-500 italic">{p.hindi}</p>
            <p className="mt-2.5 text-xs text-gray-500 leading-relaxed">Pack sizes: {p.packs}</p>
        </div>
    </Link>
);
