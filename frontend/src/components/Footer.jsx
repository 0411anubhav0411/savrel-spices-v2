import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { BRAND, PRODUCT_LINKS } from "../data/site";

export const Footer = () => (
    <footer data-testid="site-footer" className="bg-[#1F1410] text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                <div>
                    <div className="flex items-center gap-3">
                        <img src="/assets/logo.png" alt="Savrel Spices" className="h-12 w-auto bg-white rounded-lg px-2 py-1" />
                    </div>
                    <p className="mt-2 text-sm italic text-[#E69B00]">{BRAND.tagline}</p>
                    <p className="mt-4 text-sm leading-relaxed text-gray-400">
                        Manufacturer of premium Indian spices — whole spices, powders and masala blends for bulk,
                        wholesale and private-label supply across India.
                    </p>
                </div>
                <div>
                    <h3 className="font-display text-white font-semibold text-base">Company</h3>
                    <ul className="mt-4 space-y-2.5 text-sm">
                        {[["About Us", "/about"], ["Our Founder", "/founder"], ["Our Team", "/team"],
                          ["Quality & Certifications", "/quality"], ["Private Label & Bulk", "/private-label"], ["Contact Us", "/contact"]].map(([label, to]) => (
                            <li key={to}>
                                <Link to={to} data-testid={`footer-link-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="hover:text-white transition-colors">{label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="font-display text-white font-semibold text-base">Products</h3>
                    <ul className="mt-4 space-y-2.5 text-sm">
                        {PRODUCT_LINKS.map((l) => (
                            <li key={l.to}>
                                <Link to={l.to} data-testid={`footer-product-${l.label.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-white transition-colors">{l.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="font-display text-white font-semibold text-base">Reach Us</h3>
                    <ul className="mt-4 space-y-3.5 text-sm">
                        <li className="flex gap-3"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[#E69B00]" /><span>{BRAND.address}</span></li>
                        <li className="flex gap-3"><Phone className="h-4 w-4 mt-0.5 shrink-0 text-[#E69B00]" /><a href={BRAND.phoneHref} data-testid="footer-phone" className="hover:text-white transition-colors">{BRAND.phone}</a></li>
                        <li className="flex gap-3"><Mail className="h-4 w-4 mt-0.5 shrink-0 text-[#E69B00]" /><a href={`mailto:${BRAND.email}`} data-testid="footer-email" className="hover:text-white transition-colors break-all">{BRAND.email}</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
                <span>© {new Date().getFullYear()} Savrel Spices. All rights reserved.</span>
                <span>ISO 9001:2015 Certified · FSSAI Licensed · 100% Natural</span>
            </div>
        </div>
    </footer>
);
