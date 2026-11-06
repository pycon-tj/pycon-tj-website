"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import type { Slot, Track } from "@/content/schedule";
import { useDict } from "@/i18n/I18nProvider";
import { useSectionMotion } from "@/lib/sectionMotion";
import { Ph, SectionHeading } from "../ui/SectionHeading";
import { SuzaniRosette } from "../ui/Ornaments";

const TRACK_COLOR: Record<Track, string> = {
  Keynote: "#f1d68e",
  Core: "#7d98ff",
  Web: "#e98a7a",
  Data: "#a8d29a",
  ML: "#c9a6ff",
  Community: "#ff7b8a",
  Workshop: "#c9a24a",
};

function Session({ slot, id, delay }: { slot: Extract<Slot, { kind: "session" }>; id: string; delay: number }) {
  const { trackLabels } = useDict();
  const [open, setOpen] = useState(false);
  const panel = `${id}-desc`;
  return (
    <li
      className="intro-fade group relative border-b border-ivory/10"
      data-open={open}
      style={{ "--d": `${delay}s` } as React.CSSProperties}
    >
      <span aria-hidden className="absolute inset-y-0 left-0 w-[2px] origin-top scale-y-0 bg-gold transition-transform duration-500 ease-lux group-hover:scale-y-100 group-data-[open=true]:scale-y-100" />
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panel}
        onClick={() => setOpen((o) => !o)}
        className="grid w-full grid-cols-[72px_1fr_36px] items-start gap-x-4 gap-y-2 px-2 py-6 text-left transition-[background-color,padding] duration-500 ease-lux hover:bg-gold/[.045] sm:grid-cols-[110px_1fr_200px_40px] sm:gap-x-6 sm:hover:pl-5 lg:grid-cols-[140px_1fr_240px_40px] lg:py-7"
      >
        <span className="pt-0.5 font-mono text-[14px] tabular-nums text-gold-hi sm:text-[15px]">
          {slot.time}
          <small className="mt-0.5 block text-[11px] text-[var(--ivory-dim)]">– {slot.end}</small>
        </span>
        <span className="min-w-0">
          <span className="block font-display text-[clamp(16px,1.6vw,21px)] font-semibold leading-[1.25]">{slot.title}</span>
          <span className="mt-2.5 inline-flex items-center gap-2 rounded-sm border border-ivory/15 px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ivory/80">
            <i className="size-1.5 rounded-full" style={{ background: TRACK_COLOR[slot.track] }} />
            {trackLabels[slot.track]}
          </span>
        </span>
        <span className="col-start-2 row-start-2 min-w-0 text-[14px] sm:col-start-3 sm:row-start-1">
          {slot.speaker}
          <small className="mt-0.5 block font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ivory-dim)]">{slot.room}</small>
        </span>
        <span
          aria-hidden
          className="col-start-3 row-start-1 grid size-8 place-items-center justify-self-end rounded-full border border-[var(--line)] text-gold transition-[transform,background-color] duration-500 ease-lux group-data-[open=true]:rotate-45 group-data-[open=true]:bg-gold/15 sm:col-start-4"
        >
          +
        </span>
      </button>
      <div id={panel} className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-600 ease-lux group-data-[open=true]:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <p className="max-w-[62ch] pb-7 pl-[88px] pr-4 text-[15px] text-[var(--ivory-dim)] sm:pl-[136px] lg:pl-[166px]">{slot.description}</p>
        </div>
      </div>
    </li>
  );
}

