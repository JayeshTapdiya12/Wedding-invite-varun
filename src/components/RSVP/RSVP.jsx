import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Send, TriangleAlert } from "lucide-react";
import { weddingData as d } from "../../data/weddingData";
import { eventsData } from "../../data/eventsData";
import { currentGuest, visibleEvents } from "../../lib/guest";
import { submitRsvp } from "../../lib/rsvpApi";
import { useLang } from "../../i18n/LangContext";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import { FloralSprig } from "../common/Ornaments";
import WishesWall from "../WishesWall/WishesWall";
import RsvpCard from "./RsvpCard";
import "./RSVP.css";

const EASE = [0.22, 1, 0.36, 1];
const { rsvp } = d;

const FAIL_COPY = {
  NOT_CONFIGURED: "Online RSVP is not switched on for this site yet, so nothing was sent. Please confirm your attendance directly with the family.",
  NETWORK: "We could not reach the server. Please check your connection and try again.",
  SERVER: "Something went wrong on our side and your RSVP was not saved. Please try again in a moment.",
};

export default function RSVP() {
  const { t } = useLang();
  const guest = currentGuest();
  const events = useMemo(() => visibleEvents(eventsData), []);

  // a personalised link pre-fills the name, only offers that guest's events, and tags the RSVP with the link used
  const initial = useMemo(
    () => ({
      name: guest?.name ?? "",
      phone: "",
      attending: "yes",
      guests: "1",
      events: events.length === 1 ? [events[0].short] : [],
      meal: rsvp.mealOptions[0],
      mealOther: "",
      wishes: "",
      invite: guest?.slug ?? "",
    }),
    [guest, events]
  );

  const [v, setV] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: "idle" }); // idle | sending | success | error

  const set = (k) => (e) => setV((p) => ({ ...p, [k]: e.target.value }));
  const toggleEvent = (name) =>
    setV((p) => ({ ...p, events: p.events.includes(name) ? p.events.filter((x) => x !== name) : [...p.events, name] }));
  const attending = v.attending === "yes";

  const validate = () => {
    const e = {};
    if (v.name.trim().length < 2) e.name = "Please enter your full name.";
    const digits = v.phone.replace(/[^\d]/g, "");
    if (digits.length < 7 || digits.length > 15 || /[^\d\s+()-]/.test(v.phone)) e.phone = "Please enter a valid phone number, e.g. +91 98765 43210.";
    if (v.attending === "yes" && v.events.length === 0) e.events = "Please choose at least one event you will attend.";
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) {
      // move focus to the first problem so keyboard / screen-reader users land on it
      const first = ["name", "phone", "events"].find((k) => found[k]);
      document.getElementById(first === "events" ? "rsvp-events" : `rsvp-${first}`)?.focus();
      return;
    }
    setStatus({ state: "sending" });
    const res = await submitRsvp(v);
    setStatus(res.ok ? { state: "success", via: res.via } : { state: "error", code: res.code });
  };

  const reset = () => { setV(initial); setErrors({}); setStatus({ state: "idle" }); };
  const firstName = v.name.trim().split(" ")[0];

  return (
    <section id="rsvp" className="section rsvp" aria-labelledby="rsvp-title">
      <FloralSprig className="rsvp__sprig" />
      <div className="container">
        <SectionHeading eyebrow={rsvp.eyebrow} title={rsvp.heading} headingId="rsvp-title" lead={rsvp.replyBy} />

        <div className="rsvp__grid">
          <Reveal className="rsvp__aside" x={-30} y={10}>
            <p className="rsvp__quote">“{t("Your presence is the greatest gift we could ask for.")}”</p>
            <p className="rsvp__aside-title eyebrow">{t("The Festivities")}</p>
            <ul className="rsvp__events">
              {events.map((ev) => (
                <li key={ev.id}>
                  <span>{t(ev.short)}</span>
                  <small>{t(ev.date.replace(/, 20\d\d/, ""))} · {t(ev.time)}</small>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="rsvp__panel" x={30} y={10}>
            <AnimatePresence mode="wait" initial={false}>
              {status.state === "success" ? (
                <motion.div key="ok" className="rsvp__done" role="status" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: EASE }}>
                  <CheckCircle2 size={44} strokeWidth={1.1} aria-hidden="true" />
                  <h3>{attending ? t("Thank you, see you there.") : t("We will miss you.")}</h3>
                  <p>
                    {status.via === "whatsapp"
                      ? t("WhatsApp has opened with your RSVP filled in. Please tap Send there to complete it.")
                      : attending
                      ? `${t("Your RSVP has been received,")} ${firstName}. ${t("We cannot wait to celebrate with you.")}`
                      : t("Thank you for letting us know. You will be in our hearts on the day.")}
                  </p>
                  {status.via !== "whatsapp" && <RsvpCard name={v.name.trim()} attending={attending} guests={attending ? Number(v.guests) : 0} events={attending ? v.events : []} />}
                  <button type="button" className="btn" onClick={reset}>{t("Submit another response")}</button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                  <div className="rsvp__row">
                    <div className="field">
                      <label htmlFor="rsvp-name">{t("Guest name")}</label>
                      <input id="rsvp-name" name="name" autoComplete="name" value={v.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} placeholder={t("Your full name")} />
                      {errors.name && <p className="field__err" id="err-name" role="alert">{t(errors.name)}</p>}
                    </div>
                    <div className="field">
                      <label htmlFor="rsvp-phone">{t("Phone number")}</label>
                      <input id="rsvp-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={v.phone} onChange={set("phone")} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "err-phone" : undefined} placeholder="+91 98765 43210" />
                      {errors.phone && <p className="field__err" id="err-phone" role="alert">{t(errors.phone)}</p>}
                    </div>
                  </div>

                  <fieldset className="field">
                    <legend>{t("Will you attend?")}</legend>
                    <div className="choices choices--two">
                      {[["yes", "Joyfully Accept"], ["no", "Regretfully Decline"]].map(([val, label]) => (
                        <label key={val} className="choice">
                          <input type="radio" name="attending" value={val} checked={v.attending === val} onChange={set("attending")} />
                          <span>{t(label)}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <AnimatePresence initial={false}>
                    {attending && (
                      <motion.div key="details" className="rsvp__more" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.55, ease: EASE }}>
                        <div className="rsvp__row">
                          <div className="field">
                            <label htmlFor="rsvp-guests">{t("Number of guests")}</label>
                            <select id="rsvp-guests" name="guests" value={v.guests} onChange={set("guests")}>
                              {Array.from({ length: rsvp.maxGuests }, (_, i) => i + 1).map((n) => (
                                <option key={n} value={n}>{n}</option>
                              ))}
                            </select>
                          </div>
                          <div className="field">
                            <label htmlFor="rsvp-meal">{t("Meal preference")}</label>
                            <select id="rsvp-meal" name="meal" value={v.meal} onChange={set("meal")}>
                              {rsvp.mealOptions.map((m) => <option key={m} value={m}>{t(m)}</option>)}
                            </select>
                          </div>
                        </div>

                        {v.meal === "Other" && (
                          <div className="field">
                            <label htmlFor="rsvp-meal-other">{t("Tell us your dietary needs")}</label>
                            <input id="rsvp-meal-other" value={v.mealOther} onChange={set("mealOther")} maxLength={120} placeholder={t("e.g. no nuts, gluten free")} />
                          </div>
                        )}

                        <fieldset className="field" aria-describedby={errors.events ? "err-events" : undefined}>
                          <legend>{t("Which events will you attend?")}</legend>
                          <div className="choices" id="rsvp-events" tabIndex={-1}>
                            {events.map((ev) => (
                              <label key={ev.id} className="choice choice--chip">
                                <input type="checkbox" checked={v.events.includes(ev.short)} onChange={() => toggleEvent(ev.short)} />
                                <span>{t(ev.short)}</span>
                              </label>
                            ))}
                          </div>
                          {errors.events && <p className="field__err" id="err-events" role="alert">{t(errors.events)}</p>}
                        </fieldset>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="field">
                    <label htmlFor="rsvp-wishes">{t("Your wishes for")} {d.groom.firstName} &amp; {d.bride.firstName} <em>({t("optional")})</em></label>
                    <textarea id="rsvp-wishes" name="wishes" rows={4} maxLength={500} value={v.wishes} onChange={set("wishes")} placeholder={t("Write something from the heart…")} />
                    <small className="field__count">{v.wishes.length} / 500</small>
                  </div>

                  <div aria-live="polite">
                    {status.state === "error" && (
                      <p className="rsvp__error" role="alert">
                        <TriangleAlert size={18} strokeWidth={1.5} aria-hidden="true" /> {t(FAIL_COPY[status.code] || FAIL_COPY.SERVER)}
                      </p>
                    )}
                  </div>

                  <button className="btn btn--solid rsvp__submit" type="submit" disabled={status.state === "sending"}>
                    {status.state === "sending" ? (<><Loader2 size={18} className="spin" aria-hidden="true" /> {t("Sending…")}</>) : (<>{t("Send RSVP")} <Send size={16} strokeWidth={1.6} aria-hidden="true" /></>)}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>

        <WishesWall />
      </div>
    </section>
  );
}
