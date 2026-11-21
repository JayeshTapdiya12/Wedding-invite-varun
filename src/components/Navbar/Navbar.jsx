import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { weddingData as d } from "../../data/weddingData";
import { usePhase } from "../../hooks/usePhase";
import { useLang } from "../../i18n/LangContext";
import "./Navbar.css";

const LINKS = [
  ["Home", "#home"],
  ["Our Story", "#story"],
  ["Films", "#films"],
  ["Gallery", "#gallery"],
  ["Festivities", "#events"],
  ["RSVP", "#rsvp"],
  ["Venue & Travel", "#venue"],
  ["FAQ", "#faq"],
];

const EASE = [0.22, 1, 0.36, 1];

export default function Navbar({ ready = true }) {
  const { t, lang, setLang } = useLang();
  const phase = usePhase();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  // after the wedding there is nothing to RSVP to and the FAQ is gone
  const links = useMemo(() => LINKS.filter(([, h]) => !(phase === "after" && (h === "#rsvp" || h === "#faq"))), [phase]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // highlight the section currently in view
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach(([, h]) => {
      const el = document.getElementById(h.slice(1));
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [links]);

  // lock page scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = () => setOpen(false);
  const toHindi = lang === "en";

  return (
    <motion.header
      className={`nav ${scrolled ? "is-solid" : ""} ${open ? "is-open" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
    >
      <div className="nav__bar">
        <a href="#home" className="nav__logo" aria-label={`${d.groom.firstName} and ${d.bride.firstName} – home`} onClick={go}>
          {d.groom.monogram}<span>&amp;</span>{d.bride.monogram}
        </a>

        <nav className="nav__links" aria-label="Primary">
          {links.map(([label, href]) => (
            <a key={href} href={href} className={active === href ? "is-active" : ""} aria-current={active === href ? "location" : undefined}>
              {t(label)}
            </a>
          ))}
        </nav>

        <div className="nav__right">
          <button
            className="nav__lang"
            onClick={() => setLang(toHindi ? "hi" : "en")}
            aria-label={toHindi ? "इस साइट को हिन्दी में देखें" : "View this site in English"}
            lang={toHindi ? "hi" : "en"}
          >
            <span className={lang === "en" ? "on" : ""}>EN</span>
            <span className={lang === "hi" ? "on" : ""}>हिं</span>
          </button>
          <button className="nav__toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <X size={26} strokeWidth={1.4} /> : <Menu size={26} strokeWidth={1.4} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="nav__sheet"
            initial={{ clipPath: "circle(0% at calc(100% - 38px) 36px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 38px) 36px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 38px) 36px)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <nav aria-label="Mobile">
              <ul>
                {links.map(([label, href], i) => (
                  <motion.li key={href} initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, delay: 0.25 + i * 0.05, ease: EASE }}>
                    <a href={href} onClick={go}>
                      <small>0{i + 1}</small>
                      {t(label)}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.p className="nav__sheet-foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              {t(d.dateRange)} · {d.hashtag}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
