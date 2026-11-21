import { useState } from "react";
import { Music2, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { weddingData as d } from "../../data/weddingData";
import { v9Data } from "../../data/v9Data";
import { submitExtra } from "../../lib/extraApi";
import { currentGuest } from "../../lib/guest";
import { useLang } from "../../i18n/LangContext";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import "./SongRequest.css";

const KEY = "vr-songs";
const read = () => { try { return Number(localStorage.getItem(KEY)) || 0; } catch { return 0; } };
const write = (n) => { try { localStorage.setItem(KEY, String(n)); } catch { /* private mode */ } };

// Song requests go to the same Google Sheet as RSVPs (their own "Songs" tab). Honest: says so when nothing is connected.
export default function SongRequest() {
  const s = v9Data.songs;
  const { t } = useLang();
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const [name, setName] = useState(() => currentGuest()?.name || "");
  const [used, setUsed] = useState(read);
  const [state, setState] = useState("idle"); // idle | sending | done | fail | none
  const [err, setErr] = useState("");

  if (!s.enabled) return null;
  const left = Math.max(0, s.max - used);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (song.trim().length < 2) { setErr("Please type a song name."); return; }
    if (left < 1) return;
    setErr(""); setState("sending");
    const f = { song: song.trim().slice(0, 120), artist: artist.trim().slice(0, 80), name: name.trim().slice(0, 80) };
    const r = await submitExtra("song", f, `Song request for ${d.groom.firstName} & ${d.bride.firstName}'s Sangeet: ${f.song}${f.artist ? " by " + f.artist : ""}${f.name ? " (" + f.name + ")" : ""}`);
    if (r.ok) { write(used + 1); setUsed(used + 1); setSong(""); setArtist(""); setState("done"); }
    else setState(r.code === "NOT_CONFIGURED" ? "none" : "fail");
  };

  return (
    <section id="songs" className="section songs" aria-labelledby="songs-title">
      <div className="container">
        <SectionHeading eyebrow={s.eyebrow} title={s.heading} lead={s.lead} headingId="songs-title" />
        <Reveal className="songs__panel">
          <form onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="song-name">{t("Song name")}</label>
              <input id="song-name" value={song} onChange={(e) => setSong(e.target.value)} maxLength={120} placeholder={t("e.g. Kala Chashma")} aria-invalid={!!err} aria-describedby={err ? "song-err" : undefined} />
              {err && <p className="field__err" id="song-err" role="alert">{t(err)}</p>}
            </div>
            <div className="songs__row">
              <div className="field">
                <label htmlFor="song-artist">{t("Artist or film")} <em>({t("optional")})</em></label>
                <input id="song-artist" value={artist} onChange={(e) => setArtist(e.target.value)} maxLength={80} />
              </div>
              <div className="field">
                <label htmlFor="song-by">{t("Your name")} <em>({t("optional")})</em></label>
                <input id="song-by" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />
              </div>
            </div>
            <button type="submit" className="btn btn--solid songs__send" disabled={state === "sending" || left < 1}>
              {state === "sending" ? <Loader2 size={17} className="spin" aria-hidden="true" /> : <Music2 size={17} strokeWidth={1.6} aria-hidden="true" />}
              {left < 1 ? t("You have used all your requests") : t("Request this song")}
            </button>
            <p className="songs__left">{left} {t("of")} {s.max} {t("requests left")}</p>
            <div aria-live="polite">
              {state === "done" && <p className="songs__msg songs__msg--ok"><CheckCircle2 size={18} aria-hidden="true" /> {t(s.thanks)}</p>}
              {state === "none" && <p className="songs__msg songs__msg--bad"><AlertCircle size={18} aria-hidden="true" /> {t("Song requests are not switched on yet, so this was not sent. Please tell the couple in person or on WhatsApp.")}</p>}
              {state === "fail" && <p className="songs__msg songs__msg--bad"><AlertCircle size={18} aria-hidden="true" /> {t("Something went wrong and the request was not sent. Please try again.")}</p>}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
