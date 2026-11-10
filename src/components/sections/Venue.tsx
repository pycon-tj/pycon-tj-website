"use client";

import { useDict } from "@/i18n/I18nProvider";
import { Ph, eyebrowText } from "../ui/SectionHeading";
import { LinkButton } from "../ui/Button";

/** Calm Venue: the confirmed city, a plain fact list (TBA items marked), one map link. */
export default function Venue() {
  const { venue, ui } = useDict();
  return (
    <section id="venue" aria-labelledby="venue-title" className="border-t border-[var(--line)] bg-ink-3/60 py-20 sm:py-24">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="min-w-0">
          <p className="eyebrow">{eyebrowText(venue.eyebrow)}</p>
          <h2 id="venue-title" className="mt-3 text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1]">
            {venue.city}
          </h2>
          <p className="mt-2 text-[15px] text-[var(--ivory-dim)]">{venue.cityLocal}</p>
          <p className="mt-6 max-w-[48ch] text-[17px] leading-[1.7] text-[var(--ivory-dim)]">{venue.lead}</p>
          <LinkButton href={venue.map.href} variant="outline" arrow="↗" className="mt-8">
            {venue.map.linkLabel}
            <span className="sr-only"> {ui.opensMapsSr}</span>
          </LinkButton>
        </div>

        <dl className="min-w-0 rounded-2xl border border-[var(--line)] bg-ink-2 px-6 sm:px-8">
          {venue.details.map((d, i) => (
            <div key={d.label} className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5 ${i ? "border-t border-[var(--line)]" : ""}`}>
              <dt className="text-[14px] text-[var(--ivory-dim)]">{d.label}</dt>
              <dd className="text-right text-[16px] font-medium">
                {d.placeholder ? <Ph>{d.value}</Ph> : d.value}
                {d.note && <span className="ml-2 text-[14px] font-normal text-[var(--ivory-dim)]">{d.note}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
