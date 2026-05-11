import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Ornament } from "@/components/SlavicMindLogo";
import { WORDS, type Word } from "@/data/vocabulary";
import { SpeakButton } from "@/components/SpeakButton";
import { addXp, recordGamePlay } from "@/lib/progress";
import { ArrowLeft, RotateCcw, Trophy, Sparkles } from "lucide-react";

export const Route = createFileRoute("/games/match")({
  head: () => ({
    meta: [
      { title: "Translation Match — SlavicMind" },
      { name: "description", content: "Match Polish words to their Bulgarian translations." },
    ],
  }),
  component: MatchGame,
});

const ROUND = 6;

function pickRound(): Word[] {
  return [...WORDS].sort(() => Math.random() - 0.5).slice(0, ROUND);
}

function MatchGame() {
  const [round, setRound] = useState<Word[]>(() => pickRound());
  const polish = useMemo(() => [...round].sort(() => Math.random() - 0.5), [round]);
  const bulgarian = useMemo(() => [...round].sort(() => Math.random() - 0.5), [round]);
  const [activePl, setActivePl] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const won = matched.size === round.length;

  useEffect(() => {
    if (won) {
      const xp = 60 + score * 5;
      addXp(xp, "Translation Match");
      recordGamePlay("match", score);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [won]);

  const onBg = (w: Word) => {
    if (!activePl || matched.has(w.id)) return;
    if (activePl === w.id) {
      setMatched((m) => new Set(m).add(w.id));
      setActivePl(null);
      setScore((s) => s + 1);
    } else {
      setWrong(w.id);
      setTimeout(() => setWrong(null), 500);
      setScore((s) => Math.max(0, s - 1));
    }
  };

  const restart = () => {
    setRound(pickRound());
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
        <div className="relative mx-auto max-w-5xl px-6 py-12">
          <Link to="/games" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ivory">
            <ArrowLeft className="h-4 w-4" /> All games
          </Link>

          <div className="mt-6 text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">Translation Match</div>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl">Polish ↔ Bulgarian</h1>
            <Ornament className="mx-auto mt-4 w-60 text-crimson" />
            <p className="mt-4 text-muted-foreground">Tap a Polish word, then its Bulgarian twin.</p>
            <div className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-border/70 bg-surface/40 text-sm">
              <span className="font-mono">Score · {score}</span>
              <span className="text-muted-foreground">{matched.size} / {round.length}</span>
            </div>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-rose mb-3">Polski</div>
              <div className="space-y-2">
                {polish.map((w) => {
                  const done = matched.has(w.id);
                  const active = activePl === w.id;
                  return (
                    <button
                      key={w.id}
                      onClick={() => !done && setActivePl(w.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg border font-serif text-lg transition flex items-center justify-between
                        ${done ? "border-emerald-500/40 bg-emerald-500/5 text-muted-foreground line-through" :
                          active ? "border-crimson bg-surface/60" : "border-border/70 hover:border-crimson/60"}`}
                    >
                      <span>{w.pl}</span>
                      <SpeakButton text={w.pl} lang="pl-PL" />
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-rose mb-3">Български</div>
              <div className="space-y-2">
                {bulgarian.map((w) => {
                  const done = matched.has(w.id);
                  const isWrong = wrong === w.id;
                  return (
                    <button
                      key={w.id}
                      onClick={() => onBg(w)}
                      className={`w-full text-left px-4 py-3 rounded-lg border font-serif text-lg transition
                        ${done ? "border-emerald-500/40 bg-emerald-500/5 text-muted-foreground line-through" :
                          isWrong ? "border-destructive bg-destructive/10" : "border-border/70 hover:border-crimson/60"}`}
                    >
                      {w.bg}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {won && (
            <div className="mt-10 p-8 rounded-2xl border border-crimson/40 bg-card-gradient text-center animate-fade-up">
              <Trophy className="h-8 w-8 mx-auto text-gold" />
              <h2 className="mt-3 font-serif text-3xl">Perfect round.</h2>
              <p className="mt-2 text-muted-foreground">Score {score} · +{60 + score * 5} XP</p>
              <button onClick={restart} className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-crimson-gradient text-ivory text-sm shadow-glow">
                <RotateCcw className="h-4 w-4" /> Play again
              </button>
            </div>
          )}

          {!won && (
            <div className="mt-10 text-center">
              <button onClick={restart} className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-border/70 hover:bg-surface/60">
                <RotateCcw className="h-3.5 w-3.5" /> New round
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
