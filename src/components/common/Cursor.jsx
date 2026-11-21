import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Desktop-only cursor accent (gold dot + trailing ring). Native cursor stays visible.
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 220, damping: 24, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 220, damping: 24, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches || reduce.matches) return;
    setEnabled(true);
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e) => setHover(!!e.target.closest?.("a, button, input, select, textarea, [data-cursor]"));
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div className="cursor-ring" style={{ x: rx, y: ry }} animate={{ scale: hover ? 1.7 : 1, opacity: hover ? 0.9 : 0.6 }} transition={{ duration: 0.25 }} aria-hidden="true" />
      <motion.div className="cursor-dot" style={{ x, y }} aria-hidden="true" />
    </>
  );
}
