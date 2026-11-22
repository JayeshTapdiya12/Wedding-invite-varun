import { galleryData } from "../../data/galleryData";
import { useLang } from "../../i18n/LangContext";
import { Link } from "../../lib/router";
import PhotoCarousel from "../PhotoCarousel/PhotoCarousel";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";
import "./Home.css";

// The photo carousel on the home page (the same photographs as "Moments to Remember").
export default function CarouselSection() {
  const { t } = useLang();
  return (
    <section id="frames" className="section frames on-dark" aria-labelledby="frames-title">
      <div className="container">
        <SectionHeading eyebrow="Capturing the Magic" title="Eternal Frames" headingId="frames-title" />
        <PhotoCarousel items={galleryData} label={t("Eternal Frames")} />
        <Reveal className="frames__more"><Link className="btn btn--light" to="/gallery">{t("See all our moments")}</Link></Reveal>
      </div>
    </section>
  );
}
