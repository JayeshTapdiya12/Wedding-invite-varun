// Draws a shareable image on a canvas (used by the RSVP confirmation card and the selfie frame).
// Everything happens in the browser; nothing is uploaded.
import { weddingData as d } from "../data/weddingData";

export const FRAMES = {
  gold:   { name: "Champagne Gold", bg: "#F8F4EC", ink: "#4A0E17", accent: "#D6B779" },
  forest: { name: "Forest",         bg: "#4A0E17", ink: "#F8F4EC", accent: "#D6B779" },
  blush:  { name: "Rose Blush",     bg: "#EBD5D0", ink: "#4a2f2b", accent: "#B98279" },
};

const W = 1080;

function wrap(ctx, text, x, y, maxW, lh) {
  const words = text.split(" ");
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxW && line) { ctx.fillText(line, x, y); line = w; y += lh; } else line = test;
  }
  if (line) ctx.fillText(line, x, y);
  return y;
}

function coverDraw(ctx, img, x, y, w, h) {
  const r = Math.max(w / img.width, h / img.height);
  const sw = w / r, sh = h / r;
  ctx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, x, y, w, h);
}

function base(ctx, f, H) {
  ctx.fillStyle = f.bg; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = f.accent; ctx.lineWidth = 3; ctx.strokeRect(36, 36, W - 72, H - 72);
  ctx.lineWidth = 1; ctx.strokeRect(52, 52, W - 104, H - 104);
  ctx.textAlign = "center";
}

export function drawSelfieFrame(canvas, img, frameKey = "gold") {
  const f = FRAMES[frameKey] || FRAMES.gold;
  const H = 1350;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");
  base(ctx, f, H);
  const x = 110, y = 130, w = W - 220, h = 840;
  if (img) {
    ctx.save();
    // arch-shaped window
    ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x, y + w / 2); ctx.arc(x + w / 2, y + w / 2, w / 2, Math.PI, 0); ctx.lineTo(x + w, y + h); ctx.closePath();
    ctx.clip(); coverDraw(ctx, img, x, y, w, h); ctx.restore();
  } else {
    ctx.fillStyle = f.accent + "55"; ctx.fillRect(x, y, w, h);
  }
  ctx.fillStyle = f.accent; ctx.font = "600 26px Manrope, sans-serif";
  ctx.fillText("W E   A R E   G E T T I N G   M A R R I E D", W / 2, 1050);
  ctx.fillStyle = f.ink; ctx.font = "italic 400 96px 'Cormorant Garamond', Georgia, serif";
  ctx.fillText(`${d.groom.firstName} & ${d.bride.firstName}`, W / 2, 1160);
  ctx.font = "500 34px Manrope, sans-serif"; ctx.fillStyle = f.ink;
  ctx.fillText(`${d.dateRange}  ·  ${d.city.split(",")[0]}`, W / 2, 1230);
  ctx.fillStyle = f.accent; ctx.font = "600 30px Manrope, sans-serif";
  ctx.fillText(d.hashtag, W / 2, 1285);
}

export function drawRsvpCard(canvas, { name, attending, guests, events }) {
  const f = FRAMES.gold;
  const H = 1350;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");
  base(ctx, f, H);
  ctx.fillStyle = f.accent; ctx.font = "600 28px Manrope, sans-serif";
  ctx.fillText("R S V P   C O N F I R M E D", W / 2, 200);
  ctx.fillStyle = f.ink; ctx.font = "italic 400 120px 'Cormorant Garamond', Georgia, serif";
  ctx.fillText(d.groom.firstName, W / 2, 380); ctx.fillStyle = f.accent; ctx.fillText("&", W / 2, 500);
  ctx.fillStyle = f.ink; ctx.fillText(d.bride.firstName, W / 2, 620);
  ctx.fillStyle = f.accent; ctx.fillRect(W / 2 - 80, 680, 160, 2);
  ctx.fillStyle = f.ink; ctx.font = "500 44px Manrope, sans-serif";
  ctx.fillText(name, W / 2, 770);
  ctx.font = "400 34px Manrope, sans-serif";
  ctx.fillText(attending ? `Joyfully attending${guests ? ` · ${guests} ${guests > 1 ? "guests" : "guest"}` : ""}` : "Will be with us in spirit", W / 2, 830);
  if (attending && events?.length) { ctx.fillStyle = "#5B574F"; ctx.font = "400 30px Manrope, sans-serif"; wrap(ctx, events.join(" · "), W / 2, 900, W - 260, 44); }
  ctx.fillStyle = f.ink; ctx.font = "500 36px Manrope, sans-serif";
  ctx.fillText(d.dateRange, W / 2, 1120); ctx.fillText(d.city, W / 2, 1170);
  ctx.fillStyle = f.accent; ctx.font = "600 30px Manrope, sans-serif"; ctx.fillText(d.hashtag, W / 2, 1260);
}

// Thank-you card for the after-wedding page: a photo, the couple's names and a message. `img` may be null.
export function drawThankYouCard(canvas, { img, message, name }) {
  const f = FRAMES.forest;
  const H = 1350;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");
  base(ctx, f, H);
  if (img) {
    ctx.save(); ctx.beginPath(); ctx.rect(84, 84, W - 168, 700); ctx.clip();
    coverDraw(ctx, img, 84, 84, W - 168, 700);
    ctx.restore();
    ctx.strokeStyle = f.accent; ctx.lineWidth = 2; ctx.strokeRect(84, 84, W - 168, 700);
  }
  ctx.fillStyle = f.accent; ctx.font = "600 26px Manrope, sans-serif";
  ctx.fillText("W I T H   G R A T I T U D E", W / 2, 876);
  ctx.fillStyle = f.ink; ctx.font = "italic 400 104px 'Cormorant Garamond', Georgia, serif";
  ctx.fillText(`${d.groom.firstName} & ${d.bride.firstName}`, W / 2, 1000);
  ctx.font = "italic 400 44px 'Cormorant Garamond', Georgia, serif";
  wrap(ctx, name ? `${message} – ${name}` : message, W / 2, 1086, W - 260, 54);
  ctx.fillStyle = f.accent; ctx.font = "600 28px Manrope, sans-serif";
  ctx.fillText(`${d.dateRange}  ·  ${d.hashtag}`, W / 2, 1250);
}

export async function shareOrDownload(canvas, filename, title) {
  const blob = await new Promise((r) => canvas.toBlob(r, "image/png"));
  if (!blob) return "failed";
  const file = new File([blob], filename, { type: "image/png" });
  if (navigator.canShare?.({ files: [file] })) {
    try { await navigator.share({ files: [file], title }); return "shared"; } catch (e) { if (e?.name === "AbortError") return "cancelled"; }
  }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = filename; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  return "downloaded";
}
