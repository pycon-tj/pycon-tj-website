"""Vector scenes in the style of the PyCon Tajikistan logo, drawn by Python.

Flat shapes only, every colour from the logo: navy mountains with a lit and a shaded
face, white snow caps with a white ridge line, the striped sun, the red-white-green
ribbon. Each scene comes in a landscape and a portrait composition.
CSS (static/css/site.css) animates the classes these functions put on the groups.
"""

from __future__ import annotations

import random
from dataclasses import dataclass, field

C = {
    "navy": "#001848",
    "navy2": "#00246C",
    "navy3": "#0F2C6E",
    "navy4": "#24418F",
    "haze": "#3A5AAE",
    "snow": "#F4F6FB",
    "ice": "#C9D3EE",
    "sun1": "#FEB702",
    "sun2": "#FD7C08",
    "sun3": "#F93C33",
    "sun4": "#D30D60",
    "amber": "#FF9F02",
    "red": "#DC0C24",
    "green": "#02822B",
}

# Colours that change with the light / dark theme. The CSS variables are set in
# static/css/site.css; the fallback is the dark (night) value.
T = {
    "sky": "var(--s-sky, #001848)",
    "ground": "var(--s-ground, #001848)",
    "floor": "var(--s-floor, #00246C)",
    "halo1": "var(--s-halo1, #00246C)",
    "halo2": "var(--s-halo2, #0F2C6E)",
    "halo3": "var(--s-halo3, #24418F)",
    "dot": "var(--s-dot, #F4F6FB)",
    "block": "var(--s-block, #00246C)",
}


def _f(v: float) -> str:
    return f"{v:.1f}".rstrip("0").rstrip(".")


def _pts(points) -> str:
    return " ".join(f"{_f(x)},{_f(y)}" for x, y in points)


@dataclass
class Canvas:
    w: int
    h: int
    uid: str
    parts: list[str] = field(default_factory=list)
    defs: list[str] = field(default_factory=list)
    n: int = 0

    def id(self, name: str) -> str:
        self.n += 1
        return f"{self.uid}-{name}{self.n}"

    def add(self, s: str) -> None:
        self.parts.append(s)

    def svg(self, cls: str) -> str:
        return (
            f'<svg class="{cls}" viewBox="0 0 {self.w} {self.h}" preserveAspectRatio="xMidYMid slice" '
            f'aria-hidden="true" focusable="false"><defs>{"".join(self.defs)}</defs>{"".join(self.parts)}</svg>'
        )


# ── Building blocks ─────────────────────────────────────────────────────


def mountain(
    cv: Canvas,
    rnd: random.Random,
    x: float,
    base: float,
    h: float,
    w: float,
    lit: str,
    shade: str,
    snow: float = 0.34,
    outline: bool = True,
) -> str:
    """One peak of the logo: a lit left face, a shaded right face, a jagged snow cap."""
    ax, ay = x, base - h

    def edge(sign: int) -> list[tuple[float, float]]:
        pts = []
        for i in range(1, 4):
            t = i / 4
            pts.append(
                (
                    ax + sign * w * t + rnd.uniform(-0.05, 0.05) * w,
                    ay + h * t + rnd.uniform(-0.06, 0.02) * h,
                )
            )
        return pts

    left, right = edge(-1), edge(1)
    ridge = [(ax - w, base), *left[::-1], (ax, ay), *right, (ax + w, base)]
    body = f"M{_pts(ridge)} Z"
    clip = cv.id("m")
    cv.defs.append(f'<clipPath id="{clip}"><path d="{body}"/></clipPath>')
    crease = [
        (ax + w * 0.2, base),
        (ax + w * 0.1 + rnd.uniform(-8, 8), ay + h * 0.62),
        (ax + w * 0.04, ay + h * 0.3),
    ]
    shade_face = [(ax, ay), *right, (ax + w, base), *crease]
    out = [f'<path d="{body}" fill="{lit}"/>', f'<path d="M{_pts(shade_face)} Z" fill="{shade}"/>']
    if snow:
        d = h * snow
        cap = [(ax, ay - 4), (ax + w * 1.2 * d / h, ay + d)]
        steps = 6
        for i in range(1, steps):
            t = i / steps
            px = ax + w * 1.2 * d / h - t * 2 * w * 1.2 * d / h
            py = ay + d * (0.62 if i % 2 else 1.08) + rnd.uniform(-0.06, 0.06) * d
            cap.append((px, py))
        cap.append((ax - w * 1.2 * d / h, ay + d))
        out.append(f'<path d="M{_pts(cap)} Z" fill="{C["snow"]}" clip-path="url(#{clip})"/>')
        # the shaded side of the snow
        sc = [
            (ax, ay - 4),
            (ax + w * 1.2 * d / h, ay + d),
            (ax + w * 0.3 * d / h, ay + d * 0.7),
            (ax + w * 0.05, ay + d * 0.35),
        ]
        out.append(f'<path d="M{_pts(sc)} Z" fill="{C["ice"]}" clip-path="url(#{clip})"/>')
    if outline:
        out.append(
            f'<path d="M{_pts(ridge[1:-1])}" fill="none" stroke="{C["snow"]}" stroke-width="4" '
            f'stroke-linejoin="round" stroke-linecap="round"/>'
        )
    return f'<g class="peak">{"".join(out)}</g>'


