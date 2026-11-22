import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { weddingData as d } from "../../data/weddingData";
import { pagesData } from "../../data/pagesData";
import { useLang } from "../../i18n/LangContext";
import { Link, useRoute } from "../../lib/router";
import "./Navbar.css";

const EASE = [0.22, 1, 0.36, 1];
// The bar shows the main pages; the menu button opens all of them.
const BAR = ["/celebrations", "/gallery", "/wardrobe", "/venue", "/travel", "/family"];

export default function Navbar({ ready = true }) {
  const { t, lang, setLang } = useLang();
  const { path } = useRoute();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const bar = [["Home", "/"], ...pagesData.filter((p) => BAR.includes(p.path)).map((p) => [p.short || p.label, p.path])];
  const menu = [["Home", "/"], ...pagesData.map((p) => [p.label, p.path])];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [path]);

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
        <Link to="/" className="nav__logo" aria-label={`${d.groom.firstName} and ${d.bride.firstName} – home`} onClick={go}>
          {d.groom.monogram}<span>&amp;</span>{d.bride.monogram}
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {bar.map(([label, to]) => (
            <Link key={to} to={to} className={path === to ? "is-active" : ""} aria-current={path === to ? "page" : undefined}>
              {t(label)}
            </Link>
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
                {menu.map(([label, to], i) => (
                  <motion.li key={to} initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, delay: 0.25 + i * 0.05, ease: EASE }}>
                    <Link to={to} onClick={go} aria-current={path === to ? "page" : undefined}>
                      <small>{String(i + 1).padStart(2, "0")}</small>
                      {t(label)}
                    </Link>
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
