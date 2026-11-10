import type { ReactNode } from "react";

type Title = { before?: string; em: string; after?: string };

/** Placeholder chip — makes unconfirmed content obvious. */
export function Ph({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-dashed border-gold/50 px-3 py-1 text-[12px] font-medium text-gold ${className}`}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-gold" />
      {children}
    </span>
  );
}

/** Section eyebrow without the old "02 — " numbering. */
export const eyebrowText = (s: string) => s.replace(/^\d+\s*[—-]\s*/, "");

/** Heading title: sentence case, one word picked out in the accent colour. */
export function TitleText({ t }: { t: Title }) {
  return (
    <>
      {t.before}
      <span className="text-[var(--btn-primary-bg)]">{t.em}</span>
      {t.after}
    </>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  aside,
  lead,
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: Title;
  aside?: ReactNode;
  lead?: ReactNode;
  className?: string;
}) {
  return (
    <header className={`mb-10 grid gap-x-12 gap-y-4 sm:mb-12 lg:grid-cols-[1fr_auto] lg:items-end ${className}`}>
      <div>
        <p className="eyebrow">{eyebrowText(eyebrow)}</p>
        <h2 id={id} className="mt-3 max-w-[22ch] text-[clamp(28px,3.4vw,42px)] font-semibold leading-[1.15]">
          <TitleText t={title} />
        </h2>
      </div>
      {aside && <div>{aside}</div>}
      {lead && <p className="max-w-[62ch] text-[17px] leading-[1.7] text-[var(--ivory-dim)] lg:col-span-2">{lead}</p>}
    </header>
  );
}
