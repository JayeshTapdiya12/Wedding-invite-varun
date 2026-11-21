import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { weddingData as d } from "../../data/weddingData";
import { getMusicOn, stopMusic } from "../../lib/sound";
import { useLang } from "../../i18n/LangContext";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import "./VideoSection.css";

const EASE = [0.22, 1, 0.36, 1];

// The player needs a real source; otherwise show a polite message instead of a broken frame.
const hasSource = (v) =>
  (v.type === "youtube" && v.youtubeId) || (v.type === "vimeo" && v.vimeoId) || (v.type === "file" && v.src);

function Player({ video }) {
  const { t } = useLang();
  const [failed, setFailed] = useState(false);

  if (!hasSource(video) || failed) {
    return (
      <div className="vplayer__msg">
        <p className="eyebrow">{t("Coming soon")}</p>
        <p>{t("This film is being edited and will be added here shortly.")}</p>
      </div>
    );
  }
  if (video.type === "youtube") {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
        title={video.title}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
    );
  }
  if (video.type === "vimeo") {
    return (
      <iframe
        src={`https://player.vimeo.com/video/${video.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
        title={video.title}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    );
  }
  return <video src={video.src} poster={video.poster} controls autoPlay playsInline onError={() => setFailed(true)} />;
}

export default function VideoSection() {
  const { t } = useLang();
  const { videoSection: copy, videos } = d;
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);
  const openerRef = useRef(null);
  const video = videos[active];

  // open on a user tap only (never autoplays); pause the background music so the film's sound is heard
  const openPlayer = (e) => {
    openerRef.current = e?.currentTarget ?? null;
    if (getMusicOn()) stopMusic();
    setOpen(true);
  };
  const closePlayer = () => {
    setOpen(false);
    openerRef.current?.focus?.();
  };

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && closePlayer();
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section id="films" className="section films on-dark" aria-labelledby="films-title">
      <div className="container">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.heading} headingId="films-title" />

        <Reveal y={50} duration={1.2}>
          <button className="films__stage" onClick={openPlayer} aria-label={`Play ${video.title}`}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={video.id}
                src={video.poster}
                alt=""
                className="films__poster"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
                loading="lazy"
              />
            </AnimatePresence>
            <span className="films__shade" aria-hidden="true" />
            <span className="films__corner films__corner--tl" aria-hidden="true" />
            <span className="films__corner films__corner--br" aria-hidden="true" />
            <span className="films__play" aria-hidden="true">
              <i />
              <Play size={30} strokeWidth={1.4} fill="currentColor" />
            </span>
            <span className="films__meta">
              <small>{t(video.kind)}</small>
              <strong>{t(video.title)}</strong>
            </span>
          </button>
        </Reveal>

        {videos.length > 1 && (
          <Reveal delay={0.2} className="films__list">
            {videos.map((v, i) => (
              <button key={v.id} className={`films__thumb ${i === active ? "is-active" : ""}`} onClick={() => setActive(i)} aria-pressed={i === active}>
                <img src={v.poster} alt="" loading="lazy" />
                <span>
                  <small>0{i + 1}</small>
                  {t(v.title)}
                </span>
              </button>
            ))}
          </Reveal>
        )}

        <Reveal as="p" className="lead films__caption" delay={0.2}>
          “{t(copy.caption)}”
        </Reveal>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="vplayer"
            role="dialog"
            aria-modal="true"
            aria-label={video.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={closePlayer}
          >
            <motion.div
              className="vplayer__frame"
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 20, opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <Player key={video.id} video={video} />
            </motion.div>
            <p className="vplayer__title">{t(video.title)}</p>
            <button ref={closeRef} className="vplayer__close" onClick={closePlayer} aria-label="Close video">
              <X size={26} strokeWidth={1.4} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
