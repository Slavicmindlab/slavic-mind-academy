import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Ornament } from "@/components/SlavicMindLogo";
import { GrammarTopicCard, type GrammarTopic } from "@/components/GrammarTopicCard";
import { CASES } from "@/data/vocabulary";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Library,
  Repeat,
  Route as RouteIcon,
  Swords,
  Type,
} from "lucide-react";

const CASE_PRACTICE: GrammarTopic[] = [
  {
    to: "/quest",
    title: "Case Quest",
    body: "Seven kingdoms, one per case, with declension trials and boss fights.",
    icon: Swords,
    practice: { to: "/games/fillblank", label: "Fill the blank" },
  },
  {
    to: "/games/fillblank",
    title: "Fill the blank",
    body: "Pick the right case form to complete a real Polish sentence.",
    icon: Type,
  },
];

const VERBS: GrammarTopic[] = [
  {
    to: "/grammar/conjugation",
    title: "Conjugation",
    body: "All four groups: present, past, aspect pairs, audio.",
    icon: Repeat,
    practice: { to: "/games/conjugation", label: "Conjugation drill" },
  },
  {
    to: "/grammar/aspect",
    title: "Verb aspect",
    body: "Imperfective ↔ perfective with paired examples.",
    icon: RouteIcon,
    practice: { to: "/games/fillblank", label: "Aspect practice" },
  },
  {
    to: "/grammar/verbs",
    title: "Verbs & cases",
    body: "Which case or preposition each verb requires.",
    icon: BookOpen,
    practice: { to: "/games/sentence", label: "Sentence syntax" },
  },
];

const REFERENCE: GrammarTopic[] = [
  {
    to: "/grammar/connections",
    title: "Verb ↔ Case map",
    body: "Searchable: słuchać + dopełniacz, pomagać + celownik, interesować się + narzędnik.",
    icon: Brain,
  },
  {
    to: "/vocabulary",
    title: "Vocabulary reference",
    body: "490+ entries with gender, plural and example sentences to test declension against.",
    icon: BookOpen,
  },
  {
    to: "/stories",
    title: "Stories",
    body: "Short readings with parallel Polish and Bulgarian text.",
    icon: Library,
  },
];

// This index route is picked up by TanStack Router's generator during the build step.
// The committed generated route tree predates this file, so typecheck runs before regeneration.
// @ts-expect-error generated route tree is refreshed by the router plugin during build
export const Route = createFileRoute("/grammar/")({
  head: () => ({
    meta: [
      { title: "Polish Grammar Hub — Cases, Conjugation & Aspect | SlavicMind" },
      {
        name: "description",
        content:
          "The seven Polish cases, four conjugation groups, verb aspect, and verb government — explained side-by-side for Bulgarian and English speakers.",
      },
      { property: "og:title", content: "Polish Grammar — for Bulgarian speakers" },
      {
        property: "og:description",
        content:
          "All seven cases, four conjugation groups, aspect pairs, and verb government in one place.",
      },
      { property: "og:url", content: "https://slavicmind-app.lovable.app/grammar" },
    ],
    links: [{ rel: "canonical", href: "https://slavicmind-app.lovable.app/grammar" }],
  }),
  component: GrammarHub,
});

function GrammarHub() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-12">
          <div className="text-center animate-fade-up">
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">Gramatyka</div>
            <h1 className="mt-3 font-serif text-4xl md:text-6xl">The grammar atelier</h1>
            <Ornament className="mx-auto mt-4 w-72 max-w-full text-crimson" />
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Седем падежа, шест глаголни лица, две глаголни вида. Малки таблици, чисти примери,
              пояснения на български и английски.
            </p>
          </div>

          <section className="mt-12">
            <h2 className="text-xs uppercase tracking-[0.3em] text-rose">
              Cases &amp; Declension · Падежи
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Open any case for endings, singular and plural forms in all three genders, example
              sentences, pronunciation and a built-in drill.
            </p>
            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CASES.map((c, i) => (
                <Link
                  key={c.slug}
                  to="/grammar/cases/$case"
                  params={{ case: c.slug }}
                  className="group relative rounded-xl border border-border/70 bg-card-gradient p-5 sm:p-6 hover:border-crimson/60 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson/70 transition-all overflow-hidden"
                >
                  <div className="font-mono text-xs text-muted-foreground">0{i + 1}</div>
                  <div className="mt-3 font-serif text-2xl">{c.name}</div>
                  <div className="mt-1 text-sm text-crimson/90 font-mono">{c.question}</div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    {c.bg} · {c.en}
                  </div>
                  <div className="mt-4 text-[11px] uppercase tracking-[0.16em] text-rose/80">
                    m · f · n · singular · plural · drill
                  </div>
                  <ArrowRight className="absolute top-5 right-5 h-4 w-4 text-muted-foreground opacity-70 sm:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:text-crimson transition" />
                </Link>
              ))}
            </div>
            <div className="mt-4 grid md:grid-cols-2 gap-5">
              {CASE_PRACTICE.map((t) => (
                <GrammarTopicCard key={t.to} topic={t} />
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-xs uppercase tracking-[0.3em] text-rose">Verbs · Глаголи</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Conjugation groups, aspect pairs and the verbs you need first — each with an existing
              drill.
            </p>
            <div className="mt-4 grid md:grid-cols-3 gap-5">
              {VERBS.map((t) => (
                <GrammarTopicCard key={t.to} topic={t} />
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-xs uppercase tracking-[0.3em] text-rose">Reference · Справочник</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Lookup tables and reading material to check yourself against real Polish.
            </p>
            <div className="mt-4 grid md:grid-cols-3 gap-5">
              {REFERENCE.map((t) => (
                <GrammarTopicCard key={t.to} topic={t} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
