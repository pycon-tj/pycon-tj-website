"use client";

import { useEffect, useId, useRef, useState } from "react";
import { LOCALE_COOKIE, localeNames, locales } from "@/i18n/config";
import { useDict, useLocale } from "@/i18n/I18nProvider";

/**
 * Language select: a compact trigger (globe · code · chevron) that opens a list of
 * language links. Links keep the current section (#hash) and remember the choice.
 * Keyboard: Enter/Space/↓ opens, ↑/↓/Home/End move, Esc closes and returns focus.
 */
export default function LanguageSwitcher({
  className = "",
  size = "sm",
  placement = size === "lg" ? "up" : "down",
}: {
  className?: string;
  size?: "sm" | "lg";
  placement?: "up" | "down";
}) {
  const current = useLocale();
  const ui = useDict().ui;
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const listId = useId();

  const items = () => Array.from(list.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
  const focusItem = (i: number) => {
    const all = items();
    all[(i + all.length) % all.length]?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Keyboard opening moves focus into the list once it has rendered as visible.
  const pendingFocus = useRef<number | null>(null);
  useEffect(() => {
    if (open && pendingFocus.current !== null) {
      focusItem(pendingFocus.current);
      pendingFocus.current = null;
    }
  });
  const openAndFocus = (index: number) => {
    pendingFocus.current = index;
    if (open) {
      focusItem(index);
      pendingFocus.current = null;
    } else setOpen(true);
  };

  const lg = size === "lg";

  return (
    <div
      ref={root}
      className={`relative shrink-0 ${className}`}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          setOpen(false);
          button.current?.focus();
        }
      }}
      onBlur={(e) => {
        if (open && !root.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={button}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${ui.language}: ${localeNames[current].native}`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            openAndFocus(e.key === "ArrowDown" ? 0 : -1);
          }
        }}
        className={`group flex items-center gap-2 rounded-full border font-mono uppercase tracking-[0.12em] transition-colors duration-300 ${
          open ? "border-gold-hi/60 text-ivory" : "border-[var(--line)] text-[var(--ivory-dim)] hover:border-gold-hi/40 hover:text-ivory"
        } ${lg ? "py-2.5 pl-4 pr-3.5 text-[13px]" : "py-1.5 pl-2.5 pr-2 text-[11px]"}`}
      >
        <svg viewBox="0 0 24 24" aria-hidden className={`${lg ? "size-4" : "size-3.5"} text-gold`} fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
        </svg>
        <span aria-hidden className="text-ivory">{localeNames[current].short}</span>
        <svg
          viewBox="0 0 12 12"
          aria-hidden
          className={`size-2.5 transition-transform duration-300 ease-lux ${open !== (placement === "up") ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M2.5 4.5 6 8l3.5-3.5" />
        </svg>
      </button>

      <ul
        ref={list}
        id={listId}
        aria-label={ui.language}
        className={`absolute right-0 z-50 min-w-[190px] origin-top-right overflow-hidden rounded-[10px] border border-[var(--line)] bg-ink-2 p-1.5 shadow-[0_16px_40px_-16px_rgb(0_0_0/0.3)] ease-lux ${
          placement === "up" ? "bottom-full mb-2 origin-bottom-right" : "top-full mt-2"
        } ${open ? "visible scale-100 opacity-100 [transition:opacity_.3s,transform_.3s,visibility_0s]" : "pointer-events-none invisible scale-95 opacity-0 [transition:opacity_.3s,transform_.3s,visibility_0s_.3s]"}`}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            setOpen(false);
            return;
          }
          const i = items().indexOf(document.activeElement as HTMLAnchorElement);
          const target = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: -1 }[e.key];
          if (target === undefined) return;
          e.preventDefault();
          focusItem(target);
        }}
      >
        {locales.map((l) => {
          const active = l === current;
          return (
            <li key={l}>
              <a
                href={`/${l}`}
                hrefLang={l}
                lang={l}
                aria-current={active ? "true" : undefined}
                tabIndex={open ? 0 : -1}
                onClick={(e) => {
                  document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
                  if (active) {
                    e.preventDefault();
                    setOpen(false);
                    button.current?.focus();
                    return;
                  }
                  // Stay on the same section in the new language (the browser follows the updated href).
                  e.currentTarget.href = `/${l}${window.location.hash}`;
                }}
                className={`flex items-center gap-3 rounded-[7px] px-3 py-2.5 outline-offset-[-2px] transition-colors duration-200 ${
                  active ? "bg-gold-hi/12 text-ivory" : "text-[var(--ivory-dim)] hover:bg-ivory/[0.06] hover:text-ivory focus-visible:bg-ivory/[0.06]"
                }`}
              >
                <span className={`w-6 font-mono text-[11px] tracking-[0.14em] ${active ? "text-gold-hi" : "text-gold/70"}`}>{localeNames[l].short}</span>
                <span className="flex-1 text-[14px]">{localeNames[l].native}</span>
                {active && (
                  <svg viewBox="0 0 12 12" aria-hidden className="size-3 text-gold-hi" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="m2.5 6.2 2.3 2.3 4.7-4.9" />
                  </svg>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
