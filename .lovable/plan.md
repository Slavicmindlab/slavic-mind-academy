# Real-Time Progress Tracking

Right now XP, streak, favorites, quests, achievements, best scores, and Case Quest kingdom progress all live in `localStorage` (`src/lib/progress.ts`, `src/lib/quest.ts`). That means progress only exists on one device and never updates "live" — close the tab, lose the device, or open another browser and it's gone or stale.

This plan moves all progress into the database, wires up auth, and uses Lovable Cloud Realtime so every XP gain, streak bump, quest tick, and kingdom clear updates instantly on every open tab/device.

## What you'll see as a user

- Sign in once (email/password + Google). Your progress follows you anywhere.
- Earn XP in a game on your phone → the dashboard on your laptop updates within ~1 second, no refresh.
- Streak, level bar, daily quests, favorites, achievements, Case Quest map, and best scores all live‑update.
- Signed‑out visitors still get the full app with local progress; signing in merges it into their account on first login.

## Build steps

1. **Auth**
   - Add `/auth` page: email/password + Google (via Lovable broker).
   - Wrap protected nothing — app stays public — but show "Sign in to sync" CTA in the header when signed out.
   - Single `onAuthStateChange` listener in `__root.tsx` (filtered to SIGNED_IN/SIGNED_OUT/USER_UPDATED).

2. **Database** (one migration)
   - `profiles` (id → auth.users, hero_name, created_at, updated_at)
   - `user_progress` (user_id PK, xp, xp_today, today_key, streak, last_active, updated_at)
   - `user_favorites` (user_id, word_id, created_at) — composite PK
   - `user_achievements` (user_id, achievement, earned_at) — composite PK
   - `user_quests` (user_id, today_key, learn_words, play_game, grammar_drill)
   - `user_best_scores` (user_id, game_id, score) — composite PK
   - `user_kingdoms` (user_id, case_slug, cleared, best_score, attempts, boss_defeated)
   - RLS: every row scoped to `auth.uid()`. GRANTs to `authenticated` + `service_role`. Trigger to auto‑create `profiles` + `user_progress` on signup. Realtime publication on all six progress tables.

3. **Sync layer** (`src/lib/progress.ts`, `src/lib/quest.ts`)
   - Keep existing API (`addXp`, `toggleFavorite`, `completeKingdom`, etc.) so no component changes.
   - When signed in: writes go to DB via server functions; reads come from a TanStack Query cache hydrated from DB.
   - Subscribe to Realtime channels for the user's rows → invalidate queries on change → UI updates instantly everywhere.
   - When signed out: behave exactly as today (localStorage).
   - On first sign‑in: merge local progress into DB (max XP, union favorites/achievements, max best scores), then clear local.

4. **UI touches**
   - Header: avatar + sign‑in/out, "syncing" dot when a write is in flight.
   - Dashboard, Quest map, Vocabulary favorites, Games results: all already read from the hooks — they'll just become live.

## Technical notes

- Server fns in `src/lib/progress.functions.ts` using `requireSupabaseAuth`; `attachSupabaseAuth` already wired in `src/start.ts`.
- Realtime via `supabase.channel('progress:'+userId).on('postgres_changes', {schema:'public', filter:'user_id=eq.'+userId}, …)`.
- Streak rollover stays client‑computed but persisted server‑side (server validates `today_key`).
- No Edge Functions; all logic in `createServerFn`.

## Out of scope (say if you want them too)

- Leaderboards / friends / multiplayer presence.
- Server‑authoritative anti‑cheat on XP (current model trusts the client like today).
- Polish learning path Module 1–7 and crossword/sentence-builder rebuild (next milestones from the earlier roadmap).

Ready to build?
