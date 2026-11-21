// Tiny sound engine built on the Web Audio API.
// Everything (temple bell, door rumble, sparkle chimes, shehnai phrase and a soft
// tanpura-style ambient loop in Raag Yaman) is synthesised, so no audio files are needed.
// If you'd rather use your own song, set `music.file` in weddingData.js.

let ctx = null;
let master = null;
let musicBus = null;
let reverb = null;
let musicFile = "";
let fileAudio = null;
let on = false;
let ambient = null; // { nodes, timer }

const listeners = new Set();
const emit = () => listeners.forEach((l) => l());
export const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
export const getMusicOn = () => on;
export const setMusicFile = (f) => {
  musicFile = f || "";
};

// Raag Yaman (C = Sa): Sa Re Ga Ma(tivra) Pa Dha Ni
const ROOT = 261.63;
const YAMAN = [0, 2, 4, 6, 7, 9, 11];
const note = (semi) => ROOT * Math.pow(2, semi / 12);
const yaman = (degree) => {
  const oct = Math.floor(degree / 7);
  return note(YAMAN[((degree % 7) + 7) % 7] + 12 * oct);
};

export function initAudio() {
  if (ctx) {
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();

  master = ctx.createGain();
  master.gain.value = 0.9;
  // a compressor keeps the beat + bass from clipping when many sounds overlap
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -16;
  comp.ratio.value = 6;
  comp.attack.value = 0.003;
  comp.release.value = 0.2;
  master.connect(comp);
  comp.connect(ctx.destination);

  // cheap synthetic reverb
  const len = Math.floor(ctx.sampleRate * 2.8);
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
  }
  reverb = ctx.createConvolver();
  reverb.buffer = buf;
  const wet = ctx.createGain();
  wet.gain.value = 0.5;
  reverb.connect(wet);
  wet.connect(master);

  musicBus = ctx.createGain();
  musicBus.gain.value = 0.0001;
  musicBus.connect(master);
  const musicSend = ctx.createGain();
  musicSend.gain.value = 0.5;
  musicBus.connect(musicSend);
  musicSend.connect(reverb);

  // be polite: pause audio when the tab is hidden
  document.addEventListener("visibilitychange", () => {
    if (!ctx) return;
    if (document.hidden) ctx.suspend();
    else if (on || ctx.state === "suspended") ctx.resume();
  });
  return ctx;
}

// connect a node to a bus plus a reverb send
function route(node, send = 0.35, bus = master) {
  node.connect(bus);
  const s = ctx.createGain();
  s.gain.value = send;
  node.connect(s);
  s.connect(reverb);
}

/* ---------------- one-shot sounds ---------------- */

export function playBell(freq = 330, vol = 0.3, delay = 0) {
  if (!ctx) return;
  const t = ctx.currentTime + delay;
  const g = ctx.createGain();
  route(g, 0.55);
  // [frequency ratio, amplitude, decay seconds]
  [[1, 1, 5], [2.76, 0.5, 3.6], [5.4, 0.28, 2.4], [8.93, 0.15, 1.5]].forEach(([r, a, dec]) => {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = freq * r;
    const e = ctx.createGain();
    e.gain.setValueAtTime(0.0001, t);
    e.gain.exponentialRampToValueAtTime(vol * a, t + 0.012);
    e.gain.exponentialRampToValueAtTime(0.0001, t + dec);
    o.connect(e);
    e.connect(g);
    o.start(t);
    o.stop(t + dec + 0.1);
  });
}

function pluck(freq, vol = 0.12, delay = 0, dur = 2.4, bus = master, send = 0.4) {
  const t = ctx.currentTime + delay;
  const o = ctx.createOscillator();
  o.type = "triangle";
  o.frequency.value = freq;
  const o2 = ctx.createOscillator();
  o2.type = "sine";
  o2.frequency.value = freq * 2;
  const f = ctx.createBiquadFilter();
  f.type = "lowpass";
  f.frequency.setValueAtTime(3600, t);
  f.frequency.exponentialRampToValueAtTime(700, t + dur);
  const e = ctx.createGain();
  e.gain.setValueAtTime(0.0001, t);
  e.gain.exponentialRampToValueAtTime(vol, t + 0.008);
  e.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  const g2 = ctx.createGain();
  g2.gain.value = 0.35;
  o.connect(f);
  o2.connect(g2);
  g2.connect(f);
  f.connect(e);
  route(e, send, bus);
  o.start(t);
  o2.start(t);
  o.stop(t + dur + 0.1);
  o2.stop(t + dur + 0.1);
}

