// "Add to calendar": a Google Calendar link and a downloadable .ics file (works with Apple Calendar, Outlook and most phones).
import { weddingData as d } from "../data/weddingData";
import { eventDirectionsUrl } from "./links";

const pad = (n) => String(n).padStart(2, "0");
const utc = (ms) => {
  const x = new Date(ms);
  return `${x.getUTCFullYear()}${pad(x.getUTCMonth() + 1)}${pad(x.getUTCDate())}T${pad(x.getUTCHours())}${pad(x.getUTCMinutes())}${pad(x.getUTCSeconds())}Z`;
};
const span = (e) => {
  const start = new Date(e.startISO).getTime();
  return [start, start + (e.durationMin || 180) * 60000];
};
const title = (e) => `${e.title} – ${d.groom.firstName} & ${d.bride.firstName}`;
const where = (e) => `${e.venue}, ${e.address}`;
const about = (e) => `${e.description}\n\nDress code: ${e.dressCode}\nDirections: ${eventDirectionsUrl(e)}`;

export function googleCalendarUrl(e) {
  const [s, en] = span(e);
  const p = new URLSearchParams({ action: "TEMPLATE", text: title(e), dates: `${utc(s)}/${utc(en)}`, details: about(e), location: where(e) });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

const esc = (s) => String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
// RFC 5545: lines longer than 75 characters are folded
const fold = (line) => {
  if (line.length <= 74) return [line];
  const out = [line.slice(0, 74)];
  for (let i = 74; i < line.length; i += 73) out.push(" " + line.slice(i, i + 73));
  return out;
};

export function buildICS(events) {
  const stamp = utc(Date.now());
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Wedding Website//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", `X-WR-CALNAME:${esc(`${d.groom.firstName} & ${d.bride.firstName}'s Wedding`)}`];
  events.forEach((e) => {
    const [s, en] = span(e);
    lines.push(
      "BEGIN:VEVENT",
      `UID:${e.id}-${s}@wedding-site`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${utc(s)}`,
      `DTEND:${utc(en)}`,
      `SUMMARY:${esc(title(e))}`,
      `LOCATION:${esc(where(e))}`,
      `DESCRIPTION:${esc(about(e))}`,
      "BEGIN:VALARM",
      "TRIGGER:-PT2H",
      "ACTION:DISPLAY",
      `DESCRIPTION:${esc(`${e.title} starts in 2 hours`)}`,
      "END:VALARM",
      "END:VEVENT"
    );
  });
  lines.push("END:VCALENDAR");
  return lines.flatMap(fold).join("\r\n") + "\r\n";
}

export function downloadICS(events, filename = "wedding-events.ics") {
  const blob = new Blob([buildICS(events)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
