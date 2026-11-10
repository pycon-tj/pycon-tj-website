"use client";

import { useEffect, useRef, type RefObject } from "react";
import { prefersReducedMotion } from "./motion";

type Opts = { maxTilt?: number; maxShift?: number; lift?: number };

/**
 * Cursor-following 3D card: tilts toward the pointer (X and Y), drifts slightly
 * toward it and lifts in depth, then eases back on leave. Driven by one rAF loop
 * that runs only while the card is moving, writing a single inline transform.
 * Touch and pen-less taps are ignored (cards stay still and tappable); disabled
 * under prefers-reduced-motion. Needs a parent with CSS `perspective`.
 */
export function useCardTilt<T extends HTMLElement>({ maxTilt = 8, maxShift = 6, lift = 14 }: Opts = {}): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const cur = { rx: 0, ry: 0, tx: 0, ty: 0, tz: 0 };
    const tgt = { ...cur };
    let raf = 0;
    let last = 0;

    const frame = (now: number) => {
      const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
      last = now;
      const k = 1 - Math.exp(-dt * 9); // smooth, critically-damped feel
      let moving = false;
      for (const key of Object.keys(cur) as (keyof typeof cur)[]) {
        cur[key] += (tgt[key] - cur[key]) * k;
        if (Math.abs(tgt[key] - cur[key]) > 0.01) moving = true;
      }
      if (moving) {
        el.style.transform = `translate3d(${cur.tx.toFixed(2)}px, ${cur.ty.toFixed(2)}px, ${cur.tz.toFixed(2)}px) rotateX(${cur.rx.toFixed(3)}deg) rotateY(${cur.ry.toFixed(3)}deg)`;
        raf = requestAnimationFrame(frame);
      } else {
        raf = 0;
        last = 0;
        if (tgt.tz === 0) {
          // Fully settled at rest: leave no inline transform behind.
          el.style.transform = "";
          el.style.willChange = "";
        }
      }
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = el.getBoundingClientRect();
      const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) - 0.5;
      const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)) - 0.5;
      tgt.ry = px * 2 * maxTilt;
      tgt.rx = -py * 2 * maxTilt;
      tgt.tx = px * 2 * maxShift;
      tgt.ty = py * 2 * maxShift;
      tgt.tz = lift;
      el.style.willChange = "transform";
      kick();
    };
    const leave = () => {
      tgt.rx = tgt.ry = tgt.tx = tgt.ty = tgt.tz = 0;
      kick();
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      el.style.transform = "";
      el.style.willChange = "";
    };
  }, [maxTilt, maxShift, lift]);

  return ref;
}
