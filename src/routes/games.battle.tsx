import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { WORDS, type Word } from "@/data/vocabulary";
import { SpeakButton } from "@/components/SpeakButton";
import { addXp, recordGamePlay } from "@/lib/progress";
import { Heart, Timer, Trophy, ArrowLeft, Zap } from "lucide-react";

export const Route = createFileRoute("/games/battle")({
  head: () => ({
    meta: [
      { title: "Vocabulary Battle — SlavicMind" },
      { name: "description", content: "Rapid-fire Polish→Bulgarian translation battle. Three lives, escalating XP, no mercy." },
    ],
  }),
  component: Battle,
});

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Round = { word: Word; options: string[]; correct: string };

function makeRound(pool: Word[]): Round {
  const word = pool[Math.floor(Math.random() * pool.length)];
  const distractors = shuffle(pool.filter((w) => w.id !== word.id && w.bg !== word.bg)).slice(0, 3).map((w) => w.bg);
  const options = shuffle([word.bg, ...distractors]);
  return { word, options, correct: word.bg };
}

function Battle() {
  const pool = useMemo(() => WORDS.filter((w) => w.bg.length < 28), []);
  const [round, setRound] = useState<Round>(() => makeRound(pool));
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [time, setTime] = useState(8);
  const [pick, setPick] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const tickRef = useRef<number | null>(null);

  // Per-round timer
  useEffect(() => {
    if (done || pick) return;
    setTime(8);
    tickRef.current = window.setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          handlePick(""); // timeout = wrong
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (tickRef.current) window.clearInterval(tickRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, done]);

  function handlePick(choice: string) {
    if (pick || done) return;
    if (tickRef.current) window.clearInterval(tickRef.current);
    setPick(choice);
    const correct = choice === round.correct;
    if (correct) {
      const gained = 5 + combo * 2;
      setScore((s) => s + gained);
      setCombo((c) => c + 1);
      addXp(gained, `Battle ×${combo + 1}`);
    } else {
      setCombo(0);
      setLives((l) => {
        const next = l - 1;
        if (next <= 0) {
          setTimeout(() => endGame(), 700);
        }
        return next;
      });
    }
    setTimeout(() => {
      if (lives - (correct ? 0 : 1) > 0) {
        setRound(makeRound(pool));
        setPick(null);
      }
    }, 700);
  }

  function endGame() {
    setDone(true);
    recordGamePlay("battle", score);
    if (score >= 50) addXp(20, "Battle bonus");
  }

  function restart() {
    setLives(3); setScore(0); setCombo(0); setPick(null); setDone(false);
    setRound(makeRound(pool));
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-6 py-10">
          <Link to="/games" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ivory transition">
            <ArrowLeft className="h-4 w-4" /> All games
          </Link>

          <div className="mt-6 flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-crimson">Bitwa słów</div>
              <h1 className="mt-2 font-serif text-4xl md:text-5xl">Vocabulary Battle</h1>
              <p className="mt-2 text-muted-foreground text-sm max-w-md">
                Eight seconds per word. Three lives. Combo your way to glory — each correct streak multiplies XP.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Stat icon={<Heart className="h-3.5 w-3.5 text-crimson" />} value={lives} label="lives" />
              <Stat icon={<Trophy className="h-3.5 w-3.5 text-gold" />} value={score} label="score" />
              <Stat icon={<Zap className="h-3.5 w-3.5 text-gold" />} value={`×${combo}`} label="combo" />
            </div>
          </div>

          {!done ? (
            <div className="mt-10 rounded-2xl border border-border/70 bg-card-gradient p-8 shadow-elegant">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><Timer className="h-3.5 w-3.5" /> {time}s</span>
                <span className="font-mono uppercase tracking-widest text-rose">{round.word.category}</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-surface-2 overflow-hidden">
                <div className="h-full bg-crimson-gradient transition-all duration-1000 ease-linear" style={{ width: `${(time / 8) * 100}%` }} />
              </div>

              <div className="mt-8 text-center">
                <div className="font-serif text-5xl md:text-6xl">{round.word.pl}</div>
                <div className="mt-2 font-mono text-xs text-muted-foreground">/{round.word.pronunciation}/</div>
                <div className="mt-3 flex justify-center">
                  <SpeakButton text={round.word.pl} lang="pl-PL" size="md" />
                </div>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {round.options.map((opt) => {
                  const isPicked = pick === opt;
                  const isCorrect = pick && opt === round.correct;
                  const isWrong = isPicked && opt !== round.correct;
                  return (
                    <button
                      key={opt}
                      onClick={() => handlePick(opt)}
                      disabled={!!pick}
                      className={`px-5 py-4 rounded-xl border text-left transition-all ${
                        isCorrect ? "border-emerald-500/70 bg-emerald-500/10 text-ivory" :
                        isWrong ? "border-crimson/70 bg-crimson/10 text-ivory" :
                        "border-border/70 hover:border-crimson/60 hover:bg-surface/60"
                      }`}
                    >
                      <span className="text-base">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-border/70 bg-card-gradient p-10 text-center shadow-elegant">
              <Trophy className="h-10 w-10 text-gold mx-auto" />
              <h2 className="mt-4 font-serif text-3xl">Battle finished</h2>
              <p className="mt-2 text-muted-foreground">Final score · <span className="text-ivory font-mono">{score}</span></p>
              <button onClick={restart} className="mt-8 px-6 py-3 rounded-lg bg-crimson-gradient text-ivory shadow-glow hover:opacity-95 transition">
                Battle again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: React.ReactNode; label: string }) {
  return (
    <div className="px-3 py-2 rounded-md border border-border/70 bg-surface/50 text-xs flex items-center gap-2">
      {icon}
      <span className="font-mono text-ivory">{value}</span>
      <span className="text-muted-foreground uppercase tracking-widest text-[10px]">{label}</span>
    </div>
  );
}
