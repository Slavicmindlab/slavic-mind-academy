import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Ornament } from "@/components/SlavicMindLogo";
import { CASES } from "@/data/vocabulary";
import { ArrowRight, BookOpen } from "lucide-react";

export const Route = createFileRoute("/grammar")({
  head: () => ({
    meta: [
      { title: "Grammar — SlavicMind" },
      { name: "description", content: "The seven Polish cases, conjugations and aspect — explained for Bulgarian and English speakers." },
    ],
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

          <div className="mt-12">
            <div className="text-xs uppercase tracking-[0.3em] text-rose">Cases · Падежи</div>
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
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {[
              { to: "/grammar/conjugation", title: "Conjugation", body: "All four groups: present, past, aspect pairs, audio." },
              { to: "/grammar/aspect",      title: "Verb aspect",  body: "Imperfective ↔ perfective with paired examples." },
              { to: "/grammar/verbs",       title: "Verbs & cases", body: "Which case or preposition each verb requires." },
              { to: "/grammar/connections", title: "Verb ↔ Case map", body: "Searchable: słuchać + dopełniacz, pomagać + celownik, interesować się + narzędnik." },
              { to: "/games/conjugation",   title: "Conjugation drill", body: "Practice present tense across six pronouns." },
              { to: "/games/fillblank",     title: "Fill the blank",    body: "Pick the right case form to complete a Polish sentence." },
              { to: "/games/sentence",      title: "Sentence syntax",   body: "Reorder tokens into grammatical sentences." },
              { to: "/stories",             title: "Stories",           body: "Short readings with parallel translation." },
            ].map((x) => (
              <Link key={x.to} to={x.to} className="rounded-2xl border border-border/70 bg-card-gradient p-6 hover:border-crimson/60 transition">
                <BookOpen className="h-6 w-6 text-crimson" />
                <h3 className="mt-4 font-serif text-2xl">{x.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{x.body}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs text-crimson">Open <ArrowRight className="h-3 w-3" /></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
