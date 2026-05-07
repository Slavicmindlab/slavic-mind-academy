import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { WORD_OF_DAY } from "@/data/vocabulary";
import { Flame, Zap, Trophy, Target, ArrowRight, Volume2, Sparkles, BookOpen, Gamepad2, Brain } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — SlavicMind" },
      { name: "description", content: "Your Polish learning dashboard: streak, XP, daily challenge and the word of the day." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-60 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 animate-fade-up">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-crimson">Witaj z powrotem</div>
              <h1 className="mt-3 font-serif text-4xl md:text-5xl">Dobry wieczór, student.</h1>
              <p className="mt-2 text-muted-foreground">Five quiet minutes today. Then a streak begins.</p>
            </div>
            <Link to="/vocabulary" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-crimson-gradient text-ivory text-sm shadow-glow hover:opacity-95 transition">
              Continue learning <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Stat cards */}
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Stat icon={Flame} label="Day streak" value="12" tone="crimson" />
            <Stat icon={Zap} label="XP today" value="240" tone="gold" />
            <Stat icon={Trophy} label="Level" value="7" tone="rose" />
            <Stat icon={Target} label="Accuracy" value="86%" tone="ivory" />
          </div>

          <div className="mt-8 grid lg:grid-cols-3 gap-6">
            <WordOfDay />
            <DailyChallenge />
            <ProgressCard />
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <ShortcutCard icon={BookOpen} title="Vocabulary" body="60+ words across 12 categories with gender & plural" to="/vocabulary" />
            <ShortcutCard icon={Brain} title="Conjugation drill" body="Czas teraźniejszy paradigms" to="/games/conjugation" />
            <ShortcutCard icon={Gamepad2} title="Mind games" body="Memory, Crossword, Quiz, Sentence, Conjugation" to="/games" />
          </div>

          <Quests />
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value, tone }: { icon: any; label: string; value: string; tone: "crimson" | "gold" | "rose" | "ivory" }) {
  const tones: Record<string, string> = {
    crimson: "text-crimson",
    gold: "text-gold",
    rose: "text-rose",
    ivory: "text-ivory",
  };
  return (
    <div className="rounded-xl border border-border/70 bg-card-gradient p-5 hover:border-crimson/40 transition">
      <div className="flex items-center justify-between">
        <Icon className={`h-5 w-5 ${tones[tone]}`} />
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      </div>
      <div className="mt-4 font-serif text-3xl">{value}</div>
    </div>
  );
}

function WordOfDay() {
  const w = WORD_OF_DAY;
  return (
    <div className="lg:col-span-2 rounded-2xl border border-border/70 bg-card-gradient p-8 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-crimson/15 blur-3xl pointer-events-none" />
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-crimson">
        <Sparkles className="h-3 w-3" /> Word of the day
      </div>
      <div className="mt-6 flex items-baseline gap-4 flex-wrap">
        <h2 className="font-serif text-5xl md:text-6xl">{w.pl}</h2>
        <button className="h-10 w-10 grid place-items-center rounded-full border border-border/80 hover:bg-surface-2 transition">
          <Volume2 className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-2 font-mono text-sm text-muted-foreground">/{w.pronunciation}/</div>
      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-surface/60 border border-border/60">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Български</div>
          <div className="mt-1 font-serif text-xl">{w.bg}</div>
        </div>
        <div className="p-4 rounded-lg bg-surface/60 border border-border/60">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">English</div>
          <div className="mt-1 font-serif text-xl">{w.en}</div>
        </div>
      </div>
      <blockquote className="mt-6 border-l-2 border-crimson pl-4 italic text-muted-foreground">
        "{w.example.pl}" — {w.example.bg}
      </blockquote>
    </div>
  );
}

function DailyChallenge() {
  return (
    <div className="rounded-2xl border border-border/70 bg-card-gradient p-6 flex flex-col">
      <div className="text-xs uppercase tracking-[0.3em] text-crimson">Daily challenge</div>
      <h3 className="mt-4 font-serif text-2xl">Brain warm-up</h3>
      <p className="mt-2 text-sm text-muted-foreground">Match 10 Polish words to their Bulgarian translations in under 60 seconds.</p>
      <div className="mt-6 p-4 rounded-lg bg-surface/60 border border-border/60">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Reward</span>
          <span className="font-mono text-gold">+120 XP</span>
        </div>
      </div>
      <button className="mt-auto pt-6">
        <span className="inline-flex w-full items-center justify-center gap-2 px-4 py-3 rounded-lg bg-crimson-gradient text-ivory text-sm shadow-glow hover:opacity-95 transition">
          Start challenge <ArrowRight className="h-4 w-4" />
        </span>
      </button>
    </div>
  );
}

function ProgressCard() {
  const items = [
    { label: "Vocabulary", pct: 64 },
    { label: "Cases", pct: 38 },
    { label: "Grammar", pct: 51 },
    { label: "Listening", pct: 22 },
  ];
  return (
    <div className="lg:col-span-3 rounded-2xl border border-border/70 bg-card-gradient p-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-crimson">Progress</div>
          <h3 className="mt-3 font-serif text-2xl">This month</h3>
        </div>
        <div className="text-sm text-muted-foreground">Level 7 · 1,240 / 2,000 XP</div>
      </div>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((i) => (
          <div key={i.label}>
            <div className="flex items-center justify-between text-sm">
              <span>{i.label}</span>
              <span className="font-mono text-muted-foreground">{i.pct}%</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-surface-2 overflow-hidden">
              <div className="h-full bg-crimson-gradient" style={{ width: `${i.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShortcutCard({ icon: Icon, title, body, to }: { icon: any; title: string; body: string; to: string }) {
  return (
    <Link to={to} className="group rounded-xl border border-border/70 bg-card-gradient p-6 hover:border-crimson/60 hover:-translate-y-0.5 transition-all">
      <Icon className="h-5 w-5 text-crimson" />
      <div className="mt-4 font-serif text-xl">{title}</div>
      <div className="mt-1 text-sm text-muted-foreground">{body}</div>
      <div className="mt-4 inline-flex items-center gap-1 text-xs text-crimson opacity-0 group-hover:opacity-100 transition">
        Open <ArrowRight className="h-3 w-3" />
      </div>
    </Link>
  );
}

function Quests() {
  const quests = [
    { title: "Learn 10 new words", done: 7, total: 10, xp: 50 },
    { title: "Complete 1 case drill", done: 0, total: 1, xp: 80 },
    { title: "Play one mind game", done: 1, total: 1, xp: 40 },
  ];
  return (
    <div className="mt-8 rounded-2xl border border-border/70 bg-card-gradient p-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-crimson">Daily quests</div>
          <h3 className="mt-3 font-serif text-2xl">Three small wins</h3>
        </div>
      </div>
      <ul className="mt-6 divide-y divide-border/60">
        {quests.map((q) => {
          const complete = q.done >= q.total;
          return (
            <li key={q.title} className="py-4 flex items-center gap-4">
              <div className={`h-8 w-8 rounded-full grid place-items-center border ${complete ? "bg-crimson-gradient border-transparent text-ivory" : "border-border/80 text-muted-foreground"}`}>
                <Trophy className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm">{q.title}</div>
                <div className="mt-1 h-1 rounded-full bg-surface-2 overflow-hidden">
                  <div className="h-full bg-crimson-gradient" style={{ width: `${(q.done / q.total) * 100}%` }} />
                </div>
              </div>
              <div className="font-mono text-sm text-gold">+{q.xp} XP</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
