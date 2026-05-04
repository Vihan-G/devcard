# devcard — CLAUDE.md

Inherit all rules from /Users/vihangoenka/claudeprojects/CLAUDE.md.

---

## What we're building

**devcard** — Type your GitHub username. Get a beautiful developer profile card.
Download as PNG. Use it in your README, portfolio, Twitter header, anywhere.

Pulls from GitHub's public API — no auth, no API key needed.
Everything renders client-side. Export via html2canvas.

Target users: every developer on GitHub. That's 100M+ people.
The GitHub default profile is boring. Profile README cards either require
running a server (github-readme-stats) or look like they're from 2015.
devcard makes it beautiful and instant.

---

## Tech stack

- Next.js 14, App Router, TypeScript, Tailwind, src/ layout
- `html2canvas` — card → PNG export
- `framer-motion` — card entrance animation
- GitHub REST API (public, no key): 
  - `https://api.github.com/users/{username}` — profile data
  - `https://api.github.com/users/{username}/repos?per_page=100` — repo data

```bash
npm install html2canvas framer-motion
```

---

## Data we pull and how we use it

### From /users/{username}:
- avatar_url → profile photo on card
- name → display name
- login → @handle
- bio → short bio text
- public_repos → stat
- followers → stat
- following → stat
- created_at → "Member since YYYY"
- location → if present, show on card

### From /users/{username}/repos:
- Compute total stars: sum of stargazers_count across all repos
- Top 3 repos by stars: name + stargazers_count
- Language breakdown: count bytes per language, compute % share
  (repos have a `language` field — use that, not the languages API)
  Show top 5 languages as a colored bar

---

## Language colors (hardcode these in lib/languages.ts)

```typescript
export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Ruby: '#701516',
  PHP: '#4F5D95',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Vue: '#41b883',
  Dart: '#00B4AB',
  Scala: '#c22d40',
  'C#': '#178600',
  Haskell: '#5e5086',
}
// Default color for unknown languages: '#8b8b8b'
```

---

## Card design (this is the product — get it right)

The card is a fixed-size component: **800×420px**. This is the PNG that gets downloaded.
It must look stunning as a standalone image, not just on a webpage.

### Card layout:

```
┌─────────────────────────────────────────────────────────┐
│  [gradient accent bar — 4px top border]                 │
│                                                         │
│  [avatar 80px]   Name                     ★ 1.2k stars  │
│  circle, border  @handle                               │
│                  "bio text here"                        │
│                  📍 San Francisco  · Since 2019         │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  Repos    Followers   Following                         │
│  248      4.2k        180                               │
│                                                         │
│  Top repos:                                             │
│  ● next-saas-starter      ★ 842                         │
│  ● react-hooks-lib        ★ 341                         │
│  ● ml-experiments         ★ 98                          │
│                                                         │
│  Languages ──────────────────────────────────────────── │
│  [TypeScript 45%][Python 30%][JS 15%][Go 7%][Other 3%] │
│                                    devcard.vercel.app   │
└─────────────────────────────────────────────────────────┘
```

### Card styling:
- Background: `#0d1117` (exact GitHub dark background color)
- Top accent border: 4px gradient `from-violet-500 via-blue-500 to-cyan-400`
- Avatar: circular, 3px border `#30363d`, shadow
- Name: 20px, Inter bold, `#e6edf3`
- Handle: 14px, `#7d8590`, monospace
- Bio: 13px, `#7d8590`, italic, max 2 lines
- Divider: `#21262d`
- Stat numbers: 22px, bold, `#e6edf3`
- Stat labels: 11px, `#7d8590`, uppercase, tracking-wide
- Top repos: each on one line, repo name in `#58a6ff` (GitHub link blue), star count in `#7d8590`
- Language bar: full-width, 8px height, rounded, segmented by language color with 2px gap
- Language legend below bar: colored dot + name + %
- Footer text `devcard.vercel.app`: 10px, `#484f58`, bottom right
- Card border: 1px solid `#21262d`
- Card border-radius: 12px

### Theme variants (user can pick before downloading):
1. **Dark** (default — described above)
2. **Midnight** — `#000000` bg, accent `from-pink-500 via-purple-500 to-indigo-500`
3. **Ocean** — `#0c1e35` bg, accent `from-cyan-400 via-blue-500 to-indigo-600`

Show three small theme picker circles above the card.

---

## File structure

```
src/
  app/
    page.tsx                    ← full page layout with header, hero, tool, footer
    layout.tsx
    globals.css
  components/
    Header.tsx                  ← site header
    Hero.tsx                    ← headline + subtext + search input
    SearchForm.tsx              ← username input + fetch button
    DevCard.tsx                 ← the 800×420 card component
    StatBlock.tsx               ← individual stat (repos, followers, etc.)
    LanguageBar.tsx             ← colored segmented language bar
    TopRepos.tsx                ← top 3 repos list
    ThemePicker.tsx             ← 3 theme circles
    DownloadButton.tsx          ← html2canvas → PNG download
    ExampleCards.tsx            ← static example cards so page isn't empty
    Footer.tsx                  ← site footer
  lib/
    github.ts                   ← API fetching + data processing
    languages.ts                ← language color map
    types.ts                    ← GitHubUser, GitHubRepo, ProcessedProfile interfaces
    export.ts                   ← html2canvas download logic
```

