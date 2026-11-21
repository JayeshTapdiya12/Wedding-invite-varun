// Lists every English string the site passes through t() and which of them still have no Hindi translation.
//   node scripts/i18n-audit.mjs          -> prints missing ones (exit code 1 if any)
//   node scripts/i18n-audit.mjs --all    -> prints every string
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { weddingData as w } from "../src/data/weddingData.js";
import { eventsData, eventsHeading } from "../src/data/eventsData.js";
import { galleryData, galleryCategories, galleryHeading } from "../src/data/galleryData.js";
import { v9Data } from "../src/data/v9Data.js";
import { hi } from "../src/i18n/hi.js";

const found = new Set();
const add = (s) => { if (typeof s === "string" && s.trim()) found.add(s); };

// 1) literals inside t("...") and SectionHeading props in the components
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
for (const f of walk("src").filter((f) => /\.jsx$/.test(f))) {
  const s = readFileSync(f, "utf8");
  for (const m of s.matchAll(/\bt\(\s*"((?:[^"\\]|\\.)*)"\s*\)/g)) add(m[1].replace(/\\"/g, '"'));
  for (const m of s.matchAll(/\b(?:eyebrow|title|lead)="([^"]+)"/g)) add(m[1]);
  // string arrays used with t(label) in components: nav links, units, choices, verdicts, errors
  for (const m of s.matchAll(/\[\s*"([A-Z][^"]*)"\s*,\s*"#[a-z]+"\s*\]/g)) add(m[1]);
  for (const m of s.matchAll(/\["(?:yes|no)",\s*"([^"]+)"\]/g)) add(m[1]);
  for (const m of s.matchAll(/\["(Days|Hours|Minutes|Seconds)"/g)) add(m[1]);
  for (const m of s.matchAll(/(?:e\.(?:name|phone|events)\s*=\s*|(?:NOT_CONFIGURED|NETWORK|SERVER):\s*)"([^"]+)"/g)) add(m[1]);
  for (const m of s.matchAll(/ratio >= [\d.]+ \? "([^"]+)"|: "(Come and ask[^"]+)"/g)) add(m[1] || m[2]);
}
// 2) data-driven text
// v9Data: every visible string (skips links, ids, numbers, dates, reminder texts and the guest names in the seating list)
const SKIP = new Set(["emoji", "showFrom", "src", "poster", "photo", "map", "id", "openISO", "filmUrl", "readUrl", "downloads", "latitude", "longitude", "dates", "reminders", "guests", "openLabel", "cardMessage_"]);
const walkV9 = (o) => { if (typeof o === "string") add(o); else if (Array.isArray(o)) o.forEach(walkV9); else if (o && typeof o === "object") for (const [k, v] of Object.entries(o)) if (!SKIP.has(k)) walkV9(v); };
walkV9(v9Data);
[w.inviteMessage, w.dateRange, w.city].forEach(add);
[w.story.eyebrow, w.story.heading].forEach(add);
w.story.chapters.forEach((c) => [c.kicker, c.title, c.text].forEach(add));
Object.values(w.videoSection).forEach(add);
w.videos.forEach((v) => [v.title, v.kind].forEach(add));
[w.venue.eyebrow, w.venue.heading, w.venue.note].forEach(add);
[w.rsvp.eyebrow, w.rsvp.heading, w.rsvp.replyBy, ...w.rsvp.mealOptions].forEach(add);
[w.closing.line, w.closing.footer].forEach(add);
w.familyHosts.forEach((h) => [h.role, h.names, h.title].forEach(add));
[w.phase.afterTitle, w.phase.afterText, w.voiceNote.title, w.voiceNote.caption].forEach(add);
[w.liveStream.eyebrow, w.liveStream.heading, w.liveStream.note].forEach(add);
[w.quiz.eyebrow, w.quiz.heading].forEach(add);
[w.album.eyebrow, w.album.heading, w.album.text, w.album.button, w.wishesWall.heading].forEach(add);
[w.travel.eyebrow, w.travel.heading, w.travel.intro, w.travel.stayHeading, w.travel.contact.label].forEach(add);
w.travel.cards.forEach((c) => [c.title, c.text].forEach(add));
w.travel.hotels.forEach((h) => add(h.note));
[w.faq.eyebrow, w.faq.heading].forEach(add);
w.faq.items.forEach((i) => [i.q, i.a].forEach(add));
Object.values(eventsHeading).forEach(add);
eventsData.forEach((e) => [e.day, e.date, e.time, e.title, e.description, e.dressCode, e.short].forEach(add));
Object.values(galleryHeading).forEach(add);
galleryCategories.forEach(add);
galleryData.forEach((g) => add(g.caption));

["December 13", "December 14"].forEach(add); // shown without the year in the RSVP list
found.delete("English text"); // appears only in a code comment
const all = [...found].sort();
const missing = all.filter((s) => !hi[s]);
const orphan = Object.keys(hi).filter((k) => !found.has(k));
if (process.argv.includes("--all")) all.forEach((s) => console.log(JSON.stringify(s)));
else {
  console.log(`${all.length} strings, ${all.length - missing.length} translated, ${missing.length} missing`);
  missing.forEach((s) => console.log("  MISSING:", JSON.stringify(s)));
  if (orphan.length) console.log(`(${orphan.length} dictionary entries are not used by the site, harmless)`, orphan.slice(0, 8).map((x) => JSON.stringify(x)).join(" "));
}
process.exitCode = missing.length ? 1 : 0;
