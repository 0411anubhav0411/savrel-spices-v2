import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { NAV_LINKS, PRODUCT_LINKS, BRAND } from "../data/site";

const linkClass = ({ isActive }) =>
    `text-sm font-medium tracking-wide transition-colors duration-200 ${
        isActive ? "text-[#C8102E]" : "text-gray-700 hover:text-[#C8102E]"
    }`;

export const Header = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const productsActive = location.pathname.startsWith("/products");

    return (
        <header data-testid="site-header" className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" data-testid="header-logo-link" className="flex items-center gap-3 shrink-0">
                        <img src="/assets/logo.png" alt="Savrel Natural" className="h-12 sm:h-14 w-auto" />
                        <span className="hidden md:block leading-tight">
                            <span className="block font-display font-bold text-gray-900 text-lg">Savrel Natural</span>
                            <span className="block text-[11px] italic text-[#C8102E] font-medium">{BRAND.tagline}</span>
                        </span>
                    </Link>

                    <nav data-testid="desktop-nav" className="hidden lg:flex items-center gap-7">
                        <NavLink to="/" end className={linkClass} data-testid="nav-home">Home</NavLink>
                        <NavLink to="/about" className={linkClass} data-testid="nav-about">About Us</NavLink>
                        <div className="relative group">
                            <button
                                data-testid="nav-products-trigger"
                                className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-200 ${
                                    productsActive ? "text-[#C8102E]" : "text-gray-700 group-hover:text-[#C8102E]"
                                }`}
                            >
                                Products <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                            </button>
                            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                                <div className="w-56 rounded-xl border border-gray-200 bg-white shadow-lg py-2">
                                    {PRODUCT_LINKS.map((l) => (
                                        <Link key={l.to} to={l.to} data-testid={`nav-dropdown-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                                            className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-[#FDF3F0] hover:text-[#C8102E] transition-colors">
                                            {l.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <NavLink to="/private-label" className={linkClass} data-testid="nav-private-label">Private Label</NavLink>
                        <NavLink to="/quality" className={linkClass} data-testid="nav-quality">Quality</NavLink>
                        <NavLink to="/founder" className={linkClass} data-testid="nav-founder">Founder</NavLink>
                        <NavLink to="/team" className={linkClass} data-testid="nav-team">Team</NavLink>
                        <NavLink to="/contact" className={linkClass} data-testid="nav-contact">Contact</NavLink>
                        <Link to="/contact" data-testid="nav-request-samples-btn"
                            className="ml-1 inline-flex items-center rounded-full bg-[#C8102E] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#A50B24] transition-colors duration-200">
                            Request Samples
                        </Link>
                    </nav>

                    <button data-testid="mobile-menu-toggle" onClick={() => setOpen(!open)}
                        className="lg:hidden p-2 text-gray-700" aria-label="Toggle menu">
                        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {open && (
                <div data-testid="mobile-menu" className="lg:hidden border-t border-gray-100 bg-white">
                    <div className="px-4 py-4 space-y-1">
                        {[{ to: "/", label: "Home" }, { to: "/about", label: "About Us" }, ...PRODUCT_LINKS,
                          { to: "/private-label", label: "Private Label" }, { to: "/quality", label: "Quality" },
                          { to: "/founder", label: "Founder" }, { to: "/team", label: "Team" }, { to: "/contact", label: "Contact" },
                        ].map((l) => (
                            <Link key={l.to + l.label} to={l.to} onClick={() => setOpen(false)}
                                data-testid={`mobile-nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-[#FDF3F0] hover:text-[#C8102E]">
                                {l.label}
                            </Link>
                        ))}
                        <Link to="/contact" onClick={() => setOpen(false)} data-testid="mobile-request-samples-btn"
                            className="mt-2 block rounded-full bg-[#C8102E] px-5 py-3 text-center text-sm font-semibold text-white">
                            Request Samples
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};
