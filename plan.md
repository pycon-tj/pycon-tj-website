# PyCon Tajikistan 2026 — Website Plan

> **Python at the Summit.**
> The site is the conference's first impression for attendees, speakers, sponsors and the PSF. It should look like no other PyCon site, load fast on a mobile connection in Dushanbe, and be easy for volunteers to edit.

Companion files: [design.md](design.md) (look and feel, wow effects) · [tezis.md](tezis.md) (key messages and page copy).

---

## 1. Goals

| # | Goal | How we measure it |
|---|------|-------------------|
| 1 | Make people say "wow" and share it | Shares, time on the home page, people mentioning the site at the event |
| 2 | Get **100 registrations** | Ticket sales on pretix |
| 3 | Get **talk proposals** from local and international speakers | Submissions on pretalx |
| 4 | Win **sponsors** | Downloads of the sponsor PDF, sponsor emails |
| 5 | Show the **PSF** we are serious and organised | Code of conduct, team, clear plan, PSF trademark line in the footer |
| 6 | Work for everyone | Lighthouse ≥ 90 on mobile, WCAG 2.1 AA, three languages |

## 2. Audiences

1. **Students and beginners** (the largest group): "Is this for me? Is it free or cheap? What will I learn?"
2. **Working developers**: "Who is speaking? Is it worth a day off?"
3. **Speakers**: "How do I submit? What is the deadline? Can I speak in Tajik or Russian?"
4. **Sponsors and companies**: "Who will we reach? How much does it cost?"
5. **Teachers and universities**: "Can my students come? Is there an Education Day?"
6. **International Python community and the PSF**: "Who is behind this? Is it safe and inclusive?"

## 3. Languages

Three full languages from day one, switchable on every page:

- **Тоҷикӣ (TJ)**: default for visitors in Tajikistan
- **Русский (RU)**
- **English (EN)**: default for visitors outside Tajikistan

Rules:
- URL prefix per language: `/tj/`, `/ru/`, `/en/`. Language is detected from the browser and remembered.
- Every talk is tagged with its language (TJ / RU / EN), as PyCon TW and PyCon JP do.
- **A native speaker must proofread all Tajik and Russian text before launch.**
- The font must render Tajik letters **ӣ ӯ ҳ ҷ қ ғ** (see design.md).

## 4. Sitemap

```
/                      Home: the "ascent" (see design.md)
├── /about             About PyCon, about PyCon Tajikistan, the team
├── /program           Schedule (filters: language, level, track)
│   ├── /talks/<slug>  Talk page (generated from pretalx)
│   ├── /workshops     Hands-on workshops
│   ├── /lightning     Lightning talks (sign up on the day)
│   └── /education-day Education Day for schools and universities
├── /speak             Call for proposals, guidelines, mentorship
├── /tickets           Ticket types, financial aid, "pay it forward"
├── /sponsors          Sponsor list + "become a sponsor" + prospectus PDF
├── /venue             Venue, map, getting there, prayer room, accessibility
├── /code-of-conduct   Code of conduct and how to report
├── /volunteer         Roles, perks, sign-up form
├── /playground        "Try Python in your browser" (Pyodide, see design.md)
├── /suzani            Generative suzani badge maker (see design.md)
├── /faq               Frequently asked questions
└── /news              Short announcements (also go to Telegram)
```

The header menu stays short: **Program · Speak · Tickets · Sponsors · Venue · About**, then the language switch and a bright **Get a ticket** button.

## 5. Features by priority

### Must have (launch, version 1)
- Home page with hero, countdown, date and venue, three calls to action (ticket, talk, sponsor)
- About, code of conduct, FAQ, venue
- Call for proposals linking to **pretalx**
- Tickets linking to **pretix** (with a local payment option, see section 8)
- Sponsors page with tiers and a contact email
- TJ / RU / EN
- Telegram channel link and newsletter signup
- Footer: "PyCon is a trademark of the Python Software Foundation." *(This line is needed once the PSF approves the name.)*

