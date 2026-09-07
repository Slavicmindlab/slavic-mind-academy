import { useSyncExternalStore } from "react";

const KEY = "slavicmind:stories:v1";

export type StoryState = {
  read: string[];
  saved: string[];
};

const initial: StoryState = { read: [], saved: [] };
let state: StoryState = initial;
const listeners = new Set<() => void>();

function readStorage(): StoryState {
  if (typeof window === "undefined") return initial;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return initial;
    const parsed = JSON.parse(raw) as Partial<StoryState>;
    return {
      read: Array.isArray(parsed.read) ? parsed.read : [],
      saved: Array.isArray(parsed.saved) ? parsed.saved : [],
    };
  } catch {
    return initial;
  }
}

function ensureLoaded() {
  if (typeof window === "undefined") return;
  const fresh = readStorage();
  if (JSON.stringify(fresh) !== JSON.stringify(state)) state = fresh;
}

function persist() {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      // Reading should still work if storage is unavailable.
    }
  }
  listeners.forEach((listener) => listener());
}

export function markStoryRead(id: string, read = true) {
  ensureLoaded();
  const set = new Set(state.read);
  if (read) set.add(id);
  else set.delete(id);
  state = { ...state, read: [...set] };
  persist();
}

export function toggleStorySaved(id: string) {
  ensureLoaded();
  const set = new Set(state.saved);
  if (set.has(id)) set.delete(id);
  else set.add(id);
  state = { ...state, saved: [...set] };
  persist();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  ensureLoaded();
  return state;
}

export function useStoryState() {
  return useSyncExternalStore(subscribe, getSnapshot, () => initial);
}
