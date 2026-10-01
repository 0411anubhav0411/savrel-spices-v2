import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";

export const PageHero = ({ eyebrow, title, sub, crumb }) => (
    <section data-testid="page-hero" className="spice-grain bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
            <Reveal>
                <nav data-testid="breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 mb-5">
                    <Link to="/" className="hover:text-[#C8102E] transition-colors">Home</Link>
                    <ChevronRight className="h-3 w-3" />
                    <span className="text-gray-800 font-medium">{crumb || title}</span>
                </nav>
                {eyebrow && (
                    <span className="inline-block rounded-full bg-[#FEF2F2] text-[#991B1B] text-xs font-semibold tracking-wide px-3.5 py-1.5 mb-4">
                        {eyebrow}
                    </span>
                )}
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight max-w-3xl">{title}</h1>
                {sub && <p className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">{sub}</p>}
                <div className="mt-7 h-1 w-16 rounded-full bg-[#C8102E]" />
            </Reveal>
        </div>
    </section>
);
