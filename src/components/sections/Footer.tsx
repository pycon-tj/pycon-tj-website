"use client";

import { useDict } from "@/i18n/I18nProvider";
import { FlagStripe } from "../ui/Ornaments";
import { Ph } from "../ui/SectionHeading";

/** Calm footer: logo and tagline, link columns, contacts (placeholders), legal line. */
export default function Footer() {
  const { footer, site, ui } = useDict();
  return (
    <footer className="border-t border-[var(--line)] bg-ink-3/60 pb-10 pt-16 text-[15px] text-[var(--ivory-dim)]">
      <div className="wrap">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          <div className="min-w-0">
            <a href="#top" aria-label={ui.backToTopAria} className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element -- official logo shown untouched */}
              <img src="/assets/pycon-dushanbe-2026-logo-480.webp" srcSet="/assets/pycon-dushanbe-2026-logo-480.webp 1x, /assets/pycon-dushanbe-2026-logo-960.webp 2x" alt={ui.logoAlt} width={2400} height={1063} loading="lazy" className="h-auto w-[160px]" />
            </a>
            <p className="mt-5 max-w-[34ch]">{footer.tagline}</p>
            <p className="mt-4 text-[14px]">
              {ui.organisedBy} <span className="font-semibold text-ivory">{footer.organiser}</span>
            </p>
          </div>

          {footer.columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-ivory">{c.title}</h2>
              <ul className="grid gap-2.5">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="transition-colors hover:text-ivory">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div id="contact" className="min-w-0">
            <h2 className="mb-4 flex flex-wrap items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-ivory">
              {ui.contact} <Ph className="!py-0.5 !text-[11px] normal-case tracking-normal">{ui.placeholder}</Ph>
            </h2>
            <dl className="grid gap-2.5">
              {footer.contacts.map((c) => (
                <div key={c.label} className="flex flex-wrap gap-x-3">
                  <dt className="w-24 text-ivory">{c.label}</dt>
                  <dd>{c.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[var(--line)] pt-6 text-[13px] md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-3">
            <FlagStripe className="w-10 rounded-full" />
            © {site.year} {site.name}
          </p>
          <p className="max-w-[60ch] md:text-right">{footer.trademark}</p>
        </div>
      </div>
    </footer>
  );
}
