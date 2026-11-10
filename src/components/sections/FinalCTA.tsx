"use client";

import { useDict } from "@/i18n/I18nProvider";
import { TitleText, eyebrowText } from "../ui/SectionHeading";
import { TicketButton } from "../ui/Button";

/** Calm closing band: one sentence and the same single primary action as the hero. */
export default function FinalCTA() {
  const { finalCta } = useDict();
  return (
    <section id="join" aria-labelledby="join-title" className="border-t border-[var(--line)] py-20 sm:py-24">
      <div className="wrap">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="eyebrow">{eyebrowText(finalCta.eyebrow)}</p>
          <h2 id="join-title" className="mt-3 text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.15]">
            <TitleText t={finalCta.title} />
          </h2>
          <p className="mx-auto mt-5 max-w-[46ch] text-[17px] leading-[1.7] text-[var(--ivory-dim)]">{finalCta.text}</p>
          <div className="mt-9">
            <TicketButton>{finalCta.cta}</TicketButton>
          </div>
        </div>
      </div>
    </section>
  );
}
