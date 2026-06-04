# Zen in Every Moment

A quiet, fully‑static reader of **authentic** Zen koans and parables. It does not
generate wisdom — it helps you *find* an existing public‑domain teaching that
meets your present moment, and it always shows you where that teaching comes from.

- **No backend. No database. No login. No analytics. No cookies** (only a
  `localStorage` preference for language, theme and kept teachings).
- **No AI, no LLM calls, no text generation.** Matching is a small, transparent,
  weighted tag algorithm that runs entirely in your browser.
- **Multilingual by design** — Ukrainian, English, French, Japanese, with an
  architecture that accepts new languages without touching application logic.
- Built to deploy to **GitHub Pages** with zero path configuration.

---

## How it works

The reader walks four quiet questions, then offers three teachings.

1. **Inner Weather** — fog · rain · wind · clear sky · storm
2. **What is happening?** — searching · waiting · struggling · losing · finding
3. **Focus** — myself · another person · work · the future · the past
4. **Depth** — one line · a short story · a full koan

Each koan carries tags along those same four dimensions. The matcher
([`src/lib/matching.ts`](src/lib/matching.ts)) scores every koan against your
answers (weather/state weigh most, then focus, then depth) and returns three
distinct teachings, mapped to three contemplative roles:

| Card | Role |
| --- | --- |
| 1 | What you see now |
| 2 | What you may not see |
| 3 | What may be released |

There is no interpretation and no commentary — only title, text, author and
source.

Also included: a **random teaching**, a deterministic **teaching of the day**,
**kept teachings** (favorites in `localStorage`), and **light / dark** themes
(dark is "reading by candlelight" — warm, never pure black).

---

## Tech stack

- **React 18 + TypeScript + Vite**
- **HashRouter** (`react-router-dom`) so deep links survive a refresh on static
  hosting
- A tiny **custom i18n layer** (no heavy dependency) — see below
- Plain CSS with design tokens; two themes differ only in variable values

### Project structure

```
src/
  main.tsx                 app entry
  App.tsx                  providers + routes (Theme → i18n → Favorites → Flow)
  types/index.ts           single source of truth: domain types + tag vocabularies
  i18n/index.tsx           interface-translation layer (UI strings)
  locales/                 uk.json · en.json · fr.json · ja.json   (Layer 1)
  data/
    koans.json             the corpus — content-translation layer (Layer 2)
    koans.ts               typed entry point into the corpus
    SCHEMA.md              the data schema + how to extend it
  lib/
    matching.ts            weighted tag matcher (the entire "intelligence")
    daily.ts               deterministic teaching-of-the-day
    storage.ts             defensive localStorage helpers
  theme/ThemeProvider.tsx  light / dark
  hooks/useFavorites.tsx   kept teachings
  flow/FlowContext.tsx     the four answers gathered during the flow
  components/              Enso, ink icons, cards, language switcher, theme toggle…
  screens/                 Home · Flow · Results · KoanView · Favorites
  styles/global.css        design tokens, themes, typography, motion
scripts/validate-koans.mjs corpus validator (npm run validate:koans)
.github/workflows/deploy.yml  GitHub Pages CI
```

---

## Two independent translation layers

This is a core requirement, not an afterthought.

**Layer 1 — interface.** Every UI string lives in `src/locales/<code>.json`.
No component contains hardcoded display text. Lookup + fallback is handled by
[`src/i18n/index.tsx`](src/i18n/index.tsx).

**Layer 2 — koan content.** Each koan's `title` and `text` are objects keyed by
language (see [`SCHEMA.md`](src/data/SCHEMA.md)). They are completely independent
of the UI layer.

**Fallback rules** (both layers): requested language → English → any available;
the koan page shows a small "Translation unavailable" note when English stands
in, and the interface never breaks. The **original-language** text of a koan is
preserved separately (`originalText`) and never overwritten by a translation.

> In this starter corpus, all 100 koans have English text; a curated 10 are fully
> translated into Ukrainian, French and Japanese to exercise every layer
> (including Japanese typography). The remaining entries fall back gracefully —
> add translations whenever you have a good one. Run `npm run validate:koans` to
> see current per‑language coverage.

### Adding a language (no logic changes)

