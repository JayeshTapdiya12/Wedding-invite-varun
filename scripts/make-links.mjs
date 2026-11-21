// Prints one personalised invitation link per guest (see src/data/guestsData.js).
//   npm run links -- https://your-site.com
// Also writes invite-links.csv next to package.json so you can paste it into a sheet or WhatsApp broadcast.
import { writeFileSync } from "node:fs";
import { guestsData } from "../src/data/guestsData.js";
import { eventsData } from "../src/data/eventsData.js";

const base = (process.argv[2] || "https://your-site.vercel.app").replace(/\/+$/, "");
const rows = [["Guest", "Events", "Language", "Link"]];

for (const [slug, g] of Object.entries(guestsData)) {
  if (!/^[a-z0-9-]+$/.test(slug)) {
    console.error(`! "${slug}" is not a valid slug (use lowercase letters, numbers and dashes only)`);
    process.exitCode = 1;
    continue;
  }
  const ids = g.events === "all" || !g.events ? "all" : g.events;
  const bad = Array.isArray(ids) ? ids.filter((id) => !eventsData.some((e) => e.id === id)) : [];
  if (bad.length) { console.error(`! ${slug}: unknown event id(s): ${bad.join(", ")}`); process.exitCode = 1; }
  const link = `${base}/?g=${slug}`;
  rows.push([g.name, ids === "all" ? "All events" : ids.join(" + "), g.lang === "hi" ? "Hindi" : "English", link]);
  console.log(`${g.name.padEnd(28)} ${link}`);
}

const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
writeFileSync(new URL("../invite-links.csv", import.meta.url), csv + "\n");
console.log(`\nWrote invite-links.csv (${rows.length - 1} guests)`);
