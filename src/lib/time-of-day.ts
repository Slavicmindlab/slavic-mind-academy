// Single source of truth for all time-aware SlavicMind UI.
// The final user-facing period is always derived from the browser's local
// Date after hydration — never from server time, UTC, or a fixed locale.
//
// Boundaries: 05:00–11:59 morning · 12:00–17:59 afternoon ·
//             18:00–22:59 evening · 23:00–04:59 night

import { useEffect, useState } from "react";
import {
  GREETINGS,
  PHASE_LABEL,
  PHASE_TAGLINE,
  RECOMMENDED_PATH,
  getDayPhase,
  type DayPhase,
  type Greeting,
} from "@/data/daily";

export type { DayPhase, Greeting };
export { GREETINGS, PHASE_LABEL, PHASE_TAGLINE, RECOMMENDED_PATH, getDayPhase };

/**
 * Returns `null` on the server and during the first client render, then the
 * phase computed from the visitor's own local clock. Refreshes every minute.
 * Consumers should render a neutral placeholder while it is `null`.
 */
export function useDayPhase(): { phase: DayPhase | null; now: Date | null } {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);
  return { phase: now ? getDayPhase(now.getHours()) : null, now };
}
