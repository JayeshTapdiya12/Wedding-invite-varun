import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { galleryCategories, galleryData, galleryHeading } from "../../data/galleryData";
import SectionHeading from "../common/SectionHeading";
import { useLang } from "../../i18n/LangContext";
import "./Gallery.css";

const EASE = [0.22, 1, 0.36, 1];
const SWIPE = 70; // px a finger has to travel to change photo

function Lightbox({ items, index, onClose, onGo }) {
  const { t } = useLang();
  const [dir, setDir] = useState(0);
  const closeRef = useRef(null);
  const item = items[index];

  const go = useCallback((step) => { setDir(step); onGo((index + step + items.length) % items.length); }, [index, items.length, onGo]);

  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [go, onClose]);

  // warm the cache for the neighbours so next/prev feels instant
  useEffect(() => {
    [1, -1].forEach((s) => {
      const n = items[(index + s + items.length) % items.length];
      if (n) new Image().src = n.src;
    });
  }, [index, items]);

  return (
    <motion.div className="lb" role="dialog" aria-modal="true" aria-label="Photo viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} onClick={onClose}>
      <button ref={closeRef} className="lb__btn lb__close" onClick={onClose} aria-label="Close photo viewer"><X size={24} strokeWidth={1.4} /></button>
      <button className="lb__btn lb__prev" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous photo"><ChevronLeft size={28} strokeWidth={1.3} /></button>
      <button className="lb__btn lb__next" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next photo"><ChevronRight size={28} strokeWidth={1.3} /></button>

      <div className="lb__stage" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.figure
            key={item.id}
            className="lb__fig"
            custom={dir}
            variants={{
              enter: (d) => ({ opacity: 0, x: d * 70 }),
              center: { opacity: 1, x: 0 },
              exit: (d) => ({ opacity: 0, x: d * -70 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: EASE }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragEnd={(_, info) => {
              if (info.offset.x < -SWIPE) go(1);
              else if (info.offset.x > SWIPE) go(-1);
            }}
          >
            <img src={item.src} alt={item.caption} draggable="false" />
            <figcaption>
              <span>{t(item.caption)}</span>
              <small>{index + 1} / {items.length}</small>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const { t } = useLang();
  const [cat, setCat] = useState(galleryCategories[0]);
  const [openAt, setOpenAt] = useState(null);

  const items = useMemo(() => (cat === galleryCategories[0] ? galleryData : galleryData.filter((g) => g.category === cat)), [cat]);
  const closeBox = useCallback(() => setOpenAt(null), []);

  return (
    <section id="gallery" className="section gallery" aria-labelledby="gallery-title">
      <div className="container">
        <SectionHeading eyebrow={galleryHeading.eyebrow} title={galleryHeading.heading} headingId="gallery-title" />

        <div className="gallery__tabs" role="group" aria-label="Filter photos by category">
          {galleryCategories.map((c) => (
            <button key={c} className={`gallery__tab ${c === cat ? "is-active" : ""}`} aria-pressed={c === cat} onClick={() => setCat(c)}>
              {t(c)}
            </button>
          ))}
        </div>

        <div className="gallery__grid" key={cat} aria-live="polite">
          {items.map((g, i) => (
            <motion.button
              key={g.id}
              className="gallery__tile"
              style={{ aspectRatio: g.ratio }}
              initial={{ opacity: 0, y: 36, clipPath: "inset(14% 0% 0% 0%)" }}
              animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 0.9, delay: Math.min(i, 8) * 0.07, ease: EASE }}
              onClick={() => setOpenAt(i)}
              aria-label={`Open photo: ${g.caption}`}
            >
              <img src={g.thumb || g.src} alt={g.caption} loading="lazy" decoding="async" />
              <span className="gallery__cap">{t(g.caption)}</span>
            </motion.button>
          ))}
        </div>
        {items.length === 0 && <p className="lead gallery__empty">{t("Photos for this category are coming soon.")}</p>}
      </div>

      <AnimatePresence>
        {openAt !== null && items[openAt] && <Lightbox items={items} index={openAt} onClose={closeBox} onGo={setOpenAt} />}
      </AnimatePresence>
    </section>
  );
}
