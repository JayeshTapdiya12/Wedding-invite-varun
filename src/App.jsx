import { useCallback, useState } from "react";
import { MotionConfig } from "framer-motion";
import EnvelopeIntro from "./components/EnvelopeIntro";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Story from "./components/Story";
import Families from "./components/Families";
import Gallery from "./components/Gallery";
import Film from "./components/Film";
import Events from "./components/Events";
import RoyalDarbar from "./components/RoyalDarbar";
import Venue from "./components/Venue";
import Closing from "./components/Closing";
import Footer from "./components/Footer";

export default function App() {
  const [invitationOpen, setInvitationOpen] = useState(
    () => sessionStorage.getItem("wedding-intro-seen") === "true",
  );
  const openInvitation = useCallback(() => {
    sessionStorage.setItem("wedding-intro-seen", "true");
    setInvitationOpen(true);
  }, []);
  const replayIntro = useCallback(() => {
    sessionStorage.removeItem("wedding-intro-seen");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setInvitationOpen(false);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen w-full overflow-x-hidden">
        <EnvelopeIntro isOpen={invitationOpen} onOpen={openInvitation} />

        <main inert={!invitationOpen}>
          <Navigation />
          <Hero />
          <Story />
          <Families />
          <Gallery />
          <Film />
          <Events />
          <RoyalDarbar />
          <Venue />
          <Closing />
        </main>
        {invitationOpen && <Footer onReplay={replayIntro} />}
      </div>
    </MotionConfig>
  );
}