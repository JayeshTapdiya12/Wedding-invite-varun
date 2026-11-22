// A short confetti + message burst (used by the hidden "tap the names 5 times" surprise).
const COLORS = ["#D6B779", "#B98279", "#C9A6A0", "#EBD5D0", "#4A0E17", "#F5DFA3"];

export function burst(message) {
  if (typeof document === "undefined") return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.setAttribute("role", "status");
    Object.assign(toast.style, {
      position: "fixed", left: "50%", bottom: "90px", transform: "translateX(-50%)", zIndex: 600,
      background: "#4A0E17", color: "#F8F4EC", padding: "14px 22px", borderRadius: "999px",
      fontFamily: "Manrope, sans-serif", fontSize: ".95rem", boxShadow: "0 12px 40px rgba(0,0,0,.3)",
      maxWidth: "90vw", textAlign: "center",
    });
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4200);
  }
  if (reduce) return;

  const canvas = document.createElement("canvas");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth, h = window.innerHeight;
  canvas.width = w * dpr; canvas.height = h * dpr;
  Object.assign(canvas.style, { position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 599, pointerEvents: "none" });
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const bits = Array.from({ length: 140 }, () => {
    const a = -Math.PI / 2 + (Math.random() - 0.5) * 1.6;
    const v = 7 + Math.random() * 11;
    return { x: w / 2, y: h * 0.55, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4,
      s: 5 + Math.random() * 7, c: COLORS[(Math.random() * COLORS.length) | 0] };
  });
  const start = performance.now();
  (function frame(now) {
    const life = now - start;
    ctx.clearRect(0, 0, w, h);
    bits.forEach((b) => {
      b.vy += 0.28; b.vx *= 0.99; b.x += b.vx; b.y += b.vy; b.r += b.vr;
      ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.r);
      ctx.globalAlpha = Math.max(0, 1 - life / 3200);
      ctx.fillStyle = b.c; ctx.fillRect(-b.s / 2, -b.s / 4, b.s, b.s / 2); ctx.restore();
    });
    if (life < 3200) requestAnimationFrame(frame); else canvas.remove();
  })(start);
}