### Should have (version 2, about 2 weeks after launch)
- Full schedule generated automatically from the pretalx API
- Speaker pages with photos
- **Python Playground** (Pyodide REPL)
- **Suzani badge generator**
- Volunteer sign-up form
- Prayer room, quiet room and accessibility details on the venue page

### Nice to have (version 3, near the event)
- Live mode on event day: "Now on stage", room status, live stream link
- Lightning talk sign-up and audience voting (idea from PyCon JP)
- Photo gallery and video recordings after the event
- "2027 is coming" page after the event

## 6. Tech stack: Python all the way

> **Rule: the backend is 100% Python.** This is a Python conference, so the site itself is a showcase of Python. PyCon US runs on Django + Wagtail too. JavaScript is used only in the browser for visual effects.

### Backend (Python)

| Part | Tool | Why |
|------|------|-----|
| Language | **Python 3.13** | It's PyCon |
| Web framework | **Django 5.2 (LTS)** | Mature, secure, huge community, built-in admin and translations. Same base as PyCon US. |
| CMS | **Wagtail 8** + **wagtail-localize** | Volunteers edit pages in TJ / RU / EN without touching code |
| Database | **PostgreSQL** | Reliable, works well with Django |
| Interactivity | **HTMX** + Django templates | Schedule filters, forms and live updates written in Python, with almost no JavaScript |
| Background jobs | **Django management commands + cron** (or **Celery** if needed) | Sync talks from pretalx, send emails |
| Live event mode | **Django Channels** (WebSockets) or HTMX polling | "Now on stage", lightning talk voting |
| Suzani generator | **Python** module (`suzani/`), outputs SVG and PNG with **Pillow / CairoSVG** | One Python function draws the pattern for the web, the downloadable avatar and the printed badge |
| Badges | Python + **ReportLab** (PDF) | Print-ready badges with each attendee's suzani |
| Forms | Django forms (volunteers, financial aid, Education Day, newsletter) | Data stays in our database, not in Google |
| API | **Django REST Framework** or **Django Ninja** | Schedule JSON for a future mobile app and for the live screens in the hall |
| Tests | **pytest** + **pytest-django** | Required for every pull request |
| Code quality | **Ruff** (lint + format), **mypy** | Clean code, an example for the community |
| Package manager | **uv** | Fast, modern Python tooling |

### Python services we connect to

| Service | Note |
|---------|------|
| **pretalx** (talk submissions) | Written in Python / Django. Used by PythonAsia, PyCon AU, Namibia, US. We pull talks through its API. |
| **pretix** (tickets) | Written in Python / Django. Used by PyCon Greece and Namibia. Can be self-hosted on our own server. |

So every part of the system, including tickets and talk submissions, runs on Python.

### Frontend (browser only)

| Part | Tool | Why |
|------|------|-----|
| Styling | Plain CSS with design tokens | Full control for the unique look |
| 3D hero | **Three.js**, loaded only on fast connections | Mountains scene (falls back to an image) |
| Animation | **GSAP + ScrollTrigger** | The "ascent" scroll story |
| Python in the browser | **Pyodide**, loaded on demand | Live terminal. It reuses **the same suzani Python module** as the backend, so the pattern people draw in the browser matches their badge exactly. |
| Asset bundling | **django-vite** or plain ES modules | Small, cached files |

### Hosting and operations

| Part | Tool | Why |
|------|------|-----|
| Server | A VPS (local Tajik hosting or Hetzner), or **PythonAnywhere** (sponsor of PyCon Namibia) | Runs Django, PostgreSQL, pretix |
| App server | **Gunicorn** (or **Uvicorn** for Channels) behind **Nginx** | Standard Python deployment |
| Containers | **Docker Compose** | Same setup on laptops and the server |
| Static files and CDN | **WhiteNoise** + Cloudflare CDN in front | Fast for visitors abroad and in Tajikistan |
| CI/CD | **GitHub Actions**: Ruff, mypy, pytest, then deploy | Nothing broken goes live |
| Monitoring | **Sentry** (Python SDK) | Know about errors before visitors do |
| Analytics | Plausible or Umami (no cookies) | No cookie banner needed |
| Repository | Public GitHub repo | Community can send fixes, like PyCon AU. A good first open source contribution for local students. |

