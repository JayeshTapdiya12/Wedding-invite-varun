import { useEffect, useRef, useState } from "react";
import { burst } from "../../lib/confetti";
import { sfxMessage } from "../../lib/sound";
import { extrasData } from "../../data/extrasData";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Camera, MapPin } from "lucide-react";
import { useCountdown } from "../../hooks/useCountdown";
import { usePhase } from "../../hooks/usePhase";
import { weddingData as d } from "../../data/weddingData";
import { currentGuest } from "../../lib/guest";
import { useLang } from "../../i18n/LangContext";
import SplitText from "../common/SplitText";
import Particles from "../common/Particles";
import { FloralSprig } from "../common/Ornaments";
import CountUnits from "../Countdown/CountUnits";
import "./Hero.css";

const EASE = [0.22, 1, 0.36, 1];

// `ready` flips to true when the opening intro lets go, so the entrance plays when guests can actually see it.
export default function Hero({ ready }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { t, lang } = useLang();
  const phase = usePhase();
  const guest = currentGuest();
  const time = useCountdown(d.weddingDateISO);

  // Photo side: a slow cross-fading slideshow. Nothing is written on the photos.
  const photos = d.heroPhotos?.length ? d.heroPhotos : [{ src: d.heroImage, pos: "50% 40%", alt: "" }];
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    if (!ready || reduce || photos.length < 2) return;
    const id = setInterval(() => setSlide((i) => (i + 1) % photos.length), 5600);
    return () => clearInterval(id);
  }, [ready, reduce, photos.length]);

  const groom = lang === "hi" && d.groom.hindiName ? d.groom.hindiName : d.groom.firstName;
  const bride = lang === "hi" && d.bride.hindiName ? d.bride.hindiName : d.bride.firstName;
  const guestName = lang === "hi" && guest?.nameHi ? guest.nameHi : guest?.name;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  // hidden surprise: tap the names 5 times within a few seconds
  const taps = useRef({ n: 0, t: 0 });
  const onNames = () => {
    const now = Date.now();
    taps.current = now - taps.current.t > 2500 ? { n: 1, t: now } : { n: taps.current.n + 1, t: now };
    if (taps.current.n >= 5) {
      taps.current = { n: 0, t: 0 };
      try { sfxMessage("sent"); } catch { /* sound is optional */ }
      burst(t(extrasData.easterEgg.message));
    }
  };

  const rise = (delay) => ({
    initial: { opacity: 0, y: 26 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 },
    transition: { duration: 1.1, delay, ease: EASE },
  });

  return (
    <section id="home" ref={ref} className={`hero ${ready ? "is-ready" : ""}`} aria-label="Welcome">
      <motion.div
        className="hero__photo"
        initial={{ clipPath: "inset(10% 10% 10% 10%)", opacity: 0 }}
        animate={ready ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 } : { clipPath: "inset(10% 10% 10% 10%)", opacity: 0 }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <motion.div className="hero__slides" style={{ y: reduce ? 0 : bgY }}>
          {photos.map((p, i) => (
            <img
              key={p.src}
              className={`hero__slide ${i === slide ? "on" : ""}`}
              src={p.src}
              alt={i === slide ? p.alt : ""}
              aria-hidden={i === slide ? undefined : true}
              style={{ objectPosition: p.pos }}
              {...(i === 0 ? { fetchpriority: "high" } : {})}
              decoding="async"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          ))}
        </motion.div>
        <div className="hero__navshade" aria-hidden="true" />
        {photos.length > 1 && (
          <div className="hero__dots" aria-hidden="true">
            {photos.map((p, i) => <i key={p.src} className={i === slide ? "on" : ""} />)}
          </div>
        )}
      </motion.div>

      <div className="hero__panel">
        <FloralSprig className="hero__sprig hero__sprig--tl" />
        <FloralSprig className="hero__sprig hero__sprig--br" />
        <Particles petals={8} dust={22} />
      <motion.div className="hero__content" style={reduce ? undefined : { y: contentY, opacity: fade }}>
        {guestName && <motion.p className="hero__guest" {...rise(0.05)}>{t("Dear")} {guestName},</motion.p>}
        <motion.p className="hero__bless" {...rise(0.1)}>{d.blessingQuote}</motion.p>
        <motion.p className="hero__invite" {...rise(0.25)}>{t(d.inviteMessage)}</motion.p>

        <h1 className="hero__names" onClick={onNames}>
          <span className="sr-only">{groom} {lang === "hi" ? "और" : "and"} {bride}</span>
          <span aria-hidden="true" className="hero__name">
            <SplitText key={`g-${groom}`} text={groom} active={ready} delay={0.35} stagger={0.06} />
          </span>
          <motion.span
            aria-hidden="true"
            className="hero__amp"
            initial={{ opacity: 0, scale: 0.4, rotate: -12 }}
            animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.4, rotate: -12 }}
            transition={{ duration: 1.2, delay: 0.9, ease: EASE }}
          >
            &amp;
          </motion.span>
          <span aria-hidden="true" className="hero__name">
            <SplitText key={`b-${bride}`} text={bride} active={ready} delay={0.7} stagger={0.06} />
          </span>
        </h1>

        <motion.div className="hero__rule" initial={{ scaleX: 0 }} animate={ready ? { scaleX: 1 } : { scaleX: 0 }} transition={{ duration: 1.4, delay: 1.5, ease: EASE }} aria-hidden="true" />

        <motion.p className="hero__date" {...rise(1.6)}>{t(d.dateRange)}</motion.p>
        <motion.p className="hero__place" {...rise(1.75)}>
          <MapPin size={15} strokeWidth={1.6} aria-hidden="true" /> {t(d.city)}
        </motion.p>

        <motion.div className="hero__count" {...rise(1.95)}>
          {phase === "after" ? (
            <div className="hero__after">
              <p className="hero__thanks">{t(d.phase.afterTitle)}</p>
              <p>{t(d.phase.afterText)}</p>
              {d.album.url && (
                <a className="btn btn--light" href={d.album.url} target="_blank" rel="noopener noreferrer">
                  <Camera size={16} strokeWidth={1.6} aria-hidden="true" /> {t(d.album.button)}
                </a>
              )}
            </div>
          ) : time.done ? (
            <p className="hero__today">{t("Today is the day.")}</p>
          ) : (
            <CountUnits time={time} className="cu--hero" />
          )}
        </motion.div>
      </motion.div>

      <motion.a
        href="#couple"
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2.6, duration: 1 }}
        aria-label="Scroll down"
      >
        <span>{t("Scroll")}</span>
        <i aria-hidden="true" />
      </motion.a>
      </div>
    </section>
  );
}
