# PyCon Tajikistan 2026 — Design

> **Current direction (November 2026): "Салом, ҷаҳон!"**, which replaces "The Ascent" below.
> The first PyCon in Tajikistan is the country's "Hello, world". The hero types `print("Салом, ҷаҳон!")` and the answer becomes the headline while the logo's sun rises behind the mountains.
>
> - **Visuals:** flat vector scenes in the logo's own style, drawn by Python (`apps/pages/scenes.py`, `{% scene %}` tag). No photographs as backgrounds, no pixel textures. Each scene has a landscape and a portrait composition.
> - **Colours:** only the logo's: navy #001848, sun #FEB702 / #FD7C08 / #F93C33 / #D30D60, amber #FF9F02, ribbon red #DC0C24 and green #02822B.
> - **Logo:** vector at `static/img/logo.svg`; the header mark is `templates/partials/logo_mark.svg.html`.
> - **Scroll story:** four places pinned and wiped in one after another: Dushanbe (the Independence Stele, its spirals in Python blue and yellow), Varzob, Iskanderkul, the chaikhana.
> - **Motion:** one hero sequence; the scene loops (stars, windows, river, ripples, steam, snow) run only while on screen and stop under reduced motion.

> **Concept: "The Ascent" (Восхождение / Баромад).**
> The visitor climbs from Dushanbe (800 m) up the mountains to a summit at **2,026 m**, the year of the event. Each section of the home page is a camp on the way up. Python is the trail that leads there. At the summit the visitor finds the event and a ticket.
>
> The whole concept grows out of the logo: snowy mountains, a rising sun, three stars, and a red and green swoosh.

Companion files: [plan.md](plan.md) · [tezis.md](tezis.md).

---

## 1. What makes it unique

Most PyCon sites are a clean template with a blue and yellow snake. Ours is built from four things only Tajikistan has:

| Source | How we use it |
|--------|---------------|
| **The mountains** (more than 90% of Tajikistan is mountains) | 3D mountain hero, an altitude meter that rises as you scroll, the summit as the ticket call to action |
| **Suzani** embroidery | Patterns **drawn by Python code** in real time. Every visitor gets a unique one. |
| **Atlas / adras** ikat silk | Its blurred, shifted stripes look like a digital glitch. Used for section dividers and hover effects. |
| **Tajik hospitality** (меҳмоннавозӣ) | Tone of voice, "Хуш омадед!", a teapot (choinak) icon for breaks in the schedule |

The rule: **tradition made by code.** Every pattern on the site is generated, and the site shows the Python code that made it.

## 2. The five wow moments

