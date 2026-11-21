import { ArrowUpRight, Car } from "lucide-react";
import { weddingData as d } from "../../data/weddingData";
import { mapsEmbedUrl, mapsSearchUrl } from "../../lib/links";
import SectionHeading from "../common/SectionHeading";
import { useLang } from "../../i18n/LangContext";
import Reveal from "../common/Reveal";
import "./Venue.css";

export default function Venue() {
  const { t } = useLang();
  const v = d.venue;
  const directions = v.directionsUrl?.trim() || mapsSearchUrl(v.mapQuery);
  const embed = v.mapEmbedUrl?.trim() || mapsEmbedUrl(v.mapQuery);

  return (
    <section id="venue" className="section venue" aria-labelledby="venue-title">
      <div className="container">
        <SectionHeading eyebrow={v.eyebrow} title={v.heading} headingId="venue-title" />

        <div className="venue__grid">
          <Reveal className="venue__photo" y={50} duration={1.2}>
            <img src={v.image} alt={`${v.name}, the wedding venue`} loading="lazy" decoding="async" />
            <span className="venue__photo-frame" aria-hidden="true" />
          </Reveal>

          <div className="venue__info">
            <Reveal as="p" className="eyebrow" y={12}>{t("The Wedding Venue")}</Reveal>
            <Reveal as="h3" className="venue__name" delay={0.08}>{v.name}</Reveal>
            <Reveal as="address" className="venue__addr" delay={0.14}>{v.address}</Reveal>
            {v.note && (
              <Reveal as="p" className="venue__note" delay={0.2}>
                <Car size={18} strokeWidth={1.4} aria-hidden="true" /> {t(v.note)}
              </Reveal>
            )}
            <Reveal delay={0.26}>
              <a className="btn btn--solid" href={directions} target="_blank" rel="noopener noreferrer">
                {t("Get Directions")} <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </div>

        <Reveal className="venue__map" y={40} duration={1.1}>
          <iframe
            title={`Map showing ${v.name}`}
            src={embed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </Reveal>
      </div>
    </section>
  );
}
