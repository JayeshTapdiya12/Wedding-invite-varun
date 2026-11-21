import { useRef, useState } from "react";
import { Download, Film, Heart } from "lucide-react";
import { v9Data } from "../../data/v9Data";
import { weddingData as d } from "../../data/weddingData";
import { drawThankYouCard, shareOrDownload } from "../../lib/shareCard";
import { currentGuest } from "../../lib/guest";
import { useLang } from "../../i18n/LangContext";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import "./ThankYou.css";

const loadImg = (src) => new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; });

// Shown automatically after the wedding: film link, a personal thank-you card to share, and full-size photos to keep.
export default function ThankYou() {
  const x = v9Data.thanks;
  const { t } = useLang();
  const canvas = useRef(null);
  const [busy, setBusy] = useState(false);
  const guest = currentGuest();

  const makeCard = async () => {
    setBusy(true);
    try {
      if (document.fonts?.ready) await document.fonts.ready;
      const img = await loadImg(`/photos/${x.downloads[0]}.jpg`);
      drawThankYouCard(canvas.current, { img, message: t(x.cardMessage), name: guest?.name || "" });
      await shareOrDownload(canvas.current, "thank-you-varun-radhika.png", `${d.groom.firstName} & ${d.bride.firstName}`);
    } finally { setBusy(false); }
  };

  return (
    <section id="thanks" className="section thanks" aria-labelledby="thanks-title">
      <div className="container">
        <SectionHeading eyebrow={x.eyebrow} title={x.heading} lead={x.text} headingId="thanks-title" />
        <Reveal className="thanks__actions">
          {x.filmUrl && <a className="btn btn--solid" href={x.filmUrl} target="_blank" rel="noopener noreferrer"><Film size={17} strokeWidth={1.6} aria-hidden="true" /> {t(x.filmButton)}</a>}
          <button type="button" className="btn" onClick={makeCard} disabled={busy}><Heart size={17} strokeWidth={1.6} aria-hidden="true" /> {t("Get our thank-you card")}</button>
        </Reveal>
        <canvas ref={canvas} className="sr-only" aria-hidden="true" />
        <ul className="thanks__grid">
          {x.downloads.map((n, i) => (
            <Reveal as="li" key={n} delay={Math.min(i, 5) * 0.06} y={20}>
              <img src={`/photos/thumb/${n}.jpg`} alt="" loading="lazy" decoding="async" />
              <a href={`/photos/${n}.jpg`} download={`varun-radhika-${n}.jpg`} aria-label={`${t("Download photo")} ${i + 1}`}><Download size={16} strokeWidth={1.6} aria-hidden="true" /> {t("Download")}</a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
