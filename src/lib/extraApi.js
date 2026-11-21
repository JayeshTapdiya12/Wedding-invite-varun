// Sends song requests, time-capsule notes and link-opened pings to the SAME place as the RSVP
// (weddingData.rsvp.endpoint). Honest about it: returns { ok:false, code:"NOT_CONFIGURED" } when nothing is connected.
//
// Every message is   { type: "song" | "capsule" | "open", ...fields, submittedAt }
// The Google Sheet script in docs/google-sheet-rsvp.gs files each type into its own tab.
import { weddingData } from "../data/weddingData";
import { v9Data } from "../data/v9Data";
import { currentGuest } from "./guest";

export async function sendExtra(type, fields) {
  const { endpoint, provider, headers } = weddingData.rsvp;
  if (!endpoint) return { ok: false, code: "NOT_CONFIGURED" };
  const body = JSON.stringify({ type, ...fields, invite: currentGuest()?.slug || "", submittedAt: new Date().toISOString() });
  try {
    if (provider === "apps-script") {
      await fetch(endpoint, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body });
      return { ok: true };
    }
    const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json", ...headers }, body });
    return res.ok ? { ok: true } : { ok: false, code: "SERVER" };
  } catch {
    return { ok: false, code: "NETWORK" };
  }
}

// Same as sendExtra, but if nothing is connected and a WhatsApp number is set, opens WhatsApp with the text pre-filled
// (the guest taps Send). Without either, it returns NOT_CONFIGURED and the form says so honestly.
export async function submitExtra(type, fields, whatsappText) {
  const r = await sendExtra(type, fields);
  const num = weddingData.rsvp.whatsappNumber;
  if (!r.ok && r.code === "NOT_CONFIGURED" && num && whatsappText) {
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(whatsappText)}`, "_blank", "noopener,noreferrer");
    return { ok: true, via: "whatsapp" };
  }
  return r;
}

// Once per browser tab, and only for people who opened a personal ?g= link. Records the link name, nothing else.
export function trackOpen() {
  try {
    const g = currentGuest();
    if (!v9Data.tracking.enabled || !g || !weddingData.rsvp.endpoint) return;
    const key = `vr-open-${g.slug}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    sendExtra("open", {});
  } catch { /* tracking must never break the page */ }
}

// Free forecast, no key. Returns [{ date, max, min, rain, code }] for the wedding dates, or [] when it isn't available yet.
export async function fetchWeather() {
  const w = v9Data.weather;
  const [start, end] = [w.dates[0], w.dates[w.dates.length - 1]];
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${w.latitude}&longitude=${w.longitude}` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FKolkata&start_date=${start}&end_date=${end}`;
  const res = await fetch(url);
  if (!res.ok) return []; // out of the forecast window returns an error
  const j = await res.json();
  const d = j.daily;
  if (!d || !Array.isArray(d.time)) return [];
  return d.time
    .map((date, i) => ({ date, max: d.temperature_2m_max?.[i], min: d.temperature_2m_min?.[i], rain: d.precipitation_probability_max?.[i], code: d.weather_code?.[i] }))
    .filter((x) => Number.isFinite(x.max) && Number.isFinite(x.min));
}

// Notes for the opened time capsule: JSON rows with `name` and `note`. Only fetched after the opening date.
export async function fetchCapsule() {
  const { readUrl, openISO } = v9Data.capsule;
  if (!readUrl || Date.now() < new Date(openISO).getTime()) return [];
  const res = await fetch(`${readUrl}${readUrl.includes("?") ? "&" : "?"}kind=capsule`, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`capsule ${res.status}`);
  const rows = await res.json();
  return (Array.isArray(rows) ? rows : [])
    .filter((r) => r && typeof r.note === "string" && r.note.trim())
    .slice(0, 100)
    .map((r) => ({ name: String(r.name || "A loved one").slice(0, 60), note: r.note.trim().slice(0, 600) }));
}
