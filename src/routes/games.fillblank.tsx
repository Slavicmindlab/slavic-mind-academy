import { createFileRoute, Link } from "@tanstack/react-router";
import { ClientOnly } from "@/components/ClientOnly";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Ornament } from "@/components/SlavicMindLogo";
import { SpeakButton } from "@/components/SpeakButton";
import {
  gameFeedback,
  pickFillBlankRound,
  type Difficulty,
  type FillBlankItem,
} from "@/data/game-content";
import { addXp, recordGamePlay, recordGrammarDrill } from "@/lib/progress";
import { ArrowLeft, RotateCcw, Trophy, Check, X } from "lucide-react";

export const Route = createFileRoute("/games/fillblank")({
  head: () => ({
    meta: [
      { title: "Fill in the blank — SlavicMind" },
      {
        name: "description",
        content: "Pick the correct Polish word to complete each sentence — cases, prepositions, verb forms.",
      },
    ],
  }),
  component: () => (
    <ClientOnly>
      <FillBlankGame />
    </ClientOnly>
  ),
});

type Level = Difficulty | "mixed";
const LEVELS: Level[] = ["mixed", "A1", "A2", "B1", "B2"];
const ROUND_SIZE = 6;

function FillBlankGame() {
  const [level, setLevel] = useState<Level>("mixed");
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [round, setRound] = useState<FillBlankItem[]>(() =>
    pickFillBlankRound(ROUND_SIZE, "mixed"),
  );
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [feedback, setFeedback] = useState("");

  const cur = round[i];
  const correct = picked === cur?.answer;
  const showResult = picked !== null;

  useEffect(() => {
    if (done) {
      const xp = 30 + score * 10;
      addXp(xp, "Fill in the blank");
      recordGamePlay("fillblank", score);
      recordGrammarDrill();
    }
  }, [done, score]);

  const choose = (option: string) => {
    if (showResult || !cur) return;
    setPicked(option);
    const isCorrect = option === cur.answer;
    if (isCorrect) setScore((value) => value + 1);
    setFeedback(gameFeedback(isCorrect));
  };

  const next = () => {
    if (i + 1 >= round.length) {
      setDone(true);
      return;
    }
    setI((value) => value + 1);
    setPicked(null);
    setFeedback("");
  };

  const startRound = (nextLevel: Level, keepRecent = true) => {
    const currentIds = round.map((item) => item.id);
    const nextRecent = keepRecent ? [...recentIds, ...currentIds].slice(-18) : [];
    setRecentIds(nextRecent);
    setRound(pickFillBlankRound(ROUND_SIZE, nextLevel, nextRecent));
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
    setFeedback("");
  };

  const restart = () => startRound(level);

  const changeLevel = (nextLevel: Level) => {
    setLevel(nextLevel);
    startRound(nextLevel, false);
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
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">Uzupełnij zdanie</div>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl">Fill in the blank</h1>
            <Ornament className="mx-auto mt-4 w-60 text-crimson" />
            <p className="mt-3 text-muted-foreground">
              Cases, aspect, prepositions and verb forms in real context.
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-2" aria-label="Difficulty">
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

            <div className="mt-4 inline-flex items-center gap-3 rounded-full border border-border/70 bg-surface/40 px-4 py-2 text-sm">
              <span className="font-mono">Score · {score}</span>
              <span className="text-muted-foreground">
                {Math.min(i + (done ? 0 : 1), round.length)} / {round.length}
              </span>
            </div>
          </div>

          {!done && cur && (
            <div className="mt-10 rounded-2xl border border-border/70 bg-card-gradient p-5 animate-fade-up sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase tracking-widest">
                <span className="text-rose">{cur.hint}</span>
                <span className="font-mono text-muted-foreground">{cur.difficulty}</span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="font-serif text-2xl leading-relaxed md:text-3xl">
                  {cur.before}{" "}
                  <span
                    className={`mx-1 rounded-md border-b-2 px-3 py-1 ${
                      showResult
                        ? correct
                          ? "border-emerald-400 text-emerald-300"
                          : "border-destructive text-destructive"
                        : "border-crimson/60 text-crimson"
                    }`}
                  >
                    {picked ?? "____"}
                  </span>{" "}
                  {cur.after}
                </span>
                <SpeakButton text={`${cur.before} ${cur.answer} ${cur.after}`} />
              </div>
              <p className="mt-3 text-sm italic text-muted-foreground">{cur.bg}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {cur.options.map((option) => {
                  const isAnswer = option === cur.answer;
                  const isPicked = picked === option;
                  return (
                    <button
                      key={option}
                      onClick={() => choose(option)}
                      disabled={showResult}
                      className={`flex min-w-0 items-center justify-between gap-2 rounded-lg border px-4 py-3 text-left font-serif text-lg transition
                        ${
                          showResult && isAnswer
                            ? "border-emerald-400 bg-emerald-500/10 text-emerald-200"
                            : showResult && isPicked && !isAnswer
                              ? "border-destructive bg-destructive/10"
                              : "border-border/70 hover:border-crimson/60"
                        }`}
                    >
                      <span className="min-w-0 break-words">{option}</span>
                      {showResult && isAnswer && <Check className="h-4 w-4 shrink-0" />}
                      {showResult && isPicked && !isAnswer && <X className="h-4 w-4 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {showResult && (
                <div className="mt-5">
                  <p className="text-sm text-muted-foreground">{feedback}</p>
                  <button
                    onClick={next}
                    className="mt-4 w-full rounded-lg bg-crimson-gradient px-4 py-3 text-sm text-ivory shadow-glow transition hover:opacity-95"
                  >
                    {i + 1 >= round.length ? "See results" : "Next"}
                  </button>
                </div>
              )}
            </div>
          )}

          {done && (
            <div className="mt-10 rounded-2xl border border-crimson/40 bg-card-gradient p-8 text-center animate-fade-up">
              <Trophy className="mx-auto h-8 w-8 text-gold" />
              <h2 className="mt-3 font-serif text-3xl">Round complete</h2>
              <p className="mt-2 text-muted-foreground">
                {score} / {round.length} correct · +{30 + score * 10} XP
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Learning Path completion remains 5 / 6 or better.
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