def range_(
    cv: Canvas,
    seed: str,
    peaks,
    base: float,
    lit: str,
    shade: str,
    snow: float = 0.34,
    cls: str = "",
) -> str:
    rnd = random.Random(seed)
    body = "".join(mountain(cv, rnd, x, base, h, w, lit, shade, snow) for x, h, w in peaks)
    return f'<g class="range {cls}">{body}</g>'


def sun(cv: Canvas, cx: float, cy: float, r: float) -> str:
    clip = cv.id("sun")
    cv.defs.append(
        f'<clipPath id="{clip}"><circle cx="{_f(cx)}" cy="{_f(cy)}" r="{_f(r)}"/></clipPath>'
    )
    bands = []
    for i, col in enumerate([C["sun2"], C["sun3"], C["sun4"]]):
        y0 = cy - r * 0.35 + i * r * 0.38
        a = r * 0.12
        bands.append(
            f'<path d="M{_f(cx - r)} {_f(y0)} C{_f(cx - r * 0.4)} {_f(y0 - a)} {_f(cx + r * 0.1)} {_f(y0 + a)} '
            f'{_f(cx + r)} {_f(y0 - a * 0.6)} V{_f(cy + r)} H{_f(cx - r)}Z" fill="{col}"/>'
        )
    return (
        f'<g class="sun"><g clip-path="url(#{clip})"><rect x="{_f(cx - r)}" y="{_f(cy - r)}" width="{_f(2 * r)}" '
        f'height="{_f(2 * r)}" fill="{C["sun1"]}"/>{"".join(bands)}</g></g>'
    )


def halo(cx: float, cy: float, r: float) -> str:
    rings = "".join(
        f'<circle cx="{_f(cx)}" cy="{_f(cy)}" r="{_f(r * k)}" fill="{col}"/>'
        for k, col in ((2.1, T["halo1"]), (1.65, T["halo2"]), (1.3, T["halo3"]))
    )
    return f'<g class="halo">{rings}</g>'


def star(x: float, y: float, r: float) -> str:
    a, b = r * 0.28, r * 0.72
    return (
        f'<path d="M{_f(x)} {_f(y - r)} l{_f(a)} {_f(b)} {_f(b)} {_f(a)} {_f(-b)} {_f(a)} {_f(-a)} {_f(b)} '
        f'{_f(-a)} {_f(-b)} {_f(-b)} {_f(-a)} {_f(b)} {_f(-a)}Z"/>'
    )


def sky_dots(rnd: random.Random, w: float, h: float, n: int) -> str:
    dots = "".join(
        f'<circle cx="{_f(rnd.uniform(0, w))}" cy="{_f(rnd.uniform(0, h))}" r="{_f(rnd.uniform(1, 2.6))}" '
        f'style="--d:{rnd.uniform(0, 4):.1f}s"/>'
        for _ in range(n)
    )
    return f'<g class="dots" fill="{T["dot"]}">{dots}</g>'


