// A tiny router (no extra package). Every page has its own address, for example /celebrations.
// The guest's link settings (?g=..., ?lang=..., ?phase=...) are carried along when moving between pages.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const RouterContext = createContext({ path: "/", navigate: () => {} });

const clean = (p) => {
  const x = (p || "/").replace(/\/+$/, "");
  return x === "" ? "/" : x;
};
const here = () => (typeof window === "undefined" ? "/" : clean(window.location.pathname));

export function RouterProvider({ children }) {
  const [path, setPath] = useState(here);

  useEffect(() => {
    const onPop = () => setPath(here());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((to) => {
    const [pathname, hash = ""] = to.split("#");
    const target = clean(pathname) + window.location.search + (hash ? `#${hash}` : "");
    if (clean(pathname) === here() && !hash) { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    window.history.pushState({}, "", target);
    setPath(clean(pathname));
    if (hash) setTimeout(() => document.getElementById(hash)?.scrollIntoView(), 60);
    else window.scrollTo(0, 0);
  }, []);

  const value = useMemo(() => ({ path, navigate }), [path, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export const useRoute = () => useContext(RouterContext);

export function Link({ to, onClick, children, ...rest }) {
  const { navigate } = useRoute();
  const search = typeof window === "undefined" ? "" : window.location.search;
  const handle = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  return <a href={to + search} onClick={handle} {...rest}>{children}</a>;
}
