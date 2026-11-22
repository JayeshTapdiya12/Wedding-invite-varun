import { Component } from "react";

// If something in the page crashes, show what happened instead of a silent blank screen.
// `silent` = for purely decorative parts: hide just that part and keep the rest of the site working.
export default class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { console.error("Site error:", error, info?.componentStack); }
  render() {
    if (!this.state.error) return this.props.children;
    if (this.props.silent) return null;
    return (
      <div style={{ padding: "48px 24px", maxWidth: 720, margin: "0 auto", fontFamily: "system-ui, sans-serif", color: "#292723" }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}>Something went wrong</h1>
        <p>Please refresh the page. If it keeps happening, send this message to whoever built the site:</p>
        <pre style={{ whiteSpace: "pre-wrap", background: "#fff", border: "1px solid #ddd", padding: 14, fontSize: 13 }}>{String(this.state.error?.stack || this.state.error)}</pre>
      </div>
    );
  }
}