def ribbon(cv: Canvas, w: float, h: float, y0: float, y1: float) -> str:
    """The logo's red, white and green ribbon, sweeping up across the foreground."""

    def band(off: float, thick: float) -> str:
        a, b = y0 + off, y1 + off
        top = f"M-40 {_f(a)} C{_f(w * 0.3)} {_f(a - h * 0.06)} {_f(w * 0.62)} {_f(b + h * 0.06)} {_f(w + 40)} {_f(b)}"
        bottom = (
            f"L{_f(w + 40)} {_f(b + thick * 0.6)} C{_f(w * 0.62)} {_f(b + h * 0.06 + thick)} "
            f"{_f(w * 0.3)} {_f(a - h * 0.06 + thick)} -40 {_f(a + thick * 1.3)}Z"
        )
        return top + " " + bottom

    t = h * 0.045
    return (
        '<g class="ribbon">'
        f'<path d="{band(0, t)}" fill="{C["red"]}"/>'
        f'<path d="{band(t * 1.5, t * 0.45)}" fill="{C["snow"]}"/>'
        f'<path d="{band(t * 2.3, t)}" fill="{C["green"]}"/>'
        "</g>"
    )


# ── Scenes ──────────────────────────────────────────────────────────────


def _sunrise(w: int, h: int, uid: str) -> str:
    cv = Canvas(w, h, uid)
    wide = w > h
    sx, sy, sr = (w * 0.7, h * 0.5, h * 0.27) if wide else (w * 0.7, h * 0.17, w * 0.22)
    rnd = random.Random("sunrise")
    cv.add(f'<rect width="{w}" height="{h}" fill="{T["sky"]}"/>')
    cv.add(halo(sx, sy, sr))
    cv.add(sky_dots(rnd, w, h * 0.5, 40))
    cv.add(
        f'<g class="stars" fill="{C["amber"]}">{star(sx - sr * 1.25, sy - sr * 0.95, sr * 0.13)}'
        f"{star(sx - sr * 1.55, sy - sr * 0.55, sr * 0.08)}{star(sx - sr * 0.95, sy - sr * 0.5, sr * 0.06)}</g>"
    )
    cv.add(sun(cv, sx, sy, sr))
    if wide:
        back = [
            (w * 0.3, h * 0.22, w * 0.17),
            (w * 0.53, h * 0.36, w * 0.15),
            (w * 0.86, h * 0.44, w * 0.17),
            (w * 1.02, h * 0.3, w * 0.13),
        ]
        front = [
            (w * 0.12, h * 0.18, w * 0.2),
            (w * 0.44, h * 0.3, w * 0.17),
            (w * 0.95, h * 0.34, w * 0.15),
            (w * 0.69, h * 0.48, w * 0.18),
        ]
        bb, fb = h * 0.8, h * 0.92
    else:
        back = [(w * 0.2, h * 0.2, w * 0.28), (w * 0.82, h * 0.24, w * 0.3)]
        front = [
            (w * 0.55, h * 0.26, w * 0.34),
            (w * 0.05, h * 0.16, w * 0.3),
            (w * 1.0, h * 0.18, w * 0.28),
        ]
        bb, fb = h * 0.56, h * 0.64
    cv.add(range_(cv, "back", back, bb, C["navy4"], C["navy3"], cls="range-back"))
    cv.add(range_(cv, "front", front, fb, C["haze"], C["navy2"], cls="range-front"))
    cv.add(
        f'<rect class="ground" y="{_f(fb - 2)}" width="{w}" height="{_f(h - fb + 2)}" fill="{T["ground"]}"/>'
    )
    cv.add(ribbon(cv, w, h, fb + h * 0.02, fb - h * 0.14))
    return cv.svg("scene-art scene-sunrise")


