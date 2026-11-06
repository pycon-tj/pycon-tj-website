"use client";

import { useEffect, useRef } from "react";
import { isCoarsePointer, prefersReducedMotion } from "@/lib/motion";

const INTERACTIVE = "a, button, [role='tab'], [data-cursor='hover'], summary, label";

/** Decorative gold ring that trails the pointer. Desktop (fine pointer) only. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isCoarsePointer()) return;
    const reduced = prefersReducedMotion();
    let x = -100,
      y = -100,
      cx = -100,
      cy = -100,
      raf = 0,
      shown = false;

    const loop = () => {
      cx += (x - cx) * (reduced ? 1 : 0.2);
      cy += (y - cy) * (reduced ? 1 : 0.2);
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        shown = true;
        cx = x;
        cy = y;
        el.dataset.visible = "true";
      }
      const t = e.target as Element | null;
      const hot = !!t?.closest?.(INTERACTIVE) || document.documentElement.dataset.cursor === "hover";
      el.dataset.hot = hot ? "true" : "false";
    };
    const leave = () => {
      shown = false;
      el.dataset.visible = "false";
    };
    const down = () => (el.dataset.down = "true");
    const up = () => (el.dataset.down = "false");

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      data-visible="false"
      className="group pointer-events-none fixed left-0 top-0 z-[90] hidden [@media(pointer:fine)]:block"
    >
      <span
        className="block size-[34px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-hi/70 opacity-0 mix-blend-difference transition-[width,height,background-color,opacity,scale] duration-300 ease-lux group-data-[visible=true]:opacity-100 group-data-[hot=true]:size-[64px] group-data-[hot=true]:bg-gold-hi/15 group-data-[down=true]:scale-90"
      />
    </div>
  );
}
