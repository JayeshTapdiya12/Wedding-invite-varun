import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { LangProvider } from "./i18n/LangContext";
import ErrorBoundary from "./components/common/ErrorBoundary";
import "./styles/global.css";
import "./styles/animations.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <LangProvider>
        <App />
      </LangProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

// Offline mode: only in the real (built) site, never while developing.
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
}
