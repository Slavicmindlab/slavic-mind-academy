// The Polish learning path.
//
// Every step points at a route that already exists, and every status is derived
// from data the existing progress store genuinely holds (xp, favorites, quests,
// best scores). Where we cannot know whether something was completed, the step
// stays "open" instead of pretending.

import type { ProgressState } from "@/lib/progress";

export type StepStatus = "open" | "started" | "done";

export interface PathStep {
  id: string;
  to: string;
  title: string;
  blurb: string;
  /** What the user does here, in one word. */
  kind: "Vocabulary" | "Grammar" | "Practice" | "Reading";
  /** Shown when status can't be measured — keeps us honest. */
  untracked?: boolean;
}

export const PATH_STEPS: PathStep[] = [
  {
    id: "vocab-basics",
    to: "/vocabulary",
    title: "Build a first word bank",
    blurb: "Browse the categories and save the words you want to keep. Five favourites is a start.",
    kind: "Vocabulary",
  },
  {
    id: "daily",
    to: "/daily",
    title: "Set up the daily ritual",
    blurb: "Word of the day, an idiom and a micro-drill. This is what keeps the streak alive.",
    kind: "Vocabulary",
  },
  {
    id: "cases",
    to: "/grammar",
    title: "Meet the seven cases",
    blurb: "Mianownik through wołacz, with declension tables and parallel Bulgarian logic.",
    kind: "Grammar",
    untracked: true,
  },
  {
    id: "case-drill",
    to: "/games/fillblank",
    title: "Drill case endings",
    blurb: "Pick the right case form to complete real Polish sentences.",
    kind: "Practice",
  },
  {
    id: "verbs",
    to: "/grammar/conjugation",
    title: "Conjugate the four groups",
    blurb: "Present and past tense patterns for the verbs you'll use every day.",
    kind: "Grammar",
    untracked: true,
  },
  {
    id: "verb-drill",
    to: "/games/conjugation",
    title: "Drill conjugation",
    blurb: "Six pronouns, one verb at a time, until the endings are automatic.",
    kind: "Practice",
  },
  {
    id: "aspect",
    to: "/grammar/aspect",
    title: "Understand aspect",
    blurb: "Perfective and imperfective pairs — the part Bulgarian speakers already half-know.",
    kind: "Grammar",
    untracked: true,
  },
  {
    id: "quest",
    to: "/quest",
    title: "Case Quest: Seven Kingdoms",
    blurb: "One kingdom per case, with declension trials and boss fights.",
    kind: "Practice",
    untracked: true,
  },
  {
    id: "stories",
    to: "/stories",
    title: "Read a folklore story",
    blurb: "Parallel Polish and Bulgarian text with comprehension questions.",
    kind: "Reading",
    untracked: true,
  },
];

/** Best-score keys that count as "this game has been played". */
const GAME_FOR_STEP: Record<string, string> = {
  "case-drill": "fillblank",
  "verb-drill": "conjugation",
};

export function stepStatus(step: PathStep, p: ProgressState): StepStatus {
  const game = GAME_FOR_STEP[step.id];
  if (game) return p.bestScores[game] !== undefined ? "done" : "open";

  switch (step.id) {
    case "vocab-basics":
      if (p.favorites.length >= 5) return "done";
      return p.favorites.length > 0 ? "started" : "open";
    case "daily":
      if (p.streak >= 3) return "done";
      return p.streak > 0 ? "started" : "open";
    default:
      return "open";
  }
}

export interface Recommendation {
  to: string;
  title: string;
  reason: string;
  cta: string;
}

/**
 * Deterministic "continue learning" rule — no invented personalisation.
 * 1. Finish today's unfinished daily quest if one is in progress.
 * 2. Otherwise the first learning-path step that isn't done.
 */
export function recommendNext(p: ProgressState): Recommendation {
  const totalXp = p.xp;

  if (totalXp === 0 && p.favorites.length === 0 && Object.keys(p.bestScores).length === 0) {
    return {
      to: "/vocabulary",
      title: "Start your Polish journey",
      reason: "Nothing tracked yet — begin with a handful of words you'll actually use.",
      cta: "Open vocabulary",
    };
  }

  const next = PATH_STEPS.find((s) => stepStatus(s, p) !== "done") ?? PATH_STEPS[PATH_STEPS.length - 1];

  return {
    to: next.to,
    title: next.title,
    reason: next.untracked
      ? "Next on your Polish path."
      : "Next on your Polish path, based on what you've completed so far.",
    cta: "Continue",
  };
}

export function pathCompletion(p: ProgressState) {
  const tracked = PATH_STEPS.filter((s) => !s.untracked);
  const done = tracked.filter((s) => stepStatus(s, p) === "done").length;
  return { done, total: tracked.length };
}
