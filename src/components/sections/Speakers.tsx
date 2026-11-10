"use client";

import { useDict } from "@/i18n/I18nProvider";
import { Ph, SectionHeading, TitleText } from "../ui/SectionHeading";
import { LinkButton } from "../ui/Button";

/**
 * Calm Speakers: no placeholder portraits on the homepage — the lineup is not
 * announced yet, so the section leads with the call for proposals.
 */
export default function Speakers() {
  const { speakersSection, cfp } = useDict();
  return (
    <section id="speakers" aria-labelledby="speakers-title" className="border-t border-[var(--line)] bg-ink-3/60 py-20 sm:py-24">
      <div className="wrap">
        <SectionHeading id="speakers-title" eyebrow={speakersSection.eyebrow} title={speakersSection.title} aside={<Ph>{speakersSection.badge}</Ph>} />

        <div className="grid gap-8 rounded-2xl border border-[var(--line)] bg-ink-2 p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow">{cfp.kicker}</p>
              <Ph>{cfp.status}</Ph>
            </div>
            <h3 className="mt-4 text-[clamp(22px,2.4vw,30px)] font-semibold leading-[1.25]">
              <TitleText t={{ before: `${cfp.title.before} `, em: cfp.title.em }} />
            </h3>
            <p className="mt-4 max-w-[60ch] text-[16px] leading-[1.7] text-[var(--ivory-dim)]">{cfp.text}</p>
          </div>
          <LinkButton href={cfp.cta.href} variant="outline" className="h-auto min-h-12 max-w-full self-start whitespace-normal py-3 lg:self-center">
            {cfp.cta.label}
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