export default function Schedule() {
  const { days, scheduleSection, trackLabels, ui } = useDict();
  const ref = useSectionMotion<HTMLElement>();
  const [day, setDay] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState({ left: 4, width: 0 });
  const uid = useId();

  const measure = useCallback(() => {
    const b = tabs.current[day];
    if (b) setPill({ left: b.offsetLeft, width: b.offsetWidth });
  }, [day]);

  useLayoutEffect(() => measure(), [measure]);
  // Re-measure whenever a tab changes size (late web-font swap, resize, language).
  useEffect(() => {
    const ro = new ResizeObserver(() => measure());
    tabs.current.forEach((b) => b && ro.observe(b));
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [measure]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    let next = -1;
    if (dir) next = (day + dir + days.length) % days.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = days.length - 1;
    if (next < 0) return;
    e.preventDefault();
    setDay(next);
    tabs.current[next]?.focus();
  };

  return (
    <section
      ref={ref}
      id="schedule"
      aria-labelledby="schedule-title"
      className="relative overflow-hidden border-y border-ivory/10 bg-ink-2 py-[clamp(96px,12vw,170px)]"
    >
      <div aria-hidden data-speed="0.45" className="pointer-events-none absolute -right-36 top-24 size-[480px] text-gold opacity-[.05]">
        <SuzaniRosette className="size-full" strokeWidth={0.45} />
      </div>
      <div className="wrap relative">
        <SectionHeading
          id="schedule-title"
          eyebrow={scheduleSection.eyebrow}
          title={scheduleSection.title}
          aside={<Ph>{scheduleSection.badge}</Ph>}
          lead={scheduleSection.lead}
        />

        <div data-reveal className="mb-8 flex flex-wrap items-center justify-between gap-6">
          <div role="tablist" aria-label={ui.conferenceDays} className="relative inline-flex gap-1 rounded-full border border-[var(--line)] p-1">
            <span
              aria-hidden
              className="absolute bottom-1 top-1 rounded-full bg-[linear-gradient(135deg,#f1d68e,#c9a24a)] shadow-[0_6px_24px_-8px_rgb(201_162_74/0.7)] transition-[left,width] duration-500 ease-lux"
              style={{ left: pill.left, width: pill.width }}
            />
            {days.map((d, i) => (
              <button
                key={d.label}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`${uid}-tab-${i}`}
                aria-selected={day === i}
                aria-controls={`${uid}-panel`}
                tabIndex={day === i ? 0 : -1}
                onClick={() => setDay(i)}
                onKeyDown={onKey}
                className={`relative z-[1] rounded-full px-6 py-2.5 text-left transition-colors duration-400 sm:px-7 ${
                  day === i ? "text-[#1a0e08]" : "text-[var(--ivory-dim)] hover:text-ivory"
                }`}
              >
                <span className="block font-display text-[12.5px] font-semibold uppercase tracking-[0.1em]">{d.label}</span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.12em] opacity-75">{d.date}</span>
              </button>
            ))}
          </div>
          <ul aria-label={ui.tracks} className="flex flex-wrap gap-x-4 gap-y-2">
            {(Object.keys(TRACK_COLOR) as Track[]).map((t) => (
              <li key={t} className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--ivory-dim)]">
                <i className="size-1.5 rounded-full" style={{ background: TRACK_COLOR[t] }} />
                {trackLabels[t]}
              </li>
            ))}
          </ul>
        </div>

        <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${day}`} data-reveal>
          <ol key={day} className="border-t border-[var(--line)]">
            {days[day].slots.map((slot, i) =>
              slot.kind === "break" ? (
                <li
                  key={i}
                  className="intro-fade flex items-center gap-4 border-b border-ivory/10 px-2 py-5 sm:gap-6"
                  style={{ "--d": `${i * 0.04}s` } as React.CSSProperties}
                >
                  <span className="w-[72px] shrink-0 font-mono text-[14px] tabular-nums text-[var(--ivory-dim)] sm:w-[110px] lg:w-[140px]">{slot.time}</span>
                  <i aria-hidden className="size-2.5 shrink-0 rotate-45 border border-gold" />
                  <span className="font-serif text-[clamp(20px,2vw,24px)] font-semibold italic text-[var(--ivory-dim)]">{slot.title}</span>
                  <span aria-hidden className="hidden h-px flex-1 border-t border-dashed border-gold/25 sm:block" />
                </li>
              ) : (
                <Session key={i} slot={slot} id={`${uid}-${day}-${i}`} delay={i * 0.04} />
              ),
            )}
          </ol>
        </div>
      </div>
    </section>
  );
}
