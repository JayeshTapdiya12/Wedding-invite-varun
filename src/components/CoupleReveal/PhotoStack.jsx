import { useRef } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { extrasData } from "../../data/extrasData";
import { useLang } from "../../i18n/LangContext";
import "./PhotoStack.css";

function Slide({ photo, i, n, p }) {
  const a = i / n, b = (i + 1) / n;
  // each photo fades in over the first part of its slice and out at the end (the last stays)
  const opacity = useTransform(p, i === 0 ? [0, 1] : [a - 0.06, a], i === 0 ? [1, 1] : [0, 1]);
  const scale = useTransform(p, [a, b], [1.12, 1]);
  return (
    <motion.img className="ps__img" src={photo.src} alt={photo.caption} loading="lazy" decoding="async" style={{ opacity, scale }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
  );
}

// A pinned scroll scene: the page holds while photos replace each other with a slow zoom.
export default function PhotoStack() {
  const s = extrasData.stack;
  const n = s.photos.length;
  const { t } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [idx, setIdx] = useState(0);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(p, "change", (v) => setIdx(Math.min(n - 1, Math.floor(v * n))));
  const bar = useTransform(p, [0, 1], ["0%", "100%"]);

  if (reduce) {
    return (
      <section className="ps ps--static" aria-label={t(s.eyebrow)}>
        <div className="container ps__grid">
          {s.photos.map((ph) => (
            <figure key={ph.src}><img src={ph.src} alt={ph.caption} loading="lazy" /><figcaption>{t(ph.caption)}</figcaption></figure>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="ps" style={{ height: `${n * 90}vh` }} aria-label={t(s.eyebrow)}>
      <div className="ps__stage">
        {s.photos.map((ph, i) => <Slide key={ph.src} photo={ph} i={i} n={n} p={p} />)}
        <div className="ps__shade" aria-hidden="true" />
        <div className="ps__cap" aria-live="polite">
          <p className="eyebrow">{t(s.eyebrow)}</p>
          <motion.p key={idx} className="ps__line" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>{t(s.photos[idx].caption)}</motion.p>
          <span className="ps__count">{String(idx + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
        </div>
        <motion.i className="ps__bar" style={{ width: bar }} aria-hidden="true" />
      </div>
    </section>
  );
}
