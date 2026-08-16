# SlavicMind — Audit + Phase 1 Foundation

## 1. What already exists

- **Routes (30+)**: home, `/dashboard`, `/daily`, `/vocabulary`, `/grammar` (+ cases, conjugation, aspect, verbs, verb-case connections), `/stories` (+ detail), `/games` hub with 10 games, `/quest` (Case Quest: Seven Kingdoms), `/auth`, `/guide/difficulty`.
- **Content data**: ~490 vocabulary entries across ~32 categories, full declension/conjugation/aspect paradigms, 3 stories, daily idioms/history/literature/memes.
- **Accounts & progress**: Lovable Cloud auth (email + Google), tables `profiles`, `user_progress`, `user_favorites`, `user_achievements`, `user_quests`, `user_best_scores`, `user_kingdoms`. Real-time sync with localStorage fallback.
- **SEO**: robots.txt, dynamic sitemap.xml, llms.txt, per-route titles/descriptions/canonical/og, `<main>` landmark.
- **Agent integrations**: MCP server with 6 OAuth-protected tools.
- **Design**: dark academic theme, serif display + crimson accent, `SiteHeader`, `ClientOnly` hydration gate, `SpeakButton`/`SoundToggle`.

## 2. Roadmap items already covered

Polish grammar lab (most of it), vocabulary, games, gamification (XP/level/streak/quests/best scores), dashboard, accounts, base SEO, stories.

## 3. Missing

Brand-level positioning (site reads as "a Polish course"), language architecture (`/learn`, `/learn/polish`), Slavic Connections as a cross-language feature (current `/grammar/connections` is verb→case, unrelated), Abroad / Students / Business / Pricing pages, share components, analytics event layer, mobile nav (header nav is `hidden md:flex` — no mobile menu at all), a Language/Course/Lesson data model.

## 4. Risks noticed

- **Mobile**: the only navigation on phones is the logo — every section is unreachable from a phone. Highest-priority fix.
- **URL preservation**: the site is published and its sitemap advertises `/grammar/*`, `/vocabulary`, `/games/*`. Moving them under `/learn/polish/*` would drop existing SEO. Plan keeps current URLs canonical and adds `/learn/polish` as a hub that links to them.
- Route files are large single components; new work should use shared components in `src/components/`.
- No fake content: future languages are labelled "planned", never linkable to empty courses.

## 5. Prioritized plan

- **Phase 1 (this change)** — brand homepage, mobile nav, `/learn` + `/learn/polish` hub, language registry.
- Phase 2 — Grammar Lab organisation + dashboard upgrade.
- Phase 3 — Slavic Connections feature.
- Phase 4 — SEO article routes, share components, analytics events.
- Phase 5 — Abroad / Students / Business / Pricing architecture.
- Phase 6 — additional languages.

---

# Phase 1 scope (only this gets built now)

### A. Language registry
`src/data/languages.ts` — a single editable list: `{ code, name, nativeName, flagless glyph, status: "available" | "planned", blurb }`. Polish available; Czech, Slovak, Serbian, Croatian, Slovenian, Ukrainian, Bulgarian planned. Everything language-aware reads from here so adding a language later is a data edit.

### B. Homepage repositioning
Keep the existing time-aware hero shell, dark academic styling and daily grid. Changes:
- Headline reframed to the brand: "Learn Slavic languages. Understand how they connect." with a sub-line explaining SlavicMind, and the existing Polish greeting kept as the atmospheric time-of-day accent.
- Primary CTA "Start learning Polish" → `/learn/polish`; secondary keeps the time-based recommendation.
- New "Languages" strip built from the registry: Polish = Available (linked), others = Planned (not linked, plainly labelled).
- New short "Why Slavic Connections" band explaining the cross-language advantage, linking forward (Phase 3 page not yet built — links to `/learn/polish` for now, no dead routes).
- Existing Features / Cases / CTA / Footer sections kept, spacing and hierarchy tightened.

### C. `/learn` and `/learn/polish`
- `/learn` — language selection page from the registry, with head metadata.
- `/learn/polish` — the flagship hub: four groups (Grammar Lab, Vocabulary, Practice & Games, Stories & Daily) linking to the **existing** routes. No duplicated exercise logic, no moved routes.

### D. Mobile navigation
Add a real mobile menu to `SiteHeader` (hamburger → slide-down panel with all nav items, stats, sound toggle, sign in/out). Touch targets ≥44px. Desktop nav unchanged apart from adding "Learn".

### E. SEO for the new pages
Unique title/description/og/canonical on `/learn` and `/learn/polish`; both added to sitemap.xml. Existing URLs and metadata untouched. No hreflang (no translations exist). Google Search Console still needs your own manual verification — I won't fake it.

### Technical notes
- New files: `src/data/languages.ts`, `src/routes/learn.tsx` (layout `<Outlet />`), `src/routes/learn.index.tsx`, `src/routes/learn.polish.tsx`, `src/components/MobileNav.tsx`, `src/components/LanguageCard.tsx`, `src/components/SectionHeading.tsx`.
- Edited: `src/routes/index.tsx`, `src/components/SiteHeader.tsx`, `src/routes/sitemap[.]xml.ts`.
- No database migration in Phase 1 — the existing schema supports everything here.

### Build error to fix first
`src/components/SiteHeader.tsx` line 42: the `<Link to="/auth">` is missing the required `search` prop (the auth route validates a `next` param). Fix is one line — add `search={{ next: "" }}` — and it happens as the first step of Phase 1.
