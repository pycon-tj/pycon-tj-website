"use client";

import { LOCALE_COOKIE, localeNames, locales } from "@/i18n/config";
import { useDict, useLocale } from "@/i18n/I18nProvider";

/** EN · RU · TJ segmented switch. Keeps the current section (#hash) and remembers the choice. */
export default function LanguageSwitcher({ className = "", size = "sm" }: { className?: string; size?: "sm" | "lg" }) {
  const current = useLocale();
  const ui = useDict().ui;
  return (
    <div role="group" aria-label={ui.language} className={`flex shrink-0 rounded-full border border-[var(--line)] p-0.5 ${className}`}>
      {locales.map((l) => {
        const active = l === current;
        return (
          <a
            key={l}
            href={`/${l}`}
            hrefLang={l}
            lang={l}
            aria-current={active ? "true" : undefined}
            title={localeNames[l].native}
            onClick={(e) => {
              document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
              if (active) {
                e.preventDefault();
                return;
              }
              // Stay on the same section in the new language (the browser follows the updated href).
              e.currentTarget.href = `/${l}${window.location.hash}`;
            }}
            className={`rounded-full font-mono uppercase tracking-[0.12em] transition-colors duration-300 ${
              size === "lg" ? "px-4 py-2 text-[13px]" : "px-2.5 py-1.5 text-[11px]"
            } ${active ? "bg-gold-hi text-ink" : "text-[var(--ivory-dim)] hover:text-ivory"}`}
          >
            <span aria-hidden>{localeNames[l].short}</span>
            <span className="sr-only">{localeNames[l].native}</span>
          </a>
        );
      })}
    </div>
  );
}
