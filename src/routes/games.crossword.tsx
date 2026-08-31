import { createFileRoute, Link } from "@tanstack/react-router";
import { ClientOnly } from "@/components/ClientOnly";
import { useEffect, useMemo, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Ornament } from "@/components/SlavicMindLogo";
import { SpeakButton } from "@/components/SpeakButton";
import { crosswordCandidates, shuffle, type GameWord } from "@/data/game-content";
import { speak } from "@/lib/speak";
import { addXp, recordGamePlay } from "@/lib/progress";
import {
  ArrowLeft,
  Eraser,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Timer as TimerIcon,
  Trophy,
} from "lucide-react";

export const Route = createFileRoute("/games/crossword")({
  head: () => ({
    meta: [
      { title: "Crossword — SlavicMind" },
      {
        name: "description",
        content: "Dynamic Polish ↔ Bulgarian crosswords with timed hints and XP rewards.",
      },
    ],
  }),
  component: () => (
    <ClientOnly>
      <Crossword />
    </ClientOnly>
  ),
});

type Direction = "across" | "down";
type PlacedWord = {
  word: GameWord;
  row: number;
  col: number;
  dir: Direction;
};

type Entry = PlacedWord & {
  id: string;
  num: number;
  answer: string;
  clueBg: string;
  clueEn: string;
};

type Cell = {
  letter: string;
  nums: number[];
  entryIds: string[];
} | null;

type Puzzle = {
  id: string;
  entries: Entry[];
  grid: Cell[][];
  rows: number;
  cols: number;
};

const CANVAS = 17;
const TARGET_WORDS = 6;
const HINT_COST = 10;

const FOLD: Record<string, string> = {
  ą: "a",
  ć: "c",
  ę: "e",
  ł: "l",
  ń: "n",
  ó: "o",
  ś: "s",
  ź: "z",
  ż: "z",
};

const fold = (value: string) =>
  value
    .toLocaleLowerCase("pl-PL")
    .split("")
    .map((char) => FOLD[char] ?? char)
    .join("");

const keyOf = (row: number, col: number) => `${row},${col}`;

function cellAt(
  placed: readonly PlacedWord[],
  row: number,
  col: number,
): string | undefined {
  for (const entry of placed) {
    for (let i = 0; i < entry.word.pl.length; i += 1) {
      const r = entry.dir === "across" ? entry.row : entry.row + i;
      const c = entry.dir === "across" ? entry.col + i : entry.col;
      if (r === row && c === col) return entry.word.pl[i].toLocaleLowerCase("pl-PL");
    }
  }
  return undefined;
}

function canPlace(
  placed: readonly PlacedWord[],
  word: GameWord,
  row: number,
  col: number,
  dir: Direction,
): boolean {
  const answer = word.pl.toLocaleLowerCase("pl-PL");
  const endRow = dir === "across" ? row : row + answer.length - 1;
  const endCol = dir === "across" ? col + answer.length - 1 : col;
  if (row < 0 || col < 0 || endRow >= CANVAS || endCol >= CANVAS) return false;

  const beforeRow = dir === "across" ? row : row - 1;
  const beforeCol = dir === "across" ? col - 1 : col;
  const afterRow = dir === "across" ? row : endRow + 1;
  const afterCol = dir === "across" ? endCol + 1 : col;
  if (cellAt(placed, beforeRow, beforeCol) || cellAt(placed, afterRow, afterCol)) return false;

  let crossings = 0;
  for (let i = 0; i < answer.length; i += 1) {
    const r = dir === "across" ? row : row + i;
    const c = dir === "across" ? col + i : col;
    const existing = cellAt(placed, r, c);
    if (existing && fold(existing) !== fold(answer[i])) return false;

    if (existing) {
      crossings += 1;
      continue;
    }

    const sideA =
      dir === "across" ? cellAt(placed, r - 1, c) : cellAt(placed, r, c - 1);
    const sideB =
      dir === "across" ? cellAt(placed, r + 1, c) : cellAt(placed, r, c + 1);
    if (sideA || sideB) return false;
  }

  return placed.length === 0 || crossings > 0;
}