---

## Page layout (this is critical — proper product structure)

### Header.tsx
```
[devcard logo/wordmark]                    [GitHub link → github.com/Vihan-G]
```
- Height: 56px
- Background: `#010409` (near black)
- Bottom border: 1px solid `#21262d`
- Logo: "devcard" in Inter bold, white, with a small card icon (SVG) before it
- GitHub link: small GitHub icon + "View source" text, `#7d8590`, links to the repo

### Hero section (below header)
```
                  Your GitHub, beautifully presented.
         Generate a shareable developer card from your GitHub profile.
              No login. No setup. Just type and download.

                    [_______ GitHub username _______] [Generate →]
```
- Centered, ~200px vertical padding
- Headline: 48px, Inter bold, white, tight tracking
- Subheadline: 18px, `#7d8590`, max-width 480px
- Three trust signals below: "No login required · Free forever · Works in seconds"
  as small pills with checkmark icons

### Tool section
- White-ish background (actually use `#010409` — keep it all dark)
- Card renders centered on the page
- Theme picker above card
- Download button below card
- Error state if username not found: clean message, try again

### Examples section (below tool, shown before first search)
```
                      See what your card could look like

  [torvalds card]     [gaearon card]     [sindresorhus card]
```
- 3 hardcoded example profiles rendered as DevCard components
- Label: "Try it with your own username above"
- These are static — hardcode the data, no live API call

### Footer.tsx
```
devcard                          Made by Vihan Goenka · UCSD CS '29
                                 github.com/Vihan-G
─────────────────────────────────────────────────────────────────────
                Not affiliated with GitHub, Inc.
```
- Background: `#010409`
- Top border: 1px `#21262d`
- "Made by Vihan Goenka" links to his GitHub
- "Not affiliated with GitHub" in small muted text

---

## GitHub API integration (lib/github.ts)

```typescript
export interface ProcessedProfile {
  login: string
  name: string
  avatarUrl: string
  bio: string | null
  location: string | null
  publicRepos: number
  followers: number
  following: number
  memberSince: string          // "2019"
  totalStars: number
  topRepos: { name: string; stars: number }[]
  languages: { name: string; percentage: number; color: string }[]
}

export async function fetchProfile(username: string): Promise<ProcessedProfile>
// Fetch /users/{username} and /users/{username}/repos?per_page=100&sort=updated
// Process and return ProcessedProfile
// Throw specific errors: "User not found" (404), "Rate limit exceeded" (403), "Network error"
```

Rate limit note: GitHub allows 60 unauthenticated requests/hour per IP.
Add a small note in the UI: "GitHub limits unauthenticated requests to 60/hour."

---

## Setup commands

```bash
cd /Users/vihangoenka/claudeprojects

npx create-next-app@latest devcard --typescript --tailwind --app --src-dir --import-alias "@/*" --no-eslint

cd devcard

npm install html2canvas framer-motion

git init
git add .
git commit -m "chore: initial scaffold"
gh repo create devcard --public --source=. --remote=origin --push
vercel --yes
touch .env.local
echo ".env.local" >> .gitignore
git add .gitignore
git commit -m "chore: gitignore"
git push origin main
```

---

## Milestone commits (one session)

1. `chore: types, github API client, language colors`
2. `feat: header and footer components`
3. `feat: hero section with search form`
4. `feat: devcard component — dark theme, full layout`
5. `feat: language bar, stat blocks, top repos`
6. `feat: theme picker — dark, midnight, ocean`
7. `feat: html2canvas PNG download`
8. `feat: example cards section and error states`
9. `feat: framer-motion card entrance animation`
10. `docs: README, metadata, vercel prod, v1.0.0 release`

After commit 10:
```bash
vercel --prod
gh release create v1.0.0 --title "devcard v1.0.0" --notes "Generate a beautiful developer profile card from your GitHub username. No login. Download as PNG."
gh repo edit --add-topic github --add-topic developer --add-topic profile --add-topic nextjs --add-topic typescript --add-topic tools
```

---

## What done looks like

- Type any GitHub username → card renders in <2 seconds
- Card looks genuinely beautiful — not a tutorial project
- Three theme variants work
- PNG downloads cleanly at 800×420px
- Example cards show on first load so the page isn't empty
- Header and footer give it product weight
- Brief description under the tool explains what it does in one line
- Mobile: card scales down, still looks good
- Error states handled: user not found, rate limit, network error
- "Made by Vihan Goenka" in the footer — this is your portfolio piece
