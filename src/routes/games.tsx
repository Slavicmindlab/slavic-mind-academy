import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Ornament } from "@/components/SlavicMindLogo";
import { Brain, Grid3x3, Timer, Layers, Repeat, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: "Mind games — SlavicMind" },
      { name: "description", content: "Crosswords, memory match, timed quizzes, sentence building and conjugation drills for Polish learners." },
    ],
  }),
  component: GamesHub,
});

const GAMES = [
  { to: "/games/memory", icon: Brain, name: "Memory Match", n: "01",
    body: "Pair Polish words with their Bulgarian twins. A quiet test of recall.",
    tag: "Recall · 4–8 pairs" },
  { to: "/games/crossword", icon: Grid3x3, name: "Crossword", n: "02",
    body: "A small philological puzzle: clues in Bulgarian, answers in Polish. Timed, with hints.",
    tag: "Logic · timed · XP" },
  { to: "/games/quiz", icon: Timer, name: "Timed Quiz", n: "03",
    body: "Sixty seconds. Twelve words. Translate as many as your mind allows.",
    tag: "Speed · 60s" },
  { to: "/games/sentence", icon: Layers, name: "Sentence Builder", n: "04",
    body: "Reassemble Polish sentences from scattered tokens. Word order, alive.",
    tag: "Syntax · 5 puzzles" },
  { to: "/games/conjugation", icon: Repeat, name: "Conjugation Drill", n: "05",
    body: "Six pronouns. One verb at a time. Fill the present tense paradigm.",
    tag: "Grammar · drill" },
];

function GamesHub() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 py-12">
          <div className="text-center animate-fade-up">
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">Gry umysłu</div>
            <h1 className="mt-3 font-serif text-4xl md:text-6xl">Mind games</h1>
            <Ornament className="mx-auto mt-4 w-72 text-crimson" />
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Five small studios for the Slavic mind. Each one trains a different
              muscle of language — memory, logic, speed, syntax, grammar.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {GAMES.map((g) => (
              <Link
                key={g.to}
                to={g.to}
                className="group relative rounded-2xl border border-border/70 bg-card-gradient p-7 hover:border-crimson/60 hover:-translate-y-0.5 transition-all overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-crimson/10 blur-3xl opacity-0 group-hover:opacity-100 transition" />
                <div className="flex items-start justify-between">
                  <div className="h-11 w-11 rounded-lg border border-border/70 bg-surface/60 grid place-items-center text-crimson">
                    <g.icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{g.n}</span>
                </div>
                <h3 className="mt-6 font-serif text-2xl">{g.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{g.body}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-rose">{g.tag}</span>
                  <span className="inline-flex items-center gap-1 text-xs text-crimson opacity-0 group-hover:opacity-100 transition">
                    Play <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
