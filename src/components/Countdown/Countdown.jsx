import { motion } from "framer-motion";
import { useCountdown } from "../../hooks/useCountdown";
import { weddingData as d } from "../../data/weddingData";
import { useLang } from "../../i18n/LangContext";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import { Mandala } from "../common/Ornaments";
import CountUnits from "./CountUnits";
import "./Countdown.css";

export default function Countdown() {
  const time = useCountdown(d.weddingDateISO);
  const { t } = useLang();

  return (
    <section id="countdown" className="section countdown on-dark" aria-labelledby="countdown-title">
      <Mandala className="countdown__mandala countdown__mandala--a" />
      <Mandala className="countdown__mandala countdown__mandala--b" />

      <div className="container">
        <SectionHeading eyebrow="Every Second Counts" title="The Countdown to Forever" headingId="countdown-title" />

        {time.done ? (
          <Reveal className="countdown__done">
            <motion.p className="countdown__done-title" animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 3, repeat: Infinity }}>
              {t("Today, we begin forever.")}
            </motion.p>
            <p className="lead">{t("The day has arrived. Thank you for being part of it.")}</p>
          </Reveal>
        ) : (
          <Reveal delay={0.2}>
            <CountUnits time={time} className="cu--section" />
            <p className="countdown__date">{t(d.dateRange)} · {t(d.city)}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
