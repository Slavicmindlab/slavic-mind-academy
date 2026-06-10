// Hybrid progress store: localStorage when signed out, Supabase + realtime
// when signed in. Same API as before — components don't need changes.

import { useEffect, useSyncExternalStore } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { RealtimeChannel } from "@supabase/supabase-js";

const KEY = "slavicmind:progress:v1";

export type Achievement =
  | "first_word" | "first_game" | "streak_3" | "streak_7"
  | "level_5" | "vocab_explorer" | "polyglot";

export type DailyQuestId = "learn_words" | "play_game" | "grammar_drill";
export type DailyQuestState = Record<DailyQuestId, number>;

export type ProgressState = {
  xp: number;
  xpToday: number;
  todayKey: string;
  streak: number;
  lastActive: string;
  favorites: string[];
  achievements: Achievement[];
  bestScores: Record<string, number>;
  quests: DailyQuestState;
};

const today = () => new Date().toISOString().slice(0, 10);

const initial: ProgressState = {
  xp: 0, xpToday: 0, todayKey: today(), streak: 0, lastActive: "",
  favorites: [], achievements: [], bestScores: {},
  quests: { learn_words: 0, play_game: 0, grammar_drill: 0 },
};

function readLocal(): ProgressState {
  if (typeof window === "undefined") return initial;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return initial;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return { ...initial, ...parsed, quests: { ...initial.quests, ...(parsed.quests ?? {}) } };
  } catch { return initial; }
}

let state: ProgressState = readLocal();
let userId: string | null = null;
let channel: RealtimeChannel | null = null;
const listeners = new Set<() => void>();
const xpListeners = new Set<(amount: number, reason?: string) => void>();

function emit() { listeners.forEach((l) => l()); }

function persistLocal() {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* */ }
}

function rolloverIfNeeded() {
  const t = today();
  if (state.todayKey !== t) {
    state = { ...state, todayKey: t, xpToday: 0, quests: { learn_words: 0, play_game: 0, grammar_drill: 0 } };
  }
}

function bumpStreak() {
  const t = today();
  if (state.lastActive === t) return;
  const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
  const y = yesterday.toISOString().slice(0, 10);
  const next = state.lastActive === y ? state.streak + 1 : 1;
  state = { ...state, lastActive: t, streak: next };
}

export function levelFromXp(xp: number): { level: number; current: number; needed: number; into: number } {
  let level = 1, acc = 0, step = 100;
  while (acc + step <= xp) { acc += step; level += 1; step += 50; }
  return { level, current: xp - acc, needed: step, into: xp - acc };
}

// ── Remote sync ──────────────────────────────────────────────────────────

async function loadRemote(uid: string) {
  const [progressRes, favRes, achRes, scoreRes, questRes] = await Promise.all([
    supabase.from("user_progress").select("*").eq("user_id", uid).maybeSingle(),
    supabase.from("user_favorites").select("word_id").eq("user_id", uid),
    supabase.from("user_achievements").select("achievement").eq("user_id", uid),
    supabase.from("user_best_scores").select("game_id, score").eq("user_id", uid),
    supabase.from("user_quests").select("*").eq("user_id", uid).maybeSingle(),
  ]);

  const p = progressRes.data;
  const q = questRes.data;
  const t = today();
  state = {
    xp: p?.xp ?? 0,
    xpToday: p?.today_key === t ? (p?.xp_today ?? 0) : 0,
    todayKey: t,
    streak: p?.streak ?? 0,
    lastActive: p?.last_active ?? "",
    favorites: (favRes.data ?? []).map((r) => r.word_id),
    achievements: ((achRes.data ?? []).map((r) => r.achievement)) as Achievement[],
    bestScores: Object.fromEntries((scoreRes.data ?? []).map((r) => [r.game_id, r.score])),
    quests: {
      learn_words: q?.today_key === t ? (q?.learn_words ?? 0) : 0,
      play_game: q?.today_key === t ? (q?.play_game ?? 0) : 0,
      grammar_drill: q?.today_key === t ? (q?.grammar_drill ?? 0) : 0,
    },
  };
  emit();
}

