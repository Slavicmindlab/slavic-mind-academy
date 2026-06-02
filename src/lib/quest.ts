// Case Quest progress: per-kingdom completion + boss defeats, persisted locally.
import { useEffect, useSyncExternalStore } from "react";
import type { CaseSlug } from "@/data/grammar";

const KEY = "slavicmind:quest:v1";

export type KingdomState = {
  cleared: boolean;
  bestScore: number;   // out of 100
  attempts: number;
  bossDefeated: boolean;
};

export type QuestState = {
  kingdoms: Record<CaseSlug, KingdomState>;
  totalXp: number;
  hero: string;
};

const empty: KingdomState = { cleared: false, bestScore: 0, attempts: 0, bossDefeated: false };

const initial: QuestState = {
  kingdoms: {
    mianownik: { ...empty }, dopelniacz: { ...empty }, celownik: { ...empty },
    biernik: { ...empty }, narzednik: { ...empty }, miejscownik: { ...empty },
    wolacz: { ...empty },
  },
  totalXp: 0,
  hero: "Wędrowiec",
};

function read(): QuestState {
  if (typeof window === "undefined") return initial;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return initial;
    const p = JSON.parse(raw) as Partial<QuestState>;
    return { ...initial, ...p, kingdoms: { ...initial.kingdoms, ...(p.kingdoms ?? {}) } };
  } catch { return initial; }
}

let state: QuestState = read();
const listeners = new Set<() => void>();

function persist() {
  if (typeof window !== "undefined") {
    try { window.localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* */ }
  }
  listeners.forEach((l) => l());
}

export function completeKingdom(slug: CaseSlug, score: number, bossDefeated: boolean, xpEarned: number) {
  const prev = state.kingdoms[slug];
  state = {
    ...state,
    totalXp: state.totalXp + xpEarned,
    kingdoms: {
      ...state.kingdoms,
      [slug]: {
        cleared: prev.cleared || score >= 60,
        bestScore: Math.max(prev.bestScore, score),
        attempts: prev.attempts + 1,
        bossDefeated: prev.bossDefeated || bossDefeated,
      },
    },
  };
  persist();
}

export function setHeroName(name: string) {
  state = { ...state, hero: name.slice(0, 24) || "Wędrowiec" };
  persist();
}

function subscribe(cb: () => void) { listeners.add(cb); return () => listeners.delete(cb); }
function getSnapshot() { return state; }
const ssr = initial;

export function useQuest() {
  useEffect(() => {
    const fresh = read();
    if (JSON.stringify(fresh) !== JSON.stringify(state)) {
      state = fresh;
      listeners.forEach((l) => l());
    }
  }, []);
  return useSyncExternalStore(subscribe, getSnapshot, () => ssr);
}
