import { useEffect, useRef, useState } from "react";
import { v9Data } from "../../data/v9Data";
import { useLang } from "../../i18n/LangContext";
import "./Teaser.css";

// A short muted looping clip. Hidden until v9Data.teaser.src is set. Plays only while on screen, and never for
// people who asked their device for reduced motion or who have Data Saver on.
export default function Teaser() {
  const x = v9Data.teaser;
  const { t } = useLang();
  const ref = useRef(null);
  const [skip] = useState(() => {
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches || navigator.connection?.saveData === true;
    } catch { return false; }
  });

  useEffect(() => {
    const v = ref.current;
    if (!v || skip) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.35 });
    io.observe(v);
    return () => io.disconnect();
  }, [skip]);

  if (!x.src) return null;
  return (
    <section className="teaser" aria-label={t(x.eyebrow)}>
      <video ref={ref} className="teaser__video" src={x.src} poster={x.poster} muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1} />
      <div className="teaser__bar"><span>{t(x.eyebrow)}</span><em>{t(x.caption)}</em></div>
    </section>
  );
}
