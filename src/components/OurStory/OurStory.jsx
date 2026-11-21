import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { weddingData as d } from "../../data/weddingData";
import { useLang } from "../../i18n/LangContext";
import VoiceNote from "../VoiceNote/VoiceNote";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import { FloralSprig } from "../common/Ornaments";
import "./OurStory.css";

const EASE = [0.22, 1, 0.36, 1];

// Image that drifts slightly slower than the page.
function ParallaxImage({ src, alt, className }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  return (
    <div ref={ref} className={`story__media ${className || ""}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={reduce ? undefined : { y, scale: 1.18 }}
      />
    </div>
  );
}

function Chapter({ ch, index }) {
  const { t } = useLang();
  const n = String(index + 1).padStart(2, "0");
  const wide = ch.layout === "wide";
  return (
    <article className={`chapter chapter--${ch.layout}`} aria-labelledby={`ch-${ch.id}`}>
      <ParallaxImage src={ch.image} alt={`${ch.title} – a moment from our story`} className="chapter__img" />
      <Reveal className="chapter__text" x={wide ? 0 : ch.layout === "split-left" ? 40 : -40} y={wide ? 40 : 10}>
        <span className="chapter__num" aria-hidden="true">{n}</span>
        <p className="eyebrow">{t(ch.kicker)}</p>
        <h3 className="chapter__title" id={`ch-${ch.id}`}>{t(ch.title)}</h3>
        <motion.span
          className="chapter__line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.3, delay: 0.3, ease: EASE }}
          aria-hidden="true"
        />
        <p className="chapter__copy">{t(ch.text)}</p>
      </Reveal>
    </article>
  );
}

export default function OurStory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  const { story } = d;

  return (
    <section id="story" ref={ref} className="section story" aria-labelledby="story-title">
      <FloralSprig className="story__sprig story__sprig--tl" />
      <FloralSprig className="story__sprig story__sprig--br" />

      <div className="container">
        <SectionHeading
          eyebrow={story.eyebrow}
          title={story.heading}
          headingId="story-title"
          lead="Every love story is beautiful, but ours is our favourite."
        />
        <VoiceNote />
      </div>

      <div className="story__chapters">
        <motion.span className="story__spine" style={{ scaleY: line }} aria-hidden="true" />
        {story.chapters.map((ch, i) => (
          <Chapter key={ch.id} ch={ch} index={i} />
        ))}
      </div>
    </section>
  );
}
