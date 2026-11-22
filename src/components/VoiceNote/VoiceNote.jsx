import { useEffect, useRef, useState } from "react";
import { Mic, Pause, Play } from "lucide-react";
import { weddingData as d } from "../../data/weddingData";
import { getMusicOn, stopMusic } from "../../lib/sound";
import { useLang } from "../../i18n/LangContext";
import Reveal from "../common/Reveal";
import "./VoiceNote.css";

const fmt = (s) => {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

// A short voice message from the couple. Renders nothing until `voiceNote.src` is set in weddingData.js.
export default function VoiceNote() {
  const v = d.voiceNote;
  const { t } = useLang();
  const audio = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [length, setLength] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => () => audio.current?.pause(), []);
  if (!v?.src || failed) return null;

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) {
      if (getMusicOn()) stopMusic(); // let their voice be heard over the background music
      a.play().catch(() => setFailed(true));
    } else {
      a.pause();
    }
  };

  return (
    <Reveal className="vnote" y={24}>
      <audio
        ref={audio}
        src={v.src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setTime(0); }}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setLength(e.currentTarget.duration)}
        onError={() => setFailed(true)}
      />
      <button className="vnote__btn" onClick={toggle} aria-label={playing ? t("Pause") : t("Play")}>
        {playing ? <Pause size={22} strokeWidth={1.5} fill="currentColor" /> : <Play size={22} strokeWidth={1.5} fill="currentColor" />}
      </button>
      <div className="vnote__body">
        <p className="vnote__title"><Mic size={15} strokeWidth={1.6} aria-hidden="true" /> {t(v.title)}</p>
        <p className="vnote__cap">{t(v.caption)}</p>
        <div className="vnote__bar">
          <input
            type="range"
            min="0"
            max={length || 1}
            step="0.1"
            value={Math.min(time, length || 1)}
            onChange={(e) => { if (audio.current) audio.current.currentTime = Number(e.target.value); }}
            aria-label={t("Seek")}
            style={{ "--p": `${length ? (time / length) * 100 : 0}%` }}
          />
          <span>{fmt(time)} / {fmt(length)}</span>
        </div>
      </div>
    </Reveal>
  );
}
