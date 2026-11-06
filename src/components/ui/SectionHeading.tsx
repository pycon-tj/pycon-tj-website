import type { ReactNode } from "react";

type Title = { before?: string; em: string; after?: string };

/** Placeholder chip — makes unconfirmed content obvious. */
export function Ph({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-dashed border-gold/45 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.13em] text-gold-hi ${className}`}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-gold-hi shadow-[0_0_8px_var(--color-gold-hi)]" />
      {children}
    </span>
  );
}

/** Heading title: uppercase Unbounded with one gold Cormorant italic accent. */
export function TitleText({ t }: { t: Title }) {
  return (
    <>
      {t.before}
      <em className="font-serif text-[1.1em] font-semibold normal-case italic tracking-[-0.01em] text-gold-hi">{t.em}</em>
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
    <header className={`mb-12 grid gap-x-12 gap-y-6 sm:mb-16 lg:mb-20 lg:grid-cols-[1fr_auto] lg:items-end ${className}`}>
      <div data-reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2
          id={id}
          className="mt-5 max-w-[16ch] font-display text-[clamp(32px,5.4vw,72px)] font-extrabold uppercase leading-[1.02] tracking-[-0.035em]"
        >
          <TitleText t={title} />
        </h2>
      </div>
      {aside && <div data-reveal>{aside}</div>}
      {lead && (
        <p data-reveal className="max-w-[60ch] text-[clamp(15px,1.3vw,18px)] text-[var(--ivory-dim)] lg:col-span-2">
          {lead}
        </p>
      )}
    </header>
  );
}