function possiblePlacements(placed: readonly PlacedWord[], word: GameWord): PlacedWord[] {
  const options: PlacedWord[] = [];
  const answer = word.pl.toLocaleLowerCase("pl-PL");

  for (const existing of placed) {
    const existingAnswer = existing.word.pl.toLocaleLowerCase("pl-PL");
    const dir: Direction = existing.dir === "across" ? "down" : "across";

    for (let existingIndex = 0; existingIndex < existingAnswer.length; existingIndex += 1) {
      for (let candidateIndex = 0; candidateIndex < answer.length; candidateIndex += 1) {
        if (fold(existingAnswer[existingIndex]) !== fold(answer[candidateIndex])) continue;

        const crossingRow =
          existing.dir === "across" ? existing.row : existing.row + existingIndex;
        const crossingCol =
          existing.dir === "across" ? existing.col + existingIndex : existing.col;
        const row = dir === "across" ? crossingRow : crossingRow - candidateIndex;
        const col = dir === "across" ? crossingCol - candidateIndex : crossingCol;

        if (canPlace(placed, word, row, col, dir)) {
          options.push({ word, row, col, dir });
        }
      }
    }
  }

  return shuffle(options);
}

function buildAttempt(candidates: readonly GameWord[]): PlacedWord[] {
  const pool = shuffle(candidates);
  const first = pool[0];
  if (!first) return [];

  const placed: PlacedWord[] = [
    {
      word: first,
      row: Math.floor(CANVAS / 2),
      col: Math.max(0, Math.floor((CANVAS - first.pl.length) / 2)),
      dir: "across",
    },
  ];

  let madeProgress = true;
  while (placed.length < TARGET_WORDS && madeProgress) {
    madeProgress = false;
    for (const word of shuffle(pool)) {
      if (placed.some((entry) => entry.word.canonical === word.canonical)) continue;
      const option = possiblePlacements(placed, word)[0];
      if (!option) continue;
      placed.push(option);
      madeProgress = true;
      if (placed.length >= TARGET_WORDS) break;
    }
  }

  return placed;
}

function createPuzzle(): Puzzle {
  const candidates = crosswordCandidates().slice(0, 80);
  let best: PlacedWord[] = [];

  for (let attempt = 0; attempt < 50; attempt += 1) {
    const placed = buildAttempt(candidates);
    if (placed.length > best.length) best = placed;
    if (placed.length >= TARGET_WORDS) break;
  }

  if (!best.length) {
    throw new Error("Unable to build crossword from vocabulary data.");
  }

  const minRow = Math.min(...best.map((entry) => entry.row));
  const minCol = Math.min(...best.map((entry) => entry.col));
  const maxRow = Math.max(
    ...best.map((entry) =>
      entry.dir === "across" ? entry.row : entry.row + entry.word.pl.length - 1,
    ),
  );
  const maxCol = Math.max(
    ...best.map((entry) =>
      entry.dir === "across" ? entry.col + entry.word.pl.length - 1 : entry.col,
    ),
  );

  const rows = maxRow - minRow + 1;
  const cols = maxCol - minCol + 1;
  const starts = [...new Set(best.map((entry) => keyOf(entry.row - minRow, entry.col - minCol)))];
  starts.sort((a, b) => {
    const [ar, ac] = a.split(",").map(Number);
    const [br, bc] = b.split(",").map(Number);
    return ar - br || ac - bc;
  });
  const numberByStart = new Map(starts.map((key, index) => [key, index + 1]));

  const entries: Entry[] = best.map((entry, index) => {
    const row = entry.row - minRow;
    const col = entry.col - minCol;
    return {
      ...entry,
      row,
      col,
      id: `${index}-${entry.word.canonical}-${entry.dir}`,
      num: numberByStart.get(keyOf(row, col)) ?? index + 1,
      answer: entry.word.pl.toLocaleLowerCase("pl-PL"),
      clueBg: entry.word.bg,
      clueEn: entry.word.en,
    };
  });

  const grid: Cell[][] = Array.from({ length: rows }, () => Array<Cell>(cols).fill(null));
  for (const entry of entries) {
    for (let i = 0; i < entry.answer.length; i += 1) {
      const row = entry.dir === "across" ? entry.row : entry.row + i;
      const col = entry.dir === "across" ? entry.col + i : entry.col;
      if (!grid[row][col]) grid[row][col] = { letter: entry.answer[i], nums: [], entryIds: [] };
      grid[row][col]!.entryIds.push(entry.id);
      if (i === 0 && !grid[row][col]!.nums.includes(entry.num)) {
        grid[row][col]!.nums.push(entry.num);
      }
    }
  }

  return {
    id: entries.map((entry) => entry.word.canonical).join("|") + Math.random().toString(36).slice(2, 7),
    entries,
    grid,
    rows,
    cols,
  };
}

