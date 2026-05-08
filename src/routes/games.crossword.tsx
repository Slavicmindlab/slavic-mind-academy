import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Ornament } from "@/components/SlavicMindLogo";
import { SpeakButton } from "@/components/SpeakButton";
import { speak } from "@/lib/speak";
import { ArrowLeft, RotateCcw, Sparkles, Trophy, Lightbulb, Timer as TimerIcon, Eraser } from "lucide-react";

export const Route = createFileRoute("/games/crossword")({
  head: () => ({
    meta: [
      { title: "Crossword — SlavicMind" },
      { name: "description", content: "Polish ↔ Bulgarian crossword with timed hints and XP rewards." },
    ],
  }),
  component: Crossword,
});

type Entry = {
  num: number;
  dir: "across" | "down";
  row: number;
  col: number;
  answer: string;
  clueBg: string;
  clueEn: string;
};

// 11×10 grid of intersecting Polish words (lowercase, ASCII-only for inputs)
const ENTRIES: Entry[] = [
  { num: 1, dir: "across", row: 1, col: 1, answer: "kawa",    clueBg: "кафе",  clueEn: "coffee" },
  { num: 2, dir: "down",   row: 1, col: 3, answer: "woda",    clueBg: "вода",  clueEn: "water" },
  { num: 3, dir: "across", row: 4, col: 1, answer: "matka",   clueBg: "майка", clueEn: "mother" },
  { num: 4, dir: "down",   row: 0, col: 5, answer: "ksiazka", clueBg: "книга", clueEn: "book" },
  { num: 5, dir: "across", row: 7, col: 2, answer: "pociag",  clueBg: "влак",  clueEn: "train" },
];

const ROWS = 10;
const COLS = 11;
const HINT_COST = 10;

type Cell = { letter: string; nums: number[]; entryIds: string[] } | null;

