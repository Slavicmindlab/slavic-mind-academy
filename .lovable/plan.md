# Phase 2 — Finish the Polish learning experience

Continuation only. Phase 1, the time-of-day fix, the security override, the database, and all existing routes stay exactly as they are.

## Verified current state

- `src/lib/learning-path.ts` exists with `PATH_STEPS`, `stepStatus`, `recommendNext`, `pathCompletion`. It is currently imported nowhere in the app.
- It contains a dead block: `if (p.quests.play_game > 0 && p.quests.play_game < 1) { /* defensive comment only */ }` — empty body, no side effect.
- `/dashboard` still shows the fabricated Accuracy tile: `Math.min(99, 60 + p.streak * 3)`.
- `/learn/polish` has hero + stats + four link groups; no Continue Learning, no path, no quick practice.
- `/grammar` is a flat card wall: seven case cards, then eight mixed cards (grammar pages, games, stories) in one grid.
- Progress data genuinely available: `xp`, `xpToday`, `streak`, `favorites[]`, `achievements[]`, `bestScores{}`, `quests{}`.

## What gets built

### 1. Clean-up
Remove the empty `if (p.quests.play_game …)` block in `learning-path.ts`. Nothing else in that file changes.

### 2. Shared components (all new — no equivalents exist)
- `ProgressBar` — labelled bar, only ever fed a real numerator/denominator.
- `ContinueLearning` — calls `recommendNext(p)`, nothing more. New users get the existing "Start your Polish journey" branch.
- `LearningPath` + `LearningPathItem` — renders `PATH_STEPS` with `stepStatus`; statuses shown as Start / Open / Continue / Completed. Untracked steps always show Open. Nothing is locked.
- `QuickPractice` — 4 existing short activities: Case Quest, conjugation drill, fill-the-blank (aspect/case), timed vocabulary quiz.
- `GrammarTopicCard` — title, blurb, link to the grammar page, plus an optional link to a real existing practice route.

All wrapped in `ClientOnly` where they read progress, matching the existing hydration pattern. Styling reuses the current card/gradient/serif system.

### 3. `/learn/polish`
Insert, between hero and the existing groups: Continue Learning, then Learning Path with a real `pathCompletion` bar (`done / total` tracked steps). Add Quick Practice near the end. Head metadata, Course JSON-LD, canonical and existing groups untouched.

### 4. Grammar Lab (`/grammar`)
Same URL, same content, regrouped into three labelled sections using `GrammarTopicCard`:
- **Cases & Declension** — the seven existing case routes + fill-the-blank practice + Case Quest.
- **Verbs** — conjugation, aspect, core verbs, verb↔case map, each with its existing drill (conjugation game, fill-blank, sentence game).
- **Reference** — verb↔case map and stories as reading reference.

No route moves, no renames, no new content.

### 5. `/dashboard`
Keep the design. Replace the Accuracy tile with **Recorded Scores** = `Object.keys(p.bestScores).length` (games that have a stored best score), with the tracked-games total as denominator only where it is real; otherwise a plain count. Add Continue Learning under the greeting and Quick Practice above Quests. Everything else stays.

### 6. Cross-links
Only where a real relationship exists: case page → Case Quest, conjugation → conjugation game, aspect → fill-blank, daily word → vocabulary, learning path steps → their routes. No generic recommendation cards.

### 7. Verification
Typecheck, lint, production build, then a browser pass over `/`, `/learn`, `/learn/polish`, `/grammar`, `/dashboard`, `/vocabulary`, `/stories`, `/daily` at desktop and 393px — checking overflow, stacking, tap targets, focus visibility, heading order, console/hydration errors, and that the greeting and progress still work.

## Out of scope
No migrations, no schema/auth/sync changes, no Phase 3 content, no new games, no design overhaul, no dependency changes.
