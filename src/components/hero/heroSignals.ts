/**
 * Mutable, non-React state shared between the DOM hero and the R3F scene.
 * Updated from event listeners and read inside useFrame — no re-renders.
 *
 * Kept free of three.js imports on purpose: Hero.tsx imports this eagerly, and
 * three.js must only be downloaded when the 3D scene actually starts.
 */
export const heroState = {
  t0: -1, // performance.now() when the scene's textures are ready
  reduced: false,
  pointer: { x: 0, y: 0 }, // -1..1, raw
  smooth: { x: 0, y: 0 }, // eased pointer, written by the camera rig
  scroll: 0, // 0..1 progress through the hero
  spin: 0, // target extra Y rotation of the Python (radians)
  fromPoster: false, // true when the scene takes over from the static poster image
};

if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
  (window as unknown as { __hero: typeof heroState }).__hero = heroState;
}
