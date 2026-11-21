import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import Particles from "./Particles";
import "./ScrollDecor.css";

// Three page-wide touches, all pointer-events:none:
//  - a thin gold progress bar at the very top
//  - a gold vine in the left margin that draws itself as you scroll (wide screens only)
//  - a few soft petals drifting over the whole page
const VINE =
  "M24 0 C 4 60, 44 110, 24 170 S 4 280, 24 340 S 44 450, 24 510 S 4 620, 24 680 S 44 790, 24 850 S 4 960, 24 1020";
const LEAVES = [[24, 170, 1], [24, 340, -1], [24, 510, 1], [24, 680, -1], [24, 850, 1]];

export default function ScrollDecor() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  if (reduce) return null;
  return (
    <>
      <motion.i className="sd__bar" style={{ scaleX: smooth }} aria-hidden="true" />
      <svg className="sd__vine" viewBox="0 0 48 1020" preserveAspectRatio="none" aria-hidden="true">
        <motion.path d={VINE} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" style={{ pathLength: smooth }} />
        {LEAVES.map(([x, y, s], i) => (
          <motion.path key={i} d={`M${x} ${y} q ${14 * s} -16 ${26 * s} -6 q ${-12 * s} 16 ${-26 * s} 6z`} fill="currentColor" opacity=".55"
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} style={{ transformOrigin: `${x}px ${y}px` }} />
        ))}
      </svg>
      <div className="sd__petals" aria-hidden="true"><Particles petals={7} dust={0} /></div>
    </>
  );
}
