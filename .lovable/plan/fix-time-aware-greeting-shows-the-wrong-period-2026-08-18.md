&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

# Fix: time-aware greeting shows the wrong period

Targeted bug fix only. Phase 1 stays intact, Phase 2 stays in progress exactly where it is — no new phase, no rewrites of `learning-path.ts`, dashboard, grammar, nav, homepage sections or SEO beyond the lines named below.

## What's actually wrong

Two separate causes, both confirmed in the code:

1. `src/routes/dashboard.tsx` line 37 hard-codes the heading `Dobry wieczór, student.` — it is never computed from the clock, so the dashboard says "evening" at 09:30. This is the main reported bug.
2. `src/data/daily.ts` `getDayPhase` uses evening 18:00–21:59 and night from 22:00, which does not match the requested boundaries (night starts 23:00). Minor, but it makes the two screens disagree with the spec.

The homepage hero itself already computes the phase from the browser's local `new Date()` inside a `ClientOnly` boundary, so its logic is sound — it just duplicates hour math in two places (`DynamicHero` and `RecommendedLink`).

## The fix

**Shared utility — `src/lib/time-of-day.ts` (new)**

- Re-export the existing `DayPhase`, `GREETINGS`, `PHASE_LABEL`, `PHASE_TAGLINE`, `RECOMMENDED_PATH` from `src/data/daily.ts` so there is one import surface; no content is rewritten.
- `getDayPhase(hour)` moves here with corrected boundaries: 05–11 morning, 12–17 afternoon, 18–22 evening, 23–04 night. `src/data/daily.ts` keeps exporting it (re-export) so nothing else breaks.
- `useDayPhase()` hook: returns `null` until hydration, then the phase from the browser's local `new Date()`, refreshing every 60s. Timezone comes from the user's own browser — no server time, no UTC, no fixed locale.

**Homepage — `src/routes/index.tsx**`

- `DynamicHero` and `RecommendedLink` both consume the shared hook instead of their own `new Date().getHours()` calls. Existing `ClientOnly` fallbacks stay as they are, so there is no wrong-greeting flash.

**Dashboard — `src/routes/dashboard.tsx**`

- Replace the hard-coded `Dobry wieczór, student.` with a small client-gated greeting that uses the shared hook. Server render shows a neutral `Witaj, student.` placeholder, swapped after hydration — never an evening default.

**This bug fix must be treated as an in-place patch on top of the current branch/state, not as a replacement implementation or a new development phase.**

## Verification

- Unit-check `getDayPhase` at 04:59, 05:00, 11:59, 12:00, 17:59, 18:00, 22:59, 23:00.
- Load `/` and `/dashboard` in the browser at the current local time and confirm both show the same period, that a refresh does not fall back to evening, and that the console shows no hydration errors.
- Confirm mobile nav and header behaviour are untouched.

## Out of scope

No Phase 3, no Explore/Mythology work, no changes to progress storage, no completion of the remaining Phase 2 components — those stay queued for after this fix.