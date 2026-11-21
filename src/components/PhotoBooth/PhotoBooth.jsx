import { useEffect, useRef, useState } from "react";
import { Camera, Download } from "lucide-react";
import { extrasData } from "../../data/extrasData";
import { FRAMES, drawSelfieFrame, shareOrDownload } from "../../lib/shareCard";
import { useLang } from "../../i18n/LangContext";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import "./PhotoBooth.css";

// Guests pick a photo, choose a frame and get a shareable image. All in the browser: nothing is uploaded.
export default function PhotoBooth() {
  const b = extrasData.booth;
  const { t } = useLang();
  const canvas = useRef(null);
  const [img, setImg] = useState(null);
  const [frame, setFrame] = useState("gold");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const draw = () => canvas.current && drawSelfieFrame(canvas.current, img, frame);
    draw();
    document.fonts?.ready.then(draw);
  }, [img, frame]);

  const pick = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    const im = new Image();
    im.onload = () => { setImg(im); URL.revokeObjectURL(url); };
    im.src = url;
  };

  const save = async () => {
    setBusy(true);
    await shareOrDownload(canvas.current, "jabVmetR-frame.png", "Varun & Radhika");
    setBusy(false);
  };

  return (
    <section id="frame" className="section booth" aria-labelledby="booth-title">
      <div className="container">
        <SectionHeading eyebrow={b.eyebrow} title={b.heading} lead={b.text} headingId="booth-title" />
        <div className="booth__grid">
          <Reveal className="booth__preview"><canvas ref={canvas} role="img" aria-label="Preview of your framed photo" /></Reveal>
          <Reveal className="booth__controls" delay={0.15}>
            <label className="btn btn--solid booth__pick">
              <Camera size={17} strokeWidth={1.6} aria-hidden="true" /> {img ? t("Choose another photo") : t("Choose a photo")}
              <input type="file" accept="image/*" onChange={pick} />
            </label>
            <fieldset className="booth__frames">
              <legend>{t("Frame style")}</legend>
              {Object.entries(FRAMES).map(([k, f]) => (
                <button key={k} type="button" className={frame === k ? "on" : ""} aria-pressed={frame === k} onClick={() => setFrame(k)}>
                  <i style={{ background: f.bg, borderColor: f.accent }} /> {f.name}
                </button>
              ))}
            </fieldset>
            <button type="button" className="btn" onClick={save} disabled={!img || busy}>
              <Download size={16} strokeWidth={1.6} aria-hidden="true" /> {t("Save or share")}
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
