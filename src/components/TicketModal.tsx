"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useDict } from "@/i18n/I18nProvider";
import { useLenis } from "./SmoothScroll";

type Ctx = { open: () => void };
const TicketContext = createContext<Ctx>({ open: () => {} });
export const useTickets = () => useContext(TicketContext);

/**
 * "Tickets open soon" dialog. Every ticket / register button opens this —
 * there is no checkout on the site.
 */
export function TicketProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const lastFocus = useRef<HTMLElement | null>(null);
  const open = useCallback(() => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);
  const close = useCallback(() => {
    setOpen(false);
    lastFocus.current?.focus?.();
  }, []);
  const value = useMemo(() => ({ open }), [open]);

  return (
    <TicketContext.Provider value={value}>
      {children}
      <TicketDialog open={isOpen} onClose={close} />
    </TicketContext.Provider>
  );
}

function TicketDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { ticketModal, ui } = useDict();
  const titleId = useId();
  const descId = useId();
  const boxRef = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => closeBtn.current?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Tab" && boxRef.current) {
        const f = boxRef.current.querySelectorAll<HTMLElement>("button, a[href]");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
      lenis?.start();
    };
  }, [open, onClose, lenis]);

  return (
    <div
      className={`fixed inset-0 z-[80] grid place-items-center bg-[rgb(10_6_8/0.74)] px-4 backdrop-blur-md transition-[opacity,visibility] duration-400 ${
        open ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
      }`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-hidden={!open}
      inert={!open}
    >
      <div
        ref={boxRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className={`relative w-full max-w-[480px] overflow-hidden border border-[var(--line)] bg-ink-2 p-8 transition-transform duration-500 ease-lux sm:p-10 ${
          open ? "translate-y-0 scale-100" : "translate-y-5 scale-[.98]"
        }`}
      >
        <div aria-hidden className="girih-bg pointer-events-none absolute -right-16 -top-16 size-56 opacity-[.08]" />
        <p className="eyebrow">{ticketModal.eyebrow}</p>
        <h2 id={titleId} className="mt-5 font-display text-[26px] font-extrabold uppercase leading-[1.08] tracking-[-0.02em]">
          {ticketModal.title.before}{" "}
          <em className="font-serif text-[1.15em] font-semibold normal-case tracking-normal text-gold-hi">
            {ticketModal.title.em}
          </em>
        </h2>
        <p id={descId} className="mt-4 text-[var(--ivory-dim)]">
          {ticketModal.body}
        </p>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-gold">{ticketModal.note}</p>
        <button ref={closeBtn} type="button" className="btn btn-gold mt-8" onClick={onClose}>
          {ticketModal.close} <span className="arr" aria-hidden>→</span>
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label={ui.closeDialog}
          className="absolute right-3 top-3 grid size-10 place-items-center text-2xl text-[var(--ivory-dim)] transition-colors hover:text-ivory"
        >
          ×
        </button>
      </div>
    </div>
  );
}
