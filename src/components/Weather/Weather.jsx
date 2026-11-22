import { useEffect, useState } from "react";
import { v9Data } from "../../data/v9Data";
import { fetchWeather } from "../../lib/extraApi";
import { useLang } from "../../i18n/LangContext";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import "./Weather.css";

// WMO weather code -> [emoji, English label]
const wmo = (c) => {
  if (c === 0) return ["☀️", "Clear sky"];
  if (c <= 2) return ["🌤️", "Partly cloudy"];
  if (c === 3) return ["☁️", "Cloudy"];
  if (c === 45 || c === 48) return ["🌫️", "Foggy"];
  if (c >= 51 && c <= 67) return ["🌧️", "Rain"];
  if (c >= 80 && c <= 82) return ["🌦️", "Showers"];
  if (c >= 95) return ["⛈️", "Thunderstorm"];
  return ["🌡️", "Mixed weather"];
};

// Real forecast when the wedding is within ~16 days, otherwise typical December weather. Never shows made-up numbers.
export default function Weather() {
  const w = v9Data.weather;
  const { t, lang } = useLang();
  const [days, setDays] = useState(null); // null = loading, [] = not available

  useEffect(() => {
    if (!w.enabled) return;
    let alive = true;
    fetchWeather().then((r) => alive && setDays(r)).catch(() => alive && setDays([]));
    return () => { alive = false; };
  }, [w.enabled]);

  if (!w.enabled) return null;
  const fmt = (iso) => new Date(`${iso}T12:00:00+05:30`).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { weekday: "long", day: "numeric", month: "long" });

  return (
    <section id="weather" className="section weather" aria-labelledby="weather-title">
      <div className="container">
        <SectionHeading eyebrow={w.eyebrow} title={w.heading} lead={w.packing} headingId="weather-title" />
        {days && days.length > 0 ? (
          <ul className="weather__grid" aria-live="polite">
            {days.map((x, i) => {
              const [emoji, label] = wmo(x.code);
              return (
                <Reveal as="li" key={x.date} className="wcard" delay={i * 0.1} y={20}>
                  <span className="wcard__emoji" aria-hidden="true">{emoji}</span>
                  <h3>{fmt(x.date)}</h3>
                  <p className="wcard__temp"><strong>{Math.round(x.max)}°</strong> / {Math.round(x.min)}°C</p>
                  <p className="wcard__meta">{t(label)}{Number.isFinite(x.rain) ? ` · ${t("Rain chance")} ${x.rain}%` : ""}</p>
                </Reveal>
              );
            })}
          </ul>
        ) : (
          <Reveal className="weather__typical">
            <span aria-hidden="true">🌤️</span>
            <p>{days === null ? t("Checking the forecast…") : t(w.typical)}</p>
            {days !== null && <small>{t("The live forecast appears here about two weeks before the wedding.")}</small>}
          </Reveal>
        )}
      </div>
    </section>
  );
}