export function playRumble(dur = 2.8, delay = 0) {
  if (!ctx) return;
  const t = ctx.currentTime + delay;
  const len = Math.floor(ctx.sampleRate * dur);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const f = ctx.createBiquadFilter();
  f.type = "lowpass";
  f.frequency.setValueAtTime(90, t);
  f.frequency.linearRampToValueAtTime(260, t + dur * 0.5);
  f.frequency.linearRampToValueAtTime(70, t + dur);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.7, t + dur * 0.35);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f);
  f.connect(g);
  g.connect(master);
  src.start(t);
}

export function playChimes(delay = 0) {
  if (!ctx) return;
  for (let i = 0; i < 10; i++) {
    pluck(yaman(7 + i), 0.09, delay + i * 0.11, 1.8, master, 0.7);
  }
  playBell(note(24), 0.12, delay + 1.2);
}

// A short, lilting shehnai-style phrase (sawtooth + band-pass + vibrato)
export function playShehnai(delay = 0) {
  if (!ctx) return;
  const t0 = ctx.currentTime + delay;
  const phrase = [
    [2, 0.7], [4, 0.45], [5, 1.0], [7, 0.5], [5, 0.5], [4, 0.5], [2, 0.6], [0, 1.6],
  ];
  const o = ctx.createOscillator();
  o.type = "sawtooth";
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 1300;
  bp.Q.value = 2.2;
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 3000;
  const g = ctx.createGain();
  g.gain.value = 0.0001;

  const lfo = ctx.createOscillator();
  lfo.frequency.value = 5.4;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 5;
  lfo.connect(lfoGain);
  lfoGain.connect(o.frequency);

  o.connect(bp);
  bp.connect(lp);
  lp.connect(g);
  route(g, 0.6);

  let t = t0;
  o.frequency.setValueAtTime(yaman(phrase[0][0] + 7), t);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.11, t + 0.25);
  phrase.forEach(([deg, len]) => {
    o.frequency.setTargetAtTime(yaman(deg + 7), t, 0.05);
    t += len;
  });
  g.gain.setValueAtTime(0.11, t - 0.2);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
  o.start(t0);
  lfo.start(t0);
  o.stop(t + 1.3);
  lfo.stop(t + 1.3);
}

/* ---------------- Gen-Z intro sound design ---------------- */

let noiseBuf = null;
function getNoise() {
  if (!noiseBuf) {
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  return noiseBuf;
}

function tone(freq, delay, dur, vol = 0.12, type = "sine") {
  const t = ctx.currentTime + delay;
  const o = ctx.createOscillator();
  o.type = type;
  o.frequency.value = freq;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.006);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g);
  route(g, 0.25);
  o.start(t);
  o.stop(t + dur + 0.05);
}

// filtered-noise sweep (risers, whooshes)
function sweep(delay, dur, f0, f1, vol, q = 3) {
  const t = ctx.currentTime + delay;
  const src = ctx.createBufferSource();
  src.buffer = getNoise();
  src.loop = true;
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.Q.value = q;
  bp.frequency.setValueAtTime(f0, t);
  bp.frequency.exponentialRampToValueAtTime(f1, t + dur);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + dur * 0.9);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.08);
  src.connect(bp);
  bp.connect(g);
  route(g, 0.2);
  src.start(t);
  src.stop(t + dur + 0.15);
}

function noiseHit(t, dur, type, freq, vol, q = 1) {
  const src = ctx.createBufferSource();
  src.buffer = getNoise();
  const f = ctx.createBiquadFilter();
  f.type = type;
  f.frequency.value = freq;
  f.Q.value = q;
  const g = ctx.createGain();
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f);
  f.connect(g);
  g.connect(master);
  src.start(t, Math.random());
  src.stop(t + dur + 0.02);
}

