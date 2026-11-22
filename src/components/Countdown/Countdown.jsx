import { useRef } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Heart } from "lucide-react";
import { useCountdown } from "../../hooks/useCountdown";
import { weddingData as d } from "../../data/weddingData";
import { useLang } from "../../i18n/LangContext";
import SplitText from "../common/SplitText";
import Reveal from "../common/Reveal";
import Particles from "../common/Particles";
import { Mandala } from "../common/Ornaments";
import "./Countdown.css";

const pad = (n) => String(n).padStart(2, "0");
const R = 46; // ring radius in the 100x100 viewBox
const C = 2 * Math.PI * R;

// One unit: a glowing ring that fills as the unit counts, with the number sliding in the middle.
function Ring({ label, value, max, i }) {
  const { t } = useLang();
  const frac = Math.min(1, Math.max(0, value / max));
  return (
    <Reveal className="ring" delay={0.12 * i} y={40}>
      <div className="ring__dial">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle className="ring__track" cx="50" cy="50" r={R} />
          <circle className="ring__bar" cx="50" cy="50" r={R} style={{ strokeDasharray: C, strokeDashoffset: C * (1 - frac) }} />
          <circle className="ring__orbit" cx="50" cy="50" r={R} />
        </svg>
        <span className="ring__num" aria-hidden="true">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={value} initial={{ y: "70%", opacity: 0, filter: "blur(4px)" }} animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }} exit={{ y: "-70%", opacity: 0, filter: "blur(4px)" }} transition={{ duration: 0.35, ease: "easeOut" }}>
              {pad(value)}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>
      <span className="ring__label">{t(label)}</span>
    </Reveal>
  );
}

// Right under the hero. Photo drifts with the scroll, mandalas turn, sparks float and the heart beats.
export default function Countdown() {
  const time = useCountdown(d.weddingDateISO);
  const { t } = useLang();
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(p, [0, 1], ["-8%", "8%"]);

  return (
    <section id="countdown" ref={ref} className="countdown on-dark" aria-labelledby="countdown-title">
      <motion.div className="countdown__bg" style={reduce ? undefined : { y: bgY }} aria-hidden="true" />
      <div className="countdown__veil" aria-hidden="true" />
      <Mandala className="countdown__mandala countdown__mandala--a" />
      <Mandala className="countdown__mandala countdown__mandala--b" />
      <Particles petals={6} dust={34} />

      <div className="container countdown__in">
        <motion.img className="countdown__logo" src="/logo.png" alt={`${d.groom.firstName} & ${d.bride.firstName} wedding logo, ${d.hashtag}`} width="900" height="652" initial={{ opacity: 0, scale: 0.8, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }} />
        <Reveal as="p" className="eyebrow" y={16}>{t("Every Second Counts")}</Reveal>
        <h2 className="h2 countdown__title" id="countdown-title"><SplitText key={t("The Countdown to Forever")} text={t("The Countdown to Forever")} stagger={0.03} /></h2>

        {time.done ? (
          <Reveal className="countdown__done">
            <motion.p className="countdown__done-title" animate={reduce ? undefined : { scale: [1, 1.04, 1] }} transition={{ duration: 3, repeat: Infinity }}>
              {t("And so, our forever begins.")}
            </motion.p>
            <p className="lead">{t("The day has arrived. Thank you for being part of it.")}</p>
          </Reveal>
        ) : (
          <div className="rings" role="timer" aria-label={`${time.days} days, ${time.hours} hours and ${time.minutes} minutes to go`}>
            <Ring label="Days" value={time.days} max={Math.max(60, time.days)} i={0} />
            <Ring label="Hours" value={time.hours} max={24} i={1} />
            <Ring label="Minutes" value={time.minutes} max={60} i={2} />
            <Ring label="Seconds" value={time.seconds} max={60} i={3} />
          </div>
        )}

        <Reveal className="countdown__foot" delay={0.3}>
          <span className="countdown__beat" aria-hidden="true"><Heart size={18} strokeWidth={1.5} /></span>
          <p>{t("Counting down to Panigrahan")} · {t("14th December 2026")} · 5:30 PM</p>
          <p className="countdown__place">The Exotica · {t(d.city)}</p>
        </Reveal>
      </div>
    </section>
  );
}
