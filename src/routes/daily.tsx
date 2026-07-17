import { createFileRoute, Link } from "@tanstack/react-router";
import { ClientOnly } from "@/components/ClientOnly";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Ornament } from "@/components/SlavicMindLogo";
import { WORDS } from "@/data/vocabulary";
import { SpeakButton } from "@/components/SpeakButton";
import { useProgress, addXp, QUEST_TARGETS, toggleFavorite, isFavorite } from "@/lib/progress";
import { Flame, Zap, Sparkles, Star, ChevronRight, CheckCircle2, Circle } from "lucide-react";

export const Route = createFileRoute("/daily")({
  head: () => ({
    meta: [
      { title: "Daily Polish Challenge — Word of the Day | SlavicMind" },
      { name: "description", content: "A daily Polish ritual: word of the day, three quick quests, a micro-quiz, and streak bonuses. Ten focused minutes that compound into fluency." },
      { property: "og:title", content: "Daily Polish challenge — word of the day" },
      { property: "og:description", content: "Ten minutes of Polish a day: word of the day, quests, and micro-quizzes." },
      { property: "og:url", content: "https://slavicmind-app.lovable.app/daily" },
    ],
    links: [{ rel: "canonical", href: "https://slavicmind-app.lovable.app/daily" }],
  }),
  component: () => (<ClientOnly><Daily /></ClientOnly>),
});

// Deterministic word-of-day from date
function wordOfDay() {
  const today = new Date();
  const seed = today.getFullYear() * 1000 + today.getMonth() * 31 + today.getDate();
  return WORDS[seed % WORDS.length];
}