function fmt(seconds: number) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainder = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function Crossword() {
  const [puzzle, setPuzzle] = useState<Puzzle>(() => createPuzzle());
  const [values, setValues] = useState<Record<string, string>>({});
  const [active, setActive] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const inputs = useRef<Record<string, HTMLInputElement | null>>({});
  const awarded = useRef(false);

  const totalCells = useMemo(() => puzzle.grid.flat().filter(Boolean).length, [puzzle.grid]);
  const correctCells = puzzle.grid.reduce(
    (total, row, rowIndex) =>
      total +
      row.reduce((count, cell, colIndex) => {
        if (!cell) return count;
        const value = values[`${rowIndex}-${colIndex}`] ?? "";
        return count + (fold(value) === fold(cell.letter) ? 1 : 0);
      }, 0),
    0,
  );
  const won = correctCells === totalCells && totalCells > 0;

  useEffect(() => {
    if (won) return;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [puzzle.id, won]);

  const xp = won
    ? Math.max(30, 200 - Math.floor(seconds / 5) - hintsUsed * HINT_COST)
    : 0;

  useEffect(() => {
    if (!won || awarded.current) return;
    awarded.current = true;
    addXp(xp, "Crossword");
    recordGamePlay("crossword", xp);
    const timer = window.setTimeout(
      () => speak(puzzle.entries.map((entry) => entry.answer).join(", "), "pl-PL", 0.85),
      400,
    );
    return () => window.clearTimeout(timer);
  }, [puzzle.entries, won, xp]);

  const clearState = () => {
    setValues({});
    setActive(null);
    setSeconds(0);
    setHintsUsed(0);
    setRevealed(new Set());
    awarded.current = false;
  };

  const reset = () => clearState();

  const newPuzzle = () => {
    setPuzzle(createPuzzle());
    clearState();
  };

  const giveHint = () => {
    const order: string[] = [];
    const addEntry = (entryId: string | null) => {
      if (!entryId) return;
      const entry = puzzle.entries.find((candidate) => candidate.id === entryId);
      if (!entry) return;
      for (let i = 0; i < entry.answer.length; i += 1) {
        const row = entry.dir === "across" ? entry.row : entry.row + i;
        const col = entry.dir === "across" ? entry.col + i : entry.col;
        order.push(`${row}-${col}`);
      }
    };

    addEntry(active);
    puzzle.grid.forEach((row, rowIndex) =>
      row.forEach((cell, colIndex) => cell && order.push(`${rowIndex}-${colIndex}`)),
    );

    for (const key of [...new Set(order)]) {
      const [row, col] = key.split("-").map(Number);
      const cell = puzzle.grid[row]?.[col];
      if (!cell) continue;
      const value = values[key] ?? "";
      if (fold(value) === fold(cell.letter)) continue;
      setValues((current) => ({ ...current, [key]: cell.letter }));
      setRevealed((current) => new Set(current).add(key));
      setHintsUsed((value) => value + 1);
      return;
    }
  };

  const onChange = (row: number, col: number, raw: string) => {
    const char = raw.slice(-1).toLocaleLowerCase("pl-PL");
    setValues((current) => ({ ...current, [`${row}-${col}`]: char }));
    if (!char || !active) return;

    const entry = puzzle.entries.find((candidate) => candidate.id === active);
    if (!entry) return;
    const nextRow = entry.dir === "across" ? row : row + 1;
    const nextCol = entry.dir === "across" ? col + 1 : col;
    inputs.current[`${nextRow}-${nextCol}`]?.focus();
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/games"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ivory"
            >
              <ArrowLeft className="h-4 w-4" /> Mind games
            </Link>
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">Mind game · 02</div>
          </div>

          <div className="mt-6 text-center">
            <h1 className="font-serif text-4xl md:text-6xl">Crossword</h1>
            <Ornament className="mx-auto mt-4 w-64 text-crimson" />
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
              A fresh grid from real SlavicMind vocabulary. Bulgarian clues, Polish answers.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Time" value={fmt(seconds)} icon={<TimerIcon className="h-4 w-4" />} />
            <Stat label="Filled" value={`${correctCells}/${totalCells}`} />
            <Stat label="Words" value={`${puzzle.entries.length}`} />
            <Stat
              label="XP"
              value={
                won
                  ? `+${xp}`
                  : `≈ ${Math.max(30, 200 - Math.floor(seconds / 5) - hintsUsed * HINT_COST)}`
              }
              accent
            />
          </div>

          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[auto_1fr]">
            <div className="mx-auto w-full overflow-x-auto lg:w-auto">
              <div
                className="inline-grid gap-1 rounded-2xl border border-border/70 bg-card-gradient p-3 sm:p-4"
                style={{
                  gridTemplateColumns: `repeat(${puzzle.cols}, minmax(0, clamp(1.55rem, 6.6vw, 2.4rem)))`,
                }}
              >
                {puzzle.grid.map((row, rowIndex) =>
                  row.map((cell, colIndex) => {
                    const key = `${rowIndex}-${colIndex}`;
                    if (!cell) return <div key={key} className="aspect-square" />;
                    const value = values[key] ?? "";
                    const correct = Boolean(value) && fold(value) === fold(cell.letter);
                    const wrong = Boolean(value) && !correct;
                    const isRevealed = revealed.has(key);

                    return (
                      <div key={key} className="relative aspect-square">
                        {cell.nums[0] !== undefined && (
                          <span className="pointer-events-none absolute left-1 top-0.5 z-10 text-[9px] font-mono text-muted-foreground">
                            {cell.nums[0]}
                          </span>
                        )}
                        <input
                          ref={(element) => {
                            inputs.current[key] = element;
                          }}
                          maxLength={1}
                          value={value}
                          inputMode="text"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck={false}
                          onFocus={() => setActive(cell.entryIds[0])}
                          onChange={(event) => onChange(rowIndex, colIndex, event.target.value)}
                          className={`h-full w-full rounded border text-center font-serif text-sm uppercase outline-none transition sm:text-base ${
                            isRevealed
                              ? "border-gold/60 bg-gold/10 text-gold"
                              : correct
                                ? "border-crimson bg-crimson/10 text-ivory"
                                : wrong
                                  ? "border-rose/70 bg-surface text-rose"
                                  : "border-border/70 bg-surface/60 text-ivory focus:border-crimson"
                          }`}
                          aria-label={`Crossword row ${rowIndex + 1}, column ${colIndex + 1}`}
                        />
                      </div>
                    );
                  }),
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={giveHint}
                  disabled={won}
                  className="inline-flex items-center gap-2 rounded-lg border border-gold/50 bg-surface/60 px-4 py-2 text-sm text-gold transition hover:bg-surface-2 disabled:opacity-40"
                >
                  <Lightbulb className="h-4 w-4" /> Hint
                  <span className="font-mono text-xs opacity-70">−{HINT_COST} XP</span>
                </button>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-lg border border-border/70 px-4 py-2 text-sm transition hover:bg-surface-2"
                >
                  <RotateCcw className="h-4 w-4" /> Reset
                </button>
                <button
                  onClick={() => setValues({})}
                  className="inline-flex items-center gap-2 rounded-lg border border-border/70 px-4 py-2 text-sm transition hover:bg-surface-2"
                >
                  <Eraser className="h-4 w-4" /> Clear letters
                </button>
                <button
                  onClick={newPuzzle}
                  className="inline-flex items-center gap-2 rounded-lg border border-crimson/50 px-4 py-2 text-sm text-crimson transition hover:bg-crimson/5"
                >
                  <Sparkles className="h-4 w-4" /> New crossword
                </button>
              </div>

              <ClueList
                title="Across · Poziomo"
                dir="across"
                entries={puzzle.entries}
                active={active}
                onPick={setActive}
              />
              <ClueList
                title="Down · Pionowo"
                dir="down"
                entries={puzzle.entries}
                active={active}
                onPick={setActive}
              />

              {won && (
                <div className="rounded-2xl border border-crimson/40 bg-card-gradient p-6 shadow-glow animate-fade-up">
                  <div className="flex items-center gap-2 text-crimson">
                    <Sparkles className="h-4 w-4" /> Wszystko poprawnie!
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Solved in <span className="font-mono text-ivory">{fmt(seconds)}</span> with{" "}
                    <span className="font-mono text-ivory">{hintsUsed}</span> hints. {" "}
                    <span className="font-mono text-gold">+{xp} XP</span>
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {puzzle.entries.map((entry) => (
                      <div
                        key={entry.id}
                        className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/60 px-3 py-1.5"
                      >
                        <span className="font-serif text-sm">{entry.answer}</span>
                        <SpeakButton text={entry.answer} lang="pl-PL" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
                    <Trophy className="h-4 w-4 text-gold" /> Fresh vocabulary, same progress system.
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

function Stat({
  label,
  value,
  icon,
  accent = false,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border/70 bg-surface/40 p-3 text-center">
      <div className="flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className={`mt-1 font-mono text-base sm:text-lg ${accent ? "text-gold" : "text-ivory"}`}>
        {value}
      </div>
    </div>
  );
}

function ClueList({
  title,
  dir,
  entries,
  active,
  onPick,
}: {
  title: string;
  dir: Direction;
  entries: Entry[];
  active: string | null;
  onPick: (id: string) => void;
}) {
  const clues = entries.filter((entry) => entry.dir === dir).sort((a, b) => a.num - b.num);
  if (!clues.length) return null;

  return (
    <div>
      <h2 className="text-xs uppercase tracking-[0.22em] text-rose">{title}</h2>
      <div className="mt-3 space-y-2">
        {clues.map((entry) => (
          <button
            key={entry.id}
            onClick={() => onPick(entry.id)}
            className={`flex w-full min-w-0 items-start gap-3 rounded-lg border px-3 py-2.5 text-left transition ${
              active === entry.id
                ? "border-crimson/60 bg-crimson/5"
                : "border-border/60 bg-surface/30 hover:border-crimson/40"
            }`}
          >
            <span className="mt-0.5 w-5 shrink-0 font-mono text-xs text-crimson">{entry.num}</span>
            <span className="min-w-0">
              <span className="block break-words text-sm text-ivory">{entry.clueBg}</span>
              <span className="block break-words text-xs text-muted-foreground">{entry.clueEn}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
