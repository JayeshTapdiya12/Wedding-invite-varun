import { useEffect, useState } from "react";
import { Hourglass, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { v9Data } from "../../data/v9Data";
import { fetchCapsule, submitExtra } from "../../lib/extraApi";
import { currentGuest } from "../../lib/guest";
import { useLang } from "../../i18n/LangContext";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import "./TimeCapsule.css";

// Before the opening date: guests write a note that is sealed. After it: the notes are shown (if readUrl is set).
export default function TimeCapsule() {
  const c = v9Data.capsule;
  const { t } = useLang();
  const opened = Date.now() >= new Date(c.openISO).getTime();
  const [name, setName] = useState(() => currentGuest()?.name || "");
  const [note, setNote] = useState("");
  const [state, setState] = useState("idle");
  const [err, setErr] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (!c.enabled || !opened) return;
    let alive = true;
    fetchCapsule().then((r) => alive && setNotes(r)).catch(() => {});
    return () => { alive = false; };
  }, [c.enabled, opened]);

  if (!c.enabled) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (note.trim().length < 5) { setErr("Please write a few words."); return; }
    setErr(""); setState("sending");
    const f = { name: name.trim().slice(0, 80), note: note.trim().slice(0, 600) };
    const r = await submitExtra("capsule", f, `Time capsule note for Varun & Radhika${f.name ? " from " + f.name : ""}:\n${f.note}`);
    if (r.ok) { setNote(""); setState("done"); } else setState(r.code === "NOT_CONFIGURED" ? "none" : "fail");
  };

  return (
    <section id="capsule" className="section capsule" aria-labelledby="capsule-title">
      <div className="container">
        <SectionHeading eyebrow={c.eyebrow} title={c.heading} lead={opened ? "The capsule is open. Here are your notes." : c.lead} headingId="capsule-title" />
        {opened ? (
          <ul className="capsule__wall">
            {notes.length === 0 && <li className="capsule__empty">{t("The notes will appear here soon.")}</li>}
            {notes.map((n, i) => <li key={i}><p>“{n.note}”</p><cite>{n.name}</cite></li>)}
          </ul>
        ) : (
          <Reveal className="capsule__panel">
            <p className="capsule__seal"><Hourglass size={18} strokeWidth={1.5} aria-hidden="true" /> {t("Opens on")} {c.openLabel}</p>
            <form onSubmit={onSubmit} noValidate>
              <div className="field">
                <label htmlFor="cap-name">{t("Your name")}</label>
                <input id="cap-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />
              </div>
              <div className="field">
                <label htmlFor="cap-note">{t("Your note")}</label>
                <textarea id="cap-note" value={note} onChange={(e) => setNote(e.target.value)} maxLength={600} aria-invalid={!!err} aria-describedby={err ? "cap-err" : undefined} placeholder={t("A wish, a memory, or advice for the first year…")} />
                {err && <p className="field__err" id="cap-err" role="alert">{t(err)}</p>}
                <small className="field__count">{note.length} / 600</small>
              </div>
              <button type="submit" className="btn btn--solid" disabled={state === "sending"}>
                {state === "sending" && <Loader2 size={17} className="spin" aria-hidden="true" />} {t("Seal my note")}
              </button>
              <div aria-live="polite">
                {state === "done" && <p className="capsule__msg capsule__msg--ok"><CheckCircle2 size={18} aria-hidden="true" /> {t(c.thanks)}</p>}
                {state === "none" && <p className="capsule__msg capsule__msg--bad"><AlertCircle size={18} aria-hidden="true" /> {t("The time capsule is not switched on yet, so your note was not sent.")}</p>}
                {state === "fail" && <p className="capsule__msg capsule__msg--bad"><AlertCircle size={18} aria-hidden="true" /> {t("Something went wrong and your note was not sent. Please try again.")}</p>}
              </div>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}
