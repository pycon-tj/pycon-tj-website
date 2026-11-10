"use client";

import { useDict } from "@/i18n/I18nProvider";
import { eyebrowText } from "../ui/SectionHeading";
import { GlobeIcon, HisorGate, SevenStars } from "../ui/Ornaments";

const ICONS = { globe: GlobeIcon, stars: SevenStars, gate: HisorGate };

/** Calm About: one statement, two short paragraphs, three plain pillars. */
export default function About() {
  const { about } = useDict();
  const s = about.statement;
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-[var(--line)] py-20 sm:py-24">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
        <div className="min-w-0">
          <p className="eyebrow">{eyebrowText(about.eyebrow)}</p>
          <h2 id="about-title" className="mt-3 text-[clamp(26px,3vw,38px)] font-semibold leading-[1.2]">
            {s.before}
            {s.em}
            {s.middle}
            <span className="text-[var(--btn-primary-bg)]">{s.em2}</span>
          </h2>
          <div className="mt-8 space-y-5 text-[17px] leading-[1.75] text-[var(--ivory-dim)]">
            <p>{about.blocks[0].text}</p>
            <p>{about.blocks[2].text}</p>
          </div>
        </div>

        <ul className="grid content-start gap-4">
          {about.pillars.map((p) => {
            const Icon = ICONS[p.icon];
            return (
              <li key={p.title} className="flex gap-4 rounded-xl border border-[var(--line)] bg-ink-2 p-5">
                <Icon className="size-9 shrink-0 text-gold" strokeWidth={2.2} />
                <div>
                  <h3 className="text-[17px] font-semibold">{p.title}</h3>
                  <p className="mt-1 text-[15px] leading-[1.6] text-[var(--ivory-dim)]">{p.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
