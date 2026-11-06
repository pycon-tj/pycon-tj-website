"use client";

import { useState } from "react";
import type { Level, Workshop } from "@/content/workshops";
import { useDict } from "@/i18n/I18nProvider";
import { useSectionMotion, useTilt } from "@/lib/sectionMotion";
import { Ph, SectionHeading } from "../ui/SectionHeading";
import { GirihStar } from "../ui/Ornaments";

const ICON_PATHS: Record<Workshop["icon"], string> = {
  seed: "M12 21v-8M12 13c0-4 3-7 7-7 0 4-3 7-7 7ZM12 15c0-3-2.5-5.5-6-5.5 0 3 2.5 5.5 6 5.5Z",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z",
  table: "M3 5h18v14H3zM3 10h18M3 15h18M9 5v14M15 5v14",
  graph: "M4 20V4M4 20h16M7 15l4-5 3 3 5-7M19 6v3M19 6h-3",
  check: "M5 12.5l4.5 4.5L19 7.5M4 4h16v16H4z",
  gear: "M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7ZM12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1",
};

const LEVEL_STYLE: Record<Level, string> = {
  Beginner: "border-ivory/30 text-ivory",
  Intermediate: "border-gold/60 text-gold-hi bg-gold/10",
  Advanced: "border-tj-red/60 text-[#ff9aa5] bg-tj-red/10",
};

function CopyLine({ cmd }: { cmd: string }) {
  const { ui } = useDict();
  const [copied, setCopied] = useState(false);
  return (
    <div className="dark-island relative mt-auto flex items-center border border-ivory/10 bg-[#0e0a0b]">
      <code className="code-scroll block flex-1 overflow-x-auto whitespace-nowrap px-3.5 py-3 font-mono text-[12.5px] text-[#d9cfbb]">
        <span className="text-gold">$ </span>
        {cmd}
      </code>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(cmd);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          } catch {
            /* clipboard unavailable — ignore */
          }
        }}
        className="shrink-0 border-l border-ivory/10 px-3 py-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--ivory-dim)] transition-colors hover:text-gold-hi"
        aria-label={`${ui.copyAria} ${cmd}`}
      >
        {copied ? ui.copied : ui.copy}
      </button>
      <span role="status" className="sr-only">
        {copied ? ui.commandCopied : ""}
      </span>
    </div>
  );
}

function WorkshopCard({ w, index }: { w: Workshop; index: number }) {
  const { levelLabels, ui } = useDict();
  const glow = useTilt<HTMLElement>(3);
  return (
    <div data-reveal className="min-w-0 [perspective:1100px]">
      <article
        ref={glow}
        className="tilt glow-follow group relative flex h-full flex-col overflow-hidden border border-ivory/12 bg-ink-2 px-6 pb-6 pt-7 transition-[border-color,translate] duration-500 ease-lux hover:-translate-y-1.5 hover:border-[var(--line)] sm:px-7"
      >
        <span aria-hidden className="ikat-thin absolute inset-x-0 bottom-0 origin-left scale-x-0 transition-transform duration-700 ease-lux group-hover:scale-x-100" />
        <div className="relative flex items-center justify-between">
          <span className="grid size-14 rotate-45 place-items-center border border-[var(--line)] bg-ink/40 transition-transform duration-700 ease-lux group-hover:rotate-[225deg]">
            <svg viewBox="0 0 24 24" aria-hidden className="size-6 -rotate-45 fill-none stroke-gold-hi transition-transform duration-700 ease-lux group-hover:-rotate-[225deg]" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
              <path d={ICON_PATHS[w.icon]} />
            </svg>
          </span>
          <span className={`rounded-full border px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] ${LEVEL_STYLE[w.level]}`}>
            {levelLabels[w.level]}
          </span>
        </div>
        <p className="relative mt-8 font-mono text-[11px] tracking-[0.18em] text-gold">W.{String(index + 1).padStart(2, "0")}</p>
        <h3 className="relative mt-2 font-display text-[21px] font-semibold leading-[1.2]">{w.title}</h3>
        <p className="relative mb-7 mt-3 text-[15px] text-[var(--ivory-dim)]">{w.text}</p>
        <CopyLine cmd={w.install} />
        <dl className="relative mt-5 flex flex-wrap justify-between gap-x-4 gap-y-1 font-mono text-[11.5px] tracking-[0.06em] text-[var(--ivory-dim)]">
          <div className="flex gap-2">
            <dt>{ui.duration}</dt>
            <dd className="text-ivory">{w.duration}</dd>
          </div>
          <div className="flex gap-2">
            <dt>{ui.seats}</dt>
            <dd className="text-ivory">{w.seats}</dd>
          </div>
        </dl>
      </article>
    </div>
  );
}

export default function Workshops() {
  const { workshops, workshopsSection } = useDict();
  const ref = useSectionMotion<HTMLElement>();
  return (
    <section ref={ref} id="workshops" aria-labelledby="workshops-title" className="relative overflow-hidden py-[clamp(96px,12vw,170px)]">
      <div aria-hidden data-speed="0.35" className="girih-bg pointer-events-none absolute inset-x-0 -top-20 h-[60%] opacity-[.035] [mask-image:linear-gradient(180deg,#000,transparent)]" />
      <div aria-hidden data-speed="-0.4" className="pointer-events-none absolute -left-28 bottom-10 size-[360px] text-gold opacity-[.05]">
        <GirihStar className="size-full animate-[spin-slow_140s_linear_infinite]" strokeWidth={0.5} />
      </div>
      <div className="wrap relative">
        <SectionHeading
          id="workshops-title"
          eyebrow={workshopsSection.eyebrow}
          title={workshopsSection.title}
          aside={<Ph>{workshopsSection.badge}</Ph>}
          lead={workshopsSection.lead}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workshops.map((w, i) => (
            <WorkshopCard key={w.title} w={w} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
