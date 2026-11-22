import { motion } from "framer-motion";
import { useEffect } from "react";
import { weddingData as d } from "../../data/weddingData";
import { useLang } from "../../i18n/LangContext";
import { GoldDivider } from "./Ornaments";
import SplitText from "./SplitText";
import Particles from "./Particles";
import "./PageHero.css";

const EASE = [0.22, 1, 0.36, 1];

// The banner at the top of every inner page. Also sets the browser tab title.
export default function PageHero({ eyebrow, title, lead, hindi }) {
  const { t } = useLang();
  useEffect(() => {
    document.title = `${t(title)} | ${d.groom.firstName} & ${d.bride.firstName} | ${d.hashtag}`;
    return () => { document.title = d.seo.title; };
  }, [title, t]);

  return (
    <header className="phero on-dark">
      <Particles petals={5} dust={14} />
      <div className="container phero__in">
        {hindi && <motion.p className="phero__hindi" lang="hi" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }}>{hindi}</motion.p>}
        {eyebrow && <motion.p className="eyebrow" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}>{t(eyebrow)}</motion.p>}
        <h1 className="phero__title"><SplitText key={t(title)} text={t(title)} stagger={0.035} active /></h1>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, delay: 0.5, ease: EASE }} style={{ originX: 0.5 }}>
          <GoldDivider className="phero__divider" />
        </motion.div>
        {lead && <motion.p className="lead phero__lead" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.6, ease: EASE }}>{t(lead)}</motion.p>}
      </div>
    </header>
  );
}
