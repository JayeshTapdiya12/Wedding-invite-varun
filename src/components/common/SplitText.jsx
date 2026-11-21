import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const group = (stagger, delay) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});
const letter = {
  hidden: { y: "108%", opacity: 0, rotate: 4 },
  show: { y: "0%", opacity: 1, rotate: 0, transition: { duration: 1, ease: EASE } },
};

// Devanagari letters join into clusters (conjuncts, vowel signs). Putting each code point in its own box
// breaks that shaping, so for Hindi we animate whole words instead of single letters.
const hasIndic = (s) => /[ऀ-ॿ]/.test(s);
const maskStyle = { display: "inline-block", overflow: "hidden", verticalAlign: "bottom", padding: "0.12em 0.02em 0.16em", margin: "-0.12em -0.02em -0.16em" };

// Staggered reveal.
//  - pass `active` (boolean) to control it manually (e.g. hero after the intro)
//  - omit `active` to play once when scrolled into view
export default function SplitText({ text, as = "span", className, delay = 0, stagger = 0.045, active, ...rest }) {
  const Tag = motion[as] ?? motion.span;
  const byWord = hasIndic(text);
  const trigger =
    active === undefined
      ? { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-60px" } }
      : { initial: "hidden", animate: active ? "show" : "hidden" };

  return (
    <Tag className={className} variants={group(byWord ? stagger * 4 : stagger, delay)} {...trigger} aria-label={text} {...rest}>
      {text.split(" ").map((word, wi, arr) => (
        <span key={wi} aria-hidden="true" style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {byWord ? (
            <span style={maskStyle}>
              <motion.span variants={letter} style={{ display: "inline-block" }}>{word}</motion.span>
            </span>
          ) : (
            [...word].map((ch, ci) => (
              <span key={ci} style={maskStyle}>
                <motion.span variants={letter} style={{ display: "inline-block" }}>{ch}</motion.span>
              </span>
            ))
          )}
          {wi < arr.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
