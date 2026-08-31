import { createFileRoute, Link } from "@tanstack/react-router";
import { ClientOnly } from "@/components/ClientOnly";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Ornament } from "@/components/SlavicMindLogo";
import {
  sampleGameWords,
  shuffle,
  type GameWord,
} from "@/data/game-content";
import { speak } from "@/lib/speak";
import { addXp, recordGamePlay } from "@/lib/progress";
import { ArrowLeft, RotateCcw, Volume2, Trophy } from "lucide-react";

export const Route = createFileRoute("/games/listening")({
  head: () => ({
    meta: [
      { title: "Listening — SlavicMind" },
      { name: "description", content: "Hear a Polish word and pick its meaning." },
    ],
  }),
  component: () => (
    <ClientOnly>
      <Listening />
    </ClientOnly>
  ),
});

const ROUND = 8;

type Q = { word: GameWord; options: string[] };

function build(exclude: string[] = []): Q[] {
  const pool = sampleGameWords({ count: ROUND, exclude, uniqueTranslations: true });
  return pool.map((word) => {
    const distractors = sampleGameWords({
      count: 3,
      exclude: [word.canonical],
      uniqueTranslations: true,
    })
      .filter((candidate) => candidate.bg !== word.bg)
      .slice(0, 3)
      .map((candidate) => candidate.bg);

    return {
      word,
      options: shuffle([...new Set([...distractors, word.bg])]),
    };
  });
}

function Listening() {
  const [recent, setRecent] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Q[]>(() => build());
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const done = idx >= questions.length;
  const q = questions[idx];

  useEffect(() => {
    if (!q) return;
    const timer = window.setTimeout(() => speak(q.word.pl, "pl-PL"), 200);
    return () => window.clearTimeout(timer);
  }, [idx, q]);

  useEffect(() => {
    if (done) {
      const xp = 30 + score * 12;
      addXp(xp, "Listening");
      recordGamePlay("listening", score);
    }
  }, [done, score]);

  const choose = (option: string) => {
    if (picked || !q) return;
    setPicked(option);
    if (option === q.word.bg) setScore((value) => value + 1);
    window.setTimeout(() => {
      setPicked(null);
      setIdx((value) => value + 1);
    }, 900);
  };

  const restart = () => {
    const previous = questions.map((question) => question.word.canonical);
    const nextRecent = [...recent, ...previous].slice(-32);
    setRecent(nextRecent);
    setQuestions(build(nextRecent));
    setIdx(0);
    setScore(0);
    setPicked(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <Link
            to="/games"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ivory"
          >
            <ArrowLeft className="h-4 w-4" /> All games
          </Link>

          <div className="mt-6 text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">Listening</div>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl">Słuchaj uważnie</h1>
            <Ornament className="mx-auto mt-4 w-60 text-crimson" />
            <p className="mt-3 text-muted-foreground">
              Listen to the Polish word, then pick the Bulgarian meaning.
            </p>
          </div>

          {!done && q && (
            <div className="mt-10 rounded-2xl border border-border/70 bg-card-gradient p-6 sm:p-8">
              <div className="text-center">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Word {idx + 1} of {questions.length} · {q.word.difficulty}
                </div>
                <button
                  onClick={() => speak(q.word.pl, "pl-PL")}
                  className="mx-auto mt-6 grid h-24 w-24 place-items-center rounded-full border border-crimson/50 bg-surface/60 transition hover:shadow-glow"
                  aria-label="Replay Polish word"
                >
                  <Volume2 className="h-8 w-8 text-crimson" />
                </button>
                <div className="mt-3 text-xs text-muted-foreground">Tap to replay</div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {q.options.map((option) => {
                  const isCorrect = option === q.word.bg;
                  let classes = "border-border/70 hover:border-crimson/60";
                  if (picked) {
                    if (isCorrect) classes = "border-emerald-500/60 bg-emerald-500/5";
                    else if (picked === option)
                      classes = "border-destructive/60 bg-destructive/5";
                    else classes = "border-border/40 opacity-50";
                  }
                  return (
                    <button
                      key={option}
                      onClick={() => choose(option)}
                      className={`min-w-0 rounded-lg border px-4 py-4 text-left font-serif text-lg transition ${classes}`}
                    >
                      <span className="break-words">{option}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
                <span>Score · {score}</span>
                <span className="font-mono">/{questions.length}</span>
              </div>
            </div>
          )}

          {done && (
            <div className="mt-10 rounded-2xl border border-crimson/40 bg-card-gradient p-8 text-center">
              <Trophy className="mx-auto h-8 w-8 text-gold" />
              <h2 className="mt-3 font-serif text-3xl">Round complete</h2>
              <p className="mt-2 text-muted-foreground">
                {score} of {questions.length} correct · +{30 + score * 12} XP
              </p>
              <button
                onClick={restart}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-crimson-gradient px-5 py-3 text-sm text-ivory shadow-glow"
              >
                <RotateCcw className="h-4 w-4" /> New round
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
