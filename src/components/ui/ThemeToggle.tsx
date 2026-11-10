"use client";

import { useSyncExternalStore } from "react";
import { useDict } from "@/i18n/I18nProvider";
import { prefersReducedMotion } from "@/lib/motion";

type Theme = "light" | "dark";

// Light is the default; dark only when the visitor picks it.
function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}
const getTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

function applyTheme(next: Theme) {
  const set = () => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  if (doc.startViewTransition && !prefersReducedMotion()) doc.startViewTransition(set);
  else set();
}

/** Sun / moon switch. The initial theme is set before paint by the script in the layout. */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const ui = useDict().ui;
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);
  const next: Theme = theme === "light" ? "dark" : "light";
  return (
    <button
      type="button"
      onClick={() => applyTheme(next)}
      aria-label={next === "light" ? ui.toLight : ui.toDark}
      title={next === "light" ? ui.toLight : ui.toDark}
      className={`group relative grid size-10 shrink-0 place-items-center rounded-full border border-[var(--line)] text-ivory transition-colors hover:border-ivory/40 ${className}`}
    >
      {/* Sun */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className={`absolute size-[18px] fill-none stroke-current transition-[opacity,rotate,scale] duration-500 ease-lux ${
          theme === "light" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
        }`}
        strokeWidth={1.6}
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
      </svg>
      {/* Moon with a small 8-point star */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className={`absolute size-[18px] fill-none stroke-current transition-[opacity,rotate,scale] duration-500 ease-lux ${
          theme === "dark" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-50 opacity-0"
        }`}
        strokeWidth={1.6}
        strokeLinejoin="round"
      >
        <path d="M19.5 14.6A8 8 0 0 1 9.4 4.5a8 8 0 1 0 10.1 10.1Z" />
        <path d="M17 3.5v3M15.5 5h3" strokeLinecap="round" />
      </svg>
    </button>
  );
}
