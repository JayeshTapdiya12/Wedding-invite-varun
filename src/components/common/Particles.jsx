import { useEffect, useRef } from "react";

// Soft floating petals + gold dust on a canvas. Cheap on purpose:
// pauses when off-screen or when the tab is hidden, scales down on small phones,
// and doesn't run at all with prefers-reduced-motion.
const PETALS = ["#EBD5D0", "#F3E0DA", "#D6B779", "#E8C9C0", "#FFFDF9"];

export default function Particles({ petals = 14, dust = 26, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const small = window.innerWidth < 640;
    const nPetals = small ? Math.ceil(petals * 0.55) : petals;
    const nDust = small ? Math.ceil(dust * 0.5) : dust;
    let w = 0, h = 0, raf = 0, visible = true;

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const petalList = Array.from({ length: nPetals }, () => ({
      x: Math.random() * w, y: Math.random() * h - h,
      s: 5 + Math.random() * 8, vy: 0.35 + Math.random() * 0.7,
      sway: Math.random() * 6.28, sv: 0.008 + Math.random() * 0.015,
      rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.03,
      color: PETALS[Math.floor(Math.random() * PETALS.length)], a: 0.5 + Math.random() * 0.4,
    }));
    const dustList = Array.from({ length: nDust }, () => ({
      x: Math.random() * w, y: Math.random() * h, r: 0.6 + Math.random() * 1.6,
      t: Math.random() * 6.28, sp: 0.012 + Math.random() * 0.02, vy: 0.1 + Math.random() * 0.25,
    }));

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = "#F5DFA3";
      dustList.forEach((d) => {
        d.t += d.sp;
        d.y -= d.vy;
        if (d.y < -4) { d.y = h + 4; d.x = Math.random() * w; }
        ctx.globalAlpha = 0.15 + ((Math.sin(d.t) + 1) / 2) * 0.7;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, 6.283);
        ctx.fill();
      });

      petalList.forEach((p) => {
        p.y += p.vy;
        p.sway += p.sv;
        p.x += Math.sin(p.sway) * 0.7;
        p.rot += p.vr;
        if (p.y > h + 20) { p.y = -20; p.x = Math.random() * w; }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.a;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(0, -p.s);
        ctx.bezierCurveTo(p.s, -p.s * 0.6, p.s * 0.8, p.s * 0.8, 0, p.s);
        ctx.bezierCurveTo(-p.s * 0.8, p.s * 0.8, -p.s, -p.s * 0.6, 0, -p.s);
        ctx.fill();
        ctx.restore();
      });
      ctx.globalAlpha = 1;
    };
    frame();

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(canvas);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [petals, dust]);

  return <canvas ref={ref} className={className} aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}
