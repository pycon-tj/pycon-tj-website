"use client";

import type { ReactNode } from "react";
import SmoothScroll from "./SmoothScroll";
import { TicketProvider } from "./TicketModal";
import Cursor from "./Cursor";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <TicketProvider>
        {children}
        <Cursor />
      </TicketProvider>
    </SmoothScroll>
  );
}