### Wow 1: Living mountains hero
- A full-screen 3D mountain range (Three.js), low-poly in the style of the logo, navy and snow white.
- The **sun from the logo** rises behind the peaks as the page loads, and its gradient bands (yellow → orange → red → magenta) light up the slopes.
- A **trail of light shaped like a Python snake** winds up the mountain. It is the scroll path.
- The mouse (or phone tilt) gently moves the camera, which gives a parallax effect.
- At night (visitor's local time after 19:00) the scene switches to a starry sky with the **three stars** from the logo.
- **Fallback:** on slow connections, small phones or reduced motion, show a layered SVG of the same scene with simple CSS parallax. It must still look beautiful.

### Wow 2: The altitude meter
- A thin vertical meter on the left edge: **800 m → 2,026 m**. The summit height is the year of the event, a hidden detail people enjoy discovering.
- Each section is a camp with a height: *Base camp: About (800 m)* → *Camp 1: Program (1,050 m)* → *Camp 2: Speakers (1,300 m)* → *Camp 3: Education Day (1,550 m)* → *Camp 4: Sponsors (1,800 m)* → *Summit: Tickets (2,026 m)*.
- Small details: the "air" thins (background fades lighter), snow particles appear above 1,500 m.
- On mobile it becomes a thin progress line at the top of the screen.

### Wow 3: Code-born suzani
- Section dividers and backgrounds are suzani rosettes drawn live by a small generative algorithm (circles, petals, vines around a medallion).
- Hover over any pattern: it **unravels into its Python source code**, shown in monospace, then weaves back.
- **/suzani page:** the visitor types their name and the site makes a personal suzani, seeded by the name. The pattern is drawn by **one Python module** that runs on the Django backend and in the browser with Pyodide, so the preview, the download and the printed badge are identical. They can download it as a PNG or a phone wallpaper and use it as a **profile picture** ("I'm going to PyCon Tajikistan"). The same seed prints on their **conference badge**. This makes people share the site.

### Wow 4: "Салом, ҷаҳон!" live terminal
- A terminal block on the home page where a real Python interpreter (Pyodide) runs in the browser.
- It starts with:
  ```python
  >>> print("Салом, ҷаҳон!")
  Салом, ҷаҳон!
  >>> import pycon_tj
  >>> pycon_tj.when()
  '12 December 2026, Dushanbe'
  ```
- Visitors can type their own code. A small fake module `pycon_tj` answers `when()`, `where()`, `speakers()`, `ticket()` (opens tickets). It works as an Easter egg and as a beginner's first taste of Python.
- Loaded only when the block scrolls into view.

### Wow 5: Atlas glitch
- Buttons and links hover with an **ikat shift**: the element splits into RGB-like stripes in atlas colours and settles back. It looks both like silk and like a digital glitch.
- Page transitions wipe across with atlas stripes (≤ 400 ms).
- Off when `prefers-reduced-motion` is on.

**Extra small delights**
- A countdown in the hero as a mountain counter: *"32 days to the summit"*.
- Konami code or typing `import this` anywhere shows "The Zen of Python" in Tajik.
- A 404 page: *"You've lost the trail. Even snow leopards get lost."* with a snow leopard illustration.
- A confetti burst of tiny suzani flowers when someone clicks "Get a ticket".

## 3. Colour

Taken from the logo, plus the Tajik flag colours for accents.

| Token | Hex | Use |
|-------|-----|-----|
| `--night` | `#0E1A3D` | Main dark (logo navy, deepened). Text on light, background in dark mode |
| `--navy` | `#1B2A6B` | Logo navy. Headings, mountains |
| `--snow` | `#F7F8FC` | Background in light mode |
| `--sun-1` | `#FFB703` | Sun yellow, "2026" |
| `--sun-2` | `#FB8500` | Sun orange |
| `--sun-3` | `#E63946` | Sun red |
| `--sun-4` | `#D61F69` | Sun magenta |
| `--flag-red` | `#CC0000` | Small accents only (swoosh line) |
| `--flag-green` | `#006600` | Small accents only (success states, swoosh line) |
| `--py-blue` | `#3776AB` | Python logo blue (code blocks, Python references) |
| `--py-yellow` | `#FFD43B` | Python logo yellow |

- **Signature gradient:** `linear-gradient(135deg, --sun-1, --sun-2, --sun-3, --sun-4)`. Used for the main button, the "2026" year and highlights. Never for body text.
- **Dark mode = "Mountain night":** `--night` background, stars, the sun becomes the moon (soft yellow).
- All text must pass **WCAG AA** contrast. Check every gradient-on-text use.
- Use the flag colours sparingly and respectfully. **Do not** use the state crown or coat of arms. National symbols have legal rules.

## 4. Typography

The fonts **must support Tajik Cyrillic: ӣ ӯ ҳ ҷ қ ғ.** Test every candidate with the phrase *"Ҷашни Python дар қуллаи ҷаҳон"* before choosing.

| Role | Candidates (test first) | Style |
|------|-------------------------|-------|
| Display (hero, big headings) | Unbounded, Manrope ExtraBold, Montserrat Black | Bold, wide, slightly italic like the logo |
| Body | Inter, Manrope, Noto Sans | Clear, 16–18 px, line height 1.6 |
| Code | JetBrains Mono, Fira Code | Terminal, code snippets, suzani source |

- Fallback: **Noto Sans / Noto Sans Mono**, which reliably cover Tajik letters.
- Big type scale for drama: hero headline up to `clamp(3rem, 9vw, 8rem)`.

## 5. Shapes and patterns

- **Mountain line:** the logo's peak outline is a recurring motif for section tops and card edges.
- **Swoosh:** the red and green curve from the logo is used as an underline under key headings and as the "trail" connector between schedule items.
- **Suzani medallions:** circular, generated, used as speaker photo frames (photo inside the medallion ring).
- **Atlas stripes:** vertical blurred stripes for dividers and the footer band.
- Corners: 16 px on cards, fully rounded on buttons.

## 6. Mascot

The concept images show a blue and yellow snake. Make it **our own**:
- A Python snake wearing a **toqi** (Tajik skullcap) with a suzani pattern, or wrapped in an atlas scarf.
- Appears in the hero corner, on the 404 page, in loading states and on stickers.
- Name: let the community vote on Telegram (a free engagement campaign). Name ideas: **Морик** ("little snake"), **Қулла** ("summit"), **Пайтончон**.
- A friend for the mascot: a **snow leopard** (Tajikistan's iconic animal) for the 404 page and the volunteer badge.

## 7. Page designs

### Home (the ascent)
1. **Hero:** 3D mountains, logo, "Python at the Summit", date, venue, countdown, buttons *Get a ticket* (gradient) and *Submit a talk* (outline).
2. **Base camp, 800 m: Why come.** Three big numbers that count up: *1st PyCon in Tajikistan · 100 Pythonistas · 1 day of talks, workshops and friends*.
3. **Live terminal** ("Салом, ҷаҳон!").
4. **Camp 1, 1,050 m: What happens.** Cards for Talks, Workshops, Lightning talks, Education Day, Student exhibition, Networking with tea. The cards lie on the trail and light up as the snake reaches them.
5. **Camp 2, 1,300 m: Speakers.** Speakers in suzani medallion frames. Before the schedule is out: "Your face here? Submit a talk."
6. **Camp 3, 1,550 m: Education Day.** Students, teachers, robots.
7. **Camp 4, 1,800 m: Sponsors.** Logos sit on mountain ledges, higher tier = higher ledge.
8. **Summit, 2,026 m: Tickets.** Snow, sunrise, a flag on the peak with "You made it!" and the ticket cards.
9. **Footer:** atlas stripe band, links, Telegram, PSF trademark line.

### Program
- A timeline that looks like a **trail map**: time on the left, the trail connecting sessions, rooms as parallel trails.
- Filters: language (TJ / RU / EN), level, track. Breaks shown with a teapot icon: "Choi break".
- "Now on stage" glowing marker on event day.

### Talk page
- Title, speaker in a medallion, language tag, level, abstract, room and time, "Add to calendar".

### Tickets
- Ticket cards look like **mountain passes / trail permits**, with a perforated edge and a seed suzani pattern.
- Clear prices, what is included, and the "Pay it forward" option.

### Sponsors
- "Why sponsor" with numbers, tier table, a big download button for the prospectus PDF.

### Venue
- Stylised map of Dushanbe with the route to the venue, plus practical info: transport, prayer room, quiet room, accessibility, halal food.

## 8. Motion rules

- Easing: smooth, "mountain air" feeling. Nothing bounces aggressively.
- Durations: micro interactions 150–250 ms, section reveals 600–900 ms.
- **`prefers-reduced-motion`:** turn off 3D camera movement, the glitch effect and page wipes. Show static versions.
- Animations never block reading. Text is visible immediately even if JavaScript fails.

## 9. Accessibility

- WCAG 2.1 AA. All interactive elements reachable by keyboard with a visible focus ring (gradient outline).
- The 3D scene is decorative (`aria-hidden`). Its message is also in text.
- The terminal has a label and works with a screen reader.
- Language attributes set per page (`lang="tg"`, `lang="ru"`, `lang="en"`).
- Minimum touch target 44 × 44 px.

## 10. Imagery

- Until the event: **illustrations and generated patterns**, not fake photos. If the concept images are used, they keep the label "Event concept, not an event photo".
- After the event: real photos with a warm colour grade that matches the sun palette.
- Photos of Tajikistan's mountains for backgrounds, with credit.

## 11. Design deliverables

- [ ] Logo pack: full colour, single colour, white, horizontal, icon only (sun + peaks)
- [ ] Design tokens file (colours, fonts, spacing, radii)
- [ ] Figma: home (desktop + mobile), program, talk, tickets, sponsors, venue, 404
- [ ] Mascot: 5 poses (hello, coding, tea, summit, lost)
- [ ] Suzani generator: rules and colour sets
- [ ] Open Graph image per language (1200 × 630)
- [ ] Social templates: speaker announcement, sponsor thank-you, countdown
