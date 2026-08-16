import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { ClientOnly } from "@/components/ClientOnly";
import { useProgress, levelFromXp } from "@/lib/progress";
import {
  ArrowRight, BookOpen, Brain, Gamepad2, Languages, Layers, Library,
  Repeat, Route as RouteIcon, Sparkles, Swords, Type, Flame, Zap, Crown,
} from "lucide-react";

const TITLE = "Learn Polish — grammar, vocabulary and mind games | SlavicMind";
const DESC =
  "The SlavicMind Polish hub: all seven cases, verb conjugation and aspect, verb government, 490+ vocabulary entries, folklore stories and ten interactive mind games.";
const URL = "https://slavicmind-app.lovable.app/learn/polish";

export const Route = createFileRoute("/learn/polish")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          name: "Polish for Bulgarian and English speakers",
          description: DESC,
          url: URL,
          inLanguage: "pl",
          teaches: "Polish grammar, cases, verb aspect and vocabulary",
          provider: { "@type": "Organization", name: "SlavicMind", url: "https://slavicmind-app.lovable.app" },
        }),
      },
    ],
  }),
  component: PolishHub,
});

type Item = { to: string; label: string; desc: string; icon: typeof BookOpen };

const GRAMMAR: Item[] = [
  { to: "/grammar", label: "Grammar Lab", desc: "The hub for every Polish grammar system.", icon: Layers },
  { to: "/grammar/cases/mianownik", label: "The seven cases", desc: "Full declension tables, endings and prepositions.", icon: BookOpen },
  { to: "/grammar/conjugation", label: "Conjugation groups", desc: "All four groups with worked paradigms.", icon: Repeat },
  { to: "/grammar/aspect", label: "Verb aspect", desc: "Perfective vs imperfective, explained in Bulgarian.", icon: RouteIcon },
  { to: "/grammar/verbs", label: "Core verbs", desc: "The verbs you actually need first.", icon: Type },
  { to: "/grammar/connections", label: "Verbs → cases", desc: "Which case each verb and preposition governs.", icon: Brain },
];

const VOCAB: Item[] = [
  { to: "/vocabulary", label: "Vocabulary", desc: "490+ entries with gender, plural, audio and examples.", icon: Languages },
  { to: "/daily", label: "Daily ritual", desc: "Word of the day, idiom, micro-quiz and streak.", icon: Sparkles },
];

const PRACTICE: Item[] = [
  { to: "/games", label: "Mind games", desc: "Ten games: crossword, memory, battle, sentence building.", icon: Gamepad2 },
  { to: "/quest", label: "Case Quest", desc: "Seven kingdoms, one per case, with boss trials.", icon: Swords },
  { to: "/games/quiz", label: "Timed quiz", desc: "Rapid vocabulary recall against the clock.", icon: Zap },
];

const READING: Item[] = [
  { to: "/stories", label: "Stories", desc: "Folklore with parallel Polish and Bulgarian text.", icon: Library },
  { to: "/guide/difficulty", label: "Is Polish hard?", desc: "An honest guide for Bulgarian speakers.", icon: BookOpen },
];

function PolishHub() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-hero opacity-60 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 py-14 sm:py-20">
          <div className="text-xs uppercase tracking-[0.3em] text-crimson">Flagship course</div>
          <h1 className="mt-4 font-serif text-4xl sm:text-6xl tracking-tight text-balance">
            Polish, <span className="italic">properly</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Everything SlavicMind has built for Polish, organised into one path: grammar systems,
            vocabulary, practice and reading — with your progress tracked across all of it.
          </p>
          <ClientOnly fallback={<div className="mt-8 h-[86px]" />}>
            <HubStats />
          </ClientOnly>
        </div>
      </section>

      <Group eyebrow="01 · Grammar Lab" title="Master the systems" subtitle="Cases, conjugation, aspect and government — the load-bearing walls of Polish." items={GRAMMAR} />
      <Group eyebrow="02 · Vocabulary" title="Build the words" subtitle="Topic-based vocabulary with pronunciation, gender and real example sentences." items={VOCAB} tinted />
      <Group eyebrow="03 · Practice" title="Train it until it's automatic" subtitle="Interactive games and quests that reward consistency rather than grinding." items={PRACTICE} />
      <Group eyebrow="04 · Reading" title="Meet real Polish" subtitle="Folklore, culture and honest guidance for Bulgarian speakers." items={READING} tinted />

      <section className="border-t border-border/60">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <Flame className="mx-auto h-8 w-8 text-crimson" />
          <h2 className="mt-6 font-serif text-3xl sm:text-5xl tracking-tight text-balance">
            Five minutes a day is enough.
          </h2>
          <Link
            to="/dashboard"
            className="mt-8 inline-flex min-h-[52px] items-center gap-2 rounded-lg bg-crimson-gradient px-7 text-ivory shadow-glow transition hover:opacity-95"
          >
            Go to your dashboard <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function HubStats() {
  const p = useProgress();
  const { level, into, needed } = levelFromXp(p.xp);
  const stats = [
    { icon: Flame, label: "Streak", value: `${p.streak} d` },
    { icon: Zap, label: "Total XP", value: `${p.xp}` },
    { icon: Crown, label: `Level ${level}`, value: `${into}/${needed}` },
  ];
  return (
    <div className="mt-8 grid max-w-lg grid-cols-3 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border border-border/60 bg-surface/40 p-3 backdrop-blur">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
            <s.icon className="h-3 w-3 text-crimson" /> {s.label}
          </div>
          <div className="mt-1 font-serif text-2xl">{s.value}</div>
        </div>
      ))}
    </div>
  );
}

function Group({
  eyebrow, title, subtitle, items, tinted,
}: { eyebrow: string; title: string; subtitle: string; items: Item[]; tinted?: boolean }) {
  return (
    <section className={`border-t border-border/60 ${tinted ? "bg-surface/20" : ""}`}>
      <div className="mx-auto max-w-7xl px-6 py-14">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <Link
              key={i.to}
              to={i.to}
              className="group rounded-2xl border border-border/70 bg-card-gradient p-6 transition hover:-translate-y-0.5 hover:border-crimson/60"
            >
              <i.icon className="h-5 w-5 text-crimson" />
              <div className="mt-4 font-serif text-xl">{i.label}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs text-crimson">
                Open <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
