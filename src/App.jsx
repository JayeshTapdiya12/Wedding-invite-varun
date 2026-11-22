import { useEffect, useState } from "react";
import Intro from "./components/Intro/Intro";
import Navbar from "./components/Navbar/Navbar";
import MusicButton from "./components/common/MusicButton";
import Cursor from "./components/common/Cursor";
import ScrollDecor from "./components/common/ScrollDecor";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Closing from "./components/Closing/Closing";
import { routes } from "./pages/pages";
import { RouterProvider, useRoute } from "./lib/router";
import { weddingData } from "./data/weddingData";
import { setMusicFile } from "./lib/sound";

function Pages({ ready }) {
  const { path } = useRoute();
  const Page = routes[path] || routes["/"];
  return (
    <>
      <main id="main"><ErrorBoundary key={path}><Page ready={ready} /></ErrorBoundary></main>
      <ErrorBoundary silent><Closing /></ErrorBoundary>
    </>
  );
}

export default function App() {
  const introOn = weddingData.intro.enabled;
  const [showIntro, setShowIntro] = useState(introOn);
  // `ready` flips when the intro starts to reveal the site, so hero entrances play while guests can see them
  const [ready, setReady] = useState(!introOn);

  useEffect(() => {
    setMusicFile(weddingData.music.file);
  }, []);

  return (
    <RouterProvider>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar ready={ready} />
      <Pages ready={ready} />
      <ErrorBoundary silent><ScrollDecor /></ErrorBoundary>
      <MusicButton />
      <Cursor />
      {showIntro && <Intro onReveal={() => setReady(true)} onDone={() => setShowIntro(false)} />}
    </RouterProvider>
  );
}
