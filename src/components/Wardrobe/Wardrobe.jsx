import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { wardrobeCards, wardrobeHeading, wardrobePoster } from "../../data/wardrobeData";
import { eventsData } from "../../data/eventsData";
import { currentGuest, visibleEvents } from "../../lib/guest";
import { useLang } from "../../i18n/LangContext";
import { Link } from "../../lib/router";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import "./Wardrobe.css";

// The wardrobe planner: one card per dressed celebration, with colour swatches.
export default function Wardrobe({ withHeading = true }) {
  const { t, lang } = useLang();
  const guest = currentGuest();
  const allowed = new Set(visibleEvents(eventsData).map((e) => e.id));
  const cards = wardrobeCards.filter((c) => !guest || allowed.has(c.event));

  return (
    <section id="wardrobe" className="section wardrobe" aria-labelledby="wardrobe-title">
      <div className="container">
        {withHeading ? <SectionHeading eyebrow={wardrobeHeading.eyebrow} title={wardrobeHeading.heading} lead={wardrobeHeading.lead} headingId="wardrobe-title" /> : <h2 className="sr-only" id="wardrobe-title">{wardrobeHeading.heading}</h2>}

        <ul className="wr__grid">
          {cards.map((c, i) => (
            <Reveal as="li" key={c.id} className="wr" delay={(i % 2) * 0.12} y={50} duration={1.1}>
              <div className="wr__img">
                <img src={c.image} alt={`${t(c.edit)}: ${t(c.code)}`} loading="lazy" decoding="async" />
              </div>
              <div className="wr__body">
                <p className="wr__when">{t(c.date)} · {t(c.time)}</p>
                <h3 className="wr__name">{lang === "hi" ? c.hindi : c.name}</h3>
                <p className="wr__edit">{t(c.edit)}</p>
                <p className="wr__codelabel">{t("Dress code")}</p>
                <p className="wr__code">{t(c.code)}</p>
                <ul className="wr__swatches" aria-label={t("Colour inspiration")}>
                  {c.swatches.map(([name, hex], k) => (
                    <li key={name} style={{ "--c": hex, "--k": k }}><motion.i aria-hidden="true" initial={{ scale: 0.4, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.25 + k * 0.09, ease: [0.22, 1, 0.36, 1] }} /><span>{t(name)}</span></li>
                  ))}
                </ul>
                <p>{t(c.text)}</p>
                <p className="wr__ideas">{t(c.ideas)}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="wr__poster" y={40} duration={1.2}>
          <img src={wardrobePoster.src} alt={wardrobePoster.alt} loading="lazy" decoding="async" />
          <div>
            <p className="eyebrow">{t(wardrobePoster.title)}</p>
            <p className="wr__poster-note">{t(wardrobePoster.note)}</p>
            <a className="btn btn--solid" href={wardrobePoster.src} download="Varun-Radhika-Wardrobe-Planner.jpg"><Download size={17} strokeWidth={1.6} aria-hidden="true" /> {t("Download the planner")}</a>
            <p className="wr__more"><Link to="/celebrations">{t("See every celebration")}</Link></p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
