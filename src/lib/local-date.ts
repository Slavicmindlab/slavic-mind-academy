// Local calendar-day keys.
//
// Daily rollover (streaks, daily quests, XP-today) must follow the learner's
// own calendar day, exactly like the time-aware greeting system does. The old
// `new Date().toISOString().slice(0, 10)` produced a UTC key, so a learner in
// Sofia or Warsaw rolled over at 02:00/01:00 local instead of midnight.
//
// The format is unchanged (YYYY-MM-DD), so previously stored UTC keys stay
// readable and comparable — no reset, no migration.

function pad(n: number) {
  return n < 10 ? `0${n}` : String(n);
}

/** YYYY-MM-DD for the given date in the *browser's* local timezone. */
export function localDateKey(d: Date = new Date()): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** YYYY-MM-DD for `days` days before `from`, local time. */
export function localDateKeyOffset(days: number, from: Date = new Date()): string {
  const d = new Date(from);
  d.setDate(d.getDate() - days);
  return localDateKey(d);
}
