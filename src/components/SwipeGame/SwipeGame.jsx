import { useMemo, useRef, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { Heart, RotateCcw, X } from "lucide-react";
import { galleryData } from "../../data/galleryData";
import { v9Data } from "../../data/v9Data";
import { useLang } from "../../i18n/LangContext";
import { burst } from "../../lib/confetti";
import { sfxTap } from "../../lib/sound";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import "./SwipeGame.css";

// "Swipe right on us": a card stack of our photos. Swiping left is a trick: it still becomes a heart.
function TopCard({ photo, onDecide, busy, flingRef }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 0, 220], [-14, 0, 14]);
  const likeO = useTransform(x, [20, 120], [0, 1]);
  const nopeO = useTransform(x, [-120, -20], [1, 0]);
  const { t } = useLang();

  const fling = (dir) => {
    if (busy.current) return;
    busy.current = true;
    animate(x, dir * 700, { duration: 0.38, ease: "easeIn", onComplete: () => onDecide(dir) });
  };
  flingRef.current = fling;

  return (
    <motion.div
      className="sw__card sw__card--top"
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      dragSnapToOrigin
      onDragEnd={(_, i) => { if (Math.abs(i.offset.x) > 110 || Math.abs(i.velocity.x) > 600) fling(i.offset.x >= 0 ? 1 : -1); }}
    >
      <img src={photo.src.replace("/photos/", "/photos/thumb/")} alt={t(photo.caption)} draggable="false" />
      <motion.span className="sw__badge sw__badge--yes" style={{ opacity: likeO }}>{t("LOVE")}</motion.span>
      <motion.span className="sw__badge sw__badge--no" style={{ opacity: nopeO }}>{t("NOPE")}</motion.span>
      <p className="sw__cap">{t(photo.caption)}</p>
    </motion.div>
  );
}

export default function SwipeGame() {
  const g = v9Data.swipe;
  const { t } = useLang();
  const photos = useMemo(() => galleryData.slice(0, g.count), [g.count]);
  const [i, setI] = useState(0);
  const [hearts, setHearts] = useState(0);
  const [reply, setReply] = useState("");
  const busy = useRef(false);
  const flingRef = useRef(null);
  const done = i >= photos.length;
  const timer = useRef(0);

  const decide = (dir) => {
    sfxTap();
    setHearts((h) => h + 1); // left or right, every photo gets a heart
    if (dir < 0) {
      setReply(g.leftReply);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setReply(""), 1800);
    }
    busy.current = false;
    setI((n) => {
      const nn = n + 1;
      if (nn >= photos.length) setTimeout(() => burst(), 250);
      return nn;
    });
  };
  const restart = () => { setI(0); setHearts(0); setReply(""); };

  return (
    <section id="swipe" className="section swipe on-dark" aria-labelledby="swipe-title">
      <div className="container">
        <SectionHeading eyebrow={g.eyebrow} title={g.heading} lead={g.lead} headingId="swipe-title" />
        <Reveal className="sw" delay={0.2}>
          {!done ? (
            <>
              <div className="sw__stack">
                {photos.slice(i, i + 3).reverse().map((p, k, arr) => {
                  const depth = arr.length - 1 - k;
                  return depth === 0 ? (
                    <TopCard key={p.id} photo={p} onDecide={decide} busy={busy} flingRef={flingRef} />
                  ) : (
                    <div key={p.id} className="sw__card" style={{ transform: `translateY(${depth * 12}px) scale(${1 - depth * 0.05})`, opacity: 1 - depth * 0.25 }} aria-hidden="true">
                      <img src={p.thumb} alt="" draggable="false" />
                    </div>
                  );
                })}
              </div>
              <p className="sw__reply" role="status" aria-live="polite">{reply ? t(reply) : " "}</p>
              <div className="sw__actions">
                <button type="button" className="sw__btn sw__btn--no" onClick={() => flingRef.current?.(-1)} aria-label={t("Swipe left")}><X size={26} strokeWidth={1.8} /></button>
                <span className="sw__count">{i + 1} / {photos.length}</span>
                <button type="button" className="sw__btn sw__btn--yes" onClick={() => flingRef.current?.(1)} aria-label={t("Swipe right")}><Heart size={26} strokeWidth={1.8} fill="currentColor" /></button>
              </div>
            </>
          ) : (
            <div className="sw__end">
              <Heart size={54} strokeWidth={1.2} fill="currentColor" aria-hidden="true" />
              <p className="sw__score">{hearts} / {photos.length}</p>
              <p>{t(g.finish)}</p>
              <button type="button" className="btn btn--light" onClick={restart}><RotateCcw size={16} strokeWidth={1.6} aria-hidden="true" /> {t("Play again")}</button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
