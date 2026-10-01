import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { EnquiryForm } from "../components/EnquiryForm";
import { BRAND } from "../data/site";

const CARDS = [
    { icon: Phone, title: "Call Us", lines: [BRAND.phone], href: BRAND.phoneHref, testid: "contact-phone-card" },
    { icon: Mail, title: "Email Us", lines: [BRAND.email], href: `mailto:${BRAND.email}`, testid: "contact-email-card" },
    { icon: Clock, title: "Working Hours", lines: ["Mon – Sat", "9:30 AM – 6:30 PM IST"], testid: "contact-hours-card" },
];

export default function Contact() {
    return (
        <div data-testid="contact-page">
            <PageHero
                eyebrow="Contact Us"
                title="Let's talk spices"
                sub="Samples, bulk pricing, private-label projects or distributor enquiries — reach us any way you like."
            />

            <section className="bg-white py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid sm:grid-cols-3 gap-6">
                        {CARDS.map((c, i) => {
                            const Inner = (
                                <>
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#FEF2F2] text-[#C8102E]">
                                        <c.icon className="h-5 w-5" />
                                    </span>
                                    <h3 className="mt-4 font-display text-lg font-bold text-gray-900">{c.title}</h3>
                                    {c.lines.map((l) => (
                                        <p key={l} className="mt-1 text-sm text-gray-600 break-all">{l}</p>
                                    ))}
                                </>
                            );
                            return (
                                <Reveal key={c.title} delay={i * 0.07}>
                                    {c.href ? (
                                        <a href={c.href} data-testid={c.testid}
                                            className="block h-full bg-white rounded-xl border border-gray-200 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                                            {Inner}
                                        </a>
                                    ) : (
                                        <div data-testid={c.testid} className="h-full bg-white rounded-xl border border-gray-200 p-6">{Inner}</div>
                                    )}
                                </Reveal>
                            );
                        })}
                    </div>

                    <div className="mt-14 grid lg:grid-cols-[2fr_3fr] gap-10 items-start">
                        <Reveal>
                            <div data-testid="contact-address-block" className="rounded-2xl bg-[#1F1410] text-white p-8 sm:p-10 h-full">
                                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#C8102E]">
                                    <MapPin className="h-5 w-5" />
                                </span>
                                <h2 className="mt-5 font-display text-2xl font-bold">Factory & Office</h2>
                                <p className="mt-4 text-base text-gray-300 leading-relaxed" data-testid="contact-address">
                                    Savrel Natural Spices<br />
                                    {BRAND.address}
                                </p>
                                <a
                                    data-testid="contact-directions-link"
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("G-418 419 UPSIDC M.G. Road Uttar Pradesh 201015")}`}
                                    target="_blank" rel="noopener noreferrer"
                                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                                    Get Directions <MapPin className="h-4 w-4" />
                                </a>
                                <div className="mt-8 border-t border-white/10 pt-6 text-sm text-gray-400 leading-relaxed">
                                    Visitors welcome by appointment. Samples can be collected from the factory
                                    or couriered anywhere in India.
                                </div>
                            </div>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <EnquiryForm />
                        </Reveal>
                    </div>
                </div>
            </section>
        </div>
    );
}
