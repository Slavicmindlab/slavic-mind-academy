# SlavicMind — post-Phase-2 audit (read-only, no changes made)

## 1. Product map

Mature (real depth, works end to end)
- Polish vocabulary: 493 entries, rich schema (pl/bg/en, pronunciation, POS, gender, plural, example, category, A1–B2), 33 categories.
- Grammar Lab: 7 case pages, conjugation, aspect, core verbs, verb→case connections; backed by `src/data/grammar.ts` (322 lines of paradigms).
- Games: 10 routes (memory, crossword, quiz, sentence, conjugation, match, listening, battle, wordchain, fillblank) plus Case Quest (516 lines, 7 kingdoms, DB-persisted).
- Progress engine: `src/lib/progress.ts` — XP, levels, streak, favorites, achievements, best scores, 3 daily quests, localStorage→Supabase merge on login, realtime sync.
- Phase 1/2 shell: language registry, `/learn`, `/learn/polish`, learning path, Continue Learning, Quick Practice, mobile nav, per-route SEO heads.

Partial / thin
- Stories: 4 items only (`kawiarnia`, `uniwersytet`, `podroz`, `wieczor`) — a section, not a library.
- Daily: idioms, history facts, literature quotes, memes exist as small arrays; surfaced only on `/daily`.
- Slavic Connections: a homepage band only. No route, no data model, no content. The stated differentiator does not exist as a product.
- Language registry: 7 of 8 languages are "planned" placeholders.
- Achievements: 7 hardcoded IDs; award rules are crude thresholds.
- MCP server: 6 tools, real, but no discoverable user value yet.

## 2. UX / product quality

Strong
- Consistent dark-academic visual language, serif + crimson, coherent across ~29 routes.
- Honesty framing (no fake courses, "untracked" steps, removed fabricated accuracy) is genuinely differentiating.
- Progress carries across signed-out → signed-in without loss.

Weak / confirmed
- Hub duplication: `/`, `/learn`, `/learn/polish`, `/grammar`, `/games`, `/dashboard` all present overlapping link grids. A user cannot tell which is "the" starting point.
- Dead-endy leaves: grammar/case/game pages mostly end without a next step; cross-links added in Phase 2 are partial.
- Learning path truth is shaky: a step counts as "done" once a best score of any value exists — one lucky click marks "Drill case endings" complete.
- No mastery model: favorites are a bookmark list, not learning state. Nothing knows which words you actually know.
- Culture content (idioms, memes, history, quotes) is buried in `/daily` and invisible to browsing or search.
- Stories are Polish/Bulgarian only in framing; 4 items cannot support the "reading" pillar the path promises.
- Mobile: nav is handled, but wide tables (declension paradigms) and the crossword grid are the usual overflow suspects — worth a targeted pass, not assumed broken.

## 3. Technical assessment

Confirmed issues
- Sitemap lists story URLs that do not exist: `/stories/baba-yaga`, `/wawel-dragon`, `/krakus` — the real ids are `kawiarnia`, `uniwersytet`, `podroz`, `wieczor`. Four real stories are missing and three 404s are being advertised.
- `og:image` is set on `__root.tsx`, so every page shares one preview screenshot and no leaf can override it — contrary to the leaf-only rule.
- Day rollover uses `new Date().toISOString().slice(0,10)` (UTC), while the greeting system was deliberately fixed to local time. Streaks and daily quests reset at UTC midnight, not the learner's midnight — a real inconsistency for BG/PL users (UTC+2/+3 in summer).
- Sitemap and story ids are hand-maintained duplicates of `src/data/stories.ts`; they have already drifted.
- `profiles.hero_name` and `user_progress.hero_name` both exist — duplicated identity field.
- Progress writes are fire-and-forget (`void supabase…`) with no error surface; a failed write silently diverges until reload.

Scaling risks (assessment, not defects)
- All content is TypeScript arrays in `src/data/*`. Fine at 493 words; painful past ~2k, and impossible for user-generated or editorially-updated content. Any Explore/Culture library at scale implies either MDX/content files or new tables.
- One global mutable module-level store; fine now, but no per-item state, no history, no analytics events.
- No spaced repetition, no per-word attempt log, no event table — so any "personalization" beyond the current deterministic path needs new schema.
- Route files carry data, layout and logic together (index.tsx 493 lines, quest.tsx 516). Extraction will be needed before Explore adds more pages.
- Security/RLS: all user tables are `auth.uid()`-scoped and role-free; no findings observed in code. Content is public and static, so no read-path exposure.

## 4. Brand / business

Currently reads as an unusually well-built student project rather than a public product. Positives: consistent identity, real grammar depth, honest data, working accounts. Missing for credibility: an About/creator page, no proof of authorship or methodology, no shareable artifacts, no per-page social images, no community or updates surface, no analytics. The genuine differentiators today are (a) Bulgarian-first explanations of Polish grammar, and (b) refusal to fake progress. Neither is yet visible above the fold to a stranger.

