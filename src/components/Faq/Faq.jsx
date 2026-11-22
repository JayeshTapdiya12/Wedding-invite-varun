import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { weddingData as d } from "../../data/weddingData";
import { useLang } from "../../i18n/LangContext";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import "./Faq.css";

const EASE = [0.22, 1, 0.36, 1];

export default function Faq() {
  const f = d.faq;
  const { t } = useLang();
  const [open, setOpen] = useState(0);
  const items = f.items.filter((i) => i.q && i.a);

  return (
    <section id="faq" className="section faq" aria-labelledby="faq-title">
      <div className="container">
        <SectionHeading eyebrow={f.eyebrow} title={f.heading} headingId="faq-title" />
        <div className="faq__list">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={it.q} className="faq__item" delay={Math.min(i, 5) * 0.06} y={20}>
                <h3>
                  <button className="faq__q" aria-expanded={isOpen} aria-controls={`faq-a-${i}`} id={`faq-q-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                    <span>{t(it.q)}</span>
                    {isOpen ? <Minus size={20} strokeWidth={1.4} aria-hidden="true" /> : <Plus size={20} strokeWidth={1.4} aria-hidden="true" />}
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      className="faq__a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      <p>{t(it.a)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
