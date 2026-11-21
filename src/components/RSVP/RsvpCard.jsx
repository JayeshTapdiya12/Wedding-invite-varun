import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import { drawRsvpCard, shareOrDownload } from "../../lib/shareCard";
import { useLang } from "../../i18n/LangContext";

// A confirmation image guests can save or share after RSVPing. Drawn in the browser.
export default function RsvpCard({ name, attending, guests, events }) {
  const { t } = useLang();
  const ref = useRef(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const draw = () => ref.current && drawRsvpCard(ref.current, { name, attending, guests, events });
    draw();
    document.fonts?.ready.then(draw); // redraw once the web fonts are ready
  }, [name, attending, guests, events]);

  const save = async () => {
    setBusy(true);
    await shareOrDownload(ref.current, "rsvp-varun-radhika.png", "RSVP – Varun & Radhika");
    setBusy(false);
  };

  return (
    <div className="rsvp__card">
      <canvas ref={ref} role="img" aria-label={`RSVP confirmation card for ${name}`} />
      <button type="button" className="btn btn--solid" onClick={save} disabled={busy}>
        <Download size={16} strokeWidth={1.6} aria-hidden="true" /> {t("Save my RSVP card")}
      </button>
    </div>
  );
}
