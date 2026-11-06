"use client";

import { Fragment } from "react";
import { useDict } from "@/i18n/I18nProvider";

/** Outlined, endlessly scrolling word band. Decorative (content is repeated elsewhere). */
export default function Marquee() {
  const { marquee } = useDict();
  const row = (
    <span className="flex items-center gap-10 pr-10 sm:gap-12 sm:pr-12">
      {marquee.map((w, i) => (
        <Fragment key={i}>
          <span className={i === 2 ? "font-serif font-semibold normal-case italic text-gold" : "outline-type"}>{w}</span>
          <i aria-hidden className="inline-block size-3 shrink-0 rotate-45 border border-gold sm:size-3.5" />
        </Fragment>
      ))}
    </span>
  );
  return (
    <div aria-hidden className="dark-island relative overflow-hidden border-y border-[var(--line)] bg-ink-2 py-5 sm:py-6">
      <div className="flex w-max animate-[marquee_40s_linear_infinite] whitespace-nowrap will-change-transform font-display text-[clamp(28px,4vw,54px)] font-extrabold uppercase leading-none">
        {row}
        {row}
      </div>
    </div>
  );
}
