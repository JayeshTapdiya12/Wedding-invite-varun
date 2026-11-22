import { useSyncExternalStore } from "react";
import { subscribe, getMusicOn, toggleMusic } from "../../lib/sound";

// Floating sound toggle with an animated equaliser while music plays.
export default function MusicButton() {
  const on = useSyncExternalStore(subscribe, getMusicOn);
  return (
    <button
      className={`music-btn ${on ? "on" : "off"}`}
      onClick={toggleMusic}
      aria-label={on ? "Mute music" : "Play music"}
      aria-pressed={on}
      title={on ? "Mute music" : "Play music"}
    >
      <span className="eq" aria-hidden="true"><span /><span /><span /><span /></span>
    </button>
  );
}
