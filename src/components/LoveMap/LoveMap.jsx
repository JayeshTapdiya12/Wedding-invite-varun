import { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { v9Data } from "../../data/v9Data";
import { useLang } from "../../i18n/LangContext";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import "./LoveMap.css";

// A hand-drawn route through four places. The line draws itself, a heart travels along it and each pin
// pops up as the heart reaches it. Not a GPS map: positions are set in v9Data.loveMap.
const W = 400, H = 620;

// smooth curve through the stops (Catmull-Rom converted to Bezier)
function smoothPath(pts) {
  if (pts.length < 2) return "";
  let d = `M${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += ` C${c1.x.toFixed(1)} ${c1.y.toFixed(1)}, ${c2.x.toFixed(1)} ${c2.y.toFixed(1)}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export default function LoveMap() {
  const m = v9Data.loveMap;
  const { t } = useLang();
  const stops = m.stops;
  const d = useMemo(() => smoothPath(stops), [stops]);
  const wrap = useRef(null);
  const pathRef = useRef(null);
  const heartRef = useRef(null);
  const inView = useInView(wrap, { once: true, margin: "-20% 0px" });
  const [reached, setReached] = useState(0); // how many pins are showing
  const [active, setActive] = useState(0);
  const fractions = useRef([]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const L = path.getTotalLength();
    path.style.strokeDasharray = `${L}`;
    // where along the line each stop sits
    const samples = 240;
    fractions.current = stops.map((s) => {
      let best = 0, bd = Infinity;
      for (let i = 0; i <= samples; i++) {
        const p = path.getPointAtLength((L * i) / samples);
        const dd = (p.x - s.x) ** 2 + (p.y - s.y) ** 2;
        if (dd < bd) { bd = dd; best = i / samples; }
      }
      return best;
    });
    const set = (p) => {
      path.style.strokeDashoffset = `${L * (1 - p)}`;
      const pt = path.getPointAtLength(L * p);
      heartRef.current?.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
      const n = fractions.current.filter((f) => p >= f - 0.001).length;
      setReached((prev) => (prev === n ? prev : n));
    };
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!inView && !reduce) { set(0); return; }
    if (reduce) { set(1); return; }
    const c = animate(0, 1, { duration: 5.5, ease: [0.45, 0, 0.3, 1], onUpdate: set });
    return () => c.stop();
  }, [inView, stops]);

  return (
    <section id="love-map" className="section lmap" aria-labelledby="lmap-title">
      <div className="container">
        <SectionHeading eyebrow={m.eyebrow} title={m.heading} lead={m.lead} headingId="lmap-title" />
        <div className="lmap__grid" ref={wrap}>
          <Reveal className="lmap__canvas" y={20} aria-hidden="true">
            <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={t(m.heading)}>
              <defs>
                <pattern id="lmap-dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="#D6B779" opacity=".55" /></pattern>
              </defs>
              <rect x="0" y="0" width={W} height={H} rx="22" fill="url(#lmap-dots)" />
              <path d={d} fill="none" stroke="#D6B779" strokeOpacity=".35" strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" />
              <path ref={pathRef} d={d} fill="none" stroke="#B98279" strokeWidth="4" strokeLinecap="round" />
              {stops.map((s, i) => (
                <g key={s.title} className={`lmap__pin ${i < reached ? "is-on" : ""} ${active === i ? "is-active" : ""}`} transform={`translate(${s.x} ${s.y})`} onClick={() => setActive(i)} style={{ cursor: "pointer" }}>
                  <circle r="26" fill="#FFFDF9" stroke="#D6B779" strokeWidth="2" />
                  <text textAnchor="middle" y="9" fontSize="26">{s.emoji}</text>
                  <text className="lmap__num" textAnchor="middle" y="-34" fontSize="13" fontWeight="700" fill="#876629">{i + 1}</text>
                </g>
              ))}
              <g ref={heartRef} transform={`translate(${stops[0].x} ${stops[0].y})`}>
                <text textAnchor="middle" y="6" fontSize="20" className="lmap__heart">💗</text>
              </g>
            </svg>
          </Reveal>

          <ol className="lmap__list">
            {stops.map((s, i) => (
              <motion.li key={s.title} className={`lmap__stop ${active === i ? "is-active" : ""}`}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                onViewportEnter={() => setActive(i)}>
                {s.photo && <img src={s.photo.replace("/photos/", "/photos/thumb/")} alt="" loading="lazy" />}
                <div>
                  <small>{String(i + 1).padStart(2, "0")} · {s.emoji}</small>
                  <h3>{t(s.title)}</h3>
                  <p>{t(s.text)}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
