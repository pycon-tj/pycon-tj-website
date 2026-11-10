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
      className={`fixed inset-0 z-[80] grid place-items-center bg-[rgb(10_6_8/0.45)] px-4 transition-[opacity,visibility] duration-400 ${
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
        className={`relative w-full max-w-[480px] overflow-hidden rounded-2xl border border-[var(--line)] bg-ink-2 p-8 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.35)] transition-transform duration-300 ease-out sm:p-10 ${
          open ? "translate-y-0" : "translate-y-3"
        }`}
      >
        <p className="eyebrow">{ticketModal.eyebrow}</p>
        <h2 id={titleId} className="mt-3 text-[26px] font-semibold leading-[1.2]">
          {ticketModal.title.before} <span className="text-[var(--btn-primary-bg)]">{ticketModal.title.em}</span>
        </h2>
        <p id={descId} className="mt-4 text-[var(--ivory-dim)]">
          {ticketModal.body}
        </p>
        <p className="mt-3 text-[14px] text-gold">{ticketModal.note}</p>
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
