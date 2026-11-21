import Hero from "../components/Hero/Hero";
import CoupleReveal from "../components/CoupleReveal/CoupleReveal";
import PhotoStack from "../components/CoupleReveal/PhotoStack";
import PhotoBooth from "../components/PhotoBooth/PhotoBooth";
import OurStory from "../components/OurStory/OurStory";
import VideoSection from "../components/VideoSection/VideoSection";
import Gallery from "../components/Gallery/Gallery";
import WeddingEvents from "../components/WeddingEvents/WeddingEvents";
import LiveStream from "../components/LiveStream/LiveStream";
import Countdown from "../components/Countdown/Countdown";
import Quiz from "../components/Quiz/Quiz";
import RSVP from "../components/RSVP/RSVP";
import Venue from "../components/Venue/Venue";
import Travel from "../components/Travel/Travel";
import Faq from "../components/Faq/Faq";
import Album from "../components/Album/Album";
import Teaser from "../components/Teaser/Teaser";
import Stories from "../components/Stories/Stories";
import LoveMap from "../components/LoveMap/LoveMap";
import SwipeGame from "../components/SwipeGame/SwipeGame";
import IndoreGuide from "../components/IndoreGuide/IndoreGuide";
import Weather from "../components/Weather/Weather";
import TableFinder from "../components/TableFinder/TableFinder";
import SongRequest from "../components/SongRequest/SongRequest";
import TimeCapsule from "../components/TimeCapsule/TimeCapsule";
import ThankYou from "../components/ThankYou/ThankYou";
import Closing from "../components/Closing/Closing";
import { useEffect } from "react";
import { trackOpen } from "../lib/extraApi";
import { usePhase } from "../hooks/usePhase";
import ErrorBoundary from "../components/common/ErrorBoundary";

// One broken section never blanks the whole page: it is skipped and the error is logged in the browser console.
const Safe = ({ children }) => <ErrorBoundary silent>{children}</ErrorBoundary>;

// The page changes by itself around the wedding (see `phase` in weddingData.js):
//   before : the full invitation
//   during : + live stream (if enabled) and the shared photo album
//   after  : thank-you mode. Countdown, RSVP, quiz, travel and FAQ are hidden; the photo album moves to the top.
export default function Home({ ready }) {
  const phase = usePhase();
  const after = phase === "after";
  useEffect(() => { trackOpen(); }, []);

  return (
    <>
      <Hero ready={ready} />
      <Safe><Teaser /></Safe>
      <Safe><CoupleReveal /></Safe>
      <Safe><PhotoStack /></Safe>
      {after && <Safe><ThankYou /></Safe>}
      {after && <Safe><Album prominent /></Safe>}
      <Safe><Stories /></Safe>
      <Safe><OurStory /></Safe>
      <Safe><LoveMap /></Safe>
      <Safe><VideoSection /></Safe>
      <Safe><Gallery /></Safe>
      <Safe><SwipeGame /></Safe>
      <Safe><WeddingEvents /></Safe>
      {!after && <Safe><LiveStream /></Safe>}
      {!after && <Safe><Countdown /></Safe>}
      {!after && <Safe><Quiz /></Safe>}
      {!after && <Safe><RSVP /></Safe>}
      <Safe><Venue /></Safe>
      {!after && <Safe><Travel /></Safe>}
      {!after && <Safe><Weather /></Safe>}
      {!after && <Safe><IndoreGuide /></Safe>}
      {!after && <Safe><Faq /></Safe>}
      <Safe><TableFinder /></Safe>
      {!after && <Safe><SongRequest /></Safe>}
      {phase === "during" && <Safe><Album /></Safe>}
      <Safe><TimeCapsule /></Safe>
      <Safe><PhotoBooth /></Safe>
      <Safe><Closing /></Safe>
    </>
  );
}
