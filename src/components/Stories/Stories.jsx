import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { weddingData as d } from "../../data/weddingData";
import { galleryData, galleryCategories } from "../../data/galleryData";
import { v9Data } from "../../data/v9Data";
import { useLang } from "../../i18n/LangContext";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import "./Stories.css";

// Instagram-style stories built from the gallery categories: tap right = next, tap left = back,
// press and hold = pause, swipe down or Esc = close.
const EASE = [0.22, 1, 0.36, 1];

function useStories() {
  return useMemo(
    () =>
      galleryCategories
        .filter((c) => c !== "All Moments")
        .map((c) => ({ id: c, title: c, slides: galleryData.filter((g) => g.category === c) }))
        .filter((s) => s.slides.length),
    []
  );
}

function Viewer({ stories, start, onClose, seen }) {
  const { t } = useLang();
  const [si, setSi] = useState(start);
  const [pi, setPi] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches).current;
  const story = stories[si];
  const slide = story.slides[pi];
  const closeRef = useRef(null);

  useEffect(() => { seen(story.id); }, [story.id, seen]);

  const next = useCallback(() => {
    if (pi < story.slides.length - 1) setPi(pi + 1);
    else if (si < stories.length - 1) { setSi(si + 1); setPi(0); }
    else onClose();
  }, [pi, si, story.slides.length, stories.length, onClose]);

  const prev = useCallback(() => {
    if (pi > 0) setPi(pi - 1);
    else if (si > 0) { setSi(si - 1); setPi(stories[si - 1].slides.length - 1); }
  }, [pi, si, stories]);

  useEffect(() => {
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => { document.documentElement.style.overflow = prevOverflow; window.removeEventListener("keydown", onKey); };
  }, [next, prev, onClose]);

  // warm the next photo
  useEffect(() => {
    const n = story.slides[pi + 1] || stories[si + 1]?.slides[0];
    if (n) new Image().src = n.src;
  }, [pi, si, story, stories]);

  const dur = v9Data.stories.secondsPerSlide;
  const hold = { onPointerDown: () => setPaused(true), onPointerUp: () => setPaused(false), onPointerLeave: () => setPaused(false), onPointerCancel: () => setPaused(false) };

  return (
    <motion.div className="st" role="dialog" aria-modal="true" aria-label={t(story.title)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <img className="st__backdrop" src={slide.thumb} alt="" aria-hidden="true" />
      <motion.div
        className="st__phone"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.6 }}
        onDragEnd={(_, i) => { if (i.offset.y > 120) onClose(); }}
      >
        <div className="st__bars" aria-hidden="true">
          {story.slides.map((s, i) => (
            <span key={s.id} className="st__bar">
              <i
                className={i < pi ? "is-done" : i === pi ? "is-now" : ""}
                style={i === pi && !reduced ? { animationDuration: `${dur}s`, animationPlayState: paused ? "paused" : "running" } : undefined}
                onAnimationEnd={i === pi && !reduced ? next : undefined}
              />
            </span>
          ))}
        </div>

        <header className="st__head">
          <span className="st__avatar" aria-hidden="true">{d.groom.monogram}&amp;{d.bride.monogram}</span>
          <span className="st__who"><strong>{d.groom.firstName} &amp; {d.bride.firstName}</strong><small>{t(story.title)}</small></span>
          <button ref={closeRef} type="button" className="st__close" onClick={onClose} aria-label={t("Close")}><X size={22} strokeWidth={1.6} /></button>
        </header>

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img key={slide.id} className="st__img" src={slide.src} alt={t(slide.caption)} draggable="false"
            initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }} />
        </AnimatePresence>
        <div className="st__shade" aria-hidden="true" />

        <button type="button" className="st__zone st__zone--l" aria-label={t("Previous photo")} onClick={prev} {...hold} />
        <button type="button" className="st__zone st__zone--r" aria-label={t("Next photo")} onClick={next} {...hold} />

        <p className="st__cap" aria-live="polite">{t(slide.caption)}</p>
      </motion.div>
    </motion.div>
  );
}

export default function Stories() {
  const s = v9Data.stories;
  const { t } = useLang();
  const stories = useStories();
  const [open, setOpen] = useState(-1);
  const [seenIds, setSeenIds] = useState([]);
  const markSeen = useCallback((id) => setSeenIds((p) => (p.includes(id) ? p : [...p, id])), []);
  const close = useCallback(() => setOpen(-1), []);
  if (!stories.length) return null;

  return (
    <section id="stories" className="section stories" aria-labelledby="stories-title">
      <div className="container">
        <SectionHeading eyebrow={s.eyebrow} title={s.heading} lead={s.lead} headingId="stories-title" />
        <Reveal as="ul" className="stories__row" delay={0.2} role="list">
          {stories.map((st, i) => (
            <li key={st.id}>
              <button type="button" className={`stories__item ${seenIds.includes(st.id) ? "is-seen" : ""}`} onClick={() => setOpen(i)} aria-label={`${t(st.title)}, ${st.slides.length}`}>
                <span className="stories__ring"><img src={st.slides[0].thumb} alt="" loading="lazy" /></span>
                <span className="stories__label">{t(st.title)}</span>
              </button>
            </li>
          ))}
        </Reveal>
      </div>
      <AnimatePresence>{open >= 0 && <Viewer key="viewer" stories={stories} start={open} onClose={close} seen={markSeen} />}</AnimatePresence>
    </section>
  );
}
