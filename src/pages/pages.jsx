import { useEffect } from "react";
import { weddingData as d } from "../data/weddingData";
import { eventsHeading } from "../data/eventsData";
import { galleryHeading } from "../data/galleryData";
import { wardrobeHeading } from "../data/wardrobeData";
import { invitationHeading, familiesHeading } from "../data/invitationData";
import { usePhase } from "../hooks/usePhase";
import { trackOpen } from "../lib/extraApi";
import ErrorBoundary from "../components/common/ErrorBoundary";
import PageHero from "../components/common/PageHero";
import Hero from "../components/Hero/Hero";
import Countdown from "../components/Countdown/Countdown";
import Teaser from "../components/Teaser/Teaser";
import CoupleReveal from "../components/CoupleReveal/CoupleReveal";
import PhotoStack from "../components/CoupleReveal/PhotoStack";
import CarouselSection from "../components/Home/CarouselSection";
import EventsPreview from "../components/Home/EventsPreview";
import PageTiles from "../components/Home/PageTiles";
import WeddingEvents from "../components/WeddingEvents/WeddingEvents";
import Gallery from "../components/Gallery/Gallery";
import Stories from "../components/Stories/Stories";
import VideoSection from "../components/VideoSection/VideoSection";
import Wardrobe from "../components/Wardrobe/Wardrobe";
import Venue from "../components/Venue/Venue";
import Travel from "../components/Travel/Travel";
import Weather from "../components/Weather/Weather";
import IndoreGuide from "../components/IndoreGuide/IndoreGuide";
import TableFinder from "../components/TableFinder/TableFinder";
import Invitation from "../components/Invitation/Invitation";
import Family from "../components/Family/Family";
import LiveStream from "../components/LiveStream/LiveStream";
import Quiz from "../components/Quiz/Quiz";
import PhotoBooth from "../components/PhotoBooth/PhotoBooth";
import Album from "../components/Album/Album";
import WishesWall from "../components/WishesWall/WishesWall";
import VoiceNote from "../components/VoiceNote/VoiceNote";
import TimeCapsule from "../components/TimeCapsule/TimeCapsule";
import ThankYou from "../components/ThankYou/ThankYou";

// One broken section never blanks the whole page: it is skipped and the error is logged in the browser console.
const Safe = ({ children }) => <ErrorBoundary silent>{children}</ErrorBoundary>;

export function HomePage({ ready }) {
  const phase = usePhase();
  const after = phase === "after";
  useEffect(() => { trackOpen(); }, []);
  return (
    <>
      <Hero ready={ready} />
      {!after && <Safe><Countdown /></Safe>}
      <Safe><Teaser /></Safe>
      <Safe><CoupleReveal /></Safe>
      <Safe><CarouselSection /></Safe>
      {after && <Safe><ThankYou /></Safe>}
      <Safe><PhotoStack /></Safe>
      <Safe><EventsPreview /></Safe>
      <Safe><PageTiles /></Safe>
    </>
  );
}

// Inner pages: a banner, then the sections. `.page` also hides the first section's own heading (the banner replaces it).
const Page = ({ hero, children }) => (
  <div className="page">
    <PageHero {...hero} />
    {children}
  </div>
);

export function CelebrationsPage() {
  return <Page hero={{ eyebrow: eventsHeading.eyebrow, title: eventsHeading.heading, lead: eventsHeading.intro, hindi: "शुभारंभ · मंगल परिणय" }}><Safe><WeddingEvents withHeading={false} /></Safe></Page>;
}
export function GalleryPage() {
  return <Page hero={{ eyebrow: galleryHeading.eyebrow, title: galleryHeading.heading, lead: "Drag, swipe or use the arrows. Tap the centre photo to see it full size." }}><Safe><Gallery standalone /></Safe></Page>;
}
export function StoriesPage() {
  return (
    <Page hero={{ eyebrow: "Tap Through", title: "Our Stories", lead: "Tap a circle and watch our story, one moment at a time." }}>
      <Safe><Stories /></Safe>
      <Safe><VideoSection /></Safe>
    </Page>
  );
}
export function WardrobePage() {
  return <Page hero={{ eyebrow: wardrobeHeading.eyebrow, title: wardrobeHeading.heading, lead: wardrobeHeading.lead }}><Safe><Wardrobe withHeading={false} /></Safe></Page>;
}
export function VenuePage() {
  return (
    <Page hero={{ eyebrow: "The Wedding Venue", title: d.venue.name, lead: d.venue.address }}>
      <Safe><Venue /></Safe>
      <Safe><TableFinder /></Safe>
    </Page>
  );
}
export function TravelPage() {
  return (
    <Page hero={{ eyebrow: "Welcome to Indore", title: "Travel & Indore", lead: "How to get here, what the weather will be like, and where to eat." }}>
      <Safe><Travel /></Safe>
      <Safe><Weather /></Safe>
      <Safe><IndoreGuide /></Safe>
    </Page>
  );
}
export function InvitationPage() {
  return <Page hero={{ eyebrow: invitationHeading.eyebrow, title: invitationHeading.heading, lead: invitationHeading.lead }}><Safe><Invitation withHeading={false} /></Safe></Page>;
}
export function FamilyPage() {
  return <Page hero={{ eyebrow: familiesHeading.eyebrow, title: "Family & Contacts", lead: familiesHeading.lead }}><Safe><Family withHeading={false} /></Safe></Page>;
}
export function PlayPage() {
  const phase = usePhase();
  const after = phase === "after";
  return (
    <Page hero={{ eyebrow: "Make It Memorable", title: "Play & Share", lead: "A quiz, a selfie frame, a shared album and a letter to the future." }}>
      {after && <Safe><ThankYou /></Safe>}
      {!after && <Safe><LiveStream /></Safe>}
      {!after && <Safe><Quiz /></Safe>}
      <Safe><PhotoBooth /></Safe>
      <Safe><Album /></Safe>
      <Safe><WishesWall /></Safe>
      <Safe><VoiceNote /></Safe>
      <Safe><TimeCapsule /></Safe>
    </Page>
  );
}

// path -> page. Anything else shows the home page.
export const routes = {
  "/": HomePage,
  "/celebrations": CelebrationsPage,
  "/gallery": GalleryPage,
  "/stories": StoriesPage,
  "/wardrobe": WardrobePage,
  "/venue": VenuePage,
  "/travel": TravelPage,
  "/invitation": InvitationPage,
  "/family": FamilyPage,
  "/play": PlayPage,
};