function subscribeRemote(uid: string) {
  if (channel) supabase.removeChannel(channel);
  const filter = `user_id=eq.${uid}`;
  channel = supabase
    .channel(`progress:${uid}`)
    .on("postgres_changes", { event: "*", schema: "public", table: "user_progress", filter }, () => loadRemote(uid))
    .on("postgres_changes", { event: "*", schema: "public", table: "user_favorites", filter }, () => loadRemote(uid))
    .on("postgres_changes", { event: "*", schema: "public", table: "user_achievements", filter }, () => loadRemote(uid))
    .on("postgres_changes", { event: "*", schema: "public", table: "user_best_scores", filter }, () => loadRemote(uid))
    .on("postgres_changes", { event: "*", schema: "public", table: "user_quests", filter }, () => loadRemote(uid))
    .subscribe();
}

async function mergeLocalIntoRemote(uid: string, local: ProgressState) {
  // Read current remote progress
  const { data: cur } = await supabase.from("user_progress").select("*").eq("user_id", uid).maybeSingle();
  const t = today();
  const mergedXp = Math.max(cur?.xp ?? 0, local.xp);
  const mergedStreak = Math.max(cur?.streak ?? 0, local.streak);
  await supabase.from("user_progress").upsert({
    user_id: uid,
    xp: mergedXp,
    xp_today: cur?.today_key === t ? (cur?.xp_today ?? 0) : 0,
    today_key: t,
    streak: mergedStreak,
    last_active: cur?.last_active ?? local.lastActive,
  });
  if (local.favorites.length) {
    await supabase.from("user_favorites").upsert(
      local.favorites.map((word_id) => ({ user_id: uid, word_id })),
      { onConflict: "user_id,word_id" }
    );
  }
  if (local.achievements.length) {
    await supabase.from("user_achievements").upsert(
      local.achievements.map((achievement) => ({ user_id: uid, achievement })),
      { onConflict: "user_id,achievement" }
    );
  }
  const scoreRows = Object.entries(local.bestScores).map(([game_id, score]) => ({ user_id: uid, game_id, score }));
  if (scoreRows.length) {
    // upsert taking max
    const { data: existing } = await supabase.from("user_best_scores").select("game_id, score").eq("user_id", uid);
    const cur = new Map((existing ?? []).map((r) => [r.game_id, r.score]));
    const toWrite = scoreRows.filter((r) => r.score > (cur.get(r.game_id) ?? 0));
    if (toWrite.length) await supabase.from("user_best_scores").upsert(toWrite, { onConflict: "user_id,game_id" });
  }
}

export async function bindUser(uid: string | null) {
  if (uid === userId) return;
  userId = uid;
  if (uid) {
    const local = readLocal();
    const hasLocal = local.xp > 0 || local.favorites.length || local.achievements.length || Object.keys(local.bestScores).length;
    if (hasLocal && typeof window !== "undefined") {
      try { await mergeLocalIntoRemote(uid, local); } catch (e) { console.error("merge failed", e); }
      try { window.localStorage.removeItem(KEY); } catch { /* */ }
    }
    await loadRemote(uid);
    subscribeRemote(uid);
  } else {
    if (channel) { supabase.removeChannel(channel); channel = null; }
    state = readLocal();
    emit();
  }
}

// ── Mutations ────────────────────────────────────────────────────────────

function persist() {
  if (userId) {
    // Already updated state optimistically; realtime will reconcile.
  } else {
    persistLocal();
  }
  emit();
}

async function writeProgress() {
  if (!userId) return;
  await supabase.from("user_progress").upsert({
    user_id: userId,
    xp: state.xp,
    xp_today: state.xpToday,
    today_key: state.todayKey,
    streak: state.streak,
    last_active: state.lastActive,
  });
}

async function writeQuests() {
  if (!userId) return;
  await supabase.from("user_quests").upsert({
    user_id: userId,
    today_key: state.todayKey,
    learn_words: state.quests.learn_words,
    play_game: state.quests.play_game,
    grammar_drill: state.quests.grammar_drill,
  });
}

async function writeAchievements(newOnes: Achievement[]) {
  if (!userId || !newOnes.length) return;
  await supabase.from("user_achievements").upsert(
    newOnes.map((achievement) => ({ user_id: userId!, achievement })),
    { onConflict: "user_id,achievement" }
  );
}

export function onXpGain(cb: (amount: number, reason?: string) => void) {
  xpListeners.add(cb);
  return () => xpListeners.delete(cb);
}

