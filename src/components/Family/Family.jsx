import { MessageCircle, Phone } from "lucide-react";
import { contacts, contactsHeading, families, familiesHeading, welcomeLists } from "../../data/invitationData";
import { weddingData as d } from "../../data/weddingData";
import { useLang } from "../../i18n/LangContext";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import { GoldDivider } from "../common/Ornaments";
import "./Family.css";

// Both families, the "with warm regards" lists from the card, and who to call.
export default function Family({ withHeading = true }) {
  const { t, lang } = useLang();
  return (
    <section id="family" className="section family" aria-labelledby="family-title">
      <div className="container">
        {withHeading ? <SectionHeading eyebrow={familiesHeading.eyebrow} title={familiesHeading.heading} lead={familiesHeading.lead} headingId="family-title" /> : <h2 className="sr-only" id="family-title">{familiesHeading.heading}</h2>}

        <div className="fam__pair">
          {families.map((f, i) => (
            <Reveal key={f.side} className="fam" delay={i * 0.15} y={44} duration={1.1}>
              <p className="eyebrow">{t(f.side)}</p>
              <h3 className="fam__name">{lang === "hi" ? f.hindi : f.name}</h3>
              <GoldDivider className="fam__rule" />
              {f.lines.map((l) => <p key={l}>{t(l)}</p>)}
            </Reveal>
          ))}
        </div>

        <ul className="fam__lists">
          {welcomeLists.map((w, i) => (
            <Reveal as="li" key={w.title} className="wl" delay={(i % 3) * 0.1} y={30}>
              <h3 lang="hi">{w.title}</h3>
              <p className="wl__en">{t(w.english)}</p>
              <ul lang="hi">{w.names.map((n) => <li key={n}>{n}</li>)}</ul>
            </Reveal>
          ))}
        </ul>

        {contacts.length > 0 && (
          <div id="contact" className="fam__contacts">
            <SectionHeading eyebrow={contactsHeading.eyebrow} title={contactsHeading.heading} lead={contactsHeading.lead} headingId="contact-title" />
            <ul className="ct">
              {contacts.map((c, i) => (
                <Reveal as="li" key={c.phone} className="ct__row" delay={(i % 4) * 0.07} y={22}>
                  <div>
                    <strong>{lang === "hi" ? c.hindi : c.name}</strong>
                    <small>{c.place ? `${t(c.place)} · ` : ""}{c.shown}</small>
                  </div>
                  <div className="ct__btns">
                    <a href={`tel:+${c.phone}`} aria-label={`${t("Call")} ${c.name}`}><Phone size={17} strokeWidth={1.6} aria-hidden="true" /><span>{t("Call")}</span></a>
                    <a href={`https://wa.me/${c.phone}?text=${encodeURIComponent(`${t("Hello")}! ${d.hashtag}`)}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${c.name}`}><MessageCircle size={17} strokeWidth={1.6} aria-hidden="true" /><span>WhatsApp</span></a>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
