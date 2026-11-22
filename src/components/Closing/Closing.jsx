import { motion } from "framer-motion";
import { weddingData as d } from "../../data/weddingData";
import { useLang } from "../../i18n/LangContext";
import SplitText from "../common/SplitText";
import Reveal from "../common/Reveal";
import ShareButton from "../common/ShareButton";
import { extrasData } from "../../data/extrasData";
import { FloralSprig, GoldDivider } from "../common/Ornaments";
import "./Closing.css";

const EASE = [0.22, 1, 0.36, 1];

export default function Closing() {
  const { t, lang } = useLang();
  const groom = lang === "hi" && d.groom.hindiName ? d.groom.hindiName : d.groom.firstName;
  const bride = lang === "hi" && d.bride.hindiName ? d.bride.hindiName : d.bride.firstName;
  return (
    <>
      <section className="closing" aria-labelledby="closing-line">
        <FloralSprig className="closing__sprig closing__sprig--tl" />
        <FloralSprig className="closing__sprig closing__sprig--tr" />
        <FloralSprig className="closing__sprig closing__sprig--bl" />
        <FloralSprig className="closing__sprig closing__sprig--br" />

        <div className="container closing__inner">
          <motion.div initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: EASE }}>
            <img className="closing__logo" src="/logo.png" alt={`${d.hashtag} wedding logo`} width="900" height="652" loading="lazy" />
          </motion.div>

          <h2 className="closing__line" id="closing-line">
            <SplitText key={lang} text={t(d.closing.line)} stagger={0.018} />
          </h2>

          <Reveal delay={0.2}><GoldDivider className="closing__divider" /></Reveal>

          <Reveal as="p" className="closing__names" delay={0.3} y={30} duration={1.4}>
            {groom} <span>&amp;</span> {bride}
          </Reveal>
          <Reveal as="p" className="closing__date" delay={0.45}>{t(d.dateRange)} · {t(d.city)}</Reveal>

          <ul className="closing__hosts">
            {d.familyHosts.map((h, i) => (
              <Reveal as="li" key={h.role} delay={0.5 + i * 0.12} y={20}>
                <small>{t(h.role)}</small>
                <strong>{t(h.names)}</strong>
                <em>{t(h.title)}</em>
              </Reveal>
            ))}
          </ul>

          <Reveal className="closing__share" delay={0.2}>
            <p>{t(extrasData.share.text)}</p>
            <ShareButton />
          </Reveal>
        </div>
      </section>

      <footer className="footer">
        <p className="footer__line">{t(d.closing.footer)}</p>
        <p className="footer__tag">{d.hashtag}</p>
        <button type="button" className="footer__top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{t("Back to top")} ↑</button>
      </footer>
    </>
  );
}
