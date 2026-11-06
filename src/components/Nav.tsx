"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useDict } from "@/i18n/I18nProvider";
import LogoPlate from "./ui/LogoPlate";
import { TicketButton } from "./ui/Button";
import { useLenis } from "./SmoothScroll";
import ThemeToggle from "./ui/ThemeToggle";
import LanguageSwitcher from "./ui/LanguageSwitcher";

export default function Nav() {
  const { nav, mobileExtraNav, ui } = useDict();
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // Solid bar after scrolling
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section
  useEffect(() => {
    const ids = [...nav, ...mobileExtraNav].map((n) => n.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
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
  }, [nav, mobileExtraNav]);

  // Mobile menu: lock scroll, Escape, focus management
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const first = menuRef.current?.querySelector<HTMLElement>("a");
    const t = setTimeout(() => first?.focus(), 250);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const mq = window.matchMedia("(min-width: 80rem)");
    const onMq = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onMq);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      document.documentElement.style.overflow = prev;
      lenis?.start();
    };
  }, [open, lenis]);

  const mobileItems = [...nav.slice(0, 4), ...mobileExtraNav, ...nav.slice(4)];

  return (
    <>
      <header
        className={`dark-island intro-fade fixed inset-x-0 top-0 z-50 border-b pt-[env(safe-area-inset-top)] transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solid && !open
            ? "border-[var(--line)] bg-[rgb(20_16_18/0.78)] backdrop-blur-[14px] backdrop-saturate-[1.4]"
            : "border-transparent"
        }`}
        style={{ "--d": "0.15s" } as React.CSSProperties}
      >
        <div
          className={`wrap flex items-center gap-7 transition-[height] duration-500 ease-lux ${
            solid ? "h-[64px]" : "h-[76px]"
          }`}
        >
          <a
            href="#top"
            aria-label={ui.backToTopAria}
            className="relative z-[2] shrink-0"
          >
            <LogoPlate
              width={solid ? 104 : 118}
              className="transition-all duration-500"
            />
          </a>

          <nav aria-label={ui.primaryNav} className="ml-auto hidden xl:block">
            <ul className="flex gap-1">
              {nav.map((n) => (
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

          <div className="hidden items-center gap-2.5 xl:flex">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          <TicketButton size="sm" className="hidden lg:ml-auto lg:inline-flex xl:ml-0">
            {ui.register}
          </TicketButton>

          <ThemeToggle className="ml-auto lg:ml-0 xl:hidden" />

          <button
            ref={burgerRef}
            type="button"
            className="relative z-[2] size-11 xl:hidden"
            aria-label={open ? ui.closeMenu : ui.openMenu}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((o) => !o)}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                aria-hidden
                className="absolute left-[11px] right-[11px] h-[1.5px] bg-ivory transition-[transform,opacity] duration-400 ease-lux"
                style={{
                  top: 16 + i * 6,
                  transform: open
                    ? i === 0
                      ? "translateY(6px) rotate(45deg)"
                      : i === 2
                        ? "translateY(-6px) rotate(-45deg)"
                        : ""
                    : "",
                  opacity: open && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Full-screen burgundy menu (mobile / tablet) */}
      <div
        id={menuId}
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label={ui.siteMenu}
        inert={!open}
        className="dark-island fixed inset-0 z-[45] flex flex-col overflow-y-auto bg-wine-deep px-4 pb-10 pt-[calc(96px+env(safe-area-inset-top))] transition-[clip-path,visibility] duration-700 ease-lux sm:px-7 xl:hidden"
        style={{
          clipPath: open
            ? "circle(150% at calc(100% - 40px) 40px)"
            : "circle(0% at calc(100% - 40px) 40px)",
          visibility: open ? "visible" : "hidden",
        }}
      >
        <div
          aria-hidden
          className="girih-bg pointer-events-none absolute inset-0 opacity-[.07]"
        />
        <nav aria-label={ui.mobileNav} className="relative my-auto">
          <ul>
            {mobileItems.map((n, i) => (
              <li
                key={n.id}
                className="border-b border-gold-hi/15 transition-[opacity,transform] duration-700 ease-lux"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(24px)",
                  transitionDelay: open ? `${0.15 + i * 0.05}s` : "0s",
                }}
              >
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-3 font-display text-[clamp(28px,8.5vw,46px)] font-extrabold uppercase leading-[1.15] tracking-[-0.02em]"
                >
                  <small className="font-mono text-xs font-normal text-gold">
                    {n.num}
                  </small>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <TicketButton onClick={() => setOpen(false)}>{ui.register}</TicketButton>
            <LanguageSwitcher size="lg" />
          </div>
        </nav>
      </div>
    </>
  );
}