export function addXp(amount: number, reason?: string) {
  if (amount <= 0) return;
  rolloverIfNeeded();
  bumpStreak();
  const prevAch = new Set(state.achievements);
  state = { ...state, xp: state.xp + amount, xpToday: state.xpToday + amount };
  const nextAch = new Set(state.achievements);
  if (state.streak >= 3) nextAch.add("streak_3");
  if (state.streak >= 7) nextAch.add("streak_7");
  if (levelFromXp(state.xp).level >= 5) nextAch.add("level_5");
  state = { ...state, achievements: [...nextAch] };
  const newAch = [...nextAch].filter((a) => !prevAch.has(a));
  persist();
  void writeProgress();
  void writeAchievements(newAch);
  xpListeners.forEach((l) => l(amount, reason));
}

export function recordGamePlay(gameId: string, score: number) {
  rolloverIfNeeded();
  const best = Math.max(state.bestScores[gameId] ?? 0, score);
  const prevAch = new Set(state.achievements);
  const ach = new Set(state.achievements); ach.add("first_game");
  state = {
    ...state,
    bestScores: { ...state.bestScores, [gameId]: best },
    achievements: [...ach],
    quests: { ...state.quests, play_game: state.quests.play_game + 1 },
  };
  const newAch = [...ach].filter((a) => !prevAch.has(a));
  persist();
  if (userId) {
    void supabase.from("user_best_scores").upsert({ user_id: userId, game_id: gameId, score: best }, { onConflict: "user_id,game_id" });
    void writeQuests();
    void writeAchievements(newAch);
  }
}

export function recordWordLearned() {
  rolloverIfNeeded();
  const prevAch = new Set(state.achievements);
  const ach = new Set(state.achievements); ach.add("first_word");
  state = {
    ...state,
    achievements: [...ach],
    quests: { ...state.quests, learn_words: state.quests.learn_words + 1 },
  };
  const newAch = [...ach].filter((a) => !prevAch.has(a));
  persist();
  if (userId) { void writeQuests(); void writeAchievements(newAch); }
}

export function recordGrammarDrill() {
  rolloverIfNeeded();
  state = { ...state, quests: { ...state.quests, grammar_drill: state.quests.grammar_drill + 1 } };
  persist();
  if (userId) void writeQuests();
}

export function toggleFavorite(id: string) {
  const set = new Set(state.favorites);
  const adding = !set.has(id);
  if (adding) { set.add(id); recordWordLearned(); } else { set.delete(id); }
  state = { ...state, favorites: [...set] };
  const prevAch = new Set(state.achievements);
  const ach = new Set(state.achievements);
  if (state.favorites.length >= 25) ach.add("vocab_explorer");
  if (state.favorites.length >= 100) ach.add("polyglot");
  state = { ...state, achievements: [...ach] };
  const newAch = [...ach].filter((a) => !prevAch.has(a));
  persist();
  if (userId) {
    if (adding) void supabase.from("user_favorites").upsert({ user_id: userId, word_id: id }, { onConflict: "user_id,word_id" });
    else void supabase.from("user_favorites").delete().eq("user_id", userId).eq("word_id", id);
    void writeAchievements(newAch);
  }
}

export function isFavorite(id: string) { return state.favorites.includes(id); }

export function resetProgress() {
  state = { ...initial, todayKey: today() };
  persist();
  if (userId) {
    void supabase.from("user_progress").upsert({
      user_id: userId, xp: 0, xp_today: 0, today_key: today(), streak: 0, last_active: "",
    });
    void supabase.from("user_favorites").delete().eq("user_id", userId);
    void supabase.from("user_achievements").delete().eq("user_id", userId);
    void supabase.from("user_best_scores").delete().eq("user_id", userId);
    void supabase.from("user_quests").upsert({
      user_id: userId, today_key: today(), learn_words: 0, play_game: 0, grammar_drill: 0,
    });
  }
}

function subscribe(cb: () => void) { listeners.add(cb); return () => listeners.delete(cb); }
function getSnapshot(): ProgressState { return state; }
const ssrSnapshot: ProgressState = initial;

export function useProgress() {
  useEffect(() => {
    if (!userId) {
      const fresh = readLocal();
      if (JSON.stringify(fresh) !== JSON.stringify(state)) { state = fresh; emit(); }
    }
  }, []);
  return useSyncExternalStore(subscribe, getSnapshot, () => ssrSnapshot);
}

export const QUEST_TARGETS: Record<DailyQuestId, { title: string; total: number; xp: number }> = {
  learn_words: { title: "Save 5 words", total: 5, xp: 50 },
  play_game: { title: "Play one mind game", total: 1, xp: 40 },
  grammar_drill: { title: "Open a grammar case", total: 1, xp: 30 },
};
