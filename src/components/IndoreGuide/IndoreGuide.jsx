import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Sparkles } from "lucide-react";
import { v9Data } from "../../data/v9Data";
import { useLang } from "../../i18n/LangContext";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import "./IndoreGuide.css";

const EASE = [0.22, 1, 0.36, 1];
const mapUrl = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${q} Indore`.replace(/Indore Indore$/, "Indore"))}`;

// Food and sights for guests from out of town. Content lives in v9Data.guide.
export default function IndoreGuide() {
  const g = v9Data.guide;
  const { t } = useLang();
  const [tab, setTab] = useState(g.tabs[0].id);
  const cur = g.tabs.find((x) => x.id === tab) || g.tabs[0];

  const onKey = (e) => {
    const i = g.tabs.findIndex((x) => x.id === tab);
    const n = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
    if (n === null) return;
    const next = g.tabs[(n + g.tabs.length) % g.tabs.length];
    setTab(next.id);
    document.getElementById(`guide-tab-${next.id}`)?.focus();
  };

  return (
    <section id="guide" className="section guide" aria-labelledby="guide-title">
      <div className="container">
        <SectionHeading eyebrow={g.eyebrow} title={g.heading} lead={g.lead} headingId="guide-title" />

        <Reveal className="guide__tabs" role="tablist" aria-label={t(g.heading)} onKeyDown={onKey} delay={0.1}>
          {g.tabs.map((x) => (
            <button key={x.id} id={`guide-tab-${x.id}`} role="tab" type="button" aria-selected={tab === x.id} aria-controls={`guide-panel-${x.id}`} tabIndex={tab === x.id ? 0 : -1} className={tab === x.id ? "on" : ""} onClick={() => setTab(x.id)}>
              {t(x.label)}
            </button>
          ))}
        </Reveal>

        <AnimatePresence mode="wait" initial={false}>
          <motion.ul key={cur.id} id={`guide-panel-${cur.id}`} role="tabpanel" aria-labelledby={`guide-tab-${cur.id}`} className="guide__grid"
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease: EASE }}>
            {cur.items.map((it) => (
              <li key={it.name} className="gcard">
                <small>{t(it.area)}</small>
                <h3>{t(it.name)}</h3>
                <p>{t(it.text)}</p>
                <a href={mapUrl(it.map || it.name)} target="_blank" rel="noopener noreferrer"><MapPin size={15} strokeWidth={1.6} aria-hidden="true" /> {t("Open in Maps")}</a>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>

        <Reveal className="guide__tips" delay={0.15}>
          <h3><Sparkles size={18} strokeWidth={1.5} aria-hidden="true" /> {t("Local tips")}</h3>
          <ul>{g.tips.map((x) => <li key={x}>{t(x)}</li>)}</ul>
          {g.note && <p className="guide__note">{t(g.note)}</p>}
        </Reveal>
      </div>
    </section>
  );
}
