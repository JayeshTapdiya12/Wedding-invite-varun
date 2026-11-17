import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { weddingData } from "../data/weddingData";

const links = [
    { href: "#story", label: "Their story" },
    { href: "#families", label: "Families" },
    { href: "#gallery", label: "Gallery" },
    { href: "#film", label: "Film" },
    { href: "#events", label: "Schedule" },
    { href: "#venue", label: "Venue" },
    { href: "#rsvp", label: "RSVP" },
];

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const updateScroll = () => setScrolled(window.scrollY > 24);
        updateScroll();
        window.addEventListener("scroll", updateScroll, { passive: true });
        return () => window.removeEventListener("scroll", updateScroll);
    }, []);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={`site-nav fixed inset-x-0 top-0 z-40 transition-all duration-300 ${scrolled || menuOpen ? "site-nav-scrolled" : ""}`}>
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
                <a href="#home" onClick={closeMenu} className="font-serif text-xl tracking-[0.12em]" aria-label={`${weddingData.groom.firstName} and ${weddingData.bride.firstName}, home`}>
                    {weddingData.groom.monogram}
                    <span className="mx-1.5 italic text-[#D4AF37]">&amp;</span>
                    {weddingData.bride.monogram}
                </a>

                <nav aria-label="Main navigation" className="hidden items-center gap-5 lg:flex xl:gap-7">
                    {links.map((link) => (
                        <a key={link.href} href={link.href} className="nav-link text-[11px] uppercase tracking-[0.18em] transition-colors">
                            {link.label}
                        </a>
                    ))}
                </nav>

                <a href="#rsvp" className="nav-rsvp hidden border border-[#D4AF37] px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition-colors lg:inline-flex">
                    Kindly reply
                </a>

                <button
                    type="button"
                    onClick={() => setMenuOpen((open) => !open)}
                    className="nav-link inline-flex items-center justify-center rounded-full p-2 lg:hidden"
                    aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-navigation"
                >
                    {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {menuOpen && (
                <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-[#C6A46A]/25 bg-[#102D27] px-6 py-5 lg:hidden">
                    <div className="mx-auto flex max-w-7xl flex-col gap-1">
                        {links.map((link) => (
                            <a key={link.href} href={link.href} onClick={closeMenu} className="rounded-lg px-3 py-3 text-xs uppercase tracking-[0.18em] text-[#FAF6F0] hover:bg-white/5">
                                {link.label}
                            </a>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    );
}