**Performance budget** (important on mobile internet in Tajikistan):
- First page load **under 300 KB** without the 3D scene
- Django renders full HTML on the server, so text appears immediately, even without JavaScript
- Page caching with Django's cache framework (Redis or database cache)
- 3D scene, Pyodide and big images load **only after** the page is usable, and **only** on fast connections (`navigator.connection`) and when `prefers-reduced-motion` is off
- Images in AVIF/WebP with sizes for each screen (Wagtail renditions do this automatically)

### Project structure

```
pycon_tj/
├── pyproject.toml           # uv, Ruff, mypy, pytest config
├── docker-compose.yml
├── config/                  # Django settings, urls
├── apps/
│   ├── pages/               # Wagtail pages: home, about, venue, FAQ, CoC
│   ├── program/             # Talks, speakers, rooms, schedule (synced from pretalx)
│   ├── sponsors/            # Sponsor tiers and logos
│   ├── tickets/             # pretix integration, pay-it-forward
│   ├── volunteers/          # Sign-up, roles, shifts
│   ├── aid/                 # Financial aid applications
│   ├── live/                # Event-day live mode (Channels)
│   └── news/                # Announcements + Telegram posting
├── suzani/                  # Pure-Python pattern generator (used by backend AND Pyodide)
├── templates/               # Django templates (TJ / RU / EN via i18n)
├── static/                  # CSS tokens, Three.js scene, GSAP, Pyodide loader
├── locale/                  # tg, ru, en translation files
└── tests/
```

## 7. Content pipeline

1. Page text is edited in the **Wagtail admin** in three languages. No code needed for volunteers.
2. Talks and speakers are synced from the pretalx API by a **Django management command** (`python manage.py sync_pretalx`). Cron runs it every hour, and every 5 minutes during the event week.
3. Sponsors are managed in the **Django admin** (name, tier, logo, link, order).
4. News posts are written in Wagtail. A Python **Telegram bot** (`python-telegram-bot` or `aiogram`) posts them to the channel automatically.
5. Ticket sales numbers come from the pretix API and show on an internal dashboard for the team.

## 8. Tickets and payments

The prices below are suggestions based on the analysis of other PyCons. The final numbers belong to the organising team.

| Ticket | Who | Idea |
|--------|-----|------|
| Student | Students and school pupils | Very low or free, with student ID |
| Personal | People paying for themselves | Low price |
| Business / Supporter | Paid by an employer | Real cost, helps pay for student tickets |
| Pay it forward | Anyone | Donation that pays for a free ticket for someone else (Namibia idea) |
| Volunteer | Volunteers | Free in exchange for shifts |

- Payment: pretix with card, plus a **local option** (for example a bank transfer or a local e-wallet, checked by the team by hand), as PyCon Namibia does.
- Financial aid: reimburse travel against receipts after the event.

## 9. Timeline

> **Warning:** 12 December 2026 is about **32 days** away (today is 10 November 2026). Other PyCons open their call for talks 3–5 months before the event. Below is a **compressed** plan. If the team moves the event to spring 2027, stretch each phase by about 3×.

