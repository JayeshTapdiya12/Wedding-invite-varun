import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Clock, MapPin, Shirt, Sparkles } from "lucide-react";
import { dayHeadings, eventsData, eventsHeading } from "../../data/eventsData";
import { weddingData as d } from "../../data/weddingData";
import { currentGuest, visibleEvents } from "../../lib/guest";
import { eventDirectionsUrl } from "../../lib/links";
import { usePhase } from "../../hooks/usePhase";
import { useLang } from "../../i18n/LangContext";
import { Link } from "../../lib/router";
import { AllEventsButton, EventCalendarLinks } from "../common/AddToCalendar";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import "./WeddingEvents.css";

const EASE = [0.22, 1, 0.36, 1];

// One festivity: the invitation's own illustration, the time, the details, and the calendar links.
function Card({ event, index, showCalendar }) {
  const { t, lang } = useLang();
  const reduce = useReducedMotion();
  const flip = index % 2 === 1;
  const wear = event.dressCode;
  return (
    <motion.article
      className={`ev ${flip ? "is-flipped" : ""} ${event.illustration ? "" : "ev--noart"}`}
      initial={reduce ? false : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: EASE }}
      aria-labelledby={`ev-${event.id}`}
    >
      <span className="ev__node" aria-hidden="true"><i /></span>
      {event.illustration && (
        <motion.div className="ev__art" initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1.3, delay: 0.15, ease: EASE }}>
          <img src={event.illustration} alt="" loading="lazy" decoding="async" />
        </motion.div>
      )}
      <div className="ev__body">
        <p className="ev__time"><Clock size={15} strokeWidth={1.6} aria-hidden="true" /> {t(event.time)}</p>
        <p className="ev__hindi" lang="hi">{event.hindi}</p>
        <h3 className="ev__title" id={`ev-${event.id}`}>{lang === "hi" ? event.hindi : event.title}</h3>
        {event.subtitle && <p className="ev__sub">{t(event.subtitle)}</p>}
        <p className="ev__tag">{t(event.tagline)}</p>
        <p className="ev__desc">{t(event.description)}</p>
        {event.host && <p className="ev__host">{t(event.host)}</p>}
        <ul className="ev__facts">
          <li><MapPin size={15} strokeWidth={1.6} aria-hidden="true" /> {event.venue}</li>
          {wear && <li><Shirt size={15} strokeWidth={1.6} aria-hidden="true" /> {t("Dress code")}: {t(wear)}</li>}
        </ul>
        <div className="ev__actions">
          <a className="btn" href={eventDirectionsUrl(event)} target="_blank" rel="noopener noreferrer">{t("Get Directions")}</a>
          {showCalendar && <EventCalendarLinks event={event} />}
        </div>
      </div>
    </motion.article>
  );
}

// A big banner for each day: the date numeral drifts a little as you scroll.
function DayBanner({ day }) {
  const { t } = useLang();
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(p, [0, 1], ["-14%", "14%"]);
  return (
    <div ref={ref} className="day">
      <motion.span className="day__num" aria-hidden="true" style={reduce ? undefined : { y }}>{day.numeral}</motion.span>
      <div className="day__txt">
        <Reveal as="p" className="eyebrow" y={12}>{t(day.label)} · {t(day.weekday)}</Reveal>
        <Reveal as="h3" className="day__hindi" delay={0.08} y={20}><span lang="hi">{day.hindi}</span></Reveal>
        <Reveal as="p" className="day__theme" delay={0.16} y={16}>{t(day.theme)}</Reveal>
        <Reveal as="p" className="day__date" delay={0.22} y={14}>{t(day.date)}</Reveal>
      </div>
    </div>
  );
}

export default function WeddingEvents({ withHeading = true }) {
  const { t } = useLang();
  const phase = usePhase();
  const guest = currentGuest();
  const events = visibleEvents(eventsData); // a personalised link only shows the events that guest is invited to
  const showCalendar = phase !== "after";

  return (
    <section id="events" className="section events" aria-labelledby="events-title">
      <div className="container">
        {withHeading ? (
          <SectionHeading eyebrow={eventsHeading.eyebrow} title={eventsHeading.heading} lead={eventsHeading.intro} headingId="events-title">
            {guest && events.length < eventsData.length && <p className="events__only">{t("You are warmly invited to the following festivities.")}</p>}
          </SectionHeading>
        ) : <h2 className="sr-only" id="events-title">{eventsHeading.heading}</h2>}
        {showCalendar && <Reveal delay={0.2} className="events__cal"><AllEventsButton events={events} /></Reveal>}

        {dayHeadings.map((day) => {
          const list = events.filter((e) => e.day === day.day);
          if (!list.length) return null;
          return (
            <div key={day.day} className="events__day">
              <DayBanner day={day} />
              <div className="events__line">
                {list.map((e, i) => <Card key={e.id} event={e} index={i} showCalendar={showCalendar} />)}
              </div>
            </div>
          );
        })}

        <Reveal className="events__foot">
          <Sparkles size={18} strokeWidth={1.4} aria-hidden="true" />
          <p>{t("Not sure what to wear?")} <Link to="/wardrobe">{t("Open the Wardrobe Planner")}</Link></p>
        </Reveal>
        <p className="events__venue">{t("All celebrations take place at")} <strong>{d.venue.name}</strong>, {t(d.city)}</p>
      </div>
    </section>
  );
}
