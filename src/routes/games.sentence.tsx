import { createFileRoute, Link } from "@tanstack/react-router";
import { ClientOnly } from "@/components/ClientOnly";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Ornament } from "@/components/SlavicMindLogo";
import { SENTENCES, type SentencePuzzle } from "@/data/vocabulary";
import { addXp, recordGamePlay } from "@/lib/progress";
import { ArrowLeft, RotateCcw, Sparkles, Check } from "lucide-react";

export const Route = createFileRoute("/games/sentence")({
  head: () => ({
    meta: [
      { title: "Sentence Builder — SlavicMind" },
      { name: "description", content: "Reassemble Polish sentences from scattered tokens." },
    ],
  }),
  component: () => (<ClientOnly><SentenceBuilder /></ClientOnly>),
});

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function SentenceBuilder() {
  const [idx, setIdx] = useState(0);
  const puzzle: SentencePuzzle = SENTENCES[idx];
  const [pool, setPool] = useState<string[]>(() => shuffle(puzzle.pl));
  const [picked, setPicked] = useState<string[]>([]);
  const [xp, setXp] = useState(0);
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setPool(shuffle(puzzle.pl));
    setPicked([]);
  }, [idx]);

  const correct = useMemo(
    () => picked.length === puzzle.pl.length && picked.every((t, i) => t === puzzle.pl[i]),
    [picked, puzzle],
  );

  useEffect(() => {
    if (correct && !solvedIds.has(puzzle.id)) {
      setXp((x) => x + 30);
      addXp(30, "Sentence Builder");
      recordGamePlay("sentence", 30);
      setSolvedIds((s) => new Set(s).add(puzzle.id));
    }
  }, [correct, puzzle.id, solvedIds]);

  const pickToken = (t: string, i: number) => {
    setPool((p) => p.filter((_, j) => j !== i));
    setPicked((p) => [...p, t]);
  };

  const removeToken = (i: number) => {
    setPicked((p) => {
      const t = p[i];
      setPool((pool) => [...pool, t]);
      return p.filter((_, j) => j !== i);
    });
  };

  const reset = () => { setPool(shuffle(puzzle.pl)); setPicked([]); };
  const next = () => setIdx((i) => (i + 1) % SENTENCES.length);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-6 py-10">
          <div className="flex items-center justify-between">
            <Link to="/games" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ivory">
              <ArrowLeft className="h-4 w-4" /> Mind games
            </Link>
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">Mind game · 04</div>
          </div>

          <div className="mt-6 text-center">
            <h1 className="font-serif text-4xl md:text-6xl">Sentence Builder</h1>
            <Ornament className="mx-auto mt-4 w-64 text-crimson" />
            <p className="mt-4 text-muted-foreground">Order the tokens into a grammatically correct Polish sentence.</p>
          </div>

          <div className="mt-8 flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
            <span>Puzzle {idx + 1} / {SENTENCES.length}</span>
            <span className="font-mono text-gold">+{xp} XP</span>
          </div>

          {/* Translation hint */}
          <div className="mt-6 rounded-2xl border border-border/70 bg-card-gradient p-6">
            <div className="text-[10px] uppercase tracking-widest text-crimson">Translate to Polish</div>
            <p className="mt-3 font-serif text-2xl">{puzzle.bg}</p>
            <p className="mt-1 text-sm text-muted-foreground italic">{puzzle.en}</p>
          </div>

          {/* Answer slot */}
          <div className={`mt-6 min-h-20 p-4 rounded-xl border-2 border-dashed transition ${
            correct ? "border-crimson bg-crimson/5" : "border-border/70 bg-surface/40"
          }`}>
            {picked.length === 0 && (
              <div className="text-sm text-muted-foreground italic">Tap tokens below to build the sentence…</div>
            )}
            <div className="flex flex-wrap gap-2">
              {picked.map((t, i) => (
                <button
                  key={`${t}-${i}`}
                  onClick={() => removeToken(i)}
                  className="px-4 py-2 rounded-lg bg-surface-2 border border-border/70 font-serif hover:border-rose/60 transition"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Token pool */}
          <div className="mt-4 flex flex-wrap gap-2">
            {pool.map((t, i) => (
              <button
                key={`${t}-${i}`}
                onClick={() => pickToken(t, i)}
                className="px-4 py-2 rounded-lg bg-card-gradient border border-border/70 font-serif hover:border-crimson/60 hover:-translate-y-0.5 transition-all"
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between gap-3">
            <button onClick={reset} className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-border/70 hover:bg-surface-2 transition">
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
            {correct ? (
              <button
                onClick={next}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-crimson-gradient text-ivory text-sm shadow-glow"
              >
                <Check className="h-4 w-4" /> Next sentence
              </button>
            ) : (
              <span className="text-xs text-muted-foreground">{picked.length} / {puzzle.pl.length}</span>
            )}
          </div>

          {correct && (
            <div className="animate-fade-up mt-6 rounded-xl border border-crimson/40 bg-card-gradient p-5 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-crimson" />
              <div className="text-sm">
                <span className="font-serif text-ivory">{puzzle.pl.join(" ")}</span>
                <span className="text-muted-foreground"> · {puzzle.en}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
