"use client";

import { useDict } from "@/i18n/I18nProvider";
import { TicketButton } from "../ui/Button";
import TajikFlag from "../ui/TajikFlag";

/**
 * Calm first screen: conference name, confirmed location, one primary action.
 * The date is shown only once it is confirmed (site.dateLabel is still "TBA").
 * The Somoni monument appears as a still image in a Hisor-style arch.
 * (The previous 3D scene lives on in HeroScene.tsx but is no longer mounted.)
 */
export default function Hero() {
  const { hero, site } = useDict();
  // hero.meta = [date, location, edition]; only the location is confirmed.
  const location = hero.meta[1];

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-16">
      <div className="wrap grid items-center gap-12 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:pb-24 lg:pt-20">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-3 text-[14px] font-medium text-[var(--ivory-dim)]">
            <TajikFlag />
            {hero.badge}
          </p>
          <h1 id="hero-title" className="mt-5 text-[clamp(40px,6.4vw,76px)] font-bold leading-[1.04] tracking-[-0.035em]">
            {site.name} <span className="text-[var(--btn-primary-bg)]">{site.year}</span>
          </h1>
          <p className="mt-6 max-w-[50ch] text-[clamp(17px,1.5vw,20px)] leading-[1.6] text-[var(--ivory-dim)]">{hero.lead}</p>

          <dl className="mt-8">
            <div className="flex items-center gap-2.5 text-[16px] font-medium">
              <dt className="sr-only">{location.label}</dt>
              <svg viewBox="0 0 24 24" aria-hidden className="size-5 shrink-0 fill-none stroke-[var(--btn-primary-bg)]" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
              <dd>{location.value}</dd>
            </div>
          </dl>

          <div className="mt-10">
            <TicketButton>{hero.primaryCta}</TicketButton>
          </div>
        </div>

        {/* Somoni monument in a Hisor-style arch — the one image on the first screen */}
        <div className="mx-auto w-full max-w-[400px] lg:mx-0 lg:ml-auto lg:max-w-[440px]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full border border-[var(--line)] bg-ink-3">
            {/* eslint-disable-next-line @next/next/no-img-element -- the monument is shown unaltered; it is the LCP image */}
            <img
              src="/assets/statue.webp"
              alt={hero.statueAlt}
              width={736}
              height={1104}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-x-0 bottom-0 mx-auto h-[96%] w-auto max-w-none object-contain object-bottom"
            />
          </div>
          <div aria-hidden className="ikat-thin mt-3 rounded-full opacity-70" />
        </div>
      </div>
    </section>
  );
}