function kick(t, vol = 1, pitch = 1) {
  const o = ctx.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(165 * pitch, t);
  o.frequency.exponentialRampToValueAtTime(42, t + 0.28);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.9 * vol, t + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
  o.connect(g);
  g.connect(master);
  o.start(t);
  o.stop(t + 0.6);
}

// iMessage-ish: "sent" = swoosh + pop, "received" = two-note ding
export function sfxMessage(kind) {
  if (!initAudio()) return;
  if (kind === "sent") {
    sweep(0, 0.16, 900, 5200, 0.07, 2);
    const t = ctx.currentTime + 0.1;
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(520, t);
    o.frequency.exponentialRampToValueAtTime(1000, t + 0.07);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.2, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
    o.connect(g);
    route(g, 0.2);
    o.start(t);
    o.stop(t + 0.25);
  } else {
    tone(880, 0, 0.3, 0.13, "triangle");
    tone(1318.5, 0.09, 0.45, 0.12, "triangle");
  }
}

export function sfxTap() {
  if (!initAudio()) return;
  kick(ctx.currentTime, 0.7, 0.9);
  tone(1760, 0.02, 0.2, 0.08, "triangle");
}

export function riser(dur = 1.1, delay = 0) {
  if (!ctx) return;
  sweep(delay, dur, 250, 7000, 0.38, 4);
  const t = ctx.currentTime + delay;
  const o = ctx.createOscillator();
  o.type = "sawtooth";
  o.frequency.setValueAtTime(110, t);
  o.frequency.exponentialRampToValueAtTime(880, t + dur);
  const f = ctx.createBiquadFilter();
  f.type = "lowpass";
  f.frequency.value = 1800;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.07, t + dur);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.05);
  o.connect(f);
  f.connect(g);
  route(g, 0.2);
  o.start(t);
  o.stop(t + dur + 0.1);
}

export function impact(vol = 0.8, pitch = 1) {
  if (!ctx) return;
  const t = ctx.currentTime;
  kick(t, vol, pitch);
  noiseHit(t, 0.12, "lowpass", 1400, 0.3 * vol);
  tone(note(-12) * pitch, 0, 0.25, 0.08, "triangle");
}

export function boom() {
  if (!ctx) return;
  const t = ctx.currentTime;
  kick(t, 1.4, 0.8);
  noiseHit(t, 0.5, "lowpass", 900, 0.5);
  playBell(98, 0.3, 0);
  playBell(392, 0.14, 0.02);
}

export function sfxWhoosh(dur = 1.0) {
  if (!ctx) return;
  sweep(0, dur, 300, 6500, 0.3, 2);
  tone(note(24), 0.05, 0.6, 0.06, "triangle");
}

// Hype beat: dhol-ish kick + clap + hats + bass + a bright Yaman pluck line
export function playBeat(beats = 10, bpm = 124) {
  if (!initAudio()) return;
  const spb = 60 / bpm;
  const t0 = ctx.currentTime + 0.02;
  const bass = [0, 0, 7, 5];
  const line = [14, 16, 18, 16, 14, 13, 11, 13, 14, 16, 18, 21, 18, 16, 14, 16];
  for (let b = 0; b < beats; b++) {
    const t = t0 + b * spb;
    kick(t, b === 0 ? 1.2 : 0.95);
    noiseHit(t + spb * 0.5, 0.05, "highpass", 7500, 0.07); // offbeat hat
    noiseHit(t + spb * 0.75, 0.035, "bandpass", 3800, 0.09, 6); // dhol "tak"
    if (b % 2 === 1) noiseHit(t, 0.14, "bandpass", 1700, 0.2, 1.2); // clap
    // bass
    const bf = note(-24 + bass[b % 4]);
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = bf;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t + spb * 0.5);
    g.gain.exponentialRampToValueAtTime(0.28, t + spb * 0.52);
    g.gain.exponentialRampToValueAtTime(0.0001, t + spb * 0.95);
    o.connect(g);
    g.connect(master);
    o.start(t + spb * 0.5);
    o.stop(t + spb);
    // melody: two plucks per beat
    for (let h = 0; h < 2; h++) {
      const deg = line[(b * 2 + h) % line.length];
      pluck(yaman(deg), 0.055, t - ctx.currentTime + h * spb * 0.5, 0.55, master, 0.45);
    }
  }
}