def _city(w: int, h: int, uid: str) -> str:
    cv = Canvas(w, h, uid)
    wide = w > h
    rnd = random.Random("city")
    cv.add(f'<rect width="{w}" height="{h}" fill="{T["sky"]}"/>')
    cv.add(sky_dots(rnd, w, h * 0.55, 70))
    mx, my, mr = (w * 0.2, h * 0.2, h * 0.07) if wide else (w * 0.22, h * 0.14, w * 0.08)
    cv.add(
        f'<g class="moon"><circle cx="{_f(mx)}" cy="{_f(my)}" r="{_f(mr)}" fill="{C["sun1"]}"/>'
        f'<circle cx="{_f(mx + mr * 0.45)}" cy="{_f(my - mr * 0.2)}" r="{_f(mr * 0.88)}" fill="{T["sky"]}"/></g>'
    )
    base = h * (0.72 if wide else 0.62)
    peaks = (
        [
            (w * 0.12, h * 0.3, w * 0.16),
            (w * 0.42, h * 0.22, w * 0.14),
            (w * 0.82, h * 0.36, w * 0.18),
        ]
        if wide
        else [(w * 0.2, h * 0.2, w * 0.36), (w * 0.85, h * 0.26, w * 0.4)]
    )
    cv.add(range_(cv, "cityr", peaks, base, C["navy4"], C["navy3"], cls="range-back"))
    blocks, windows = [], []
    x = 0.0
    floor = h * (0.95 if wide else 0.9)
    while x < w:
        bw = rnd.uniform(0.025, 0.06) * (w if wide else w * 1.8)
        bh = rnd.uniform(0.1, 0.28) * h
        top = floor - bh
        if rnd.random() < 0.18:
            blocks.append(
                f'<path d="M{_f(x)} {_f(floor)} V{_f(top)} A{_f(bw / 2)} {_f(bw / 2.4)} 0 0 1 {_f(x + bw)} {_f(top)} V{_f(floor)}Z"/>'
            )
        else:
            blocks.append(f'<rect x="{_f(x)}" y="{_f(top)}" width="{_f(bw)}" height="{_f(bh)}"/>')
        for wy in range(int(top + 14), int(floor - 12), 22):
            for wx in range(int(x + 8), int(x + bw - 10), 16):
                if rnd.random() < 0.3:
                    windows.append(
                        f'<rect x="{wx}" y="{wy}" width="7" height="10" style="--d:{rnd.uniform(0, 6):.1f}s"/>'
                    )
        x += bw + rnd.uniform(2, 8)
    cv.add(f'<g class="skyline" fill="{T["block"]}">{"".join(blocks)}</g>')
    cv.add(f'<g class="windows" fill="{C["sun1"]}">{"".join(windows)}</g>')
    cv.add(f'<rect y="{_f(floor)}" width="{w}" height="{_f(h - floor)}" fill="{T["ground"]}"/>')
    cv.add(f'<rect y="{_f(floor)}" width="{w}" height="5" fill="{C["sun4"]}"/>')
    return cv.svg("scene-art scene-city")


def _night(w: int, h: int, uid: str) -> str:
    cv = Canvas(w, h, uid)
    wide = w > h
    rnd = random.Random("night")
    cv.add(f'<rect width="{w}" height="{h}" fill="{T["sky"]}"/>')
    cv.add(sky_dots(rnd, w, h * 0.6, 90))
    base = h * (0.86 if wide else 0.7)
    peaks = (
        [
            (w * 0.08, h * 0.26, w * 0.14),
            (w * 0.4, h * 0.36, w * 0.16),
            (w * 0.66, h * 0.28, w * 0.12),
            (w * 0.92, h * 0.42, w * 0.16),
        ]
        if wide
        else [(w * 0.2, h * 0.24, w * 0.38), (w * 0.8, h * 0.3, w * 0.4)]
    )
    cv.add(range_(cv, "night", peaks, base, C["navy4"], C["navy3"], cls="range-back"))
    cv.add(
        f'<rect y="{_f(base - 2)}" width="{w}" height="{_f(h - base + 2)}" fill="{T["floor"]}"/>'
    )
    return cv.svg("scene-art scene-night")


SCENES = {
    "sunrise": _sunrise,
    "city": _city,
    "night": _night,
}


def scene_svg(name: str) -> str:
    """Both compositions of a scene; CSS shows the landscape one on wide screens."""
    draw = SCENES[name]
    return draw(1600, 900, f"{name}-l") + draw(800, 1400, f"{name}-p")
