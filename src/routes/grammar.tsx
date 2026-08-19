import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Ornament } from "@/components/SlavicMindLogo";
import { CASES } from "@/data/vocabulary";
import { ArrowRight, BookOpen } from "lucide-react";

export const Route = createFileRoute("/grammar")({
  head: () => ({
    meta: [
      { title: "Polish Grammar Hub — Cases, Conjugation & Aspect | SlavicMind" },
      { name: "description", content: "The seven Polish cases, four conjugation groups, verb aspect, and verb government — explained side-by-side for Bulgarian and English speakers." },
      { property: "og:title", content: "Polish Grammar — for Bulgarian speakers" },
      { property: "og:description", content: "All seven cases, four conjugation groups, aspect pairs, and verb government in one place." },
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
        <div className="relative mx-auto max-w-7xl px-6 py-12">
          <div className="text-center animate-fade-up">
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">Gramatyka</div>
            <h1 className="mt-3 font-serif text-4xl md:text-6xl">The grammar atelier</h1>
            <Ornament className="mx-auto mt-4 w-72 text-crimson" />
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Седем падежа, шест глаголни лица, две глаголни вида. Малки таблици, чисти примери,
              пояснения на български и английски.
            </p>
          </div>

          <section className="mt-12">
            <h2 className="text-xs uppercase tracking-[0.3em] text-rose">Cases &amp; Declension · Падежи</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Seven cases, each with declension tables, endings and prepositions. Drill them in Case
              Quest or the fill-the-blank game.
            </p>
            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CASES.map((c, i) => (
                <Link
                  key={c.slug}
                  to="/grammar/cases/$case"
                  params={{ case: c.slug }}
                  className="group relative rounded-xl border border-border/70 bg-card-gradient p-6 hover:border-crimson/60 hover:-translate-y-0.5 transition-all overflow-hidden"
                >
                  <div className="font-mono text-xs text-muted-foreground">0{i + 1}</div>
                  <div className="mt-3 font-serif text-2xl">{c.name}</div>
                  <div className="mt-1 text-sm text-crimson/90 font-mono">{c.question}</div>
                  <div className="mt-3 text-xs text-muted-foreground">{c.bg} · {c.en}</div>
                  <ArrowRight className="absolute top-5 right-5 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-crimson transition" />
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
              Conjugation groups, aspect pairs and the verbs you need first — each with an existing drill.
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
