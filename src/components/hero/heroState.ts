import { Vector3 } from "three";
import { heroState } from "./heroSignals";

export { heroState };

/** Statue texture is 736 × 1104. The plane keeps that aspect exactly. */
export const STATUE = { W: 6, H: (6 * 1104) / 736, PX_W: 736, PX_H: 1104 } as const;

/** Image pixel → statue-plane local coordinates. */
export const px = (x: number, y: number, z = 0.02) =>
  new Vector3((x / STATUE.PX_W - 0.5) * STATUE.W, (0.5 - y / STATUE.PX_H) * STATUE.H, z);

/** The crown on the sceptre in Somoni's raised hand. */
export const CROWN = px(289, 508, 0.05);

export type Layout = {
  mobile: boolean;
  camZ: number;
  rig: [number, number, number];
  py: [number, number, number];
  pyScale: number;
  ring: { rx: number; rz: number; y: number };
};

/** Python position in rig space (written by PythonLogo, read by the particle stream). */
export const pyPos = new Vector3();

const clamp01 = (k: number) => Math.min(1, Math.max(0, k));
export const easeOut = (k: number) => 1 - Math.pow(1 - clamp01(k), 3);

/** Seconds since the intro started (frozen at the end state for reduced motion). */
export function introTime(now = performance.now()) {
  if (heroState.reduced) return 60;
  if (heroState.t0 < 0) return 0;
  return (now - heroState.t0) / 1000;
}

/**
 * Intro choreography (~2.5 s):
 *  e1 camera dolly + statue fade-in (0 → 2.0 s)
 *  e2 Python flies in spinning     (0.45 → 2.15 s)
 *  e3 particles appear             (1.2 → 2.5 s)
 */
export function phases(T: number) {
  const intro = easeOut(T / 2.0);
  return {
    // From the poster the statue is already on screen, so it starts fully visible…
    e1: heroState.fromPoster ? 1 : intro,
    // …and the camera only settles in gently instead of flying in from far away.
    // `dolly` = remaining share of the fly-in distance (1 → 0).
    dolly: heroState.fromPoster ? 0.025 * (1 - intro) : 1 - intro,
    e2: easeOut((T - 0.45) / 1.7),
    e3: easeOut((T - 1.2) / 1.3),
  };
}
