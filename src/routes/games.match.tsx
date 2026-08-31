import { createFileRoute, Link } from "@tanstack/react-router";
import { ClientOnly } from "@/components/ClientOnly";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Ornament } from "@/components/SlavicMindLogo";
import { sampleGameWords, shuffle, type GameWord } from "@/data/game-content";
import { SpeakButton } from "@/components/SpeakButton";
import { addXp, recordGamePlay } from "@/lib/progress";
import { ArrowLeft, RotateCcw, Trophy } from "lucide-react";

export const Route = createFileRoute("/games/match")({
  head: () => ({
    meta: [
      { title: "Translation Match — SlavicMind" },
      { name: "description", content: "Match Polish words to their Bulgarian translations." },
    ],
  }),
  component: () => (
    <ClientOnly>
      <MatchGame />
    </ClientOnly>
  ),
});

const ROUND = 6;

function buildRound(exclude: string[] = []): GameWord[] {
  return sampleGameWords({ count: ROUND, exclude, uniqueTranslations: true });
}

function MatchGame() {
  const [recent, setRecent] = useState<string[]>([]);
  const [round, setRound] = useState<GameWord[]>(() => buildRound());
  const polish = useMemo(() => shuffle(round), [round]);
  const bulgarian = useMemo(() => shuffle(round), [round]);
  const [activePl, setActivePl] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const won = matched.size === round.length && round.length > 0;

  useEffect(() => {
    if (won) {
      const xp = 60 + score * 5;
      addXp(xp, "Translation Match");
      recordGamePlay("match", score);
    }
  }, [score, won]);

  const onBg = (word: GameWord) => {
    if (!activePl || matched.has(word.canonical)) return;
    if (activePl === word.canonical) {
      setMatched((current) => new Set(current).add(word.canonical));
      setActivePl(null);
      setScore((value) => value + 1);
    } else {
      setWrong(word.canonical);
      window.setTimeout(() => setWrong(null), 500);
      setScore((value) => Math.max(0, value - 1));
    }
  };

  const restart = () => {
    const previous = round.map((word) => word.canonical);
    const nextRecent = [...recent, ...previous].slice(-24);
    setRecent(nextRecent);
    setRound(buildRound(nextRecent));
    setActivePl(null);
    setMatched(new Set());
    setWrong(null);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <Link
            to="/games"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ivory"
          >
            <ArrowLeft className="h-4 w-4" /> All games
          </Link>

          <div className="mt-6 text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">Translation Match</div>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl">Polish ↔ Bulgarian</h1>
            <Ornament className="mx-auto mt-4 w-60 text-crimson" />
            <p className="mt-4 text-muted-foreground">
              Six unique pairs per round, drawn from the wider SlavicMind vocabulary.
            </p>
            <div className="mt-4 inline-flex items-center gap-3 rounded-full border border-border/70 bg-surface/40 px-4 py-2 text-sm">
              <span className="font-mono">Score · {score}</span>
              <span className="text-muted-foreground">
                {matched.size} / {round.length}
              </span>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div>
              <div className="mb-3 text-[10px] uppercase tracking-widest text-rose">Polski</div>
              <div className="space-y-2">
                {polish.map((word) => {
                  const done = matched.has(word.canonical);
                  const active = activePl === word.canonical;
                  const stateClasses = done
                    ? "border-emerald-500/40 bg-emerald-500/5 text-muted-foreground"
                    : active
                      ? "border-crimson bg-surface/60"
                      : "border-border/70 hover:border-crimson/60";
                  return (
                    <div
                      key={word.canonical}
                      className={`flex w-full min-w-0 items-stretch overflow-hidden rounded-lg border transition ${stateClasses}`}
                    >
                      <button
                        onClick={() => !done && setActivePl(word.canonical)}
                        disabled={done}
                        className={`min-w-0 flex-1 px-4 py-3 text-left font-serif text-lg ${done ? "line-through" : ""}`}
                      >
                        <span className="break-words">{word.pl}</span>
                      </button>
                      <div className="flex shrink-0 items-center border-l border-border/60 px-2">
                        <SpeakButton text={word.pl} lang="pl-PL" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="mb-3 text-[10px] uppercase tracking-widest text-rose">Български</div>
              <div className="space-y-2">
                {bulgarian.map((word) => {
                  const done = matched.has(word.canonical);
                  const isWrong = wrong === word.canonical;
                  return (
                    <button
                      key={word.canonical}
                      onClick={() => onBg(word)}
                      className={`w-full min-w-0 rounded-lg border px-4 py-3 text-left font-serif text-lg transition ${
                        done
                          ? "border-emerald-500/40 bg-emerald-500/5 text-muted-foreground line-through"
                          : isWrong
                            ? "border-destructive bg-destructive/10"
                            : "border-border/70 hover:border-crimson/60"
                      }`}
                    >
                      <span className="break-words">{word.bg}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {won ? (
            <div className="mt-10 rounded-2xl border border-crimson/40 bg-card-gradient p-8 text-center animate-fade-up">
              <Trophy className="mx-auto h-8 w-8 text-gold" />
              <h2 className="mt-3 font-serif text-3xl">Perfect round.</h2>
              <p className="mt-2 text-muted-foreground">
                Score {score} · +{60 + score * 5} XP
              </p>
              <button
                onClick={restart}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-crimson-gradient px-5 py-3 text-sm text-ivory shadow-glow"
              >
                <RotateCcw className="h-4 w-4" /> New round
              </button>
            </div>
          ) : (
            <div className="mt-10 text-center">
              <button
                onClick={restart}
                className="inline-flex items-center gap-2 rounded-lg border border-border/70 px-4 py-2 text-sm hover:bg-surface/60"
              >
                <RotateCcw className="h-3.5 w-3.5" /> New round
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
