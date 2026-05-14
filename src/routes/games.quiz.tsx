import { createFileRoute, Link } from "@tanstack/react-router";
import { ClientOnly } from "@/components/ClientOnly";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Ornament } from "@/components/SlavicMindLogo";
import { WORDS, type Word } from "@/data/vocabulary";
import { addXp, recordGamePlay } from "@/lib/progress";
import { ArrowLeft, Timer, Sparkles, RotateCcw, Check, X } from "lucide-react";

export const Route = createFileRoute("/games/quiz")({
  head: () => ({
    meta: [
      { title: "Timed Quiz — SlavicMind" },
      { name: "description", content: "60 seconds, 12 Polish words. Translate as many as you can." },
    ],
  }),
  component: () => (<ClientOnly><TimedQuiz /></ClientOnly>),
});

const ROUND_SECONDS = 60;

type Question = { word: Word; options: string[]; correct: string };

function buildQuestions(n: number): Question[] {
  const pool = [...WORDS].sort(() => Math.random() - 0.5).slice(0, n);
  return pool.map((w) => {
    const distractors = [...WORDS]
      .filter((x) => x.id !== w.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((x) => x.bg);
    const options = [...distractors, w.bg].sort(() => Math.random() - 0.5);
    return { word: w, options, correct: w.bg };
  });
}

function TimedQuiz() {
  const [questions, setQuestions] = useState<Question[]>(() => buildQuestions(12));
  const [idx, setIdx] = useState(0);
  const [seconds, setSeconds] = useState(ROUND_SECONDS);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => {
    if (!running) return;
    if (seconds <= 0) { setRunning(false); return; }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [running, seconds]);

  const q = questions[idx];
  const finished = !running && seconds <= 0;

  const start = () => { setRunning(true); };

  const reset = () => {
    setQuestions(buildQuestions(12));
    setIdx(0);
    setSeconds(ROUND_SECONDS);
    setRunning(false);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setPicked(null);
  };

  const pick = (opt: string) => {
    if (!running || picked) return;
    setPicked(opt);
    const ok = opt === q.correct;
    if (ok) {
      setScore((s) => s + 10);
      setStreak((s) => {
        const ns = s + 1;
        setBestStreak((b) => Math.max(b, ns));
        return ns;
      });
    } else {
      setStreak(0);
    }
    setTimeout(() => {
      setPicked(null);
      setIdx((i) => (i + 1) % questions.length);
    }, 450);
  };

  const xp = useMemo(() => score + bestStreak * 5, [score, bestStreak]);

  useEffect(() => {
    if (finished && xp > 0) {
      addXp(xp, "Timed Quiz");
      recordGamePlay("quiz", score);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

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
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">Mind game · 03</div>
          </div>

          <div className="mt-6 text-center">
            <h1 className="font-serif text-4xl md:text-6xl">Timed Quiz</h1>
            <Ornament className="mx-auto mt-4 w-64 text-crimson" />
            <p className="mt-4 text-muted-foreground">Sixty seconds. Translate Polish to Bulgarian.</p>
          </div>

          {/* HUD */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            <Stat label="Time" value={`${seconds}s`} accent />
            <Stat label="Score" value={String(score)} />
            <Stat label="Streak" value={`${streak} · ${bestStreak}`} />
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-1 rounded-full bg-surface-2 overflow-hidden">
            <div
              className="h-full bg-crimson-gradient transition-all duration-1000"
              style={{ width: `${(seconds / ROUND_SECONDS) * 100}%` }}
            />
          </div>

          {!running && !finished && (
            <div className="mt-10 text-center">
              <button
                onClick={start}
                className="px-6 py-3 rounded-lg bg-crimson-gradient text-ivory text-sm shadow-glow hover:opacity-95 transition"
              >
                Start round
              </button>
            </div>
          )}

          {running && q && (
            <div key={idx} className="animate-fade-up mt-10 rounded-2xl border border-border/70 bg-card-gradient p-8">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Translate</div>
              <div className="mt-3 flex items-baseline gap-3 flex-wrap">
                <h2 className="font-serif text-5xl">{q.word.pl}</h2>
                <span className="font-mono text-sm text-muted-foreground">/{q.word.pronunciation}/</span>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {q.options.map((opt) => {
                  const isPicked = picked === opt;
                  const isCorrect = opt === q.correct;
                  const showState = picked && (isPicked || isCorrect);
                  return (
                    <button
                      key={opt}
                      onClick={() => pick(opt)}
                      disabled={!!picked}
                      className={`text-left rounded-xl border px-5 py-4 transition flex items-center justify-between gap-3
                        ${showState && isCorrect ? "border-crimson bg-crimson/10"
                          : showState && isPicked ? "border-rose/70 bg-rose/5"
                          : "border-border/70 hover:border-crimson/60 hover:bg-surface/60"}`}
                    >
                      <span className="font-serif text-lg">{opt}</span>
                      {showState && isCorrect && <Check className="h-4 w-4 text-crimson" />}
                      {showState && isPicked && !isCorrect && <X className="h-4 w-4 text-rose" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {finished && (
            <div className="animate-fade-up mt-10 rounded-2xl border border-crimson/40 bg-card-gradient p-8 text-center shadow-glow">
              <Sparkles className="h-7 w-7 text-crimson mx-auto" />
              <h2 className="mt-4 font-serif text-3xl">Czas minął.</h2>
              <p className="mt-2 text-muted-foreground">
                Score {score} · best streak {bestStreak} · <span className="text-gold font-mono">+{xp} XP</span>
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <button onClick={reset} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-crimson-gradient text-ivory text-sm shadow-glow">
                  <RotateCcw className="h-4 w-4" /> Play again
                </button>
                <Link to="/games" className="px-5 py-2.5 rounded-lg border border-border/70 text-sm hover:bg-surface-2 transition">
                  Back to games
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-border/70 bg-card-gradient px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest">
        <Timer className={`h-3.5 w-3.5 ${accent ? "text-crimson" : "text-muted-foreground"}`} /> {label}
      </div>
      <div className={`font-mono text-lg ${accent ? "text-crimson" : "text-ivory"}`}>{value}</div>
    </div>
  );
}
