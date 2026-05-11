import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Ornament, CornerKnot } from "@/components/SlavicMindLogo";
import { WORDS, type Word } from "@/data/vocabulary";
import { addXp, recordGamePlay } from "@/lib/progress";
import { RotateCcw, Timer, Zap, Trophy, ArrowLeft, Sparkles } from "lucide-react";

export const Route = createFileRoute("/games/memory")({
  head: () => ({
    meta: [
      { title: "Memory Match — SlavicMind" },
      { name: "description", content: "A Polish ↔ Bulgarian memory matching game. Train recall while having fun." },
    ],
  }),
  component: MemoryGame,
});

type Card = {
  id: string;
  pairId: string;
  side: "pl" | "bg";
  text: string;
  word: Word;
};

function buildDeck(pairs: number): Card[] {
  const pool = [...WORDS].sort(() => Math.random() - 0.5).slice(0, pairs);
  const deck: Card[] = pool.flatMap((w, i) => [
    { id: `${i}-pl`, pairId: `${i}`, side: "pl", text: w.pl, word: w },
    { id: `${i}-bg`, pairId: `${i}`, side: "bg", text: w.bg, word: w },
  ]);
  return deck.sort(() => Math.random() - 0.5);
}

function MemoryGame() {
  const [pairs, setPairs] = useState(6);
  const [deck, setDeck] = useState<Card[]>(() => buildDeck(6));
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [lastMatch, setLastMatch] = useState<Word | null>(null);

  const won = matched.size === deck.length && deck.length > 0;

  useEffect(() => {
    if (!running || won) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [running, won]);

  useEffect(() => {
    if (!won) return;
    const reward = Math.max(20, pairs * 20 - moves * 2);
    addXp(reward, "Memory Match");
    recordGamePlay("memory", reward);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [won]);

  useEffect(() => {
    if (flipped.length !== 2) return;
    const [a, b] = flipped.map((id) => deck.find((c) => c.id === id)!);
    setMoves((m) => m + 1);
    if (a.pairId === b.pairId) {
      setTimeout(() => {
        setMatched((prev) => new Set(prev).add(a.pairId));
        setFlipped([]);
        setLastMatch(a.word);
      }, 380);
    } else {
      setTimeout(() => setFlipped([]), 750);
    }
  }, [flipped, deck]);

  const reset = (n = pairs) => {
    setDeck(buildDeck(n));
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setSeconds(0);
    setRunning(false);
    setLastMatch(null);
  };

  useEffect(() => { reset(pairs); /* eslint-disable-next-line */ }, [pairs]);

  const xp = useMemo(() => Math.max(0, pairs * 20 - moves * 2), [pairs, moves]);

  const handleClick = (card: Card) => {
    if (!running) setRunning(true);
    if (matched.has(card.pairId)) return;
    if (flipped.includes(card.id)) return;
    if (flipped.length === 2) return;
    setFlipped((f) => [...f, card.id]);
  };

  const cols = pairs <= 4 ? "grid-cols-2 sm:grid-cols-4" : pairs <= 6 ? "grid-cols-3 sm:grid-cols-4" : "grid-cols-4 sm:grid-cols-5";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6 py-10">
          {/* Header */}
          <div className="flex items-center justify-between gap-4">
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ivory transition">
              <ArrowLeft className="h-4 w-4" /> Dashboard
            </Link>
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">Mind game · 01</div>
          </div>

          <div className="mt-6 text-center">
            <h1 className="font-serif text-4xl md:text-6xl tracking-tight">Memory Match</h1>
            <Ornament className="mx-auto mt-4 w-64 text-crimson" />
            <p className="mt-4 text-muted-foreground max-w-md mx-auto">
              Pair each Polish word with its Bulgarian twin. Fewer moves, more XP.
            </p>
          </div>

          {/* HUD */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Hud icon={Timer} label="Time" value={formatTime(seconds)} />
            <Hud icon={Zap} label="Moves" value={String(moves)} />
            <Hud icon={Trophy} label="Pairs" value={`${matched.size}/${pairs}`} />
            <Hud icon={Sparkles} label="XP" value={`+${xp}`} tone="gold" />
          </div>

          {/* Controls */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex rounded-lg border border-border/70 bg-surface/60 p-1">
              {[4, 6, 8].map((n) => (
                <button
                  key={n}
                  onClick={() => setPairs(n)}
                  className={`px-3 py-1.5 text-xs rounded-md transition ${pairs === n ? "bg-crimson-gradient text-ivory" : "text-muted-foreground hover:text-ivory"}`}
                >
                  {n} pairs
                </button>
              ))}
            </div>
            <button
              onClick={() => reset()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/70 hover:bg-surface-2 text-sm transition"
            >
              <RotateCcw className="h-4 w-4" /> Restart
            </button>
          </div>

          {/* Board */}
          <div className={`mt-8 grid ${cols} gap-3 sm:gap-4`}>
            {deck.map((card) => {
              const isFlipped = flipped.includes(card.id) || matched.has(card.pairId);
              const isMatched = matched.has(card.pairId);
              return (
                <button
                  key={card.id}
                  onClick={() => handleClick(card)}
                  className="aspect-[3/4] [perspective:1000px] focus:outline-none"
                >
                  <div
                    className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}
                  >
                    {/* Back */}
                    <div className="absolute inset-0 [backface-visibility:hidden] rounded-xl border border-border/70 bg-card-gradient grid place-items-center overflow-hidden">
                      <CornerKnot className="absolute top-2 left-2 h-4 w-4 text-crimson" />
                      <CornerKnot className="absolute bottom-2 right-2 h-4 w-4 text-crimson rotate-180" />
                      <div className="font-serif text-3xl text-crimson/80 italic">S</div>
                    </div>
                    {/* Front */}
                    <div
                      className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl border bg-card-gradient grid place-items-center text-center p-3 transition-all
                        ${isMatched ? "border-crimson shadow-glow" : "border-border/70"}`}
                    >
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                          {card.side === "pl" ? "Polski" : "Български"}
                        </div>
                        <div className="mt-2 font-serif text-lg sm:text-xl leading-tight">
                          {card.text}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Last match feedback */}
          {lastMatch && !won && (
            <div key={lastMatch.id} className="animate-fade-up mt-8 mx-auto max-w-md text-center text-sm text-muted-foreground">
              <span className="text-crimson font-mono">✓ matched</span>{" "}
              <span className="font-serif text-ivory">{lastMatch.pl}</span> · {lastMatch.bg} · {lastMatch.en}
            </div>
          )}

          {/* Win state */}
          {won && (
            <div className="animate-fade-up mt-10 rounded-2xl border border-crimson/40 bg-card-gradient p-8 text-center shadow-glow">
              <Sparkles className="h-7 w-7 text-crimson mx-auto" />
              <h2 className="mt-4 font-serif text-3xl">Świetnie! Отлично!</h2>
              <p className="mt-2 text-muted-foreground">
                {pairs} pairs in {moves} moves · {formatTime(seconds)} · <span className="text-gold font-mono">+{xp} XP</span>
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <button onClick={() => reset()} className="px-5 py-2.5 rounded-lg bg-crimson-gradient text-ivory text-sm shadow-glow hover:opacity-95 transition">
                  Play again
                </button>
                <Link to="/vocabulary" className="px-5 py-2.5 rounded-lg border border-border/70 text-sm hover:bg-surface-2 transition">
                  Study words
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Hud({ icon: Icon, label, value, tone }: { icon: any; label: string; value: string; tone?: "gold" }) {
  return (
    <div className="rounded-xl border border-border/70 bg-card-gradient px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
        <Icon className={`h-4 w-4 ${tone === "gold" ? "text-gold" : "text-crimson"}`} /> {label}
      </div>
      <div className={`font-mono text-lg ${tone === "gold" ? "text-gold" : "text-ivory"}`}>{value}</div>
    </div>
  );
}

function formatTime(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const ss = (s % 60).toString().padStart(2, "0");
  return `${m}:${ss}`;
}
