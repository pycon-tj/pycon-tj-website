"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const NAV_OFFSET = -72;

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

/** Scroll to an element id (or "top"), smoothly when Lenis is active. */
export function scrollToId(id: string, lenis: Lenis | null) {
  const target = id === "top" ? 0 : document.getElementById(id);
  if (target === null) return;
  if (lenis) {
    lenis.scrollTo(target, { offset: target === 0 ? 0 : NAV_OFFSET, duration: 1.4 });
  } else if (target === 0) {
    window.scrollTo({ top: 0 });
  } else {
    const y = target.getBoundingClientRect().top + window.scrollY + NAV_OFFSET;
    window.scrollTo({ top: y });
  }
}

/**
 * Lenis smooth scrolling driven by GSAP's ticker so ScrollTrigger stays in sync.
 * Falls back to native scrolling for reduced motion.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    let instance: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    if (!prefersReducedMotion()) {
      instance = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
      instance.on("scroll", ScrollTrigger.update);
      tick = (time: number) => instance?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- expose the instance once created
      setLenis(instance);
    }

    // Smooth in-page anchor links (#about, #top, …) site-wide.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      if (!id) return;
      if (id !== "top" && !document.getElementById(id)) return;
      e.preventDefault();
      scrollToId(id, instance);
      history.replaceState(null, "", id === "top" ? location.pathname : `#${id}`);
      // Move keyboard focus to the target for screen-reader / keyboard users.
      const el = id === "top" ? document.getElementById("main") : document.getElementById(id);
      if (el) {
        if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
        el.focus({ preventScroll: true });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      if (tick) gsap.ticker.remove(tick);
      instance?.destroy();
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
