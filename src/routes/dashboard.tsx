import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { WORD_OF_DAY } from "@/data/vocabulary";
import { SpeakButton } from "@/components/SpeakButton";
import { useProgress, levelFromXp, QUEST_TARGETS, addXp } from "@/lib/progress";
import { Flame, Zap, Trophy, Target, ArrowRight, Sparkles, BookOpen, Gamepad2, Brain, Award } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — SlavicMind" },
      { name: "description", content: "Your Polish learning dashboard: streak, XP, daily challenges and the word of the day." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const p = useProgress();
  const lvl = levelFromXp(p.xp);
  const accuracy = Object.keys(p.bestScores).length === 0 ? "—" : `${Math.min(99, 60 + p.streak * 3)}%`;

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

          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Stat icon={Flame} label="Day streak" value={String(p.streak)} tone="crimson" />
            <Stat icon={Zap} label="XP today" value={String(p.xpToday)} tone="gold" />
            <Stat icon={Trophy} label="Level" value={String(lvl.level)} tone="rose" />
            <Stat icon={Target} label="Accuracy" value={accuracy} tone="ivory" />
          </div>

          <div className="mt-8 grid lg:grid-cols-3 gap-6">
            <WordOfDay />
            <DailyChallenge />
            <ProgressCard total={p.xp} into={lvl.into} needed={lvl.needed} level={lvl.level} />
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <ShortcutCard icon={BookOpen} title="Vocabulary" body="180+ words across 24 categories" to="/vocabulary" />
            <ShortcutCard icon={Brain} title="Grammar & cases" body="Seven Polish cases, declension tables" to="/grammar" />
            <ShortcutCard icon={Gamepad2} title="Mind games" body="Memory, Crossword, Quiz, Sentence, Match" to="/games" />
          </div>

          <div className="mt-8 grid lg:grid-cols-3 gap-6">
            <Quests p={p} />
            <Achievements p={p} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value, tone }: { icon: any; label: string; value: string; tone: "crimson" | "gold" | "rose" | "ivory" }) {
  const tones: Record<string, string> = { crimson: "text-crimson", gold: "text-gold", rose: "text-rose", ivory: "text-ivory" };
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
        <SpeakButton text={w.pl} lang="pl-PL" size="md" />
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
      <blockquote className="mt-6 border-l-2 border-crimson pl-4 italic text-muted-foreground flex items-start gap-2">
        <span>"{w.example.pl}" — {w.example.bg}</span>
        <SpeakButton text={w.example.pl} lang="pl-PL" />
      </blockquote>
    </div>
  );
}

function DailyChallenge() {
  return (
    <div className="rounded-2xl border border-border/70 bg-card-gradient p-6 flex flex-col">
      <div className="text-xs uppercase tracking-[0.3em] text-crimson">Daily challenge</div>
      <h3 className="mt-4 font-serif text-2xl">Brain warm-up</h3>
      <p className="mt-2 text-sm text-muted-foreground">Match 12 Polish words to their Bulgarian translations in under 60 seconds.</p>
      <div className="mt-6 p-4 rounded-lg bg-surface/60 border border-border/60">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Reward</span>
          <span className="font-mono text-gold">+120 XP</span>
        </div>
      </div>
      <Link to="/games/quiz" onClick={() => addXp(10, "Daily warm-up bonus")} className="mt-auto pt-6">
        <span className="inline-flex w-full items-center justify-center gap-2 px-4 py-3 rounded-lg bg-crimson-gradient text-ivory text-sm shadow-glow hover:opacity-95 transition">
          Start challenge <ArrowRight className="h-4 w-4" />
        </span>
      </Link>
    </div>
  );
}

function ProgressCard({ total, into, needed, level }: { total: number; into: number; needed: number; level: number }) {
  const pct = needed === 0 ? 100 : Math.round((into / needed) * 100);
  return (
    <div className="lg:col-span-3 rounded-2xl border border-border/70 bg-card-gradient p-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-crimson">Progress</div>
          <h3 className="mt-3 font-serif text-2xl">Level {level}</h3>
        </div>
        <div className="text-sm text-muted-foreground font-mono">{into} / {needed} XP · total {total}</div>
      </div>
      <div className="mt-5 h-2.5 rounded-full bg-surface-2 overflow-hidden">
        <div className="h-full bg-crimson-gradient transition-all duration-700" style={{ width: `${pct}%` }} />
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

function Quests({ p }: { p: ReturnType<typeof useProgress> }) {
  const ids: (keyof typeof QUEST_TARGETS)[] = ["learn_words", "play_game", "grammar_drill"];
  return (
    <div className="lg:col-span-2 rounded-2xl border border-border/70 bg-card-gradient p-8">
      <div className="text-xs uppercase tracking-[0.3em] text-crimson">Daily quests</div>
      <h3 className="mt-3 font-serif text-2xl">Three small wins</h3>
      <ul className="mt-6 divide-y divide-border/60">
        {ids.map((id) => {
          const q = QUEST_TARGETS[id];
          const done = Math.min(p.quests[id], q.total);
          const complete = done >= q.total;
          return (
            <li key={id} className="py-4 flex items-center gap-4">
              <div className={`h-8 w-8 rounded-full grid place-items-center border ${complete ? "bg-crimson-gradient border-transparent text-ivory" : "border-border/80 text-muted-foreground"}`}>
                <Trophy className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm">{q.title}</div>
                <div className="mt-1 h-1 rounded-full bg-surface-2 overflow-hidden">
                  <div className="h-full bg-crimson-gradient" style={{ width: `${(done / q.total) * 100}%` }} />
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

const ACH_LABELS: Record<string, string> = {
  first_word: "First saved word",
  first_game: "First game played",
  streak_3: "3-day streak",
  streak_7: "7-day streak",
  level_5: "Reached level 5",
  vocab_explorer: "25 favorites",
  polyglot: "100 favorites",
};

function Achievements({ p }: { p: ReturnType<typeof useProgress> }) {
  const all = Object.keys(ACH_LABELS);
  return (
    <div className="rounded-2xl border border-border/70 bg-card-gradient p-8">
      <div className="text-xs uppercase tracking-[0.3em] text-crimson">Badges</div>
      <h3 className="mt-3 font-serif text-2xl">Achievements</h3>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {all.map((id) => {
          const earned = p.achievements.includes(id as any);
          return (
            <div key={id} className={`p-3 rounded-lg border text-xs flex items-center gap-2 ${earned ? "border-crimson/50 bg-surface/60" : "border-border/60 bg-surface/20 opacity-40"}`}>
              <Award className={`h-4 w-4 ${earned ? "text-gold" : "text-muted-foreground"}`} />
              <span>{ACH_LABELS[id]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
