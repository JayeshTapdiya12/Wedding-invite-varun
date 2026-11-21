import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { hi } from "./hi";
import { linkLanguage } from "../lib/guest";

// English / Hindi. `t("English text")` returns the Hindi text if one exists in src/i18n/hi.js,
// otherwise the English text unchanged, so a missing translation never breaks the page.
const KEY = "vr-wedding-lang";
const Ctx = createContext({ lang: "en", setLang: () => {}, t: (s) => s });

function initialLang() {
  const fromLink = linkLanguage();
  if (fromLink) return fromLink;
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "hi" || saved === "en") return saved;
  } catch { /* storage can be blocked */ }
  return "en";
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang === "hi" ? "hi" : "en";
  }, [lang]);

  const setLang = useCallback((l) => {
    setLangState(l);
    try { localStorage.setItem(KEY, l); } catch { /* ignore */ }
  }, []);

  const t = useCallback((s) => (lang === "hi" && typeof s === "string" && hi[s] ? hi[s] : s), [lang]);
  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
