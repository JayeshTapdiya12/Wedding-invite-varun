import { Radio } from "lucide-react";
import { weddingData as d } from "../../data/weddingData";
import { useCountdown } from "../../hooks/useCountdown";
import { useLang } from "../../i18n/LangContext";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import CountUnits from "../Countdown/CountUnits";
import "./LiveStream.css";

// Appears only when `liveStream.enabled` is true. Before the start time it shows a countdown, then the player.
export default function LiveStream() {
  const ls = d.liveStream;
  const { t, lang } = useLang();
  const time = useCountdown(ls.startISO);
  if (!ls.enabled) return null;

  const when = new Intl.DateTimeFormat(lang === "hi" ? "hi-IN" : "en-IN", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date(ls.startISO));

  return (
    <section id="live" className="section live on-dark" aria-labelledby="live-title">
      <div className="container">
        <SectionHeading eyebrow={ls.eyebrow} title={ls.heading} lead={ls.note} headingId="live-title" />

        {!time.done ? (
          <Reveal className="live__wait">
            <p className="live__when"><Radio size={18} strokeWidth={1.4} aria-hidden="true" /> {t("The live stream begins")}: {when} IST</p>
            <CountUnits time={time} className="cu--section" />
          </Reveal>
        ) : ls.youtubeId ? (
          <Reveal className="live__frame" y={40}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${ls.youtubeId}?rel=0&modestbranding=1&playsinline=1`}
              title={t(ls.heading)}
              allow="encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </Reveal>
        ) : (
          <Reveal className="live__wait">
            <p className="live__when">{t("The live stream link will appear here shortly.")}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
