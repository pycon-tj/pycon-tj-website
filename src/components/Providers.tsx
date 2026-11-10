"use client";

import type { ReactNode } from "react";
import { TicketProvider } from "./TicketModal";

/**
 * Calm redesign: native scrolling (no smooth-scroll library) and the system cursor.
 * SmoothScroll and Cursor remain in the codebase but are no longer mounted.
 */
export default function Providers({ children }: { children: ReactNode }) {
  return <TicketProvider>{children}</TicketProvider>;
}
