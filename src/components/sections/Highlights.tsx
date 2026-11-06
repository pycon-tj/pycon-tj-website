"use client";

import { useState } from "react";
import { useDict } from "@/i18n/I18nProvider";
import { prefersReducedMotion } from "@/lib/motion";
import { useInViewOnce, useSectionMotion } from "@/lib/sectionMotion";
import { Ph, TitleText } from "../ui/SectionHeading";
import { SuzaniRosette } from "../ui/Ornaments";

function Counter({ to, suffix, delay }: { to: number; suffix: string; delay: number }) {
  const [n, setN] = useState(0);
  const ref = useInViewOnce<HTMLSpanElement>(() => {
    if (prefersReducedMotion()) return setN(to);
    const dur = 1900;
    let start = 0;
    const step = (t: number) => {
      if (!start) start = t;
      const k = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - k, 4))));
      if (k < 1) requestAnimationFrame(step);
    };
    setTimeout(() => requestAnimationFrame(step), delay);
  });
  return (
    <span ref={ref}>
      <span aria-hidden>{n}</span>
      <span className="sr-only">{to}</span>
      {suffix && <sup className="ml-1 align-[0.9em] text-[0.42em] text-gold-hi">{suffix}</sup>}
    </span>
  );
}

/** Divider lines per cell: 1 col (mobile) → 2×2 (sm) → 4 in a row (lg). */
const CELL = [
  "",
  "border-t sm:border-t-0 sm:border-l sm:pl-7",
  "border-t lg:border-t-0 lg:border-l lg:pl-7",
  "border-t sm:border-l sm:pl-7 lg:border-t-0",
];

export default function Highlights() {
  const { highlights, ui } = useDict();
  const ref = useSectionMotion<HTMLElement>();
  return (
    <section
      ref={ref}
      id="highlights"
      aria-labelledby="highlights-title"
      className="dark-island grain relative overflow-hidden bg-[radial-gradient(80%_120%_at_50%_0%,#6d1a2e,var(--color-wine)_42%,var(--color-wine-deep))] py-[clamp(96px,11vw,160px)]"
    >
      <div aria-hidden className="ikat-thin absolute inset-x-0 top-0" />
      <div aria-hidden data-speed="0.25" className="girih-bg pointer-events-none absolute -inset-y-24 inset-x-0 opacity-[.09] [background-size:96px]" />
      <div aria-hidden data-speed="0.6" className="pointer-events-none absolute -right-32 top-1/2 size-[520px] -translate-y-1/2 text-gold-hi opacity-[.08] sm:size-[640px]">
        <SuzaniRosette className="size-full animate-[spin-slow_160s_linear_infinite]" strokeWidth={0.35} />
      </div>

      <div className="wrap relative">
        <header className="mb-14 grid gap-6 lg:mb-20 lg:grid-cols-[1fr_auto] lg:items-end">
          <div data-reveal>
            <p className="eyebrow !text-gold-hi">{highlights.eyebrow}</p>
            <h2
              id="highlights-title"
              className="mt-5 max-w-[18ch] font-display text-[clamp(32px,5.4vw,72px)] font-extrabold uppercase leading-[1.02] tracking-[-0.035em]"
            >
              <TitleText t={highlights.title} />
            </h2>
          </div>
          {highlights.placeholder && (
            <div data-reveal>
              <Ph>{ui.placeholderValues}</Ph>
            </div>
          )}
        </header>

        <dl className="grid border-t border-gold-hi/30 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.items.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              className={`group relative border-gold-hi/20 py-9 sm:pr-7 lg:py-11 ${CELL[i % 4]}`}
            >
              <span aria-hidden className="absolute left-0 top-[-1px] h-[2px] w-0 bg-gold-hi transition-[width] duration-700 ease-lux group-hover:w-full" />
              <dd className="font-display text-[clamp(56px,7vw,104px)] font-extrabold leading-none tracking-[-0.045em] tabular-nums">
                <Counter to={s.value} suffix={s.suffix} delay={i * 120} />
              </dd>
              <dt className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[12px] uppercase tracking-[0.16em] text-gold-hi">
                {s.label}
                {highlights.placeholder && <span className="rounded-sm border border-gold-hi/30 px-1.5 py-px text-[9.5px] tracking-[0.12em] text-gold-hi/80">PH</span>}
              </dt>
              <dd className="mt-2 max-w-[26ch] text-[14.5px] text-ivory/72">{s.text}</dd>
            </div>
          ))}
        </dl>

        <p data-reveal className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-gold-hi/20 pt-6 text-[14px] text-ivory/70">
          <span>{highlights.note}</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold-hi/80">{ui.phNote}</span>
        </p>
      </div>
      <div aria-hidden className="ikat-thin absolute inset-x-0 bottom-0" />
    </section>
  );
}
