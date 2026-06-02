import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Ornament } from "@/components/SlavicMindLogo";
import { ClientOnly } from "@/components/ClientOnly";
import { useProgress } from "@/lib/progress";
import {
  Brain, Grid3x3, Timer, Layers, Repeat, ArrowRight, Shuffle,
  Headphones, Link2, Swords, PencilLine, Trophy, Flame, Sparkles,
  Castle, Crown,
} from "lucide-react";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: "Mind games — SlavicMind" },
      { name: "description", content: "Ten interactive Polish mind games: memory, crossword, timed quizzes, sentence building, conjugation, translation, listening, battles & more." },
    ],
  }),
  component: GamesHub,
});

type GameDef = {
  id: string;
  to: string;
  icon: any;
  name: string;
  bgName: string;
  n: string;
  body: string;
  tag: string;
  family: "Recall" | "Logic" | "Speed" | "Syntax" | "Grammar" | "Audio" | "Lexicon";
  difficulty: 1 | 2 | 3;
};

const GAMES: GameDef[] = [
  { id: "memory",      to: "/games/memory",      icon: Brain,      n: "01", name: "Memory Match",      bgName: "Памет",
    body: "Pair Polish words with their Bulgarian twins. A quiet test of recall.",
    tag: "4–8 pairs",         family: "Recall", difficulty: 1 },
  { id: "crossword",   to: "/games/crossword",   icon: Grid3x3,    n: "02", name: "Crossword",         bgName: "Кръстословица",
    body: "A small philological puzzle: clues in Bulgarian, answers in Polish.",
    tag: "Logic · timed",     family: "Logic",  difficulty: 3 },
  { id: "quiz",        to: "/games/quiz",        icon: Timer,      n: "03", name: "Timed Quiz",        bgName: "Бърз тест",
    body: "Sixty seconds. Twelve words. Translate as many as your mind allows.",
    tag: "60 seconds",        family: "Speed",  difficulty: 2 },
  { id: "sentence",    to: "/games/sentence",    icon: Layers,     n: "04", name: "Sentence Builder",  bgName: "Изречения",
    body: "Reassemble Polish sentences from scattered tokens. Word order, alive.",
    tag: "7 puzzles",         family: "Syntax", difficulty: 2 },
  { id: "conjugation", to: "/games/conjugation", icon: Repeat,     n: "05", name: "Conjugation Drill", bgName: "Спрежение",
    body: "Six pronouns. One verb at a time. Fill the present tense paradigm.",
    tag: "Grammar drill",     family: "Grammar", difficulty: 3 },
  { id: "match",       to: "/games/match",       icon: Shuffle,    n: "06", name: "Translation Match", bgName: "Превод",
    body: "Connect Polish words to their Bulgarian meanings, one tap at a time.",
    tag: "6 words",           family: "Recall", difficulty: 1 },
  { id: "listening",   to: "/games/listening",   icon: Headphones, n: "07", name: "Listening",         bgName: "Слушане",
    body: "Hear a Polish word, pick the right meaning. Trains the ear.",
    tag: "8 rounds",          family: "Audio",  difficulty: 2 },
  { id: "wordchain",   to: "/games/wordchain",   icon: Link2,      n: "08", name: "Word Chain",        bgName: "Верига",
    body: "Each new word starts with the last letter of the previous. Vocabulary on a thread.",
    tag: "Endless",           family: "Lexicon", difficulty: 2 },
  { id: "battle",      to: "/games/battle",      icon: Swords,     n: "09", name: "Vocabulary Battle", bgName: "Битка",
    body: "Eight seconds per word. Three lives. Combo your way through Polish vocabulary.",
    tag: "Combo XP",          family: "Speed",  difficulty: 3 },
  { id: "fillblank",   to: "/games/fillblank",   icon: PencilLine, n: "10", name: "Fill the blank",    bgName: "Падежи",
    body: "Pick the right case, preposition or verb form to complete a Polish sentence.",
    tag: "Cases",             family: "Grammar", difficulty: 3 },
];

