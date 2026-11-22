import { dayHeadings, eventsData } from "../../data/eventsData";
import { visibleEvents } from "../../lib/guest";
import { useLang } from "../../i18n/LangContext";
import { Link } from "../../lib/router";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import "./Home.css";

// Two columns, one per day: just times and names. The full details are on the Celebrations page.
export default function EventsPreview() {
  const { t, lang } = useLang();
  const events = visibleEvents(eventsData);
  return (
    <section id="glance" className="section glance" aria-labelledby="glance-title">
      <div className="container">
        <SectionHeading eyebrow="Two Days. Countless Memories." title="The Celebrations at a Glance" headingId="glance-title" />
        <div className="glance__days">
          {dayHeadings.map((day, di) => {
            const list = events.filter((e) => e.day === day.day);
            if (!list.length) return null;
            return (
              <Reveal key={day.day} className="gday" delay={di * 0.15} y={44} duration={1.1}>
                <p className="gday__num" aria-hidden="true">{day.numeral}</p>
                <h3 className="gday__head"><span lang="hi">{day.hindi}</span><small>{t(day.weekday)}, {t(day.date)}</small></h3>
                <ul>
                  {list.map((e) => (
                    <li key={e.id}><time>{t(e.time)}</time><span>{lang === "hi" ? e.hindi : e.title}</span></li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="glance__more"><Link className="btn btn--solid" to="/celebrations">{t("See every celebration")}</Link></Reveal>
      </div>
    </section>
  );
}
