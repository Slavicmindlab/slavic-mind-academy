import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SpeakButton } from "@/components/SpeakButton";
import { WORDS } from "@/data/vocabulary";
import { addXp, recordGamePlay } from "@/lib/progress";
import { ArrowLeft, Sparkles, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/games/wordchain")({
  head: () => ({
    meta: [
      { title: "Word Chain — SlavicMind" },
      { name: "description", content: "Chain Polish words: each new word starts with the last letter of the previous." },
    ],
  }),
  component: WordChainGame,
});

function lastLetter(s: string) {
  const clean = s.toLowerCase().replace(/[^a-ząćęłńóśźż]/g, "");
  return clean.slice(-1);
}
function firstLetter(s: string) {
  const clean = s.toLowerCase().replace(/[^a-ząćęłńóśźż]/g, "");
  return clean.slice(0, 1);
}

function WordChainGame() {
  const pool = useMemo(() => WORDS.filter((w) => w.pos !== "phrase"), []);
  const [chain, setChain] = useState<string[]>([]);
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    const start = pool[Math.floor(Math.random() * pool.length)];
    setChain([start.pl]);
  }, [pool, seed]);

  const target = chain[chain.length - 1];
  const need = target ? lastLetter(target) : "";

  const candidates = useMemo(() => {
    if (!need) return [];
    const used = new Set(chain.map((w) => w.toLowerCase()));
    const matching = pool.filter((w) => firstLetter(w.pl) === need && !used.has(w.pl.toLowerCase()));
    // 4 options: at least 1 valid + distractors
    const wrong = pool.filter((w) => firstLetter(w.pl) !== need && !used.has(w.pl.toLowerCase()))
      .sort(() => Math.random() - 0.5).slice(0, 3);
    const right = matching.sort(() => Math.random() - 0.5).slice(0, 1);
    return [...right, ...wrong].sort(() => Math.random() - 0.5);
  }, [pool, chain, need]);

  const pick = (pl: string) => {
    if (firstLetter(pl) !== need) {
      addXp(2, "Word chain · attempt");
      return;
    }
    const next = [...chain, pl];
    setChain(next);
    addXp(10, "Word chain · link");
    recordGamePlay("wordchain", next.length);
  };

  const reset = () => setSeed((s) => s + 1);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-6 py-12">
          <Link to="/games" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ivory">
            <ArrowLeft className="h-4 w-4" /> Games
          </Link>
          <div className="mt-6 animate-fade-up flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-crimson">Łańcuch słów</div>
              <h1 className="mt-3 font-serif text-5xl">Word chain</h1>
              <p className="mt-3 text-muted-foreground max-w-xl">
                Всяка нова дума започва с последната буква на предишната. Колко дълга верига можеш да изградиш?
              </p>
            </div>
            <button onClick={reset} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border/70 hover:border-crimson/60 text-sm">
              <RotateCcw className="h-3.5 w-3.5" /> Restart
            </button>
          </div>

          <div className="mt-8 rounded-2xl border border-border/70 bg-card-gradient p-6">
            <div className="text-xs uppercase tracking-widest text-rose">Chain · {chain.length}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {chain.map((w, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full border border-border/60 bg-surface/40 font-serif">
                  {w}
                </span>
              ))}
            </div>
            <div className="mt-5 text-sm text-muted-foreground">
              Next word must start with <span className="font-mono text-crimson text-base">{need || "—"}</span>
            </div>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            {candidates.map((w) => (
              <button
                key={w.id}
                onClick={() => pick(w.pl)}
                className="group flex items-center justify-between text-left px-4 py-3 rounded-lg border border-border/70 bg-card-gradient hover:border-crimson/60 transition"
              >
                <div>
                  <div className="font-serif text-lg">{w.pl}</div>
                  <div className="text-xs text-muted-foreground">{w.bg}</div>
                </div>
                <SpeakButton text={w.pl} />
              </button>
            ))}
          </div>

          {chain.length >= 5 && (
            <div className="mt-6 inline-flex items-center gap-2 text-sm text-gold">
              <Sparkles className="h-4 w-4" /> Beautiful chain — keep going.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
