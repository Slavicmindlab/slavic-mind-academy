// Case Quest progress: per-kingdom completion + boss defeats.
// Local when signed out, Supabase + realtime when signed in.
import { useEffect, useSyncExternalStore } from "react";
import type { CaseSlug } from "@/data/grammar";
import { supabase } from "@/integrations/supabase/client";
import type { RealtimeChannel } from "@supabase/supabase-js";

const KEY = "slavicmind:quest:v1";

export type KingdomState = {
  cleared: boolean;
  bestScore: number;
  attempts: number;
  bossDefeated: boolean;
};

export type QuestState = {
  kingdoms: Record<CaseSlug, KingdomState>;
  totalXp: number;
  hero: string;
};

const empty: KingdomState = { cleared: false, bestScore: 0, attempts: 0, bossDefeated: false };
const SLUGS: CaseSlug[] = ["mianownik","dopelniacz","celownik","biernik","narzednik","miejscownik","wolacz"];

const initial: QuestState = {
  kingdoms: Object.fromEntries(SLUGS.map((s) => [s, { ...empty }])) as Record<CaseSlug, KingdomState>,
  totalXp: 0,
  hero: "Wędrowiec",
};

function readLocal(): QuestState {
  if (typeof window === "undefined") return initial;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return initial;
    const p = JSON.parse(raw) as Partial<QuestState>;
    return { ...initial, ...p, kingdoms: { ...initial.kingdoms, ...(p.kingdoms ?? {}) } };
  } catch { return initial; }
}

let state: QuestState = readLocal();
let userId: string | null = null;
let channel: RealtimeChannel | null = null;
const listeners = new Set<() => void>();
function emit() { listeners.forEach((l) => l()); }

function persistLocal() {
  if (typeof window !== "undefined") {
    try { window.localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* */ }
  }
}

async function loadRemote(uid: string) {
  const [kRes, pRes] = await Promise.all([
    supabase.from("user_kingdoms").select("*").eq("user_id", uid),
    supabase.from("profiles").select("hero_name").eq("id", uid).maybeSingle(),
  ]);
  const kingdoms = { ...initial.kingdoms };
  for (const r of kRes.data ?? []) {
    kingdoms[r.case_slug as CaseSlug] = {
      cleared: r.cleared, bestScore: r.best_score,
      attempts: r.attempts, bossDefeated: r.boss_defeated,
    };
  }
  const totalXp = Object.values(kingdoms).reduce((acc, k) => acc + k.bestScore, 0);
  state = { kingdoms, totalXp, hero: pRes.data?.hero_name ?? "Wędrowiec" };
  emit();
}

function subscribeRemote(uid: string) {
  if (channel) supabase.removeChannel(channel);
  const filter = `user_id=eq.${uid}`;
  channel = supabase
    .channel(`quest:${uid}`)
    .on("postgres_changes", { event: "*", schema: "public", table: "user_kingdoms", filter }, () => loadRemote(uid))
    .on("postgres_changes", { event: "*", schema: "public", table: "profiles", filter: `id=eq.${uid}` }, () => loadRemote(uid))
    .subscribe();
}

async function mergeLocalIntoRemote(uid: string, local: QuestState) {
  const rows = SLUGS
    .map((s) => ({ slug: s, k: local.kingdoms[s] }))
    .filter(({ k }) => k.cleared || k.bestScore > 0 || k.attempts > 0 || k.bossDefeated)
    .map(({ slug, k }) => ({
      user_id: uid, case_slug: slug,
      cleared: k.cleared, best_score: k.bestScore,
      attempts: k.attempts, boss_defeated: k.bossDefeated,
    }));
  if (rows.length) {
    await supabase.from("user_kingdoms").upsert(rows, { onConflict: "user_id,case_slug" });
  }
  if (local.hero && local.hero !== "Wędrowiec") {
    await supabase.from("profiles").upsert({ id: uid, hero_name: local.hero });
  }
}

export async function bindQuestUser(uid: string | null) {
  if (uid === userId) return;
  userId = uid;
  if (uid) {
    const local = readLocal();
    try { await mergeLocalIntoRemote(uid, local); } catch (e) { console.error("quest merge failed", e); }
    try { if (typeof window !== "undefined") window.localStorage.removeItem(KEY); } catch { /* */ }
    await loadRemote(uid);
    subscribeRemote(uid);
  } else {
    if (channel) { supabase.removeChannel(channel); channel = null; }
    state = readLocal();
    emit();
  }
}

export function completeKingdom(slug: CaseSlug, score: number, bossDefeated: boolean, xpEarned: number) {
  const prev = state.kingdoms[slug];
  const next: KingdomState = {
    cleared: prev.cleared || score >= 60,
    bestScore: Math.max(prev.bestScore, score),
    attempts: prev.attempts + 1,
    bossDefeated: prev.bossDefeated || bossDefeated,
  };
  state = {
    ...state,
    totalXp: state.totalXp + xpEarned,
    kingdoms: { ...state.kingdoms, [slug]: next },
  };
  if (userId) {
    void supabase.from("user_kingdoms").upsert({
      user_id: userId, case_slug: slug,
      cleared: next.cleared, best_score: next.bestScore,
      attempts: next.attempts, boss_defeated: next.bossDefeated,
    }, { onConflict: "user_id,case_slug" });
  } else {
    persistLocal();
  }
  emit();
}

export function setHeroName(name: string) {
  const hero = name.slice(0, 24) || "Wędrowiec";
  state = { ...state, hero };
  if (userId) {
    void supabase.from("profiles").upsert({ id: userId, hero_name: hero });
  } else {
    persistLocal();
  }
  emit();
}

function subscribe(cb: () => void) { listeners.add(cb); return () => listeners.delete(cb); }
function getSnapshot() { return state; }
const ssr = initial;

export function useQuest() {
  useEffect(() => {
    if (!userId) {
      const fresh = readLocal();
      if (JSON.stringify(fresh) !== JSON.stringify(state)) { state = fresh; emit(); }
    }
  }, []);
  return useSyncExternalStore(subscribe, getSnapshot, () => ssr);
}
