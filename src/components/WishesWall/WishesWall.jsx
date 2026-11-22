import { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import { weddingData as d } from "../../data/weddingData";
import { fetchWishes } from "../../lib/rsvpApi";
import { useLang } from "../../i18n/LangContext";
import Reveal from "../common/Reveal";
import "./WishesWall.css";

// A wall of blessings left by guests. Off until `wishesWall.enabled` and `readUrl` are set (see README).
// Wishes are shown as plain text only, and you decide which rows the readUrl exposes.
export default function WishesWall() {
  const cfg = d.wishesWall;
  const { t } = useLang();
  const on = cfg?.enabled && cfg.readUrl;
  const [state, setState] = useState({ status: "loading", items: [] });

  useEffect(() => {
    if (!on) return;
    let alive = true;
    fetchWishes()
      .then((items) => alive && setState({ status: "ok", items }))
      .catch(() => alive && setState({ status: "error", items: [] }));
    return () => { alive = false; };
  }, [on]);

  if (!on) return null;

  return (
    <div className="wall" aria-labelledby="wall-title">
      <Reveal as="h3" className="wall__title" id="wall-title">{t(cfg.heading)}</Reveal>
      {state.status === "loading" && <p className="wall__msg">{t("Loading blessings…")}</p>}
      {state.status === "error" && <p className="wall__msg">{t("Blessings will appear here soon.")}</p>}
      {state.status === "ok" && state.items.length === 0 && <p className="wall__msg">{t("Be the first to leave a blessing above.")}</p>}
      {state.items.length > 0 && (
        <ul className="wall__grid">
          {state.items.map((w, i) => (
            <Reveal as="li" key={`${w.name}-${i}`} className="wall__item" delay={Math.min(i, 6) * 0.06} y={24}>
              <Quote size={20} strokeWidth={1.2} aria-hidden="true" />
              <p>{w.text}</p>
              <strong>{w.name}</strong>
            </Reveal>
          ))}
        </ul>
      )}
    </div>
  );
}
