import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Ornament } from "@/components/SlavicMindLogo";
import { ArrowLeft, RotateCcw, Sparkles, Trophy } from "lucide-react";

export const Route = createFileRoute("/games/crossword")({
  head: () => ({
    meta: [
      { title: "Crossword — SlavicMind" },
      { name: "description", content: "A small Polish-Bulgarian crossword puzzle." },
    ],
  }),
  component: Crossword,
});

// Manually placed crossword. Coordinates are (row, col), 0-indexed.
// Grid is 11x11. Letters are Polish (lowercase, no diacritics removed).
type Entry = {
  num: number;
  dir: "across" | "down";
  row: number;
  col: number;
  answer: string;
  clueBg: string;
  clueEn: string;
};

const ENTRIES: Entry[] = [
  { num: 1, dir: "across", row: 1, col: 1, answer: "kawa",      clueBg: "кафе",       clueEn: "coffee" },
  { num: 2, dir: "down",   row: 1, col: 3, answer: "woda",      clueBg: "вода",       clueEn: "water" },
  { num: 3, dir: "across", row: 4, col: 1, answer: "matka",     clueBg: "майка",      clueEn: "mother" },
  { num: 4, dir: "down",   row: 0, col: 5, answer: "ksiazka",   clueBg: "книга",      clueEn: "book" },
  { num: 5, dir: "across", row: 7, col: 2, answer: "pociag",    clueBg: "влак",       clueEn: "train" },
];

const ROWS = 10;
const COLS = 11;

type Cell = { letter: string; nums: number[]; entryIds: string[] } | null;

function buildGrid(): { grid: Cell[][]; cellKeys: Map<string, { entries: string[]; answer: string }> } {
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
  return { grid, cellKeys: new Map() };
}

function Crossword() {
  const { grid } = useMemo(buildGrid, []);
  const [values, setValues] = useState<Record<string, string>>({});
  const [active, setActive] = useState<string | null>(null);

  const reset = () => { setValues({}); setActive(null); };

  const isCorrect = (r: number, c: number) => {
    const cell = grid[r][c];
    if (!cell) return false;
    const v = (values[`${r}-${c}`] || "").toLowerCase();
    return v === cell.letter;
  };

  const totalCells = grid.flat().filter(Boolean).length;
  const correctCells = grid.reduce((acc, row, r) =>
    acc + row.reduce((a, _c, c) => a + (isCorrect(r, c) ? 1 : 0), 0), 0);
  const won = correctCells === totalCells;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6 py-10">
          <div className="flex items-center justify-between">
            <Link to="/games" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ivory">
              <ArrowLeft className="h-4 w-4" /> Mind games
            </Link>
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">Mind game · 02</div>
          </div>

          <div className="mt-6 text-center">
            <h1 className="font-serif text-4xl md:text-6xl">Crossword</h1>
            <Ornament className="mx-auto mt-4 w-64 text-crimson" />
            <p className="mt-4 text-muted-foreground max-w-md mx-auto">
              Bulgarian clues. Polish answers. A small philological puzzle.
            </p>
          </div>

          <div className="mt-10 grid lg:grid-cols-[auto_1fr] gap-10 items-start">
            {/* Grid */}
            <div className="mx-auto">
              <div
                className="grid gap-1 p-4 rounded-2xl border border-border/70 bg-card-gradient"
                style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 2.4rem))` }}
              >
                {grid.map((row, r) =>
                  row.map((cell, c) => {
                    if (!cell) return <div key={`${r}-${c}`} className="aspect-square" />;
                    const key = `${r}-${c}`;
                    const v = values[key] || "";
                    const correct = v && v.toLowerCase() === cell.letter;
                    const wrong = v && !correct;
                    return (
                      <div key={key} className="relative aspect-square">
                        {cell.nums[0] !== undefined && (
                          <span className="absolute top-0.5 left-1 text-[9px] font-mono text-muted-foreground pointer-events-none">
                            {cell.nums[0]}
                          </span>
                        )}
                        <input
                          maxLength={1}
                          value={v}
                          onFocus={() => setActive(cell.entryIds[0])}
                          onChange={(e) => {
                            const ch = e.target.value.slice(-1);
                            setValues((prev) => ({ ...prev, [key]: ch }));
                          }}
                          className={`h-full w-full text-center font-serif text-base uppercase rounded
                            border outline-none transition
                            ${correct ? "border-crimson bg-crimson/10 text-ivory"
                              : wrong ? "border-rose/70 bg-surface text-rose"
                              : "border-border/70 bg-surface/60 text-ivory focus:border-crimson"}`}
                        />
                      </div>
                    );
                  }),
                )}
              </div>
            </div>

            {/* Clues */}
            <div className="space-y-6">
              <ClueList title="Across · Poziomo" dir="across" active={active} />
              <ClueList title="Down · Pionowo" dir="down" active={active} />

              <div className="rounded-xl border border-border/70 bg-card-gradient p-5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Progress</div>
                  <div className="font-mono text-lg">{correctCells} / {totalCells}</div>
                </div>
                <button onClick={reset} className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-border/70 hover:bg-surface-2 transition">
                  <RotateCcw className="h-4 w-4" /> Reset
                </button>
              </div>

              {won && (
                <div className="animate-fade-up rounded-2xl border border-crimson/40 bg-card-gradient p-6 shadow-glow">
                  <div className="flex items-center gap-2 text-crimson"><Sparkles className="h-4 w-4" /> Wszystko poprawnie!</div>
                  <p className="mt-2 text-sm text-muted-foreground">A complete crossword. <span className="text-gold font-mono">+150 XP</span></p>
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

function ClueList({ title, dir, active }: { title: string; dir: "across" | "down"; active: string | null }) {
  const list = ENTRIES.filter((e) => e.dir === dir);
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.3em] text-crimson">{title}</div>
      <ul className="mt-3 space-y-2">
        {list.map((e) => {
          const eid = `${e.num}${e.dir[0]}`;
          const isActive = active === eid;
          return (
            <li
              key={eid}
              className={`rounded-lg border p-3 text-sm transition ${
                isActive ? "border-crimson bg-surface-2" : "border-border/70 bg-card-gradient"
              }`}
            >
              <span className="font-mono text-muted-foreground mr-2">{e.num}.</span>
              <span className="font-serif text-base">{e.clueBg}</span>
              <span className="text-muted-foreground"> · {e.clueEn} · {e.answer.length} letters</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
