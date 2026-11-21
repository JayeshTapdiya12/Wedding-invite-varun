import { guestsData } from "../data/guestsData";

// Reads ?g=<slug> from the address bar. Unknown or missing slug = plain visitor (null).
let cached;
let resolved = false;

export function currentGuest() {
  if (resolved) return cached;
  resolved = true;
  cached = null;
  if (typeof window === "undefined") return cached;
  const slug = (new URLSearchParams(window.location.search).get("g") || "").trim().toLowerCase();
  if (slug && Object.prototype.hasOwnProperty.call(guestsData, slug)) cached = { slug, ...guestsData[slug] };
  return cached;
}

// Only the events this guest is invited to (everyone else sees all of them).
export function visibleEvents(allEvents) {
  const g = currentGuest();
  if (!g || !g.events || g.events === "all") return allEvents;
  const mine = allEvents.filter((e) => g.events.includes(e.id));
  return mine.length ? mine : allEvents;
}

// Language chosen by the link: ?lang=hi|en wins, then the guest's own language.
export function linkLanguage() {
  if (typeof window === "undefined") return null;
  const q = new URLSearchParams(window.location.search).get("lang");
  if (q === "hi" || q === "en") return q;
  const g = currentGuest();
  return g && (g.lang === "hi" || g.lang === "en") ? g.lang : null;
}
