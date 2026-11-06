"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isCoarsePointer, prefersReducedMotion } from "./motion";

gsap.registerPlugin(ScrollTrigger);

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

/** Run `cb` when the main thread is idle (bounded by `timeout`). Returns a cancel function. */
export function whenIdle(cb: () => void, timeout = 1500) {
  const w = window as IdleWindow;
  if (w.requestIdleCallback) {
    const id = w.requestIdleCallback(cb, { timeout });
    return () => w.cancelIdleCallback?.(id);
  }
  const t = setTimeout(cb, 200);
  return () => clearTimeout(t);
}

/**
 * Scroll motion for a section:
 *  - `[data-reveal]` children rise and fade in, staggered, when they enter.
 *  - `[data-speed]` children drift vertically (parallax) while the section scrolls.
 *    data-speed="0.3" moves up, negative values move down.
 * Everything is skipped for prefers-reduced-motion.
 */
export function useSectionMotion<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    let ctx: gsap.Context | null = null;
    let revealed = false;

    // Opacity only (never visibility:hidden) so screen readers and Tab still reach
    // content that hasn't animated in yet. Focus reveals an item instantly.
    const onFocus = (e: FocusEvent) => {
      const item = (e.target as Element | null)?.closest?.("[data-reveal]");
      // Instant, so the focused control is never shown half-transparent.
      if (item && root.contains(item)) {
        gsap.killTweensOf(item);
        gsap.set(item, { opacity: 1, y: 0 });
      }
    };
    root.addEventListener("focusin", onFocus);

    const setup = () => {
      // If the visitor is already past or inside this section, skip the entrance.
      revealed = root.getBoundingClientRect().top < window.innerHeight * 0.9;
      ctx = gsap.context(() => {
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
        if (items.length && !revealed) {
          gsap.set(items, { opacity: 0, y: 44 });
          ScrollTrigger.batch(items, {
            start: "top 90%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 1.15,
                ease: "expo.out",
                stagger: 0.09,
                overwrite: true,
              }),
          });
        }
        gsap.utils.toArray<HTMLElement>("[data-speed]", root).forEach((el) => {
          const speed = parseFloat(el.dataset.speed || "0.2");
          gsap.fromTo(
            el,
            { yPercent: speed * 30 },
            {
              yPercent: speed * -30,
              ease: "none",
              scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      }, root);
    };

    // Below-the-fold work waits for an idle moment so it never competes with first paint.
    const cancel = whenIdle(setup);
    return () => {
      cancel();
      root.removeEventListener("focusin", onFocus);
      ctx?.revert();
    };
  }, []);
  return ref;
}

/** Pointer-driven 3D tilt. Writes --rx / --ry (deg) and --mx / --my (%) on the element. */
export function useTilt<T extends HTMLElement>(max = 7): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const coarse = isCoarsePointer();
    const reduced = prefersReducedMotion();
    let raf = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${px * 100}%`);
        el.style.setProperty("--my", `${py * 100}%`);
        if (!coarse && !reduced) {
          el.style.setProperty("--ry", `${(px - 0.5) * 2 * max}deg`);
          el.style.setProperty("--rx", `${(0.5 - py) * 2 * max}deg`);
        }
      });
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [max]);
  return ref;
}

/** True once the element has scrolled into view (fires once). */
export function useInViewOnce<T extends HTMLElement>(cb: () => void, rootMargin = "0px 0px -15% 0px") {
  const ref = useRef<T | null>(null);
  const cbRef = useRef(cb);
  useEffect(() => {
    cbRef.current = cb;
  });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          cbRef.current();
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return ref;
}
