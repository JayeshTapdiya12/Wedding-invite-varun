import { useEffect, useRef, useState } from "react";
import IntroFX from "./IntroFX";
import { weddingData as d } from "../../data/weddingData";
import * as sound from "../../lib/sound";
import "./intro.css";

const GAP = 1550; // ms between chat messages

export default function Intro({ onReveal, onDone }) {
  const { intro } = d;
  const [scene, setScene] = useState("gate"); // gate -> chat -> slam -> title
  const [count, setCount] = useState(0); // chat messages shown
  const [typing, setTyping] = useState(null); // "groom" | "bride" | null
  const [word, setWord] = useState(-1); // current slam word
  const [shake, setShake] = useState(false);
  const [exit, setExit] = useState(false);
  const fx = useRef(null);
  const chatEnd = useRef(null);
  const timers = useRef([]);
  const finished = useRef(false);
  const reduce = useRef(
    typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );

  const at = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = "";
      timers.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [count, typing]);

  const finish = (withMusic = true) => {
    if (finished.current) return;
    finished.current = true;
    timers.current.forEach(clearTimeout);
    setExit(true);
    onReveal?.();
    if (withMusic) sound.startMusic(3);
    at(() => onDone?.(), reduce.current ? 80 : 1050);
  };

  const start = () => {
    if (scene !== "gate") return;
    sound.sfxTap();
    navigator.vibrate?.(30);

    if (reduce.current) {
      // minimal version: no timeline, just open the site with sound
      sound.playBeat(4);
      finish();
      return;
    }

    setScene("chat");

    // ---- 1) group-chat reveal ----
    let t = 900;
    intro.chat.forEach((m, i) => {
      at(() => setTyping(m.from), t);
      at(() => {
        setTyping(null);
        setCount(i + 1);
        sound.sfxMessage(m.from === "groom" ? "sent" : "received");
        navigator.vibrate?.(15);
      }, t + 850);
      t += GAP;
    });

    // ---- 2) "WE'RE GETTING MARRIED" slam ----
    at(() => sound.riser(1.0), t - 150);
    const slamStart = t + 850;
    at(() => setScene("slam"), slamStart);
    const last = intro.slam.length - 1;
    intro.slam.forEach((_, i) => {
      at(() => {
        setWord(i);
        if (i === last) {
          sound.boom();
          fx.current?.burst(1.2);
          navigator.vibrate?.([60, 30, 90]);
        } else {
          sound.impact(0.8 + i * 0.15, 1 + i * 0.14);
          navigator.vibrate?.(25);
        }
        setShake(true);
        at(() => setShake(false), 320);
      }, slamStart + 120 + i * 640);
    });
    const slamEnd = slamStart + 120 + last * 640;
    at(() => fx.current?.burst(0.8), slamEnd + 500);

    // ---- 3) title card ----
    const titleAt = slamEnd + 1500;
    at(() => {
      setScene("title");
      sound.playBeat(12);
      sound.stinger();
      fx.current?.burst(1);
    }, titleAt);
    at(() => fx.current?.burst(0.7), titleAt + 1900);
    at(() => finish(), titleAt + 3900);
  };

  const skip = () => {
    sound.initAudio();
    finish();
  };

  const slamWords = intro.slam;

  return (
    <div className={`intro scene-${scene} ${shake ? "shake" : ""} ${exit ? "exit" : ""}`} role="dialog" aria-label="Wedding invitation">
      {/* ================= GATE ================= */}
      {scene === "gate" && (
        <div className="gate-scene">
          <div className="g-blob g1" /><div className="g-blob g2" /><div className="g-blob g3" />
          <div className="vf tl" /><div className="vf tr" /><div className="vf bl" /><div className="vf br" />
          <div className="rec"><i />REC</div>
          <div className="timecode">13·12·2026</div>

          <div className="gate-center">
            <p className="g-eyebrow">{d.blessingQuote}</p>
            <h1 className="g-title glitch" data-text={intro.gateLine}>{intro.gateLine}</h1>
            <p className="g-sub">{intro.gateSub}</p>
            <button className="play" onClick={start} aria-label="Tap to play">
              <span className="play-ring" /><span className="play-ring r2" />
              <span className="play-core">▶</span>
            </button>
            <p className="g-hint">tap to play <span>· sound on 🔊</span></p>
          </div>
          <div className="g-sticker s-a">💍</div>
          <div className="g-sticker s-b">🪔</div>
          <div className="g-sticker s-c">✨</div>
          <div className="g-sticker s-d">💌</div>
        </div>
      )}

      {/* ================= CHAT ================= */}
      {scene === "chat" && (
        <div className="chat-scene">
          <div className="g-blob g1" /><div className="g-blob g2" />
          <div className="phone">
            <div className="notch" />
            <div className="p-status"><b>9:41</b><span>5G ▮▮▮</span></div>
            <header className="p-head">
              <span className="back">‹</span>
              <div className="avs">
                <i>{d.groom.monogram}</i><i className="b">{d.bride.monogram}</i>
              </div>
              <div className="p-title">
                <b>{intro.chatTitle}</b>
                <small>{intro.chatSub}</small>
              </div>
            </header>
            <div className="p-body">
              {intro.chat.slice(0, count).map((m, i) => (
                <div key={i} className={`bubble ${m.from === "groom" ? "sent" : "recv"}`}>
                  {m.text}
                </div>
              ))}
              {typing && (
                <div className={`bubble typing ${typing === "groom" ? "sent" : "recv"}`}>
                  <i /><i /><i />
                </div>
              )}
              <div ref={chatEnd} />
            </div>
            <div className="p-input"><span>iMessage</span><em>↑</em></div>
          </div>
        </div>
      )}

      {/* ================= SLAM ================= */}
      {scene === "slam" && (
        <div className={`slam-scene bg${Math.max(0, word) % 3}`}>
          <div className="slam-stripes" />
          {slamWords.map(
            (w, i) =>
              i === word && (
                <div key={i} className={`slam-word w${i % 3} ${i === slamWords.length - 1 ? "final" : ""}`} data-text={w}>
                  {w}
                </div>
              )
          )}
          {word === slamWords.length - 1 && <div className="slam-ring">💍</div>}
        </div>
      )}

      {/* ================= TITLE CARD ================= */}
      {scene === "title" && (
        <div className="title-scene">
          <div className="t-blob tb1" /><div className="t-blob tb2" /><div className="t-blob tb3" />

          <div className="tape tape-a">
            <div className="tape-track">
              <span>{intro.tapeA.repeat(6)}</span><span aria-hidden="true">{intro.tapeA.repeat(6)}</span>
            </div>
          </div>
          <div className="tape tape-b">
            <div className="tape-track rev">
              <span>{intro.tapeB.repeat(6)}</span><span aria-hidden="true">{intro.tapeB.repeat(6)}</span>
            </div>
          </div>

          <div className="title-core">
            <div className="t-bless">{d.blessingQuote}</div>
            <p className="t-prod">{intro.production}</p>
            <h1 className="t-names">
              <span className="tn tn1">{d.groom.firstName.toUpperCase()}</span>
              <span className="tn-x">×</span>
              <span className="tn tn2">{d.bride.firstName.toUpperCase()}</span>
            </h1>
            <p className="t-date">{d.dateRange}</p>
            <p className="t-city">📍 {d.city}</p>
            <div className="t-chip">{d.hashtag}</div>
          </div>

          <div className="g-sticker s-a">💍</div>
          <div className="g-sticker s-b">🪔</div>
          <div className="g-sticker s-c">✨</div>
          <div className="g-sticker s-d">💌</div>
          <div className="g-sticker s-e">🌸</div>
        </div>
      )}

      <IntroFX ref={fx} />

      {scene !== "gate" && !exit && (
        <button className="intro-skip" onClick={skip}>skip ›</button>
      )}
    </div>
  );
}
