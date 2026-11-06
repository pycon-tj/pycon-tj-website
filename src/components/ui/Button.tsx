"use client";

import type { ReactNode } from "react";
import { useMagnetic } from "@/lib/motion";
import { useTickets } from "../TicketModal";

type Variant = "gold" | "outline";
type Size = "md" | "sm";

const cls = (variant: Variant, size: Size, extra = "") =>
  `btn ${variant === "gold" ? "btn-gold" : "btn-outline"} ${size === "sm" ? "btn-sm" : ""} ${extra}`;

/** Any ticket / register button. Opens the "Tickets open soon" modal. */
export function TicketButton({
  children,
  variant = "gold",
  size = "md",
  className,
  onClick,
}: {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useMagnetic<HTMLButtonElement>();
  const { open } = useTickets();
  return (
    <button
      ref={ref}
      type="button"
      aria-haspopup="dialog"
      className={cls(variant, size, className)}
      onClick={() => {
        onClick?.();
        open();
      }}
    >
      {children} <span className="arr" aria-hidden>→</span>
    </button>
  );
}

/** Anchor styled as a button, with the magnetic hover. */
export function LinkButton({
  href,
  children,
  variant = "outline",
  size = "md",
  className,
  arrow = "→",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  arrow?: string;
}) {
  const ref = useMagnetic<HTMLAnchorElement>();
  return (
    <a ref={ref} href={href} className={cls(variant, size, className)}>
      {children} <span className="arr" aria-hidden>{arrow}</span>
    </a>
  );
}
