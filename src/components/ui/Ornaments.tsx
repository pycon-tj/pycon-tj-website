/**
 * Line-art ornaments drawn from Tajik craft: chorkhona, suzani rosette,
 * 8-point girih star, Hisor gate, ikat lozenge. All use currentColor so they
 * inherit gold (or any colour) from the parent. Decorative → aria-hidden.
 */
type P = { className?: string; strokeWidth?: number };

/** Four nested squares, each turned 45° from the one outside it. */
export function Chorkhona({ className = "", strokeWidth = 1 }: P) {
  const sizes = [92, 65, 46, 32.5];
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} aria-hidden>
      {sizes.map((s, i) => (
        <rect key={i} x={50 - s / 2} y={50 - s / 2} width={s} height={s} transform={`rotate(${i * 45} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="5" />
    </svg>
  );
}

/** 8-point star from two overlapping squares. */
export function GirihStar({ className = "", strokeWidth = 1 }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} aria-hidden>
      <rect x="20" y="20" width="60" height="60" />
      <rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)" />
      <circle cx="50" cy="50" r="14" />
      <path d="M50 8v20M50 72v20M8 50h20M72 50h20" />
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
