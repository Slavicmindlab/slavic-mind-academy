# Finish Phase 1, then Phase 2: one coherent Polish learning system

## Phase 1 — remaining work

**1. Mobile navigation wired in**
`SiteHeader` currently renders only the desktop nav (`hidden md:flex`) plus stats; the existing `MobileNav` component is never rendered. Render it inside the header (client-gated like the stats), share one nav array between desktop and mobile so there is a single source of truth, and add "Learn" → `/learn` to it. Menu closes on route change (already handled in the component), 44px+ targets, `aria-expanded`/`aria-label` already present; add focus-visible styles and Escape-to-close.

**2. Homepage repositioning (edit, not rebuild)**
Keep the time-aware hero, Polish greeting, daily grid, Features, Cases preview, CTA and footer. Changes:
- Hero headline becomes the brand line: "Learn Slavic languages. Understand how they connect.", with a sub-line naming Polish as the flagship, available now.
- Primary CTA "Start learning Polish" → `/learn/polish`; secondary keeps the existing time-based recommendation.
- New compact language strip: one prominent Polish card (Available), planned languages as a quiet inline row of names, not seven equal cards. Built from `src/data/languages.ts`.
- New short "Slavic Connections" band with the глава / głowa / hlava / hlava example, CTA to `/learn/polish` (no dead route).

**3. Sitemap** — add `/learn` and `/learn/polish`. Nothing removed or moved.

**4. Verification** — typecheck, lint, production build, and a browser pass over `/`, `/learn`, `/learn/polish`, desktop + mobile nav, signed-out state.

## Phase 2 — turn existing content into a learning system

No new courses, no moved URLs, no new progress system. Everything reads the existing `useProgress` store (xp, xpToday, streak, favorites, achievements, bestScores, quests) which already syncs to the backend with a localStorage fallback.

**A. Grammar Lab** — reorganize `/grammar` into labelled groups over the content that actually exists: Cases & Declension (the seven case routes), Verbs (conjugation, aspect, verb→case connections, verb list), and Reference (paradigm tables). Each topic card gets a matching practice link (case → Case Quest kingdom, conjugation → conjugation game, aspect → fill-blank).

**B. Polish Learning Path** on `/learn/polish` — an ordered, non-blocking list built only from real routes: vocabulary basics → core grammar → cases → verbs & aspect → games practice → stories. Item state is derived from data we genuinely have (XP thresholds, best scores present, quests done, favorites count). Where completion can't be determined, the item just says "Open" rather than faking a checkmark.

**C. Continue Learning** — one deterministic recommendation component reused on `/learn/polish` and `/dashboard`: resume the last-touched area from stored progress; for a brand-new account it points at the first learning-path step with a "Start your Polish journey" empty state.

**D. Dashboard cleanup** — keep the layout and all existing widgets; improve hierarchy (Continue Learning first, then real stats, quick practice, daily, quests, achievements). **Remove the "Accuracy" tile**: it is currently computed as `60 + streak * 3`, a fabricated number not backed by stored data. Replace it with a metric we actually store (games played / best-score count).

**E. Shared progress UI + cross-links** — small reusable components (progress bar, stat pill, topic card, path item) so grammar, vocabulary, dashboard and hub show progress the same way. Selective contextual links: grammar topic → its exercise, vocabulary category → matching game, story → its vocabulary, daily → related topic.

**F. Mobile + accessibility** — audit the hub, Grammar Lab, path and dashboard at 393px: no horizontal overflow, no hover-only actions, tables scroll in a labelled container, headings in order, status never conveyed by colour alone.

## Explore / mythology pillar

Not built in this phase. The only forward-compatibility step: keep the language registry role-neutral (a language can later be a course, an interface, or a source language) and avoid any structure that would block a future Explore taxonomy. No placeholder mythology pages, no empty routes.

## Technical notes

- New components under `src/components/`: `LearningPath`, `LearningPathItem`, `ContinueLearning`, `GrammarTopicCard`, `ProgressBar`, `QuickPractice` (names checked against existing files first to avoid duplicates).
- Edited: `SiteHeader.tsx`, `routes/index.tsx`, `routes/learn.polish.tsx`, `routes/grammar.tsx`, `routes/dashboard.tsx`, `routes/sitemap[.]xml.ts`.
- No database migration. No schema or field renames. No change to auth, persistence, or the localStorage fallback.
- All existing URLs, titles, descriptions and canonicals stay exactly as they are.
