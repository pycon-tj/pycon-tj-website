"use client";

import { useDict } from "@/i18n/I18nProvider";
import { useSectionMotion } from "@/lib/sectionMotion";
import { Ph } from "../ui/SectionHeading";
import { CompassRose } from "../ui/Ornaments";

/** Stylised, non-geographic map of Dushanbe (placeholder until the venue is confirmed). */
function MapArt({ river }: { river: string }) {
  return (
    <svg viewBox="0 0 600 520" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="rgb(201 162 74 / .07)" strokeWidth="1" />
        </pattern>
        <linearGradient id="river" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3f6fd6" stopOpacity=".55" />
          <stop offset="1" stopColor="#0f2f8f" stopOpacity=".7" />
        </linearGradient>
        <radialGradient id="pin-glow">
          <stop offset="0" stopColor="#f1d68e" stopOpacity=".35" />
          <stop offset="1" stopColor="#f1d68e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="520" fill="url(#map-grid)" />
      {/* Mountains to the north */}
      <path d="M0 70 L60 30 L100 58 L160 14 L220 60 L270 30 L330 66 L390 22 L450 62 L510 28 L600 64" fill="none" stroke="rgb(244 235 217 / .18)" strokeWidth="1.2" />
      <path d="M0 92 L70 60 L130 84 L200 46 L260 86 L340 52 L410 88 L480 54 L600 90" fill="none" stroke="rgb(244 235 217 / .09)" strokeWidth="1" />
      {/* Parks */}
      <ellipse cx="190" cy="300" rx="62" ry="38" fill="rgb(31 122 58 / .16)" stroke="rgb(31 122 58 / .35)" />
      <ellipse cx="430" cy="380" rx="48" ry="30" fill="rgb(31 122 58 / .12)" stroke="rgb(31 122 58 / .3)" />
      {/* Streets */}
      <g stroke="rgb(244 235 217 / .14)" strokeWidth="2" fill="none">
        <path d="M0 210 C 160 200, 360 230, 600 205" />
        <path d="M0 350 C 180 340, 380 370, 600 340" />
        <path d="M120 100 L150 520" />
        <path d="M470 100 L430 520" />
      </g>
      <g stroke="rgb(244 235 217 / .07)" strokeWidth="1" fill="none">
        <path d="M0 150 H600M0 270 H600M0 430 H600M60 100 L80 520M230 100 L240 520M380 100 L370 520M540 100 L520 520" />
      </g>
      {/* Main avenue (gold) */}
      <path d="M262 100 C 270 200, 300 300, 312 520" fill="none" stroke="rgb(201 162 74 / .55)" strokeWidth="3" />
      {/* Dushanbinka river */}
      <path id="river-path" d="M372 90 C 340 160, 400 220, 362 290 S 330 420, 380 520" fill="none" stroke="url(#river)" strokeWidth="14" strokeLinecap="round" />
      <path d="M372 90 C 340 160, 400 220, 362 290 S 330 420, 380 520" fill="none" stroke="rgb(170 200 255 / .35)" strokeWidth="1" strokeDasharray="4 10" className="animate-[river_6s_linear_infinite]" />
      <text fontFamily="var(--font-mono)" fontSize="11" letterSpacing="3" fill="rgb(170 200 255 / .75)">
        <textPath href="#river-path" startOffset="18%">
          {river.toUpperCase()}
        </textPath>
      </text>
      <circle cx="306" cy="250" r="90" fill="url(#pin-glow)" />
    </svg>
  );
}

export default function Venue() {
  const { venue, ui } = useDict();
  const ref = useSectionMotion<HTMLElement>();
  return (
    <section ref={ref} id="venue" aria-labelledby="venue-title" className="relative overflow-hidden py-[clamp(96px,12vw,170px)]">
      <div className="wrap relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-[clamp(40px,5vw,72px)]">
          <div className="min-w-0">
            <p data-reveal className="eyebrow">
              {venue.eyebrow}
            </p>
            <h2
              id="venue-title"
              data-reveal
              className="mt-6 font-display text-[clamp(40px,11vw,112px)] font-extrabold uppercase leading-[0.9] tracking-[-0.05em] lg:text-[clamp(52px,5.3vw,84px)]"
            >
              <span className="text-gold-sheen">{venue.city}</span>
              <span className="mt-3 block font-serif text-[0.34em] font-semibold normal-case italic tracking-normal text-gold-hi">{venue.cityLocal}</span>
            </h2>
            <p data-reveal className="mt-6 max-w-[48ch] text-[clamp(15px,1.3vw,18px)] text-[var(--ivory-dim)]">
              {venue.lead}
            </p>
            <dl data-reveal className="mt-10 border-t border-[var(--line)]">
              {venue.details.map((d) => (
                <div key={d.label} className="grid grid-cols-1 gap-1 border-b border-ivory/10 py-4 xs:grid-cols-[140px_1fr] xs:gap-4">
                  <dt className="pt-0.5 font-mono text-[11px] uppercase tracking-[0.16em] text-gold">{d.label}</dt>
                  <dd className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px]">
                    {d.value}
                    {d.note && <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ivory-dim)]">{d.note}</span>}
                    {d.placeholder && <Ph className="!py-0.5 !text-[9.5px]">{ui.placeholder}</Ph>}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-reveal className="dark-island relative min-h-[420px] overflow-hidden border border-[var(--line)] bg-[radial-gradient(90%_80%_at_50%_45%,#24151a,#120d0f)] sm:min-h-[520px]">
            <MapArt river={venue.map.river} />
            <div className="absolute left-4 top-4">
              <Ph>{venue.map.tag}</Ph>
            </div>
            <div aria-hidden className="absolute right-4 top-4 flex flex-col items-center gap-1 text-gold/70">
              <CompassRose className="size-10" strokeWidth={2} />
              <span className="font-mono text-[10px] tracking-[0.2em]">N</span>
            </div>
            {/* Pin */}
            <div className="absolute left-[51%] top-[48%]">
              <span aria-hidden className="absolute left-0 top-0 size-20 -translate-x-1/2 -translate-y-1/2 animate-[ping-ring_2.4s_cubic-bezier(.2,.7,.1,1)_infinite] rounded-full border border-gold" />
              <span aria-hidden className="absolute left-0 top-0 size-20 -translate-x-1/2 -translate-y-1/2 animate-[ping-ring_2.4s_cubic-bezier(.2,.7,.1,1)_1.2s_infinite] rounded-full border border-gold/60" />
              <span aria-hidden className="absolute -left-[9px] -top-[26px] block size-[18px] -rotate-45 rounded-[50%_50%_50%_0] bg-gold-hi shadow-[0_0_0_6px_rgb(241_214_142/0.15),0_8px_24px_rgb(0_0_0/0.5)]" />
              <div className="absolute left-5 top-[-92px] hidden w-[220px] border border-[var(--line)] bg-ink/90 px-4 py-3 backdrop-blur-md sm:block">
                <p className="font-display text-[12.5px] font-semibold uppercase tracking-[0.08em]">{venue.map.pinTitle}</p>
                <p className="mt-1 text-[12.5px] leading-snug text-[var(--ivory-dim)]">{venue.map.pinText}</p>
              </div>
            </div>
            {/* Mobile: pin card sits along the top edge instead of beside the pin */}
            <div className="absolute inset-x-4 top-16 border border-[var(--line)] bg-ink/90 px-4 py-3 backdrop-blur-md sm:hidden">
              <p className="font-display text-[12.5px] font-semibold uppercase tracking-[0.08em]">{venue.map.pinTitle}</p>
              <p className="mt-1 text-[12.5px] leading-snug text-[var(--ivory-dim)]">{venue.map.pinText}</p>
            </div>
            <p aria-hidden className="absolute bottom-5 left-4 hidden items-center gap-2 font-mono text-[10.5px] tracking-[0.12em] text-[var(--ivory-dim)] sm:flex">
              <span className="inline-block h-px w-12 bg-ivory/40" /> {ui.notToScale}
            </p>
            <a
              href={venue.map.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm absolute bottom-4 right-4"
            >
              {venue.map.linkLabel} <span className="arr" aria-hidden>↗</span>
              <span className="sr-only">{ui.opensMapsSr}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