## 5. Roadmap options (impact / effort / dependency)

| Idea | Impact | Effort | Depends on |
| --- | --- | --- | --- |
| Slavic Connections as a real section (cognates, false friends, case-system comparison BG↔PL) | High | Medium | New data file; no schema |
| Explore / Culture architecture (`/explore` + subsections) | High | Medium | Content model decision |
| Mythology & folklore library | Medium-High | Medium | Explore shell |
| Literature & books, music, film/TV, theatre, art, sports, history/food | Medium each | Medium each | Explore shell; editorial time |
| Story library expansion (4 → 20+) | High | High (writing) | None technical |
| Word mastery + spaced repetition | High | High | New tables + event log |
| SEO content programme (comparison pages, "Polish for Bulgarians" cluster) | High | Medium | Correct sitemap first |
| Sharing / growth loops (shareable progress cards, story links) | Medium | Medium | Per-page og:image |
| Analytics before monetization | Medium | Low-Medium | Event schema |
| Community / UGC | Low now | High | Moderation, schema |
| Student-Pro / Abroad / B2B monetization | Later | High | Analytics + retention proof |

## 6. Recommended Phase 3 — "Slavic Connections + Explore shell"

IN SCOPE
- `/connections` as a first-class route: Polish↔Bulgarian cognates, false friends, case-system comparison, aspect comparison, alphabet/sound mapping. Driven by one new static data file.
- `/explore` shell with two populated pillars only: Mythology & Folklore, and Culture & Traditions — each an index plus item pages, reusing existing card/section components.
- Wire the existing homepage Connections band and `/learn/polish` to the real routes.
- Fix sitemap story ids and add the new routes; give each new leaf its own head + og:image.
- Move culture snippets already in `daily.ts` (idioms, history facts, literature quotes) into the Explore surfaces so they are browsable and indexable.

OUT OF SCOPE
- No new database tables, no schema, auth or persistence changes.
- No spaced repetition, mastery model, or personalization beyond what exists.
- No music/film/theatre/art/sports pillars yet.
- No new games, no design overhaul, no monetization, no community, no second language course.

## 7. Phases 4–6 (high level)

- Phase 4 — Depth & retention: word mastery + review queue (new tables), story library expansion, per-topic progress, richer achievements tied to real mastery.
- Phase 5 — Discovery & growth: SEO content cluster, shareable progress/story cards, About & methodology page, analytics events, remaining Explore pillars (music, film, theatre, art, sports).
- Phase 6 — Commercial & expansion: retention evidence → Student-Pro / Abroad / B2B exploration, then a second language (Czech first: closest to Polish, reuses case machinery).

## 8. Ten pre-Phase-3 polish tasks (no architecture change)

1. Fix sitemap story ids and generate them from `src/data/stories.ts`.
2. Move `og:image` off `__root.tsx` onto leaves that have a real image.
3. Switch day-key computation to local date so streaks match the greeting system.
4. Tighten `stepStatus`: require a minimum score, not mere presence, for "done".
5. Add `head()` to `games.tsx` / `learn.tsx` layouts or confirm leaves fully cover them.
6. Surface write failures from the progress store instead of swallowing them.
7. De-duplicate `hero_name` usage in code to a single source.
8. Add "next step" links to the leaf grammar/case/game pages that still dead-end.
9. Mobile pass on declension tables and the crossword grid (horizontal overflow).
10. Extract long route files' data/config into `src/data` or local modules (index.tsx, quest.tsx).

## 9. Scores

| Area | Score | Reason |
| --- | --- | --- |
| Product | 6.5 | Broad and functional, but no single clear core loop |
| UX | 6 | Coherent visuals, too many overlapping hubs, leaf dead ends |
| Visual brand | 7.5 | Distinctive dark-academic identity, consistently applied |
| Learning system | 5.5 | XP/streak/quests only; no mastery, no review, weak "done" signals |
| Content depth | 6 | Grammar and vocabulary strong; stories and culture thin |
| Technical architecture | 6.5 | Clean routing and sync; static data ceiling, fat route files |
| Mobile | 6.5 | Nav solved; wide tables and grids unverified |
| SEO / discoverability | 5.5 | Good per-route metadata undermined by a wrong sitemap and shared og:image |
| Differentiation | 5 | The differentiator (Connections) is a teaser, not a feature |
| Business readiness | 3 | No About, analytics, sharing, or retention evidence |

## 10. Do not build yet

Spaced repetition engine, a second language course, user accounts for teachers/B2B, community/UGC or comments, leaderboards, AI tutor chat, native mobile app, paid tiers, email courses, and any pillar (music/film/theatre/art/sports) before the Explore shell proves it can be filled. Each either needs schema and analytics that do not exist, or editorial capacity that Phase 3 will already consume.
