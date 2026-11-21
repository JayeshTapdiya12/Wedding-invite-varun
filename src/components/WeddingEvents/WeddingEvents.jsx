import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, CalendarDays, Clock, MapPin, Shirt } from "lucide-react";
import { eventsData, eventsHeading } from "../../data/eventsData";
import { eventDirectionsUrl } from "../../lib/links";
import { currentGuest, visibleEvents } from "../../lib/guest";
import { usePhase } from "../../hooks/usePhase";
import { useLang } from "../../i18n/LangContext";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import { AllEventsButton, EventCalendarLinks } from "../common/AddToCalendar";
import "./WeddingEvents.css";

const EASE = [0.22, 1, 0.36, 1];
const thumb = (src) => src.replace("/photos/", "/photos/thumb/");

// The event photos. They always fill their frame (object-fit: cover), pick a small version on phones
// (srcSet), then slowly zoom and cross-fade into the next photo.
function Photos({ photos, index }) {
  const box = useRef(null);
  const inView = useInView(box);
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce || !inView || photos.length < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % photos.length), 4800);
    return () => clearInterval(id);
  }, [reduce, inView, photos.length]);

  return (
    <div ref={box} className="sc__photos">
      {photos.map((p, k) => (
        <img
          key={p.src}
          className={`sc__photo ${k === i ? "on" : ""} sc__photo--${(index + k) % 2 ? "b" : "a"}`}
          src={thumb(p.src)}
          srcSet={`${thumb(p.src)} 900w, ${p.src} 2200w`}
          sizes="(min-width: 900px) 50vw, 100vw"
          alt=""
          loading="lazy"
          decoding="async"
          style={{ objectPosition: p.pos || "50% 40%" }}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      ))}
      {photos.length > 1 && <span className="sc__dots" aria-hidden="true">{photos.map((p, k) => <i key={p.src} className={k === i ? "on" : ""} />)}</span>}
    </div>
  );
}

function Card({ event, index, n, p, stacked, showCalendar }) {
  const { t } = useLang();
  // while the next card slides over this one, this one shrinks back a little
  const scale = useTransform(p, [index / n, (index + 1) / n], [1, index === n - 1 ? 1 : 0.94]);
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      className={`sc sc--${event.theme} ${index % 2 ? "is-flipped" : ""}`}
      style={{ "--i": index, scale: stacked ? scale : 1, transformOrigin: "50% 0%" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: EASE }}
      aria-labelledby={`ev-${event.id}`}
    >
      <div className="sc__media">
        {event.photos?.length ? <Photos photos={event.photos} index={index} /> : <div className="sc__photos" />}
        <span className="sc__chip">{t(event.date.replace(/, 20\d\d/, ""))}</span>
      </div>

      <div className="sc__body">
        <span className="sc__num" aria-hidden="true">{num}</span>
        <p className="eyebrow">{t(event.day)}</p>
        <h3 className="sc__title" id={`ev-${event.id}`}>{t(event.title)}</h3>
        <span className="sc__rule" aria-hidden="true" />
        <p className="sc__desc">{t(event.description)}</p>

        <dl className="sc__facts">
          <div><dt><CalendarDays size={15} strokeWidth={1.6} aria-hidden="true" /> {t("Date")}</dt><dd>{t(event.date)}</dd></div>
          <div><dt><Clock size={15} strokeWidth={1.6} aria-hidden="true" /> {t("Time")}</dt><dd>{t(event.time)}</dd></div>
          <div className="sc__wide"><dt><MapPin size={15} strokeWidth={1.6} aria-hidden="true" /> {t("Venue")}</dt><dd><strong>{event.venue}</strong>, {event.address}</dd></div>
          <div className="sc__wide">
            <dt><Shirt size={15} strokeWidth={1.6} aria-hidden="true" /> {t("Dress code")}</dt>
            <dd>
              {t(event.dressCode)}
              <ul className="sc__swatches" aria-label="Suggested colours">
                {event.swatches.map((s) => (
                  <li key={s.name} title={s.name}><i style={{ background: s.hex }} /><span className="sr-only">{s.name}</span></li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        <div className="sc__actions">
          <a className="btn" href={eventDirectionsUrl(event)} target="_blank" rel="noopener noreferrer" aria-label={`Get directions to ${event.venue} (opens Google Maps)`}>
            {t("Get Directions")} <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" />
          </a>
          {showCalendar && <EventCalendarLinks event={event} />}
        </div>
      </div>
    </motion.article>
  );
}

function useStackable() {
  const reduce = useReducedMotion();
  const q = "(min-width: 900px) and (min-height: 740px)";
  const [on, setOn] = useState(() => typeof window !== "undefined" && window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const fn = () => setOn(m.matches);
    fn();
    m.addEventListener("change", fn);
    return () => m.removeEventListener("change", fn);
  }, []);
  return on && !reduce;
}

export default function WeddingEvents() {
  const { t } = useLang();
  const phase = usePhase();
  const guest = currentGuest();
  const events = visibleEvents(eventsData); // a personalised link only shows the events that guest is invited to
  const showCalendar = phase !== "after";
  const stacked = useStackable();
  const stackRef = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: stackRef, offset: ["start start", "end end"] });

  return (
    <section id="events" className="section events" aria-labelledby="events-title">
      <div className="container">
        <SectionHeading eyebrow={eventsHeading.eyebrow} title={eventsHeading.heading} lead={eventsHeading.intro} headingId="events-title">
          {guest && events.length < eventsData.length && (
            <p className="events__only">{t("You are warmly invited to the following festivities.")}</p>
          )}
          {showCalendar && (
            <Reveal delay={0.4} className="events__cal"><AllEventsButton events={events} /></Reveal>
          )}
        </SectionHeading>

        <div ref={stackRef} className="sc__stack">
          {events.map((e, i) => (
            <Card key={e.id} event={e} index={i} n={events.length} p={p} stacked={stacked} showCalendar={showCalendar} />
          ))}
        </div>
      </div>
    </section>
  );
}
