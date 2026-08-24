import { createFileRoute, Link } from "@tanstack/react-router";
import { ClientOnly } from "@/components/ClientOnly";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Ornament } from "@/components/SlavicMindLogo";
import {
  gameFeedback,
  pickSentence,
  sentenceTokens,
  shuffle,
  type Difficulty,
  type GameSentence,
} from "@/data/game-content";
import { addXp, recordGamePlay } from "@/lib/progress";
import { ArrowLeft, RotateCcw, Sparkles, Check } from "lucide-react";

export const Route = createFileRoute("/games/sentence")({
  head: () => ({
    meta: [
      { title: "Sentence Builder — SlavicMind" },
      { name: "description", content: "Reassemble Polish sentences from scattered tokens." },
    ],
  }),
  component: () => (
    <ClientOnly>
      <SentenceBuilder />
    </ClientOnly>
  ),
});

type Level = Difficulty | "mixed";
const LEVELS: Level[] = ["mixed", "A1", "A2", "B1", "B2"];

function SentenceBuilder() {
  const [level, setLevel] = useState<Level>("mixed");
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [puzzle, setPuzzle] = useState<GameSentence>(() => pickSentence("mixed"));
  const tokens = useMemo(() => sentenceTokens(puzzle.pl), [puzzle.pl]);
  const [pool, setPool] = useState<string[]>(() => shuffle(tokens));
  const [picked, setPicked] = useState<string[]>([]);
  const [xp, setXp] = useState(0);
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    setPool(shuffle(tokens));
    setPicked([]);
    setFeedback("");
  }, [puzzle.id, tokens]);

  const correct = useMemo(
    () => picked.length === tokens.length && picked.every((token, i) => token === tokens[i]),
    [picked, tokens],
  );

  useEffect(() => {
    if (correct && !solvedIds.has(puzzle.id)) {
      setXp((value) => value + 30);
      addXp(30, "Sentence Builder");
      recordGamePlay("sentence", 30);
      setSolvedIds((solved) => new Set(solved).add(puzzle.id));
      setFeedback(gameFeedback(true));
    }
  }, [correct, puzzle.id, solvedIds]);

  const pickToken = (token: string, index: number) => {
    setPool((current) => current.filter((_, i) => i !== index));
    setPicked((current) => [...current, token]);
  };

  const removeToken = (index: number) => {
    setPicked((current) => {
      const token = current[index];
      setPool((available) => [...available, token]);
      return current.filter((_, i) => i !== index);
    });
  };

  const reset = () => {
    setPool(shuffle(tokens));
    setPicked([]);
    setFeedback("");
  };

  const next = () => {
    const nextRecent = [...recentIds, puzzle.id].slice(-12);
    setRecentIds(nextRecent);
    setPuzzle(pickSentence(level, nextRecent));
  };

  const changeLevel = (nextLevel: Level) => {
    setLevel(nextLevel);
    setRecentIds([]);
    setPuzzle(pickSentence(nextLevel));
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/games"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ivory"
            >
              <ArrowLeft className="h-4 w-4" /> Mind games
            </Link>
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">Mind game · 04</div>
          </div>

          <div className="mt-6 text-center">
            <h1 className="font-serif text-4xl md:text-6xl">Sentence Builder</h1>
            <Ornament className="mx-auto mt-4 w-64 text-crimson" />
            <p className="mt-4 text-muted-foreground">
              Build the target Polish sentence from scattered tokens.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2" aria-label="Difficulty">
            {LEVELS.map((item) => (
              <button
                key={item}
                onClick={() => changeLevel(item)}
                className={`rounded-full border px-3 py-1.5 text-xs font-mono transition ${
                  level === item
                    ? "border-crimson bg-crimson/10 text-ivory"
                    : "border-border/70 text-muted-foreground hover:border-crimson/50"
                }`}
              >
                {item === "mixed" ? "Mixed" : item}
              </button>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between gap-4 text-xs uppercase tracking-widest text-muted-foreground">
            <span>
              {puzzle.difficulty} · {puzzle.topic}
            </span>
            <span className="font-mono text-gold">+{xp} XP</span>
          </div>

          <div className="mt-6 rounded-2xl border border-border/70 bg-card-gradient p-6">
            <div className="text-[10px] uppercase tracking-widest text-crimson">Translate to Polish</div>
            <p className="mt-3 font-serif text-xl sm:text-2xl">{puzzle.bg}</p>
            <p className="mt-1 text-sm italic text-muted-foreground">{puzzle.en}</p>
          </div>

          <div
            className={`mt-6 min-h-20 rounded-xl border-2 border-dashed p-4 transition ${
              correct ? "border-crimson bg-crimson/5" : "border-border/70 bg-surface/40"
            }`}
          >
            {picked.length === 0 && (
              <div className="text-sm italic text-muted-foreground">
                Tap tokens below to build the sentence…
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {picked.map((token, index) => (
                <button
                  key={`${token}-${index}`}
                  onClick={() => removeToken(index)}
                  className="max-w-full break-words rounded-lg border border-border/70 bg-surface-2 px-3 py-2 text-left font-serif transition hover:border-rose/60 sm:px-4"
                >
                  {token}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {pool.map((token, index) => (
              <button
                key={`${token}-${index}`}
                onClick={() => pickToken(token, index)}
                className="max-w-full break-words rounded-lg border border-border/70 bg-card-gradient px-3 py-2 text-left font-serif transition-all hover:-translate-y-0.5 hover:border-crimson/60 sm:px-4"
              >
                {token}
              </button>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-lg border border-border/70 px-4 py-2 text-sm transition hover:bg-surface-2"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
            {correct ? (
              <button
                onClick={next}
                className="inline-flex items-center gap-2 rounded-lg bg-crimson-gradient px-5 py-2.5 text-sm text-ivory shadow-glow"
              >
                <Check className="h-4 w-4" /> Next sentence
              </button>
            ) : (
              <span className="text-xs text-muted-foreground">
                {picked.length} / {tokens.length}
              </span>
            )}
          </div>

          {correct && (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-crimson/40 bg-card-gradient p-5 animate-fade-up">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-crimson" />
              <div className="min-w-0 text-sm">
                <div className="font-serif text-ivory">{puzzle.pl}</div>
                <div className="mt-1 text-muted-foreground">{feedback}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
