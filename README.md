# PyCon Tajikistan 2026: website

> Python at the Summit. The site of the first PyCon in Tajikistan, built with Python: Django, Wagtail and HTMX.

Planning documents: [plan.md](plan.md) · [design.md](design.md) · [tezis.md](tezis.md)

## Run it locally

You need Python 3.13 and [uv](https://docs.astral.sh/uv/) (`pip install uv`).

```bash
uv sync                                  # install everything
cp .env.example .env                     # local settings (DEBUG on)
uv run python manage.py migrate          # create the database and home page
uv run python manage.py seed_tiers       # mountain-named sponsor tiers
uv run python manage.py createsuperuser  # your admin login
uv run python manage.py runserver
```

- Site: http://localhost:8000 (redirects to `/tg/`, `/ru/` or `/en/`)
- Content editor (Wagtail): http://localhost:8000/admin/
- Data admin (sponsors, talks, volunteers, aid): http://localhost:8000/django-admin/
- JSON API docs: http://localhost:8000/api/docs

## What is where

| Folder | What it does |
|--------|--------------|
| `config/` | Settings, URLs, the django-ninja API |
| `apps/pages/` | Wagtail home and text pages, suzani views and template tags, `build_locale` command |
| `apps/program/` | Rooms, speakers, talks. `sync_pretalx` imports them from pretalx |
| `apps/sponsors/` | Sponsor tiers ("ledges") and sponsors |
| `apps/tickets/` | Tickets page (sales run on pretix) |
| `apps/volunteers/`, `apps/aid/` | Volunteer and financial aid forms (HTMX) |
| `apps/live/` | "Now on stage" page for the event day, refreshes every 30 s |
| `apps/news/` | News posts and `post_to_telegram` |
| `suzani/` | Pure-Python pattern generator. Runs on the server **and** in the browser (Pyodide) |
| `templates/`, `static/` | Django templates, CSS tokens, the ascent and terminal scripts |
| `locale/` | Translations. Edit `locale/drafts.py`, then `uv run python manage.py build_locale` |

## Useful commands

```bash
uv run pytest                              # tests
uv run ruff check . && uv run ruff format . # lint and format
uv run python manage.py build_locale       # rebuild TJ / RU translations
uv run python manage.py sync_pretalx       # import talks (needs PRETALX_EVENT_URL)
uv run python manage.py post_to_telegram   # post news (needs TELEGRAM_BOT_TOKEN, TELEGRAM_CHANNEL)
docker compose up --build                  # production-like run with PostgreSQL
```

## The wow parts

- **Sunrise hero:** the sun from the logo rises behind the mountains, the red and green swoosh draws itself. Plays once; off with reduced motion.
- **Altitude rail:** climbs from 800 m to a 2,026 m summit (the year) as you scroll.
- **Python terminal:** real Python in the browser via Pyodide, loaded only when the visitor presses Start. `draw("name")` uses the same `suzani` module as the server.
- **Your suzani:** `/suzani/` weaves a personal rosette from a name, live with HTMX, downloadable as a profile picture. The same seed goes on the printed badge.
- **Atlas shimmer:** buttons shimmer like adras silk on hover.

## Before launch

- A native speaker proofreads `locale/drafts.py` (Tajik and Russian are drafts).
- Set `DJANGO_SECRET_KEY`, `DJANGO_ALLOWED_HOSTS`, `DATABASE_URL`, `PRETALX_EVENT_URL`, `PRETIX_SHOP_URL`.
- `uv run python manage.py check --deploy`
- Replace the GitHub link in the footer with the real repository.
