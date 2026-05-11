// Lightweight client-side progress store: XP, level, streak, favorites,
// achievements, daily quests. Persisted to localStorage. SSR-safe.

import { useEffect, useSyncExternalStore } from "react";

const KEY = "slavicmind:progress:v1";

export type Achievement =
  | "first_word"
  | "first_game"
  | "streak_3"
  | "streak_7"
  | "level_5"
  | "vocab_explorer"
  | "polyglot";

export type DailyQuestId = "learn_words" | "play_game" | "grammar_drill";
export type DailyQuestState = Record<DailyQuestId, number>;

export type ProgressState = {
  xp: number;
  xpToday: number;
  todayKey: string; // YYYY-MM-DD for resetting xpToday + quests
  streak: number;
  lastActive: string; // YYYY-MM-DD
  favorites: string[];
  achievements: Achievement[];
  bestScores: Record<string, number>;
  quests: DailyQuestState;
};

const today = () => new Date().toISOString().slice(0, 10);

const initial: ProgressState = {
  xp: 0,
  xpToday: 0,
  todayKey: today(),
  streak: 0,
  lastActive: "",
  favorites: [],
  achievements: [],
  bestScores: {},
  quests: { learn_words: 0, play_game: 0, grammar_drill: 0 },
};

function read(): ProgressState {
  if (typeof window === "undefined") return initial;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return initial;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return { ...initial, ...parsed, quests: { ...initial.quests, ...(parsed.quests ?? {}) } };
  } catch {
    return initial;
  }
}

let state: ProgressState = read();
const listeners = new Set<() => void>();

function persist() {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* */ }
  listeners.forEach((l) => l());
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

// Level curve: each level needs +100 XP more than the previous
// L1: 0, L2: 100, L3: 250, L4: 450, L5: 700 ...
export function levelFromXp(xp: number): { level: number; current: number; needed: number; into: number } {
  let level = 1;
  let acc = 0;
  let step = 100;
  while (acc + step <= xp) { acc += step; level += 1; step += 50; }
  return { level, current: xp - acc, needed: step, into: xp - acc };
}

// ── Public API ───────────────────────────────────────────────────────────

const xpListeners = new Set<(amount: number, reason?: string) => void>();
export function onXpGain(cb: (amount: number, reason?: string) => void) {
  xpListeners.add(cb);
  return () => xpListeners.delete(cb);
}

export function addXp(amount: number, reason?: string) {
  if (amount <= 0) return;
  rolloverIfNeeded();
  bumpStreak();
  state = { ...state, xp: state.xp + amount, xpToday: state.xpToday + amount };
  // Achievements
  const nextAch = new Set(state.achievements);
  if (state.streak >= 3) nextAch.add("streak_3");
  if (state.streak >= 7) nextAch.add("streak_7");
  if (levelFromXp(state.xp).level >= 5) nextAch.add("level_5");
  state = { ...state, achievements: [...nextAch] };
  persist();
  xpListeners.forEach((l) => l(amount, reason));
}

export function recordGamePlay(gameId: string, score: number) {
  rolloverIfNeeded();
  const best = Math.max(state.bestScores[gameId] ?? 0, score);
  const ach = new Set(state.achievements);
  ach.add("first_game");
  state = {
    ...state,
    bestScores: { ...state.bestScores, [gameId]: best },
    achievements: [...ach],
    quests: { ...state.quests, play_game: state.quests.play_game + 1 },
  };
  persist();
}

export function recordWordLearned() {
  rolloverIfNeeded();
  const ach = new Set(state.achievements);
  ach.add("first_word");
  state = {
    ...state,
    achievements: [...ach],
    quests: { ...state.quests, learn_words: state.quests.learn_words + 1 },
  };
  persist();
}

export function recordGrammarDrill() {
  rolloverIfNeeded();
  state = {
    ...state,
    quests: { ...state.quests, grammar_drill: state.quests.grammar_drill + 1 },
  };
  persist();
}

export function toggleFavorite(id: string) {
  const set = new Set(state.favorites);
  if (set.has(id)) set.delete(id); else { set.add(id); recordWordLearned(); }
  state = { ...state, favorites: [...set] };
  const ach = new Set(state.achievements);
  if (state.favorites.length >= 25) ach.add("vocab_explorer");
  if (state.favorites.length >= 100) ach.add("polyglot");
  state = { ...state, achievements: [...ach] };
  persist();
}

export function isFavorite(id: string) {
  return state.favorites.includes(id);
}

export function resetProgress() {
  state = { ...initial, todayKey: today() };
  persist();
}

// ── React hook ───────────────────────────────────────────────────────────

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot(): ProgressState {
  return state;
}

const ssrSnapshot: ProgressState = initial;

export function useProgress() {
  // Re-read from storage on first mount in case multiple tabs / pages updated it
  useEffect(() => {
    const fresh = read();
    if (JSON.stringify(fresh) !== JSON.stringify(state)) {
      state = fresh;
      listeners.forEach((l) => l());
    }
  }, []);
  return useSyncExternalStore(subscribe, getSnapshot, () => ssrSnapshot);
}

export const QUEST_TARGETS: Record<DailyQuestId, { title: string; total: number; xp: number }> = {
  learn_words: { title: "Save 5 words", total: 5, xp: 50 },
  play_game: { title: "Play one mind game", total: 1, xp: 40 },
  grammar_drill: { title: "Open a grammar case", total: 1, xp: 30 },
};
