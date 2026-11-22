import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, RotateCcw, X } from "lucide-react";
import { weddingData as d } from "../../data/weddingData";
import { useLang } from "../../i18n/LangContext";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import "./Quiz.css";

const EASE = [0.22, 1, 0.36, 1];

// "How well do you know us?" Off until `quiz.enabled` is true (replace the sample questions first).
export default function Quiz() {
  const q = d.quiz;
  const { t } = useLang();
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  if (!q?.enabled || !q.questions?.length) return null;
  const total = q.questions.length;
  const cur = q.questions[i];

  const choose = (idx) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === cur.answer) setScore((s) => s + 1);
  };
  const next = () => {
    if (i + 1 >= total) setDone(true);
    else { setI(i + 1); setPicked(null); }
  };
  const again = () => { setI(0); setPicked(null); setScore(0); setDone(false); };

  const ratio = score / total;
  const verdict = ratio >= 0.8 ? "You know us so well!" : ratio >= 0.5 ? "Not bad at all!" : "Come and ask us more at the wedding!";

  return (
    <section id="quiz" className="section quiz" aria-labelledby="quiz-title">
      <div className="container">
        <SectionHeading eyebrow={q.eyebrow} title={q.heading} headingId="quiz-title" />
        <Reveal className="quiz__card">
          <AnimatePresence mode="wait" initial={false}>
            {done ? (
              <motion.div key="end" className="quiz__end" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }}>
                <p className="quiz__score">{score}<span> / {total}</span></p>
                <h3>{t(verdict)}</h3>
                <button className="btn" onClick={again}><RotateCcw size={16} strokeWidth={1.6} aria-hidden="true" /> {t("Play again")}</button>
              </motion.div>
            ) : (
              <motion.div key={i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.45, ease: EASE }}>
                <p className="quiz__count">{t("Question")} {i + 1} {t("of")} {total}</p>
                <h3 className="quiz__q">{t(cur.q)}</h3>
                <div className="quiz__opts" role="group" aria-label={t(cur.q)}>
                  {cur.options.map((o, idx) => {
                    const state = picked === null ? "" : idx === cur.answer ? "is-right" : idx === picked ? "is-wrong" : "is-dim";
                    return (
                      <button key={o} className={`quiz__opt ${state}`} onClick={() => choose(idx)} disabled={picked !== null} aria-pressed={picked === idx}>
                        <span>{t(o)}</span>
                        {state === "is-right" && <Check size={18} strokeWidth={2} aria-hidden="true" />}
                        {state === "is-wrong" && <X size={18} strokeWidth={2} aria-hidden="true" />}
                      </button>
                    );
                  })}
                </div>
                <div className="quiz__foot" aria-live="polite">
                  {picked !== null && (
                    <>
                      <p>{picked === cur.answer ? t("Correct!") : t("Not quite.")}</p>
                      <button className="btn btn--solid" onClick={next}>{i + 1 >= total ? t("See my score") : t("Next question")}</button>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
