import { pagesData } from "../../data/pagesData";
import { useLang } from "../../i18n/LangContext";
import { Link } from "../../lib/router";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import "./Home.css";

// A photo tile for every page of the site.
export default function PageTiles() {
  const { t } = useLang();
  return (
    <section id="explore" className="section tiles" aria-labelledby="tiles-title">
      <div className="container">
        <SectionHeading eyebrow="Explore" title="Everything You Need" headingId="tiles-title" />
        <ul className="tiles__grid">
          {pagesData.map((p, i) => (
            <Reveal as="li" key={p.path} delay={(i % 3) * 0.08} y={40}>
              <Link to={p.path} className="tile">
                <img src={p.photo} alt="" loading="lazy" decoding="async" style={{ objectPosition: p.pos }} />
                <span className="tile__shade" aria-hidden="true" />
                <span className="tile__txt"><strong>{t(p.label)}</strong><small>{t(p.blurb)}</small></span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
