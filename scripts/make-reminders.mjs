// Ready-to-send WhatsApp reminders for every guest.
//   npm run reminders -- https://your-site.com
// Writes reminders.csv with: when to send, guest, the message, and a tap-to-open WhatsApp link.
// (The wedding date and the message texts live in src/data/v9Data.js -> reminders.)
import { writeFileSync } from "node:fs";
import { guestsData } from "../src/data/guestsData.js";
import { v9Data } from "../src/data/v9Data.js";
import { weddingData } from "../src/data/weddingData.js";

const base = (process.argv[2] || "https://your-site.vercel.app").replace(/\/+$/, "");
const wedding = new Date(weddingData.phase.startISO);
const fmt = (d) => d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });

const rows = [["Send on", "Reminder", "Guest", "Message", "WhatsApp link (tap, pick the contact, send)"]];
for (const r of v9Data.reminders) {
  const when = new Date(wedding.getTime() - r.daysBefore * 864e5);
  for (const [slug, g] of Object.entries(guestsData)) {
    const msg = r.text.replaceAll("{name}", g.name).replaceAll("{link}", `${base}/?g=${slug}`);
    rows.push([fmt(when), r.id, g.name, msg, `https://wa.me/?text=${encodeURIComponent(msg)}`]);
  }
  console.log(`${r.id.padEnd(8)} send on ${fmt(when)}`);
}
const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
writeFileSync(new URL("../reminders.csv", import.meta.url), csv + "\n");
console.log(`\nWrote reminders.csv (${rows.length - 1} messages)`);
