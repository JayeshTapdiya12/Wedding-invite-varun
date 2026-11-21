// Hand-built SVG ornaments: marigold, mandala, lotus, palace arch, divider, floral sprig.
// All use `currentColor` (or fixed brand colours) so they can be re-tinted from CSS.

const ring = (n, count, rx, ry, cy, fill, rot0 = 0) =>
  Array.from({ length: count }, (_, i) => (
    <ellipse
      key={`${n}-${i}`}
      cx="100"
      cy={100 - cy}
      rx={rx}
      ry={ry}
      fill={fill}
      stroke="rgba(120,70,10,.28)"
      strokeWidth=".6"
      transform={`rotate(${rot0 + (i * 360) / count} 100 100)`}
    />
  ));

export function Marigold({ className }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      {ring("a", 20, 10.5, 29, 64, "#E39B2D")}
      {ring("b", 15, 10, 25, 48, "#F0AE40", 6)}
      {ring("c", 11, 9, 19, 33, "#F6C25C", 12)}
      {ring("d", 8, 7, 12, 19, "#E39B2D", 4)}
      <circle cx="100" cy="100" r="7.5" fill="#9B5A12" />
      <circle cx="100" cy="100" r="3" fill="#C9852A" />
    </svg>
  );
}

const PETAL = "M100 100 C 91 74 91 40 100 8 C 109 40 109 74 100 100Z";

export function Mandala({ className }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth=".7" aria-hidden="true" focusable="false">
      <circle cx="100" cy="100" r="98" />
      <circle cx="100" cy="100" r="93" strokeDasharray="1.5 3.5" />
      {Array.from({ length: 24 }, (_, i) => (
        <path key={i} d={PETAL} transform={`rotate(${i * 15} 100 100)`} opacity=".9" />
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <path key={`b${i}`} d={PETAL} transform={`translate(100 100) scale(.62) rotate(${i * 30 + 15}) translate(-100 -100)`} />
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <circle key={`d${i}`} cx="100" cy="38" r="1.8" fill="currentColor" stroke="none" transform={`rotate(${i * 30} 100 100)`} />
      ))}
      <circle cx="100" cy="100" r="14" />
      <circle cx="100" cy="100" r="4" fill="currentColor" stroke="none" />
    </svg>
  );
}

const LOTUS_PETAL = "M0 0 C -26 -22 -22 -62 0 -92 C 22 -62 26 -22 0 0Z";

export function Lotus({ className }) {
  const layer = (angles, scale, fill, key) =>
    angles.map((a) => (
      <path
        key={`${key}${a}`}
        d={LOTUS_PETAL}
        transform={`translate(100 150) rotate(${a}) scale(${scale})`}
        fill={fill}
        stroke="#B8924A"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    ));
  return (
    <svg viewBox="0 0 200 170" className={className} aria-hidden="true" focusable="false">
      {layer([-72, -50, 50, 72], 0.95, "#EBD5D0", "a")}
      {layer([-34, 34], 1, "#F3E0DA", "b")}
      {layer([-14, 0, 14], 1.02, "#FFFDF9", "c")}
      <path d="M24 154 H176" stroke="#B8924A" strokeWidth=".9" strokeLinecap="round" strokeDasharray="1 5" />
    </svg>
  );
}

export function PalaceArch({ className }) {
  return (
    <svg viewBox="0 0 200 260" className={className} fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" focusable="false">
      <path d="M14 260 V118 C14 70 56 46 100 10 C144 46 186 70 186 118 V260" />
      <path d="M30 260 V120 C30 80 66 58 100 28 C134 58 170 80 170 120 V260" opacity=".7" />
      <path d="M46 260 V122 C46 92 74 74 100 50 C126 74 154 92 154 122 V260" opacity=".45" />
      <circle cx="100" cy="6" r="3.2" fill="currentColor" stroke="none" />
      <path d="M100 10 V-0" />
      {Array.from({ length: 9 }, (_, i) => {
        const t = (i + 1) / 10;
        const x = 14 + t * 172;
        const y = 118 - Math.sin(Math.PI * t) * 92 + 8;
        return <circle key={i} cx={x} cy={y} r="1.6" fill="currentColor" stroke="none" opacity=".8" />;
      })}
      <path d="M100 64 C92 82 92 100 100 118 C108 100 108 82 100 64Z" opacity=".8" />
      <path d="M86 232 H114 M80 240 H120 M74 248 H126" opacity=".6" />
    </svg>
  );
}

export function GoldDivider({ className }) {
  return (
    <svg viewBox="0 0 240 24" className={className} fill="none" stroke="currentColor" strokeWidth=".8" aria-hidden="true" focusable="false">
      <path d="M0 12 H94 M146 12 H240" />
      <path d="M120 3 L129 12 L120 21 L111 12Z" fill="currentColor" stroke="none" />
      <path d="M99 12 q7 -8 12 0 q-5 8 -12 0Z M141 12 q-7 -8 -12 0 q5 8 12 0Z" fill="currentColor" stroke="none" opacity=".75" />
    </svg>
  );
}

// A curling vine with leaves and buds, used in corners
export function FloralSprig({ className }) {
  const leaves = [
    [18, 16, 38], [32, 30, 52], [48, 46, 62], [62, 64, 74], [72, 84, 84], [76, 104, 92],
  ];
  return (
    <svg viewBox="0 0 120 130" className={className} fill="none" stroke="currentColor" strokeWidth=".9" strokeLinecap="round" aria-hidden="true" focusable="false">
      <path d="M4 4 C 36 8 66 34 76 70 C 82 92 80 112 72 126" />
      {leaves.map(([x, y, a], i) => (
        <ellipse key={i} cx={x} cy={y} rx="3.6" ry="9" transform={`rotate(${a + (i % 2 ? 180 : 0)} ${x} ${y})`} fill="currentColor" opacity=".3" />
      ))}
      <circle cx="10" cy="6" r="3.2" fill="currentColor" stroke="none" opacity=".75" />
      <circle cx="72" cy="124" r="2.6" fill="currentColor" stroke="none" opacity=".75" />
      <g opacity=".85">
        {Array.from({ length: 5 }, (_, i) => (
          <ellipse key={i} cx="96" cy="38" rx="2.6" ry="6" transform={`rotate(${i * 72} 96 44)`} />
        ))}
        <circle cx="96" cy="44" r="1.6" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

// A repeating mehendi-style paisley band (used on the Mehendi & Haldi festival)
export function MehendiBand({ className }) {
  return (
    <svg className={className} viewBox="0 0 240 44" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor" strokeWidth=".9" strokeLinecap="round" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="paisley" width="48" height="44" patternUnits="userSpaceOnUse">
          <path d="M12 34 C 2 22 8 6 22 8 C 34 10 36 24 26 32 C 21 36 16 38 12 34Z" />
          <path d="M14 29 C 9 22 12 14 20 15 C 26 16 27 23 22 27" opacity=".7" />
          <circle cx="19" cy="21" r="1.6" fill="currentColor" stroke="none" />
          <path d="M34 8 q6 -5 12 0 M34 38 q6 5 12 0" opacity=".6" />
          <circle cx="40" cy="22" r="1.4" fill="currentColor" stroke="none" opacity=".7" />
        </pattern>
      </defs>
      <rect width="240" height="44" fill="url(#paisley)" stroke="none" />
      <path d="M0 2 H240 M0 42 H240" opacity=".5" />
    </svg>
  );
}
