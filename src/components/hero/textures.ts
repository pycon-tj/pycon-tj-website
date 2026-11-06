import { CanvasTexture, SRGBColorSpace } from "three";

function canvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return [c, c.getContext("2d")!] as const;
}

function toTexture(c: HTMLCanvasElement) {
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  return t;
}

/** Soft radial gradient sprite. */
export function radialTexture(stops: [number, string][], size = 256) {
  const [c, g] = canvas(size, size);
  const r = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  stops.forEach(([o, col]) => r.addColorStop(o, col));
  g.fillStyle = r;
  g.fillRect(0, 0, size, size);
  return toTexture(c);
}

/** Vertical light shaft, bright at the top, feathered at the sides. */
export function rayTexture() {
  const [c, g] = canvas(64, 512);
  const v = g.createLinearGradient(0, 0, 0, 512);
  v.addColorStop(0, "rgba(255,230,180,.95)");
  v.addColorStop(0.55, "rgba(255,215,160,.25)");
  v.addColorStop(1, "rgba(255,230,180,0)");
  g.fillStyle = v;
  g.fillRect(0, 0, 64, 512);
  const h = g.createLinearGradient(0, 0, 64, 0);
  h.addColorStop(0, "rgba(0,0,0,1)");
  h.addColorStop(0.5, "rgba(0,0,0,0)");
  h.addColorStop(1, "rgba(0,0,0,1)");
  g.globalCompositeOperation = "destination-out";
  g.fillStyle = h;
  g.fillRect(0, 0, 64, 512);
  return toTexture(c);
}

/**
 * Girih halo: nested 8-point stars (pairs of squares rotated 45°), a ring of
 * 8-point star rosettes, radial spokes and circles — thin gold lines.
 */
export function girihHaloTexture(size = 1024) {
  const [c, g] = canvas(size, size);
  const s = size / 1024;
  g.translate(size / 2, size / 2);
  g.scale(s, s);
  g.strokeStyle = "rgba(241,214,142,1)";
  g.lineJoin = "round";

  const star8 = (r: number, w: number) => {
    g.lineWidth = w;
    for (let k = 0; k < 2; k++) {
      g.save();
      g.rotate((k * Math.PI) / 4);
      g.strokeRect(-r, -r, r * 2, r * 2);
      g.restore();
    }
  };
  [470, 395, 318, 240, 160, 88].forEach((r, i) => star8(r, i % 2 ? 1.2 : 2.4));

  // 16 small rosettes on a ring
  for (let k = 0; k < 16; k++) {
    g.save();
    g.rotate((k * Math.PI) / 8);
    g.translate(0, -430);
    g.rotate(Math.PI / 8);
    star8(18, 1.2);
    g.beginPath();
    g.arc(0, 0, 8, 0, Math.PI * 2);
    g.stroke();
    g.restore();
  }

  g.lineWidth = 1;
  for (let k = 0; k < 32; k++) {
    g.save();
    g.rotate((k * Math.PI) / 16);
    g.beginPath();
    g.moveTo(0, 100);
    g.lineTo(0, 505);
    g.stroke();
    g.restore();
  }
  [508, 352, 128].forEach((r, i) => {
    g.lineWidth = i === 0 ? 2 : 1;
    g.beginPath();
    g.arc(0, 0, r, 0, Math.PI * 2);
    g.stroke();
  });

  // Fade towards the edges so the halo never shows a hard square.
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.globalCompositeOperation = "destination-in";
  const m = g.createRadialGradient(size / 2, size / 2, size * 0.1, size / 2, size / 2, size / 2);
  m.addColorStop(0, "rgba(0,0,0,1)");
  m.addColorStop(0.8, "rgba(0,0,0,.8)");
  m.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = m;
  g.fillRect(0, 0, size, size);
  return toTexture(c);
}

/** Small round particle sprite. */
export function dotTexture() {
  return radialTexture(
    [
      [0, "rgba(255,248,225,1)"],
      [0.28, "rgba(241,214,142,.85)"],
      [1, "rgba(0,0,0,0)"],
    ],
    64,
  );
}
