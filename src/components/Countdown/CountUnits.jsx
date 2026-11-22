import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "../../i18n/LangContext";
import "./Countdown.css";

const pad = (n) => String(n).padStart(2, "0");

// One number that slides up when its value changes.
function Num({ value }) {
  return (
    <span className="cu__num" aria-hidden="true">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "55%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-55%", opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          {pad(value)}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// Days | Hours | Minutes | Seconds. `time` comes from useCountdown().
// Screen readers get a calm static sentence instead of a ticking number.
export default function CountUnits({ time, className = "" }) {
  const { t } = useLang();
  const units = [
    ["Days", time.days],
    ["Hours", time.hours],
    ["Minutes", time.minutes],
    ["Seconds", time.seconds],
  ];
  return (
    <div className={`cu ${className}`} role="timer" aria-label={`${time.days} days, ${time.hours} hours and ${time.minutes} minutes to go`}>
      {units.map(([label, v]) => (
        <div className="cu__unit" key={label}>
          <Num value={v} />
          <span className="cu__label">{t(label)}</span>
        </div>
      ))}
    </div>
  );
}