function Daily() {
  const p = useProgress();
  const word = useMemo(() => wordOfDay(), []);
  const fav = isFavorite(word.id);

  // Three micro-questions: pick BG translation
  const quiz = useMemo(() => {
    const pool = WORDS.filter((w) => w.id !== word.id);
    const picks: typeof WORDS = [];
    while (picks.length < 3) {
      const candidate = pool[Math.floor(Math.random() * pool.length)];
      if (!picks.includes(candidate)) picks.push(candidate);
    }
    return [word, ...picks].sort(() => Math.random() - 0.5);
  }, [word]);

  const [answer, setAnswer] = useState<string | null>(null);
  const correct = answer === word.id;

  function pick(id: string) {
    if (answer) return;
    setAnswer(id);
    if (id === word.id) addXp(15, "Daily word");
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-5xl px-6 py-12">
          <div className="text-center animate-fade-up">
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">Codzienne wyzwanie</div>
            <h1 className="mt-3 font-serif text-4xl md:text-6xl">Daily Challenge</h1>
            <Ornament className="mx-auto mt-4 w-72 text-crimson" />
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              A small ritual — one word, three quests, and a streak that grows with you.
            </p>
          </div>

          {/* Stats strip */}
          <div className="mt-10 grid sm:grid-cols-3 gap-3">
            <Stat icon={<Flame className="h-4 w-4 text-crimson" />} value={p.streak} label="day streak" />
            <Stat icon={<Zap className="h-4 w-4 text-gold" />} value={p.xpToday} label="XP today" />
            <Stat icon={<Sparkles className="h-4 w-4 text-rose" />} value={p.favorites.length} label="words saved" />
          </div>

          {/* Word of the Day */}
          <div className="mt-10 rounded-2xl border border-border/70 bg-card-gradient p-8 shadow-elegant">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-rose">Słowo dnia · Word of the Day</div>
                <div className="mt-3 font-serif text-5xl md:text-6xl">{word.pl}</div>
                <div className="mt-2 font-mono text-xs text-muted-foreground">/{word.pronunciation}/</div>
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <span><span className="text-muted-foreground">BG · </span>{word.bg}</span>
                  <span><span className="text-muted-foreground">EN · </span>{word.en}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <SpeakButton text={word.pl} lang="pl-PL" size="md" />
                <button
                  onClick={() => toggleFavorite(word.id)}
                  className={`h-10 w-10 grid place-items-center rounded-full border transition ${fav ? "border-crimson text-crimson" : "border-border/70 text-muted-foreground hover:text-ivory"}`}
                  aria-label="Save to favorites"
                >
                  <Star className="h-4 w-4" fill={fav ? "currentColor" : "none"} />
                </button>
              </div>
            </div>
            <div className="mt-6 p-4 rounded-lg bg-surface/60 border border-border/60">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                Example <SpeakButton text={word.example.pl} lang="pl-PL" />
              </div>
              <p className="mt-2 italic">"{word.example.pl}"</p>
              <p className="text-sm text-muted-foreground">{word.example.bg}</p>
            </div>
          </div>

          {/* Micro-quiz */}
          <div className="mt-8 rounded-2xl border border-border/70 bg-card-gradient p-8">
            <div className="text-[10px] uppercase tracking-widest text-rose">Quick quiz · +15 XP</div>
            <h3 className="mt-2 font-serif text-2xl">Which is the Bulgarian for <span className="text-crimson">{word.pl}</span>?</h3>
            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              {quiz.map((q) => {
                const picked = answer === q.id;
                const right = answer && q.id === word.id;
                const wrong = picked && q.id !== word.id;
                return (
                  <button
                    key={q.id}
                    onClick={() => pick(q.id)}
                    disabled={!!answer}
                    className={`px-5 py-4 rounded-xl border text-left transition ${
                      right ? "border-emerald-500/70 bg-emerald-500/10" :
                      wrong ? "border-crimson/70 bg-crimson/10" :
                      "border-border/70 hover:border-crimson/60 hover:bg-surface/60"
                    }`}
                  >
                    {q.bg}
                  </button>
                );
              })}
            </div>
            {answer && (
              <p className="mt-4 text-sm text-muted-foreground">
                {correct ? "Świetnie! +15 XP" : `The answer was "${word.bg}".`}
              </p>
            )}
          </div>

          {/* Daily quests */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {(Object.keys(QUEST_TARGETS) as Array<keyof typeof QUEST_TARGETS>).map((id) => {
              const meta = QUEST_TARGETS[id];
              const done = (p.quests[id] ?? 0) >= meta.total;
              return (
                <div key={id} className="rounded-xl border border-border/70 bg-card-gradient p-5">
                  <div className="flex items-start justify-between">
                    <div className="text-[10px] uppercase tracking-widest text-rose">+{meta.xp} XP</div>
                    {done
                      ? <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      : <Circle className="h-5 w-5 text-muted-foreground" />}
                  </div>
                  <h4 className="mt-2 font-serif text-lg">{meta.title}</h4>
                  <div className="mt-3 h-1.5 rounded-full bg-surface-2 overflow-hidden">
                    <div className="h-full bg-crimson-gradient transition-all" style={{ width: `${Math.min(100, ((p.quests[id] ?? 0) / meta.total) * 100)}%` }} />
                  </div>
                  <div className="mt-2 font-mono text-xs text-muted-foreground">
                    {Math.min(p.quests[id] ?? 0, meta.total)} / {meta.total}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-10 grid sm:grid-cols-3 gap-3">
            <CTA to="/vocabulary" label="Browse vocabulary" sub="Filter by category, save favorites" />
            <CTA to="/games/battle" label="Vocabulary Battle" sub="3 lives · combo XP" />
            <CTA to="/grammar" label="Grammar drills" sub="Cases, conjugation, aspect" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: React.ReactNode; label: string }) {
  return (
    <div className="rounded-xl border border-border/70 bg-card-gradient p-5 flex items-center gap-3">
      <div className="h-10 w-10 rounded-lg border border-border/70 bg-surface/60 grid place-items-center">{icon}</div>
      <div>
        <div className="font-mono text-2xl text-ivory">{value}</div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function CTA({ to, label, sub }: { to: string; label: string; sub: string }) {
  return (
    <Link to={to} className="group rounded-xl border border-border/70 bg-card-gradient p-5 hover:border-crimson/60 transition flex items-center justify-between">
      <div>
        <div className="font-serif text-lg">{label}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-crimson transition" />
    </Link>
  );
}
