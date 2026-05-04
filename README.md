# devcard

> Type your GitHub username. Get a beautiful developer profile card. Download as PNG.

**Live:** https://devcard-ochre.vercel.app
**Source:** https://github.com/Vihan-G/devcard

devcard pulls public data from the GitHub REST API and renders a polished
800×420 card you can drop into your README, portfolio, social header, or
anywhere else. No login. No API key. No server.

![devcard screenshot placeholder](./docs/screenshot.png)

## What it does

- Fetches a profile from `api.github.com/users/{username}` (and their repos).
- Computes total stars, top 3 repos by stars, and a top-5 language breakdown.
- Renders a 800×420 card with three theme variants — Dark, Midnight, Ocean.
- Exports the card as a high-resolution PNG via `html2canvas`.
- Smooth entrance animation with `framer-motion`.

## Tech stack

- **Next.js 16** (App Router) · **TypeScript** · **Tailwind CSS v4**
- `html2canvas` — DOM → PNG export
- `framer-motion` — entrance animation
- GitHub REST API (unauthenticated, public)

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

```
src/
  app/
    page.tsx              full page (header → hero → tool/examples → footer)
    layout.tsx            metadata + fonts
    globals.css
  components/
    Header.tsx            site header with logo and source link
    Hero.tsx              headline + search form
    SearchForm.tsx        username input + generate button
    DevCard.tsx           the 800×420 card
    StatBlock.tsx         single stat (repos / followers / following)
    LanguageBar.tsx       segmented language bar + legend
    TopRepos.tsx          top 3 repos by stars
    ThemePicker.tsx       3 theme circles
    DownloadButton.tsx    triggers PNG download
    ExampleCards.tsx      static example cards for first-load state
    ErrorMessage.tsx      error UI with retry
    HomeClient.tsx        client-side page state
    Footer.tsx            site footer
  lib/
    github.ts             API fetching + data processing
    languages.ts          language → color map
    types.ts              shared interfaces
    export.ts             html2canvas → PNG download
```

## Notes

- GitHub allows **60 unauthenticated requests/hour per IP**. The UI mentions
  this. Each card render uses 2 requests (user + repos).
- Avatars are loaded with `crossOrigin="anonymous"` so the rendered canvas
  is not tainted and the PNG export works.
- Forks are excluded from total-stars and top-repos calculations.

## Made by

[Vihan Goenka](https://github.com/Vihan-G) · UCSD CS '29

Not affiliated with GitHub, Inc.