1. Copy `src/locales/en.json` to `src/locales/<code>.json` and translate it.
2. Register it in [`src/i18n/index.tsx`](src/i18n/index.tsx) (`BUNDLES`) and add
   the code to `LANGUAGES` in [`src/types/index.ts`](src/types/index.ts).
3. Optionally add `<code>` keys to any koan in `koans.json`.

That's the whole change. The matcher, screens and components are untouched.

---

## The koan corpus

- Lives in [`src/data/koans.json`](src/data/koans.json) (currently **100**
  entries), with the schema and extension guide in
  [`src/data/SCHEMA.md`](src/data/SCHEMA.md).
- Sources are public‑domain: *101 Zen Stories* (Senzaki & Reps, 1919), *The
  Gateless Gate* (Mumonkan), the *Blue Cliff Record*, Dōgen, classic Zenrin
  verses and well‑known proverbs. **Every entry names its source**, shown to the
  reader.
- The structure scales to thousands of entries. If the file ever grows large
  enough to matter for first paint, switch the static import in
  [`koans.ts`](src/data/koans.ts) to a dynamic `import()` so it is code‑split.

> **A note on transcriptions:** the included texts are faithful renderings of
> public‑domain material gathered for this starter dataset. Before publishing at
> scale, proofread each entry against an authoritative edition of its source —
> the schema keeps `source` mandatory precisely so this stays honest.

To add or edit teachings, follow [`SCHEMA.md`](src/data/SCHEMA.md) and run:

```bash
npm run validate:koans
```

The validator checks required fields, tag enums, unique ids, and a mandatory
English string per localized field; it exits non‑zero on any problem (and runs in
CI before every deploy).

---

## Develop

```bash
npm install
npm run dev          # start the dev server
npm run lint         # type-check (tsc --noEmit)
npm run validate:koans
npm run build        # type-check + production build to dist/
npm run preview      # preview the production build locally
```

Requires Node 20+.

---

## Deploy to GitHub Pages

Two equivalent options — pick one.

### Option A — GitHub Actions (recommended)

1. Push this repository to GitHub.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub
   Actions**.
3. Push to `main` (or `master`). The included workflow
   ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) validates the
   corpus, builds, and deploys. Your site appears at
   `https://<user>.github.io/<repo>/`.

### Option B — `gh-pages` branch

```bash
npm run deploy        # builds, then pushes dist/ to the gh-pages branch
```

Then set **Settings → Pages → Source: Deploy from a branch → `gh-pages` / root**.

### Why it "just works" at any path

- `vite.config.ts` uses a **relative base** (`base: './'`), so the built asset
  URLs are path‑independent — no need to hardcode the repository name. (You can
  still override with `BASE_PATH=/my-repo/ npm run build` if you prefer absolute
  paths.)
- The app uses **HashRouter**, so routes like `#/koan/empty_cup` are resolved
  client‑side and never 404 on refresh — GitHub Pages has no server‑side
  rewrites.
- A `public/.nojekyll` file is included so GitHub's Jekyll step never interferes
  with the assets.

---

## Accessibility

- Full keyboard navigation; every option is a real `<button>` and conveys its
  selected state via `aria-pressed` (not colour alone).
- A skip link, a labelled `<main>` landmark, and `<html lang>` kept in sync with
  the chosen language for screen readers.
- Visible focus outlines; respects `prefers-reduced-motion` (animations collapse
  to near‑instant) and `prefers-color-scheme` for the initial theme.
- Mobile‑first layout that simply gains breathing room on larger screens.
- Japanese uses Noto Serif/Sans JP with increased line‑height for native
  rendering.

---

## Design

Warm paper, ink text, generous whitespace, literary serif headings (Cormorant /
EB Garamond), a humanist sans for UI (Inter), subtle ≤300 ms motion, and a hand‑
drawn enso. No badges, points, streaks, or anything that competes for attention.
The guiding question for every element: *would this exist in a quiet monastery
library?* If not, it isn't here.

Fonts load from Google Fonts and degrade gracefully to system serif/sans if the
network is unavailable.

---

## License

MIT for the application code. The koan texts are drawn from public‑domain
sources; each entry records its origin in its `source` field.
