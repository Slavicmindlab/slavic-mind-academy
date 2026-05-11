import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Ornament } from "@/components/SlavicMindLogo";
import { WORDS, type Word } from "@/data/vocabulary";
import { speak } from "@/lib/speak";
import { addXp, recordGamePlay } from "@/lib/progress";
import { ArrowLeft, RotateCcw, Volume2, Sparkles, Trophy } from "lucide-react";

export const Route = createFileRoute("/games/listening")({
  head: () => ({
    meta: [
      { title: "Listening — SlavicMind" },
      { name: "description", content: "Hear a Polish word and pick its meaning." },
    ],
  }),
  component: Listening,
});

const ROUND = 8;

type Q = { word: Word; options: string[] };

function build(): Q[] {
  const pool = [...WORDS].sort(() => Math.random() - 0.5).slice(0, ROUND);
  return pool.map((w) => {
    const distractors = [...WORDS].filter((x) => x.id !== w.id).sort(() => Math.random() - 0.5).slice(0, 3).map((x) => x.bg);
    return { word: w, options: [...distractors, w.bg].sort(() => Math.random() - 0.5) };
  });
}

function Listening() {
  const [questions, setQuestions] = useState<Q[]>(() => build());
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const done = idx >= questions.length;
  const q = questions[idx];

  useEffect(() => {
    if (q) {
      const t = setTimeout(() => speak(q.word.pl, "pl-PL"), 200);
      return () => clearTimeout(t);
    }
  }, [idx, q]);

  useEffect(() => {
    if (done) {
      const xp = 30 + score * 12;
      addXp(xp, "Listening");
      recordGamePlay("listening", score);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const choose = (opt: string) => {
    if (picked) return;
    setPicked(opt);
    if (opt === q.word.bg) setScore((s) => s + 1);
    setTimeout(() => { setPicked(null); setIdx((i) => i + 1); }, 900);
  };

  const restart = () => { setQuestions(build()); setIdx(0); setScore(0); setPicked(null); };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-6 py-12">
          <Link to="/games" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ivory">
            <ArrowLeft className="h-4 w-4" /> All games
          </Link>

          <div className="mt-6 text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">Listening</div>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl">Słuchaj uważnie</h1>
            <Ornament className="mx-auto mt-4 w-60 text-crimson" />
            <p className="mt-3 text-muted-foreground">Listen to the Polish word, then pick the Bulgarian meaning.</p>
          </div>

          {!done && q && (
            <div className="mt-10 rounded-2xl border border-border/70 bg-card-gradient p-8">
              <div className="text-center">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Word {idx + 1} of {questions.length}</div>
                <button
                  onClick={() => speak(q.word.pl, "pl-PL")}
                  className="mt-6 mx-auto h-24 w-24 grid place-items-center rounded-full border border-crimson/50 bg-surface/60 hover:shadow-glow transition"
                  aria-label="Replay"
                >
                  <Volume2 className="h-8 w-8 text-crimson" />
                </button>
                <div className="mt-3 text-xs text-muted-foreground">Tap to replay</div>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {q.options.map((opt) => {
                  const isCorrect = opt === q.word.bg;
                  let cls = "border-border/70 hover:border-crimson/60";
                  if (picked) {
                    if (isCorrect) cls = "border-emerald-500/60 bg-emerald-500/5";
                    else if (picked === opt) cls = "border-destructive/60 bg-destructive/5";
                    else cls = "border-border/40 opacity-50";
                  }
                  return (
                    <button
                      key={opt}
                      onClick={() => choose(opt)}
                      className={`px-4 py-4 rounded-lg border font-serif text-lg transition ${cls}`}
                    >{opt}</button>
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
            <div className="mt-10 p-8 rounded-2xl border border-crimson/40 bg-card-gradient text-center">
              <Trophy className="h-8 w-8 mx-auto text-gold" />
              <h2 className="mt-3 font-serif text-3xl">Round complete</h2>
              <p className="mt-2 text-muted-foreground">{score} of {questions.length} correct · +{30 + score * 12} XP</p>
              <button onClick={restart} className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-crimson-gradient text-ivory text-sm shadow-glow">
                <RotateCcw className="h-4 w-4" /> New round
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
