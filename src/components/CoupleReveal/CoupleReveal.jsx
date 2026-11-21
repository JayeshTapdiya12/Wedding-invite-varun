import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { weddingData as d } from "../../data/weddingData";
import { extrasData } from "../../data/extrasData";
import { useLang } from "../../i18n/LangContext";
import "./CoupleReveal.css";

function Portrait({ src, alt, caption, style, side }) {
  const { t } = useLang();
  return (
    <motion.figure className={`cr__fig cr__fig--${side}`} style={style}>
      <div className="cr__photo">
        <img src={src} alt={alt} loading="lazy" decoding="async" onError={(e) => { e.currentTarget.style.display = "none"; }} />
      </div>
      <figcaption>{t(caption)}</figcaption>
    </motion.figure>
  );
}

// Scroll-driven: the page holds still while the groom's and bride's portraits glide together,
// then the names and the line appear between them. With reduced-motion it is a plain static layout.
export default function CoupleReveal() {
  const c = extrasData.couple;
  const { t, lang } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const wide = typeof window !== "undefined" && window.innerWidth < 700 ? 24 : 34; // how far apart they start (vw)
  const gx = useTransform(p, [0, 0.55], [`-${wide}vw`, "0vw"]);
  const bx = useTransform(p, [0, 0.55], [`${wide}vw`, "0vw"]);
  const gr = useTransform(p, [0, 0.55], [-7, -3]);
  const br = useTransform(p, [0, 0.55], [7, 3]);
  const textO = useTransform(p, [0.5, 0.72], [0, 1]);
  const textY = useTransform(p, [0.5, 0.72], [30, 0]);
  const introO = useTransform(p, [0, 0.2], [1, 0]);

  const groom = lang === "hi" && d.groom.hindiName ? d.groom.hindiName : d.groom.firstName;
  const bride = lang === "hi" && d.bride.hindiName ? d.bride.hindiName : d.bride.firstName;
  const still = reduce;

  return (
    <section id="couple" ref={ref} className={`cr ${still ? "is-static" : ""}`} aria-labelledby="cr-title">
      <div className="cr__stage">
        <motion.p className="eyebrow cr__eyebrow" style={still ? undefined : { opacity: introO }}>{t(c.eyebrow)}</motion.p>

        <div className="cr__row">
          <Portrait side="l" src={c.groomPhoto} alt={`${d.groom.fullName}`} caption={c.groomCaption} style={still ? undefined : { x: gx, rotate: gr }} />
          <Portrait side="r" src={c.bridePhoto} alt={`${d.bride.fullName}`} caption={c.brideCaption} style={still ? undefined : { x: bx, rotate: br }} />
        </div>

        <motion.div className="cr__text" style={still ? undefined : { opacity: textO, y: textY }}>
          <h2 id="cr-title" className="cr__names">{groom} <span>&amp;</span> {bride}</h2>
          <p className="lead">{t(c.line)}</p>
        </motion.div>
      </div>
    </section>
  );
}
