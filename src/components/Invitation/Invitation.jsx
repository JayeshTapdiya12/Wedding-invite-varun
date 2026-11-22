import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { invitationHeading, invitationPages, invitationPdf } from "../../data/invitationData";
import { useLang } from "../../i18n/LangContext";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import "./Invitation.css";

const EASE = [0.22, 1, 0.36, 1];

// The printed invitation as turnable pages, plus the PDF to keep.
export default function Invitation({ withHeading = true }) {
  const { t } = useLang();
  const n = invitationPages.length;
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const go = useCallback((step) => { setDir(step); setI((v) => (v + step + n) % n); }, [n]);
  const jump = (k) => { setDir(k > i ? 1 : -1); setI(k); };

  const onKey = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  };
  useEffect(() => { // pre-load the next page so the turn feels instant
    const img = new Image();
    img.src = invitationPages[(i + 1) % n].src;
  }, [i, n]);

  const page = invitationPages[i];
  return (
    <section id="invitation" className="section invite" aria-labelledby="invite-title">
      <div className="container">
        {withHeading ? <SectionHeading eyebrow={invitationHeading.eyebrow} title={invitationHeading.heading} lead={invitationHeading.lead} headingId="invite-title" /> : <h2 className="sr-only" id="invite-title">{invitationHeading.heading}</h2>}

        <div className="invite__book" tabIndex={0} onKeyDown={onKey} role="region" aria-roledescription="carousel" aria-label={t(invitationHeading.heading)}>
          <button type="button" className="invite__btn invite__btn--prev" onClick={() => go(-1)} aria-label={t("Previous page")}><ChevronLeft size={26} strokeWidth={1.4} /></button>
          <div className="invite__stage">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.figure
                key={page.src}
                className="invite__page"
                custom={dir}
                variants={{
                  enter: (d) => ({ opacity: 0, rotateY: d * 38, x: d * 60, scale: 0.97 }),
                  center: { opacity: 1, rotateY: 0, x: 0, scale: 1 },
                  exit: (d) => ({ opacity: 0, rotateY: d * -38, x: d * -60, scale: 0.97 }),
                }}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.45, ease: EASE }}
                drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.4}
                onDragEnd={(_, info) => { if (info.offset.x < -60) go(1); else if (info.offset.x > 60) go(-1); }}
              >
                <img src={page.src} alt={`${t("Invitation page")} ${i + 1}: ${t(page.label)}`} draggable="false" decoding="async" />
              </motion.figure>
            </AnimatePresence>
          </div>
          <button type="button" className="invite__btn invite__btn--next" onClick={() => go(1)} aria-label={t("Next page")}><ChevronRight size={26} strokeWidth={1.4} /></button>
        </div>

        <p className="invite__label" aria-live="polite">{t(page.label)} <small>{i + 1} / {n}</small></p>

        <div className="invite__thumbs" role="group" aria-label={t("Choose a page")}>
          {invitationPages.map((p, k) => (
            <button key={p.src} type="button" className={k === i ? "on" : ""} onClick={() => jump(k)} aria-label={`${t("Page")} ${k + 1}: ${t(p.label)}`} aria-current={k === i ? "true" : undefined}>
              <img src={p.src} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>

        <Reveal className="invite__dl">
          <a className="btn btn--solid" href={invitationPdf} download="Varun-Radhika-Wedding-Invitation.pdf"><Download size={17} strokeWidth={1.6} aria-hidden="true" /> {t("Download the invitation (PDF)")}</a>
        </Reveal>
      </div>
    </section>
  );
}
