import { Camera } from "lucide-react";
import { weddingData as d } from "../../data/weddingData";
import { useLang } from "../../i18n/LangContext";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import "./Album.css";

// A link to a shared album (Google Photos / Drive / iCloud) where guests add their photos.
// Hidden until `album.url` is set. `prominent` is used once the wedding is over.
export default function Album({ prominent = false }) {
  const a = d.album;
  const { t } = useLang();
  if (!a.url) return null;

  return (
    <section id="album" className={`section album ${prominent ? "album--prominent on-dark" : ""}`} aria-labelledby="album-title">
      <div className="container">
        <SectionHeading eyebrow={a.eyebrow} title={a.heading} lead={a.text} headingId="album-title" />
        <Reveal className="album__cta" delay={0.2}>
          <a className={`btn ${prominent ? "btn--light" : "btn--solid"}`} href={a.url} target="_blank" rel="noopener noreferrer">
            <Camera size={17} strokeWidth={1.6} aria-hidden="true" /> {t(a.button)}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
