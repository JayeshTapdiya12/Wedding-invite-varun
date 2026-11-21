import Reveal from "./Reveal";
import SplitText from "./SplitText";
import { GoldDivider } from "./Ornaments";
import { useLang } from "../../i18n/LangContext";

export default function SectionHeading({ eyebrow, title, lead, headingId, children }) {
  const { t } = useLang();
  return (
    <header className="section-head">
      {eyebrow && (
        <Reveal as="p" className="eyebrow" y={16}>
          {t(eyebrow)}
        </Reveal>
      )}
      <h2 className="h2" id={headingId}>
        {/* key forces the reveal to replay in the new language */}
        <SplitText key={t(title)} text={t(title)} stagger={0.03} />
      </h2>
      <Reveal delay={0.25} y={10}>
        <GoldDivider className="divider" />
      </Reveal>
      {lead && (
        <Reveal as="p" className="lead" delay={0.35} y={18}>
          {t(lead)}
        </Reveal>
      )}
      {children}
    </header>
  );
}
