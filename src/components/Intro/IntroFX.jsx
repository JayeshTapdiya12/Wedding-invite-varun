import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

const DEFAULT_COLORS = ["#ff4d8d", "#ffe45c", "#a99bff", "#6ef3c5", "#fff6ea", "#ff8a3d"];

// Full-screen canvas: optional ambient embers + a burst of petals, sparks and confetti on demand.
const IntroFX = forwardRef(function IntroFX({ palette = DEFAULT_COLORS, embers: showEmbers = false }, ref) {
  const canvasRef = useRef(null);
  const api = useRef({ burst: () => {} });
  const cfg = useRef({ palette, showEmbers });
  cfg.current = { palette, showEmbers };
  const PETAL_COLORS = palette;

  useImperativeHandle(ref, () => ({ burst: (p) => api.current.burst(p) }));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf;

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const small = window.innerWidth < 640;
    const embers = Array.from({ length: small ? 26 : 50 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.8 + Math.random() * 2.2,
      vy: 0.25 + Math.random() * 0.8,
      drift: Math.random() * Math.PI * 2,
      t: Math.random() * 6,
      hue: 35 + Math.random() * 15,
    }));

    let parts = [];

    api.current.burst = (power = 1) => {
      const cx = w / 2, cy = h / 2;
      const n = Math.floor((small ? 70 : 130) * power);
      for (let i = 0; i < n; i++) {
        const kind = i % 7 === 0 ? "confetti" : i % 3 === 0 ? "spark" : "petal";
        const a = Math.random() * Math.PI * 2;
        const sp = (kind === "spark" ? 7 : 4) + Math.random() * (kind === "spark" ? 13 : 10);
        parts.push({
          kind,
          x: cx + (Math.random() - 0.5) * 30,
          y: cy + (Math.random() - 0.5) * 30,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - 3,
          s: kind === "spark" ? 1.2 + Math.random() * 2.2 : 6 + Math.random() * 9,
          rot: Math.random() * 6.28,
          vr: (Math.random() - 0.5) * 0.25,
          sway: Math.random() * 6.28,
          life: 0,
          max: 110 + Math.random() * 90,
          color: kind === "spark" ? "#fff6c9" : cfg.current.palette[Math.floor(Math.random() * cfg.current.palette.length)],
        });
      }
    };

    const drawPetal = (p, alpha) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.moveTo(0, -p.s);
      ctx.bezierCurveTo(p.s, -p.s * 0.6, p.s * 0.8, p.s * 0.8, 0, p.s);
      ctx.bezierCurveTo(-p.s * 0.8, p.s * 0.8, -p.s, -p.s * 0.6, 0, -p.s);
      ctx.fill();
      ctx.restore();
    };

    const loop = () => {
      ctx.clearRect(0, 0, w, h);

      // embers
      (cfg.current.showEmbers ? embers : []).forEach((e) => {
        e.t += 0.03;
        e.y -= e.vy;
        e.x += Math.sin(e.t + e.drift) * 0.35;
        if (e.y < -10) { e.y = h + 10; e.x = Math.random() * w; }
        const a = 0.35 + Math.sin(e.t * 2) * 0.3;
        ctx.globalAlpha = Math.max(0.05, a);
        ctx.fillStyle = `hsl(${e.hue}, 95%, 62%)`;
        ctx.shadowColor = `hsl(${e.hue}, 95%, 55%)`;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      // burst particles
      parts = parts.filter((p) => p.life < p.max && p.y < h + 60);
      parts.forEach((p) => {
        p.life++;
        p.vx *= 0.985;
        p.vy = p.vy * 0.985 + (p.kind === "spark" ? 0.18 : 0.13);
        p.sway += 0.06;
        p.x += p.vx + (p.kind === "petal" ? Math.sin(p.sway) * 0.8 : 0);
        p.y += p.vy;
        p.rot += p.vr;
        const alpha = Math.min(1, (p.max - p.life) / 30);
        if (p.kind === "petal") {
          drawPetal(p, alpha * 0.95);
        } else if (p.kind === "spark") {
          ctx.globalAlpha = alpha;
          ctx.fillStyle = p.color;
          ctx.shadowColor = "#ffd76a";
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.globalAlpha = alpha;
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
          ctx.restore();
        }
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="intro-fx" />;
});

export default IntroFX;
