import { useEffect, useState } from "react";
import { weddingData as d } from "../data/weddingData";

// "before" | "during" | "after" the wedding. Re-checked every minute so a page left open flips by itself.
// Add ?phase=after (or during / before) to the address to preview a phase.
export function currentPhase() {
  const { mode, startISO, endISO } = d.phase;
  const q = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("phase") : null;
  const forced = ["before", "during", "after"].includes(q) ? q : mode;
  if (forced !== "auto") return forced;
  const now = Date.now();
  if (now < new Date(startISO).getTime()) return "before";
  if (now > new Date(endISO).getTime()) return "after";
  return "during";
}

export function usePhase() {
  const [phase, setPhase] = useState(currentPhase);
  useEffect(() => {
    const id = setInterval(() => setPhase(currentPhase()), 60000);
    return () => clearInterval(id);
  }, []);
  return phase;
}
