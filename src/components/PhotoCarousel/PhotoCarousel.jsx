import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "../../i18n/LangContext";
import "./PhotoCarousel.css";

// A 3D "coverflow" photo carousel: the centre photo is large and sharp, the others tilt away behind it.
// Drag or swipe, use the arrows or the keyboard, click a side photo to bring it forward. It plays by itself
// while on screen (never with reduced motion) and pauses when touched or hovered.
//   items: [{ id, src, thumb, caption }]
export default function PhotoCarousel({ items, onOpen, label = "Photo carousel", autoplay = true }) {
  const { t } = useLang();
  const n = items.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const root = useRef(null);
  const drag = useRef(null);
  const moved = useRef(false);

  const go = useCallback((step) => setI((v) => (v + step + n) % n), [n]);

  useEffect(() => setI(0), [items]);

  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!autoplay || reduce || paused || !inView || n < 2) return;
    const id = setInterval(() => go(1), 3800);
    return () => clearInterval(id);
  }, [autoplay, paused, inView, n, go]);

  const down = (e) => { drag.current = e.clientX; moved.current = false; setPaused(true); };
  const up = (e) => {
    if (drag.current === null) return;
    const dx = e.clientX - drag.current;
    drag.current = null;
    if (Math.abs(dx) > 45) { moved.current = true; go(dx < 0 ? 1 : -1); }
    setTimeout(() => setPaused(false), 2500);
  };
  const key = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  };

  if (!n) return null;
  const half = n / 2;

  return (
    <div
      ref={root}
      className="pc"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={key}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="pc__stage" onPointerDown={down} onPointerUp={up} onPointerCancel={up}>
        {items.map((it, k) => {
          let off = k - i;
          if (off > half) off -= n;
          if (off < -half) off += n;
          const abs = Math.abs(off);
          const active = off === 0;
          return (
            <figure
              key={it.id ?? it.src}
              className={`pc__slide ${active ? "is-active" : ""}`}
              style={{ "--off": off, "--abs": Math.min(abs, 3), zIndex: 10 - abs, visibility: abs > 3 ? "hidden" : "visible" }}
              aria-hidden={active ? undefined : true}
              aria-roledescription="slide"
              aria-label={`${k + 1} / ${n}`}
              onClick={() => { if (moved.current) return; if (active) onOpen?.(k); else setI(k); }}
            >
              <img
                src={it.thumb || it.src}
                srcSet={it.thumb ? `${it.thumb} 900w, ${it.src} 2200w` : undefined}
                sizes="(max-width: 700px) 72vw, 380px"
                alt={active ? t(it.caption) : ""}
                loading={abs <= 1 ? "eager" : "lazy"}
                decoding="async"
                draggable="false"
              />
              <span className="pc__corner pc__corner--tl" aria-hidden="true" />
              <span className="pc__corner pc__corner--br" aria-hidden="true" />
              <figcaption><i>{String(k + 1).padStart(2, "0")}</i> {t(it.caption)}</figcaption>
            </figure>
          );
        })}
      </div>

      <button type="button" className="pc__btn pc__btn--prev" onClick={() => go(-1)} aria-label={t("Previous photo")}><ChevronLeft size={24} strokeWidth={1.4} /></button>
      <button type="button" className="pc__btn pc__btn--next" onClick={() => go(1)} aria-label={t("Next photo")}><ChevronRight size={24} strokeWidth={1.4} /></button>

      <div className="pc__dots" role="tablist" aria-label={t("Choose a photo")}>
        {items.slice(0, 24).map((it, k) => (
          <button key={it.id ?? it.src} type="button" role="tab" aria-selected={k === i} aria-label={`${k + 1}`} className={k === i ? "on" : ""} onClick={() => setI(k)} />
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{t(items[i].caption)}</p>
    </div>
  );
}
