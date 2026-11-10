"use client";

import { useDict } from "@/i18n/I18nProvider";
import { FlagStripe, StarRosette } from "../ui/Ornaments";
import { Ph } from "../ui/SectionHeading";

export default function Footer() {
  const { footer, site, ui } = useDict();
  return (
    <footer className="dark-island relative overflow-hidden border-t border-[var(--line)] bg-[#0e0a0b] pb-10 pt-[clamp(64px,8vw,96px)] text-[14px] text-[var(--ivory-dim)]">
      <FlagStripe className="absolute inset-x-0 top-0 opacity-80" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-40 size-[460px] text-gold opacity-[.04]">
        <StarRosette className="size-full" strokeWidth={0.5} />
      </div>

      <div className="wrap relative">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div className="min-w-0">
            <a href="#top" aria-label={ui.backToTopAria} className="inline-block rounded-[6px]  px-4 py-3 ">
              {/* eslint-disable-next-line @next/next/no-img-element -- official logo shown untouched */}
              <img src="/assets/pycon-dushanbe-2026-logo-480.webp" srcSet="/assets/pycon-dushanbe-2026-logo-480.webp 1x, /assets/pycon-dushanbe-2026-logo-960.webp 2x" alt={ui.logoAlt} width={2400} height={1063} loading="lazy" className="h-auto w-[200px]" />
            </a>
            <p className="mt-6 max-w-[34ch]">{footer.tagline}</p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em]">
              {ui.organisedBy} <span className="text-gold-hi">{footer.organiser}</span>
            </p>
          </div>

          {footer.columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h2 className="mb-5 font-mono text-[11px] font-normal uppercase tracking-[0.18em] text-gold">{c.title}</h2>
              <ul className="grid gap-3">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="group inline-flex items-center gap-2 transition-colors hover:text-ivory">
                      <i aria-hidden className="size-1.5 rotate-45 border border-gold/60 transition-colors group-hover:bg-gold" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div id="contact" className="min-w-0 scroll-mt-24">
            <h2 className="mb-5 flex items-center gap-3 font-mono text-[11px] font-normal uppercase tracking-[0.18em] text-gold">
              {ui.contact} <Ph className="!py-0.5 !text-[9px]">{ui.placeholder}</Ph>
            </h2>
            <dl className="grid gap-3">
              {footer.contacts.map((c) => (
                <div key={c.label} className="flex flex-wrap gap-x-3">
                  <dt className="w-20 font-mono text-[11px] uppercase tracking-[0.12em] text-ivory/65">{c.label}</dt>
                  <dd>{c.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 font-mono text-[11px] tracking-[0.12em] text-ivory/62">{site.coordinates}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-ivory/10 pt-7 text-[12.5px] md:flex-row md:items-center md:justify-between">
          <p>
            © {site.year} {site.name}. {ui.edition} {site.edition}.
          </p>
          <FlagStripe className="w-28 rounded-full" />
          <p className="max-w-[58ch] text-ivory/62 md:text-right">{footer.trademark}</p>
        </div>
      </div>
    </footer>
  );
}
