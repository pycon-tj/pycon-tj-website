/**
 * Line-art ornaments drawn from Tajik culture: the seven stars and crown of the
 * flag, suzani rosettes and blossoms, the Hisor gate, the ikat lozenge. All use
 * currentColor so they inherit gold (or any colour) from the parent.
 * Decorative → aria-hidden.
 */
type P = { className?: string; strokeWidth?: number };

/** Closed path of a five-point star centred on (cx, cy). */
function starPath(cx: number, cy: number, R: number, r = R * 0.4) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const d = i % 2 ? r : R;
    return `${(cx + d * Math.cos(a)).toFixed(2)} ${(cy + d * Math.sin(a)).toFixed(2)}`;
  });
  return `M${pts.join("L")}Z`;
}

/** Suzani blossom: four long and four short almond petals around a seed. */
function blossom(cx: number, cy: number, long: number, short: number) {
  const petal = (len: number, w: number) =>
    `M${cx} ${cy}C${cx - w} ${cy - len * 0.35} ${cx - w * 0.6} ${cy - len * 0.8} ${cx} ${cy - len}C${cx + w * 0.6} ${cy - len * 0.8} ${cx + w} ${cy - len * 0.35} ${cx} ${cy}Z`;
  return Array.from({ length: 8 }, (_, i) => ({
    d: i % 2 ? petal(short, short * 0.3) : petal(long, long * 0.28),
    rot: i * 45,
  }));
}

/** A single five-point star. */
export function Star5({ className = "", strokeWidth = 1 }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" aria-hidden>
      <path d={starPath(50, 53, 44)} />
    </svg>
  );
}

/** Crown under an arc of seven stars — the emblem of the Tajik flag. */
export function SevenStars({ className = "", strokeWidth = 1 }: P) {
  const stars = Array.from({ length: 7 }, (_, k) => {
    const a = ((195 + k * 25) * Math.PI) / 180;
    return starPath(50 + 36 * Math.cos(a), 64 + 36 * Math.sin(a), 6.2);
  });
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" aria-hidden>
      {stars.map((d, i) => (
        <path key={i} d={d} />
      ))}
      <path d="M35 74V58l7.5 6L50 52l7.5 12L65 58v16Z" />
      <path d="M33 80h34" />
      <circle cx="35" cy="56" r="1.8" />
      <circle cx="50" cy="49.5" r="1.8" />
      <circle cx="65" cy="56" r="1.8" />
    </svg>
  );
}

/** Suzani medallion: a blossom at the centre, ringed by seven stars. */
export function StarRosette({ className = "", strokeWidth = 1 }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" aria-hidden>
      <circle cx="50" cy="50" r="47" />
      <circle cx="50" cy="50" r="42" strokeDasharray="1 3.2" />
      {Array.from({ length: 7 }, (_, k) => {
        const a = -Math.PI / 2 + (k * 2 * Math.PI) / 7;
        return <path key={k} d={starPath(50 + 32 * Math.cos(a), 50 + 32 * Math.sin(a), 6)} />;
      })}
      <circle cx="50" cy="50" r="22" />
      {blossom(50, 50, 19, 12).map((p) => (
        <path key={p.rot} d={p.d} transform={`rotate(${p.rot} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="3.5" />
    </svg>
  );
}

/** Compass rose for the venue map. */
export function CompassRose({ className = "", strokeWidth = 1 }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" aria-hidden>
      <circle cx="50" cy="50" r="30" />
      <path d="M50 4L57 43L96 50L57 57L50 96L43 57L4 50L43 43Z" />
      <circle cx="50" cy="50" r="4" />
    </svg>
  );
}

/** Suzani rosette: petals, inner sun, dotted ring. */
export function SuzaniRosette({ className = "", strokeWidth = 1 }: P) {
  const petals = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} aria-hidden>
      <circle cx="50" cy="50" r="46" />
      <circle cx="50" cy="50" r="40" strokeDasharray="1 3.2" />
      {petals.map((a) => (
        <path key={a} d="M50 50 C 44 38, 46 22, 50 14 C 54 22, 56 38, 50 50 Z" transform={`rotate(${a} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="10" />
      <circle cx="50" cy="50" r="4" />
    </svg>
  );
}

/** Hisor fortress gate: two round towers and a pointed arch. */
export function HisorGate({ className = "", strokeWidth = 1 }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} aria-hidden>
      <path d="M8 92V30c0-6 4-10 10-10s10 4 10 10v62" />
      <path d="M72 92V30c0-6 4-10 10-10s10 4 10 10v62" />
      <path d="M28 92V44h44v48" />
      <path d="M40 92V68c0-8 4-14 10-18 6 4 10 10 10 18v24" />
      <path d="M8 32h20M72 32h20M28 50h44M4 92h92" />
      <path d="M14 20v-6h8v6M78 20v-6h8v6" />
    </svg>
  );
}

/** Ikat (atlas/adras) lozenge with blurred-edge steps. */
export function IkatMotif({ className = "", strokeWidth = 1 }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} aria-hidden>
      <path d="M50 6 L84 50 L50 94 L16 50 Z" />
      <path d="M50 22 L72 50 L50 78 L28 50 Z" />
      <path d="M50 36 L61 50 L50 64 L39 50 Z" />
      <path d="M50 6v8M50 86v8M16 50h-8M92 50h-8" strokeDasharray="2 2" />
      <path d="M33 28l-5-6M67 28l5-6M33 72l-5 6M67 72l5 6" />
    </svg>
  );
}

/** Outline globe (for "Global standard"). */
export function GlobeIcon({ className = "", strokeWidth = 1 }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} aria-hidden>
      <circle cx="50" cy="50" r="40" />
      <path d="M10 50h80M50 10c14 12 14 68 0 80M50 10c-14 12-14 68 0 80M17 30h66M17 70h66" />
    </svg>
  );
}

/** Ornamental arch frame used for portraits and the final CTA. */
export function ArchOutline({ className = "", strokeWidth = 1 }: P) {
  return (
    <svg viewBox="0 0 200 300" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} aria-hidden preserveAspectRatio="none">
      <path d="M6 300V100C6 48 48 6 100 6s94 42 94 94v200" />
      <path d="M22 300V104c0-43 35-78 78-78s78 35 78 78v196" opacity=".5" />
    </svg>
  );
}

/** Thin Tajik flag stripe (red / white / green, 2:3:2). */
export function FlagStripe({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`flex h-[3px] overflow-hidden ${className}`}>
      <i className="flex-[2] bg-tj-red" />
      <i className="flex-[3] bg-tj-white" />
      <i className="flex-[2] bg-tj-green" />
    </span>
  );
}
