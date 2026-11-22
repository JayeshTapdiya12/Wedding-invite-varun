import { Share2 } from "lucide-react";
import { extrasData } from "../../data/extrasData";
import { useLang } from "../../i18n/LangContext";

// Shares the PLAIN site link (never a guest's personal ?g= link).
export default function ShareButton({ className = "btn btn--solid" }) {
  const { t } = useLang();
  const s = extrasData.share;
  const url = typeof window !== "undefined" ? window.location.origin + window.location.pathname : "";

  const go = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: s.message, text: s.message, url }); return; } catch (e) { if (e?.name === "AbortError") return; }
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(`${s.message}\n${url}`)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <button type="button" className={className} onClick={go}>
      <Share2 size={16} strokeWidth={1.6} aria-hidden="true" /> {t(s.button)}
    </button>
  );
}
