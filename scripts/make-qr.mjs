// Makes one printable QR code per guest, pointing to their personal link (see src/data/guestsData.js).
//   npm run qr -- https://your-site.com
// Writes a qr-codes/ folder: one SVG per guest (for the printer) and qr-sheet.html (open it and print, or "Save as PDF").
import { mkdirSync, writeFileSync } from "node:fs";
import { guestsData } from "../src/data/guestsData.js";
import { qrSvg } from "../src/lib/qr.js";

const base = (process.argv[2] || "").replace(/\/+$/, "");
if (!/^https?:\/\//.test(base)) {
  console.error("Please give your website address, e.g.  npm run qr -- https://varun-radhika.vercel.app");
  process.exit(1);
}
const out = new URL("../qr-codes/", import.meta.url);
mkdirSync(out, { recursive: true });

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const cells = [];
for (const [slug, g] of Object.entries(guestsData)) {
  if (!/^[a-z0-9-]+$/.test(slug)) { console.error(`! skipped "${slug}": slugs use lowercase letters, numbers and dashes only`); process.exitCode = 1; continue; }
  const url = `${base}/?g=${slug}`;
  const svg = qrSvg(url, { scale: 6 });
  writeFileSync(new URL(`${slug}.svg`, out), svg);
  cells.push(`<figure>${svg}<figcaption>${esc(g.name)}</figcaption></figure>`);
  console.log(`${g.name.padEnd(28)} qr-codes/${slug}.svg`);
}
writeFileSync(
  new URL("qr-sheet.html", out),
  `<!doctype html><meta charset="utf-8"><title>Guest QR codes</title>
<style>body{font-family:system-ui,sans-serif;margin:24px}main{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:20px}
figure{margin:0;text-align:center;break-inside:avoid}svg{width:100%;height:auto}figcaption{font-size:14px;margin-top:6px}</style>
<h1>Scan to open your invitation</h1><main>${cells.join("")}</main>`
);
console.log(`\nWrote ${cells.length} QR codes to qr-codes/ (open qr-codes/qr-sheet.html to print them all)`);