// bright shehnai + sparkle when the title card lands
export function stinger() {
  if (!ctx) return;
  playChimes(0);
  playShehnai(0.15);
}

/* ---------------- background music ---------------- */

function buildAmbient() {
  const nodes = [];
  const droneGain = ctx.createGain();
  droneGain.gain.value = 0.055;
  const droneLp = ctx.createBiquadFilter();
  droneLp.type = "lowpass";
  droneLp.frequency.value = 900;
  droneGain.connect(droneLp);
  droneLp.connect(musicBus);

  // Sa - Pa - Sa tanpura-like drone, slightly detuned for warmth
  [[note(-24), "sine"], [note(-17), "triangle"], [note(-12), "triangle"], [note(-12) * 1.004, "sine"], [note(-5), "sine"]].forEach(
    ([f, type]) => {
      const o = ctx.createOscillator();
      o.type = type;
      o.frequency.value = f;
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.12 + Math.random() * 0.15;
      const lg = ctx.createGain();
      lg.gain.value = 0.35;
      const og = ctx.createGain();
      og.gain.value = 0.65;
      lfo.connect(lg);
      lg.connect(og.gain);
      o.connect(og);
      og.connect(droneGain);
      o.start();
      lfo.start();
      nodes.push(o, lfo);
    }
  );

  const state = { nodes, timer: null, degree: 7 };
  const next = () => {
    if (!ambient || ambient !== state) return;
    // gentle random walk up and down the scale
    const step = [-2, -1, -1, 1, 1, 2][Math.floor(Math.random() * 6)];
    state.degree = Math.max(2, Math.min(15, state.degree + step));
    pluck(yaman(state.degree), 0.075, 0, 3.2, musicBus, 0.3);
    if (Math.random() < 0.25) pluck(yaman(state.degree + 2), 0.04, 0.35, 2.6, musicBus, 0.3);
    state.timer = setTimeout(next, 1100 + Math.random() * 1500);
  };
  state.timer = setTimeout(next, 600);
  return state;
}

export function startMusic(fadeIn = 3) {
  if (on) return;
  if (!initAudio()) return;
  on = true;
  emit();
  if (ctx.state === "suspended") ctx.resume();

  if (musicFile) {
    if (!fileAudio) {
      fileAudio = new Audio(musicFile);
      fileAudio.loop = true;
    }
    fileAudio.volume = 0;
    fileAudio.play().catch(() => {});
    const t0 = performance.now();
    const tick = () => {
      if (!on || !fileAudio) return;
      const k = Math.min(1, (performance.now() - t0) / (fadeIn * 1000));
      fileAudio.volume = k * 0.7;
      if (k < 1) requestAnimationFrame(tick);
    };
    tick();
    return;
  }

  ambient = buildAmbient();
  const t = ctx.currentTime;
  musicBus.gain.cancelScheduledValues(t);
  musicBus.gain.setValueAtTime(0.0001, t);
  musicBus.gain.exponentialRampToValueAtTime(1, t + fadeIn);
}

export function stopMusic() {
  if (!on) return;
  on = false;
  emit();
  if (fileAudio) {
    fileAudio.pause();
    return;
  }
  if (!ctx || !ambient) return;
  const old = ambient;
  ambient = null;
  clearTimeout(old.timer);
  const t = ctx.currentTime;
  musicBus.gain.cancelScheduledValues(t);
  musicBus.gain.setValueAtTime(Math.max(musicBus.gain.value, 0.0001), t);
  musicBus.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
  setTimeout(() => old.nodes.forEach((n) => { try { n.stop(); } catch { /* already stopped */ } }), 800);
}

export function toggleMusic() {
  if (on) stopMusic();
  else startMusic(1.5);
}

