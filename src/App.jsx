import { useState } from "react";
import EnvelopeIntro from "./components/EnvelopeIntro";
import Hero from "./components/Hero";
import Events from "./components/Events";
import RoyalDarbar from "./components/RoyalDarbar";
import Footer from "./components/Footer";

export default function App() {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <EnvelopeIntro isOpen={envelopeOpen} onOpen={() => setEnvelopeOpen(true)} />

      <main>
        <Hero />
        <Events />
        <RoyalDarbar />
        <Footer />
      </main>
    </div>
  );
}