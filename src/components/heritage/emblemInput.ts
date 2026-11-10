/** Shared, mutable motion input for the 3D emblem (three-free, no React re-renders). */
export const emblemInput = { scroll: 0.5, px: 0, py: 0 };

if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
  (window as unknown as { __emblem: typeof emblemInput }).__emblem = emblemInput;
}