const FAMILY_TONE: Record<GameDef["family"], string> = {
  Recall:  "border-rose/40 text-rose",
  Logic:   "border-crimson/40 text-crimson",
  Speed:   "border-gold/40 text-gold",
  Syntax:  "border-rose/40 text-rose",
  Grammar: "border-crimson/40 text-crimson",
  Audio:   "border-gold/40 text-gold",
  Lexicon: "border-rose/40 text-rose",
};

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
              Ten small studios for the Slavic mind. Each trains a different muscle —
              memory, logic, speed, syntax, grammar, ear.
            </p>
          </div>

          <ClientOnly fallback={<div className="mt-10" />}>
            <HubStats />
          </ClientOnly>

          <Link
            to="/quest"
            className="group relative mt-12 block overflow-hidden rounded-3xl border border-crimson/40 bg-gradient-to-br from-crimson/20 via-background to-background p-7 md:p-10 hover:border-crimson/70 transition-all"
          >
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-crimson/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
            <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-crimson">
                  <Crown className="h-3.5 w-3.5 text-gold" /> SlavicMind Games · New platform
                </div>
                <h2 className="mt-3 font-serif text-3xl md:text-5xl leading-tight">
                  Case Quest <span className="text-muted-foreground italic">— The Seven Kingdoms</span>
                </h2>
                <p className="mt-3 max-w-xl text-sm md:text-base text-muted-foreground leading-relaxed">
                  Step into a fantasy Slavic world where every Polish case is a kingdom. Decline nouns,
                  slay dragons, and earn crowns from <em>Mianownik</em> to <em>Wołacz</em>.
                </p>
                <div className="mt-5 flex flex-wrap gap-2 text-[10px] uppercase tracking-widest">
                  {["Mianownik", "Dopełniacz", "Celownik", "Biernik", "Narzędnik", "Miejscownik", "Wołacz"].map((k) => (
                    <span key={k} className="rounded-full border border-border/70 bg-surface/60 px-3 py-1 text-muted-foreground">
                      🏰 {k}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex md:flex-col items-center gap-3">
                <Castle className="h-16 w-16 text-crimson" />
                <span className="inline-flex items-center gap-2 rounded-full bg-crimson px-6 py-2.5 text-sm font-serif text-ivory group-hover:bg-crimson/90 transition">
                  Enter the realm <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {GAMES.map((g) => (
              <ClientOnly
                key={g.to}
                fallback={<GameCard g={g} best={0} />}
              >
                <GameCardLive g={g} />
              </ClientOnly>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HubStats() {
  const p = useProgress();
  const totalBest = Object.values(p.bestScores).reduce((a, b) => a + b, 0);
  const played = Object.keys(p.bestScores).length;
  return (
    <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
      <Stat icon={Trophy}   label="Games played"   value={`${played}/${GAMES.length}`} tone="crimson" />
      <Stat icon={Sparkles} label="Total best XP"  value={`+${totalBest}`}             tone="gold" />
      <Stat icon={Flame}    label="Streak"         value={String(p.streak)}            tone="crimson" />
      <Stat icon={Timer}    label="XP today"       value={`+${p.xpToday}`}             tone="gold" />
    </div>
  );
}

function Stat({ icon: Icon, label, value, tone }: { icon: any; label: string; value: string; tone: "crimson" | "gold" }) {
  return (
    <div className="rounded-xl border border-border/70 bg-card-gradient px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
        <Icon className={`h-4 w-4 ${tone === "gold" ? "text-gold" : "text-crimson"}`} /> {label}
      </div>
      <div className={`font-mono text-lg ${tone === "gold" ? "text-gold" : "text-ivory"}`}>{value}</div>
    </div>
  );
}

function GameCardLive({ g }: { g: GameDef }) {
  const p = useProgress();
  const best = p.bestScores[g.id] ?? 0;
  return <GameCard g={g} best={best} />;
}

function GameCard({ g, best }: { g: GameDef; best: number }) {
  const tone = FAMILY_TONE[g.family];
  return (
    <Link
      to={g.to}
      className="group relative rounded-2xl border border-border/70 bg-card-gradient p-7 hover:border-crimson/60 hover:-translate-y-0.5 transition-all overflow-hidden"
    >
      <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-crimson/10 blur-3xl opacity-0 group-hover:opacity-100 transition" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-crimson/50 to-transparent opacity-0 group-hover:opacity-100 transition" />

      <div className="flex items-start justify-between">
        <div className="h-12 w-12 rounded-xl border border-border/70 bg-surface/60 grid place-items-center text-crimson group-hover:shadow-glow transition">
          <g.icon className="h-5 w-5" />
        </div>
        <div className="text-right">
          <span className="font-mono text-[10px] text-muted-foreground">№ {g.n}</span>
          <div className="mt-1 flex justify-end gap-0.5">
            {[1, 2, 3].map((d) => (
              <span
                key={d}
                className={`h-1.5 w-3 rounded-full ${d <= g.difficulty ? "bg-crimson" : "bg-border/70"}`}
              />
            ))}
          </div>
        </div>
      </div>

      <h3 className="mt-6 font-serif text-2xl leading-tight">{g.name}</h3>
      <div className="mt-0.5 text-[11px] uppercase tracking-widest text-muted-foreground">{g.bgName}</div>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{g.body}</p>

      <div className="mt-6 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full border ${tone}`}>
            {g.family}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{g.tag}</span>
        </div>
        {best > 0 ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-gold">
            <Trophy className="h-3 w-3" /> +{best}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs text-crimson opacity-0 group-hover:opacity-100 transition">
            Play <ArrowRight className="h-3 w-3" />
          </span>
        )}
      </div>
    </Link>
  );
}
