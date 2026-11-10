# PyCon Tajikistan 2026

The website for PyCon Tajikistan 2026, the first Python conference in Tajikistan (Dushanbe), organised by Softclub. It's available in English, Russian and Tajik.

## Tech stack

- [Next.js](https://nextjs.org) 16.4.5 (App Router, Turbopack) and React 19.3
- TypeScript 5
- Tailwind CSS 4
- ESLint 9 (`eslint-config-next`)
- Three.js / React Three Fiber, GSAP and Lenis: installed and used by components that the current homepage does not mount (the former 3D hero, the 3D emblem, and the schedule and workshops sections)

## Requirements

- Node.js 20.9.0 or newer (required by Next.js 16)
- npm (the repository uses `package-lock.json`)

## Local setup

```bash
git clone https://github.com/pycon-tj/pycon-tj-website.git
```

```bash
cd pycon-tj-website
```

```bash
npm ci
```

`NEXT_PUBLIC_SITE_URL` is optional locally. It sets the absolute URLs used in canonical and language-alternate links, and defaults to `http://localhost:3000`.

## Development server

```bash
npm run dev
```

Open <http://localhost:3000>. Visiting `/` redirects to `/en`, `/ru` or `/tg` based on the saved language cookie or the browser language. English is the fallback.

## Production build

```bash
npm run build
```

```bash
npm run start
```

Check the code with:

```bash
npm run lint
```

## Project structure

- `src/app/[lang]/`: the localised pages (`layout.tsx`, `page.tsx`)
- `src/app/route.ts`: the `/` language redirect
- `src/components/`: the navigation, hero, page sections and UI pieces
- `src/content/`: all site text. Edit English in the section files (`site.ts`, `about.ts` and so on). Russian is in `ru.ts` and Tajik in `tg.ts`; TypeScript flags any key that is missing from a translation.
- `src/i18n/`: the locale configuration and provider
- `public/assets/`: the logos, the monument image and the other images

Values marked "To be announced" or "placeholder" must be confirmed before they're changed. Don't replace them with invented dates, venues or numbers.

## Deployment

The site is deployed to Netlify, which runs Next.js through its Next.js runtime: <https://pycon-tajikistan-2026.netlify.app>

- **Environment variable:** set `NEXT_PUBLIC_SITE_URL` in the Netlify site settings to the public URL.
- **Deploying:** deploys are made with the Netlify CLI from a folder linked to the site. The link is stored in `.netlify/`, which git ignores.

  ```bash
  npx netlify-cli deploy --prod
  ```

- **Windows note:** stop any running `npm run dev` before deploying on Windows. The deploy step renames the `.next` folder, and a running dev server keeps files in it open.

## Contributing

1. Create a branch from `main`.
2. Make your changes. For text, edit the files in `src/content/` and keep `en`, `ru` and `tg` in sync.
3. Run `npm run lint` and `npm run build`, and fix anything they report.
4. Push the branch and open a pull request against `main` on GitHub.
