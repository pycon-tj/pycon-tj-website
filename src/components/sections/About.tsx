"use client";

import { useState } from "react";
import { useDict } from "@/i18n/I18nProvider";
import { useInViewOnce, useSectionMotion, useTilt } from "@/lib/sectionMotion";
import { prefersReducedMotion } from "@/lib/motion";
import { Chorkhona, GlobeIcon, HisorGate, GirihStar } from "../ui/Ornaments";

const TOKEN: Record<string, string> = {
  k: "text-[#e98a7a]",
  s: "text-[#a8d29a]",
  n: "text-gold-hi",
  t: "text-ivory",
};

function Repl() {
  const { about, ui } = useDict();
  const [step, setStep] = useState(0);
  const tilt = useTilt<HTMLDivElement>(6);
  const total = about.repl.lines.length + 1;
  const watch = useInViewOnce<HTMLDivElement>(() => {
    if (prefersReducedMotion()) return setStep(total);
    let i = 0;
    const tick = () => {
      i += 1;
      setStep(i);
      if (i < total) setTimeout(tick, 520);
    };
    setTimeout(tick, 250);
  });

  return (
    <div ref={watch} data-reveal className="mt-12 [perspective:1100px] lg:mt-14">
      <div
        ref={tilt}
        className="dark-island tilt relative overflow-hidden rounded-[10px] border border-[var(--line)] bg-[linear-gradient(180deg,#1d1417,#110c0e)] shadow-[0_40px_90px_-30px_rgb(0_0_0/0.9),0_0_0_1px_rgb(241_214_142/0.04)_inset]"
        role="figure"
        aria-label={ui.replAria}
      >
        <span aria-hidden className="absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-gold-hi),transparent)] opacity-60" />
        <div className="flex items-center gap-2 border-b border-ivory/10 px-4 py-3">
          <i className="size-2.5 rounded-full bg-tj-red" />
          <i className="size-2.5 rounded-full bg-[#e9e1d0]" />
          <i className="size-2.5 rounded-full bg-tj-green" />
          <span className="ml-3 font-mono text-[11.5px] text-[var(--ivory-dim)]">{about.repl.title}</span>
          <GirihStar className="ml-auto size-4 text-gold/60" />
        </div>
        <pre aria-hidden className="code-scroll overflow-x-auto px-5 py-5 font-mono text-[13px] leading-[1.9] sm:px-6 sm:text-[14px]">
          {about.repl.lines.map((l, i) => (
            <span
              key={i}
              className="block transition-[opacity,transform] duration-500 ease-lux"
              style={{ opacity: step > i ? 1 : 0, transform: step > i ? "none" : "translateY(6px)" }}
            >
              <span className="text-gold">{">>> "}</span>
              {l.in.map(([k, t], j) => (
                <span key={j} className={TOKEN[k]}>
                  {t}
                </span>
              ))}
              {l.out && (
                <span className={`block ${i === about.repl.lines.length - 1 ? "text-[#a8d29a]" : "text-[var(--ivory-dim)]"}`}>{l.out}</span>
              )}
            </span>
          ))}
          <span className="block" style={{ opacity: step >= total ? 1 : 0 }}>
            <span className="text-gold">{">>> "}</span>
            <span className="inline-block h-4 w-2 translate-y-[3px] animate-[caret_1s_steps(1)_infinite] bg-gold-hi" />
          </span>
        </pre>
      </div>
    </div>
  );
}

const ICONS = { globe: GlobeIcon, chorkhona: Chorkhona, gate: HisorGate };

export default function About() {
  const { about } = useDict();
  const ref = useSectionMotion<HTMLElement>();
  const s = about.statement;
  return (
    <section ref={ref} id="about" aria-labelledby="about-title" className="relative overflow-hidden py-[clamp(96px,12vw,170px)]">
      {/* Parallax ornaments */}
      <div aria-hidden data-speed="0.5" className="pointer-events-none absolute -right-40 top-10 size-[560px] text-gold opacity-[.07] max-lg:hidden">
        <Chorkhona className="size-full animate-[spin-slow_120s_linear_infinite]" strokeWidth={0.4} />
      </div>
      <div aria-hidden data-speed="-0.35" className="pointer-events-none absolute -left-24 bottom-24 size-[300px] text-gold opacity-[.05]">
        <GirihStar className="size-full" strokeWidth={0.5} />
      </div>

      <div className="wrap relative">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-[clamp(48px,7vw,110px)]">
          <div className="min-w-0">
            <p data-reveal className="eyebrow">
              {about.eyebrow}
            </p>
            <h2
              id="about-title"
              data-reveal
              className="mt-6 font-display text-[clamp(26px,3.3vw,46px)] font-semibold leading-[1.14] tracking-[-0.02em]"
            >
              {s.before}
              <em className="font-serif text-[1.14em] font-semibold italic text-gold-hi">{s.em}</em>
              {s.middle}
              <em className="font-serif text-[1.14em] font-semibold italic text-gold-hi">{s.em2}</em>
            </h2>
            <Repl />
          </div>

          <div className="min-w-0 lg:pt-14">
            <ol className="grid gap-0 border-t border-[var(--line)]">
              {about.blocks.map((b, i) => (
                <li key={b.kicker} data-reveal className="group grid grid-cols-[48px_1fr] gap-4 border-b border-[var(--line)] py-7 sm:grid-cols-[64px_1fr]">
                  <span className="font-mono text-[12px] tracking-[0.14em] text-gold transition-colors group-hover:text-gold-hi">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-[15px] font-semibold uppercase tracking-[0.06em]">{b.kicker}</h3>
                    <p className="mt-3 text-[16px] leading-[1.7] text-[var(--ivory-dim)] sm:text-[17px]">{b.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Pillars */}
        <ul className="mt-[clamp(72px,9vw,120px)] grid gap-px border border-[var(--line)] bg-[var(--line)] md:grid-cols-3">
          {about.pillars.map((p, i) => {
            const Icon = ICONS[p.icon];
            return (
              <li
                key={p.title}
                data-reveal
                className="group relative overflow-hidden bg-ink px-7 pb-10 pt-9 transition-colors duration-500 hover:bg-ink-3 sm:px-9"
              >
                <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[linear-gradient(90deg,var(--color-gold-lo),var(--color-gold-hi))] transition-transform duration-700 ease-lux group-hover:scale-x-100" />
                <div className="flex items-start justify-between">
                  <span className="grid size-16 rotate-45 place-items-center border border-[var(--line)] transition-transform duration-700 ease-lux group-hover:rotate-[135deg]">
                    <Icon className="size-8 -rotate-45 text-gold-hi transition-transform duration-700 ease-lux group-hover:-rotate-[135deg]" strokeWidth={2.4} />
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.18em] text-[var(--ivory-dim)]">{String(i + 1).padStart(2, "0")} / 03</span>
                </div>
                <h3 className="mt-8 font-display text-[19px] font-semibold uppercase tracking-[0.02em]">{p.title}</h3>
                <p className="mt-3 text-[15px] text-[var(--ivory-dim)]">{p.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
