"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useDict } from "@/i18n/I18nProvider";
import LogoPlate from "./ui/LogoPlate";
import { TicketButton } from "./ui/Button";
import ThemeToggle from "./ui/ThemeToggle";
import LanguageSwitcher from "./ui/LanguageSwitcher";

/**
 * Calm sticky header: logo, a few section links, language, theme, one primary action.
 * Below lg the links move into a simple sheet under the bar.
 */
export default function Nav() {
  const { nav, mobileExtraNav, ui } = useDict();
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const items = [...nav, ...mobileExtraNav];

  // Highlight the section in view
  useEffect(() => {
    const els = items
      .map((n) => document.getElementById(n.id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const clearAtTop = () => {
      if (window.scrollY < window.innerHeight * 0.5) setActive("");
    };
    window.addEventListener("scroll", clearAtTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", clearAtTop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- items derive from the dictionary, stable per page
  }, [nav, mobileExtraNav]);

  // Mobile sheet: lock scroll, Escape closes, focus moves in and back out
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const mq = window.matchMedia("(min-width: 64rem)");
    const onMq = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--color-ink)_88%,transparent)] pt-[env(safe-area-inset-top)] backdrop-blur-md">
        <div className="wrap flex h-16 items-center gap-6">
          <a href="#top" aria-label={ui.backToTopAria} className="shrink-0">
            <LogoPlate width={104} />
          </a>

          <nav aria-label={ui.primaryNav} className="ml-auto hidden lg:block">
            <ul className="flex gap-1">
              {items.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    className="nav-link"
                    aria-current={active === n.id ? "true" : undefined}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <ThemeToggle />
            <TicketButton size="sm" className="hidden lg:inline-flex">
              {ui.register}
            </TicketButton>
            <button
              ref={burgerRef}
              type="button"
              className="grid size-10 place-items-center rounded-full border border-[var(--line)] lg:hidden"
              aria-label={open ? ui.closeMenu : ui.openMenu}
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((o) => !o)}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden
                className="size-5 fill-none stroke-current"
                strokeWidth={1.8}
                strokeLinecap="round"
              >
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet sheet — a sibling of the header: the header's backdrop-filter
          would otherwise become the containing block for this fixed panel. */}
      <div
        id={menuId}
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label={ui.siteMenu}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[calc(64px+env(safe-area-inset-top))] z-40 overflow-y-auto border-t border-[var(--line)] bg-ink lg:hidden"
      >
        <nav aria-label={ui.mobileNav} className="wrap py-6">
          <ul>
            {items.map((n) => (
              <li key={n.id} className="border-b border-[var(--line)]">
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-[20px] font-semibold"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <TicketButton onClick={() => setOpen(false)}>
              {ui.register}
            </TicketButton>
            <div className="sm:hidden">
              <LanguageSwitcher size="lg" />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
