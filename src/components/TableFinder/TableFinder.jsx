import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { v9Data } from "../../data/v9Data";
import { usePhase } from "../../hooks/usePhase";
import { useLang } from "../../i18n/LangContext";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import "./TableFinder.css";

const norm = (s) => String(s).toLowerCase().normalize("NFKD").replace(/[^\p{L}\p{N}\s]/gu, "").replace(/\s+/g, " ").trim();

// Guests type a name and see table + room. Shows on the wedding days (showFrom: "during") or always ("before").
export default function TableFinder() {
  const s = v9Data.seating;
  const phase = usePhase();
  const { t } = useLang();
  const [q, setQ] = useState("");
  const rows = useMemo(() => s.guests.filter((g) => g.name && (g.table || g.room)), [s.guests]);
  const nq = norm(q);
  const hits = useMemo(() => (nq.length < 2 ? [] : rows.filter((g) => norm(g.name).includes(nq)).slice(0, 8)), [nq, rows]);

  if (!s.enabled || !rows.length) return null;
  if (s.showFrom === "during" && phase !== "during") return null;

  return (
    <section id="find" className="section finder" aria-labelledby="finder-title">
      <div className="container">
        <SectionHeading eyebrow={s.eyebrow} title={s.heading} lead={s.lead} headingId="finder-title" />
        <Reveal className="finder__box">
          <div className="field">
            <label htmlFor="finder-q">{t(s.placeholder)}</label>
            <div className="finder__input">
              <Search size={18} strokeWidth={1.6} aria-hidden="true" />
              <input id="finder-q" type="search" autoComplete="off" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t(s.placeholder)} />
            </div>
          </div>
          <div className="finder__out" aria-live="polite">
            {hits.map((g) => (
              <div key={g.name} className="finder__hit">
                <h3>{g.name}</h3>
                <p>{[g.table && t(g.table), g.room && t(g.room)].filter(Boolean).join("  ·  ")}</p>
                {g.note && <small>{t(g.note)}</small>}
              </div>
            ))}
            {nq.length >= 2 && !hits.length && <p className="finder__none">{t(s.empty)}</p>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