| When | What |
|------|------|
| **Days 1–3** | Approve design direction. Set up the repo, domain (e.g. `pycon.tj`), hosting, pretalx and pretix. |
| **Days 3–7** | **Launch version 1:** home, about, code of conduct, tickets, CFP, sponsors, TJ/RU/EN. Announce on Telegram, LinkedIn and Instagram. |
| **Days 7–14** | Call for proposals open (**2 weeks only**). Invite 1–2 keynote speakers directly. Sponsor outreach. |
| **Days 14–18** | Review talks. Build the schedule page, playground and suzani generator. |
| **Day 18** | Publish the schedule. Speaker pages live. |
| **Days 18–28** | Promotion push. Volunteer training. Event-day live mode. |
| **Day 32 (12 Dec)** | Event. Live mode on. |
| **After** | Photos, videos, thank-you page, a transparency report (as PyCon AU publishes), "See you in 2027". |

## 10. Team roles for the website

| Role | Job |
|------|-----|
| Web lead (Python) | Owns the repo, reviews pull requests, deploys |
| Designer | Owns design.md, makes the assets |
| Django / Wagtail developers (2) | Models, Wagtail pages, i18n, admin, forms, pretalx and pretix sync, live mode |
| Python developer (generative) | `suzani/` module, badge PDFs, Pyodide terminal |
| Front-end developer (1) | Django templates, CSS tokens, the 3D hero and animations |
| DevOps (Python) | Docker, server, CI, backups, Sentry |
| Content editors (TJ / RU / EN) | Write and proofread copy from tezis.md |
| Photographer / video | Real photos for after the event (replace concept images) |

## 11. Claude Code plugins and skills to use

These are already installed in this Claude Code setup. Use them at each stage.

| Stage | Plugin / skill | What it does for us |
|-------|----------------|---------------------|
| Design system | `ui-ux-pro-max:design-system`, `design:design-system` | Turn design.md into tokens and components |
| UI exploration | `superdesign:superdesign` | Try several versions of the home page and compare them on a canvas |
| UI build | `example-skills:frontend-design`, `ui-ux-pro-max:ui-styling` | Build distinctive pages that don't look like a template |
| Colour themes | `example-skills:theme-factory` | Light ("Mountain day") and dark ("Mountain night") themes |
| Generative art | `example-skills:algorithmic-art` | Prototype the suzani pattern generator |
| Banners and social | `ui-ux-pro-max:banner-design`, `pro-design`, Canva (`canva:*`) | Roll-ups, social posts, Open Graph images |
| Slides | `ui-ux-pro-max:slides` | Sponsor deck, opening slides |
| Copy | `design:ux-copy` | Button text, error messages, empty states |
| Review | `design:design-critique` | Feedback on each mockup |
| Accessibility | `design:accessibility-review` | WCAG 2.1 AA audit before launch |
| Handoff | `design:design-handoff` | Specs for developers |
| Testing | `example-skills:webapp-testing` | Click through the site in a real browser, check mobile |
| Video | `hyperframes`, `codesign:launch-video` | Short launch video and countdown clips |
| Docs | `docx`, `pdf` | Sponsor prospectus PDF |

Needs sign-in first: **Figma** (`plugin:design:figma`) and **Canva**. Run `/mcp` in a Claude Code terminal to connect them.

## 12. Launch checklist

- [ ] PSF approval of the name and logo (or the site says "PyCon Tajikistan (proposed)")
- [ ] Domain and HTTPS
- [ ] All three languages proofread by native speakers
- [ ] Code of conduct with named contacts and an email address
- [ ] Lighthouse mobile ≥ 90, works on a slow 3G test profile
- [ ] Works with `prefers-reduced-motion` and keyboard only
- [ ] Concept images are labelled "concept" or replaced
- [ ] Ticket and CFP links tested end to end
- [ ] Open Graph images for each language (so links look good on Telegram)
- [ ] Privacy policy (what data pretix and pretalx collect)
- [ ] `python manage.py check --deploy` passes (DEBUG off, secure cookies, HSTS, allowed hosts)
- [ ] All tests pass in CI (pytest, Ruff, mypy)
- [ ] Daily PostgreSQL backups tested with a restore
- [ ] Sentry error alerts go to the web team's Telegram
