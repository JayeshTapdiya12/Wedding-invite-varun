import { CloudSun, Car, Hotel, Phone, Plane, TrainFront } from "lucide-react";
import { weddingData as d } from "../../data/weddingData";
import { useLang } from "../../i18n/LangContext";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import "./Travel.css";

const ICONS = { plane: Plane, train: TrainFront, car: Car, weather: CloudSun };

export default function Travel() {
  const tr = d.travel;
  const { t } = useLang();
  const cards = tr.cards.filter((c) => c.text && c.text.trim());
  const hotels = tr.hotels.filter((h) => h.name && h.name.trim());
  const phone = tr.contact?.phone?.trim();

  return (
    <section id="travel" className="section travel" aria-labelledby="travel-title">
      <div className="container">
        <SectionHeading eyebrow={tr.eyebrow} title={tr.heading} lead={tr.intro} headingId="travel-title" />

        <ul className="travel__grid">
          {cards.map((c, i) => {
            const Icon = ICONS[c.icon] || Plane;
            return (
              <Reveal as="li" key={c.title} className="tcard" delay={i * 0.08} y={30}>
                <span className="tcard__icon" aria-hidden="true"><Icon size={26} strokeWidth={1.2} /></span>
                <h3>{t(c.title)}</h3>
                <p>{t(c.text)}</p>
              </Reveal>
            );
          })}
        </ul>

        {hotels.length > 0 && (
          <div className="stay">
            <Reveal as="h3" className="stay__title"><Hotel size={22} strokeWidth={1.2} aria-hidden="true" /> {t(tr.stayHeading)}</Reveal>
            <ul className="stay__list">
              {hotels.map((h, i) => (
                <Reveal as="li" key={h.name} delay={i * 0.08} y={20}>
                  <strong>{h.name}</strong>
                  {h.area && <span>{h.area}</span>}
                  {h.note && <em>{t(h.note)}</em>}
                </Reveal>
              ))}
            </ul>
          </div>
        )}

        {phone && (
          <Reveal className="travel__help" delay={0.1}>
            <p>{t(tr.contact.label)}{tr.contact.name ? ` ${tr.contact.name}` : ""}</p>
            <a className="btn btn--solid" href={`tel:${phone.replace(/[^\d+]/g, "")}`}>
              <Phone size={16} strokeWidth={1.6} aria-hidden="true" /> {phone}
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