function buildGrid(): Cell[][] {
  const grid: Cell[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  for (const e of ENTRIES) {
    for (let i = 0; i < e.answer.length; i++) {
      const r = e.dir === "across" ? e.row : e.row + i;
      const c = e.dir === "across" ? e.col + i : e.col;
      const eid = `${e.num}${e.dir[0]}`;
      if (!grid[r][c]) grid[r][c] = { letter: e.answer[i], nums: [], entryIds: [] };
      grid[r][c]!.entryIds.push(eid);
      if (i === 0) grid[r][c]!.nums.push(e.num);
    }
  }
  return grid;
}

function fmt(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const ss = (s % 60).toString().padStart(2, "0");
  return `${m}:${ss}`;
}

function Crossword() {
  const grid = useMemo(buildGrid, []);
  const [values, setValues] = useState<Record<string, string>>({});
  const [active, setActive] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const inputs = useRef<Record<string, HTMLInputElement | null>>({});

  const totalCells = grid.flat().filter(Boolean).length;
  const correctCells = grid.reduce(
    (acc, row, r) =>
      acc +
      row.reduce((a, cell, c) => {
        if (!cell) return a;
        const v = (values[`${r}-${c}`] || "").toLowerCase();
        return a + (v === cell.letter ? 1 : 0);
      }, 0),
    0,
  );
  const won = correctCells === totalCells && totalCells > 0;

  // Timer
  useEffect(() => {
    if (won) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [won]);

  // XP: base 200 − time penalty − hint penalty (min 30)
  const xp = won ? Math.max(30, 200 - Math.floor(seconds / 5) - hintsUsed * HINT_COST) : 0;

  // Speak winning words
  useEffect(() => {
    if (!won) return;
    const id = setTimeout(() => speak(ENTRIES.map((e) => e.answer).join(", "), "pl-PL", 0.85), 400);
    return () => clearTimeout(id);
  }, [won]);

  const reset = () => {
    setValues({});
    setActive(null);
    setSeconds(0);
    setHintsUsed(0);
    setRevealed(new Set());
  };

  const giveHint = () => {
    // Find first empty or wrong cell of the active entry, else any in the grid
    const order: string[] = [];
    const tryEntry = (eid: string | null) => {
      if (!eid) return;
      const e = ENTRIES.find((en) => `${en.num}${en.dir[0]}` === eid);
      if (!e) return;
      for (let i = 0; i < e.answer.length; i++) {
        const r = e.dir === "across" ? e.row : e.row + i;
        const c = e.dir === "across" ? e.col + i : e.col;
        order.push(`${r}-${c}`);
      }
    };
    tryEntry(active);
    grid.forEach((row, r) => row.forEach((cell, c) => cell && order.push(`${r}-${c}`)));
    for (const key of order) {
      const [r, c] = key.split("-").map(Number);
      const cell = grid[r][c];
      if (!cell) continue;
      const v = (values[key] || "").toLowerCase();
      if (v !== cell.letter) {
        setValues((prev) => ({ ...prev, [key]: cell.letter }));
        setRevealed((prev) => new Set(prev).add(key));
        setHintsUsed((h) => h + 1);
        return;
      }
    }
  };

  const onChange = (r: number, c: number, raw: string) => {
    const ch = raw.slice(-1).toLowerCase();
    setValues((prev) => ({ ...prev, [`${r}-${c}`]: ch }));
    if (ch && active) {
      const e = ENTRIES.find((en) => `${en.num}${en.dir[0]}` === active);
      if (e) {
        const nr = e.dir === "across" ? r : r + 1;
        const nc = e.dir === "across" ? c + 1 : c;
        const next = inputs.current[`${nr}-${nc}`];
        if (next) next.focus();
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
          <div className="flex items-center justify-between">
            <Link to="/games" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ivory">
              <ArrowLeft className="h-4 w-4" /> Mind games
            </Link>
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">Mind game · 02</div>
          </div>

          <div className="mt-6 text-center">
            <h1 className="font-serif text-4xl md:text-6xl">Crossword</h1>
            <Ornament className="mx-auto mt-4 w-64 text-crimson" />
            <p className="mt-4 text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
              Bulgarian clues. Polish answers. Beat the clock — every hint costs XP.
            </p>
          </div>

          {/* HUD */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat label="Time" value={fmt(seconds)} icon={<TimerIcon className="h-4 w-4" />} />
            <Stat label="Filled" value={`${correctCells}/${totalCells}`} />
            <Stat label="Hints" value={`${hintsUsed} · −${hintsUsed * HINT_COST} XP`} />
            <Stat label="XP" value={won ? `+${xp}` : `≈ ${Math.max(30, 200 - Math.floor(seconds / 5) - hintsUsed * HINT_COST)}`} accent />
          </div>

          <div className="mt-8 grid lg:grid-cols-[auto_1fr] gap-8 items-start">
            {/* Grid — responsive cell sizing */}
            <div className="mx-auto w-full lg:w-auto overflow-x-auto">
              <div
                className="inline-grid gap-1 p-3 sm:p-4 rounded-2xl border border-border/70 bg-card-gradient"
                style={{
                  gridTemplateColumns: `repeat(${COLS}, minmax(0, clamp(1.6rem, 7vw, 2.4rem)))`,
                }}
              >
                {grid.map((row, r) =>
                  row.map((cell, c) => {
                    const key = `${r}-${c}`;
                    if (!cell) return <div key={key} className="aspect-square" />;
                    const v = values[key] || "";
                    const correct = !!v && v.toLowerCase() === cell.letter;
                    const wrong = !!v && !correct;
                    const isRevealed = revealed.has(key);
                    return (
                      <div key={key} className="relative aspect-square">
                        {cell.nums[0] !== undefined && (
                          <span className="absolute top-0.5 left-1 text-[9px] font-mono text-muted-foreground pointer-events-none z-10">
                            {cell.nums[0]}
                          </span>
                        )}
                        <input
                          ref={(el) => { inputs.current[key] = el; }}
                          maxLength={1}
                          value={v}
                          inputMode="text"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck={false}
                          onFocus={() => setActive(cell.entryIds[0])}
                          onChange={(e) => onChange(r, c, e.target.value)}
                          className={`h-full w-full text-center font-serif text-sm sm:text-base uppercase rounded
                            border outline-none transition
                            ${isRevealed
                              ? "border-gold/60 bg-gold/10 text-gold"
                              : correct
                              ? "border-crimson bg-crimson/10 text-ivory"
                              : wrong
                              ? "border-rose/70 bg-surface text-rose"
                              : "border-border/70 bg-surface/60 text-ivory focus:border-crimson"}`}
                        />
                      </div>
                    );
                  }),
                )}
              </div>
            </div>

            {/* Clues + actions */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={giveHint}
                  disabled={won}
                  className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-gold/50 text-gold bg-surface/60 hover:bg-surface-2 transition disabled:opacity-40"
                >
                  <Lightbulb className="h-4 w-4" /> Hint <span className="font-mono text-xs opacity-70">−{HINT_COST} XP</span>
                </button>
                <button onClick={reset} className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-border/70 hover:bg-surface-2 transition">
                  <RotateCcw className="h-4 w-4" /> Reset
                </button>
                <button
                  onClick={() => setValues({})}
                  className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-border/70 hover:bg-surface-2 transition"
                >
                  <Eraser className="h-4 w-4" /> Clear letters
                </button>
              </div>

              <ClueList title="Across · Poziomo" dir="across" active={active} onPick={setActive} />
              <ClueList title="Down · Pionowo" dir="down" active={active} onPick={setActive} />

              {won && (
                <div className="animate-fade-up rounded-2xl border border-crimson/40 bg-card-gradient p-6 shadow-glow">
                  <div className="flex items-center gap-2 text-crimson">
                    <Sparkles className="h-4 w-4" /> Wszystko poprawnie!
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Solved in <span className="text-ivory font-mono">{fmt(seconds)}</span> with{" "}
                    <span className="text-ivory font-mono">{hintsUsed}</span> hints.{" "}
                    <span className="text-gold font-mono">+{xp} XP</span>
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {ENTRIES.map((e) => (
                      <div key={`${e.num}${e.dir[0]}`} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/70 bg-surface/60">
                        <span className="font-serif text-sm">{e.answer}</span>
                        <SpeakButton text={e.answer} lang="pl-PL" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
                    <Trophy className="h-3 w-3 text-gold" /> Streak preserved
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, icon, accent }: { label: string; value: string; icon?: React.ReactNode; accent?: boolean }) {
  return (
    <div className={`rounded-xl border p-3 sm:p-4 bg-card-gradient ${accent ? "border-crimson/50" : "border-border/70"}`}>
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className={`mt-1 font-mono text-base sm:text-lg ${accent ? "text-gold" : "text-ivory"}`}>{value}</div>
    </div>
  );
}

function ClueList({
  title,
  dir,
  active,
  onPick,
}: {
  title: string;
  dir: "across" | "down";
  active: string | null;
  onPick: (eid: string) => void;
}) {
  const list = ENTRIES.filter((e) => e.dir === dir);
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.3em] text-crimson">{title}</div>
      <ul className="mt-3 space-y-2">
        {list.map((e) => {
          const eid = `${e.num}${e.dir[0]}`;
          const isActive = active === eid;
          return (
            <li key={eid}>
              <button
                onClick={() => onPick(eid)}
                className={`w-full text-left rounded-lg border p-3 text-sm transition ${
                  isActive ? "border-crimson bg-surface-2" : "border-border/70 bg-card-gradient hover:bg-surface-2"
                }`}
              >
                <span className="font-mono text-muted-foreground mr-2">{e.num}.</span>
                <span className="font-serif text-base">{e.clueBg}</span>
                <span className="text-muted-foreground"> · {e.clueEn} · {e.answer.length} letters</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
