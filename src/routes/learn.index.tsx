import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { LanguageCard } from "@/components/LanguageCard";
import { AVAILABLE_LANGUAGES, PLANNED_LANGUAGES } from "@/data/languages";
import { ArrowRight, Compass } from "lucide-react";

const TITLE = "Learn Slavic languages — SlavicMind";
const DESC =
  "Choose your Slavic language. Polish is our flagship course: seven cases, verb aspect, 490+ words, stories and mind games. More Slavic languages are planned.";

export const Route = createFileRoute("/learn/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://slavicmind-app.lovable.app/learn" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "https://slavicmind-app.lovable.app/learn" }],
  }),
  component: LearnIndex,
});

function LearnIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-hero opacity-60 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-3 py-1.5 text-xs backdrop-blur">
            <Compass className="h-3.5 w-3.5 text-crimson" />
            <span className="text-muted-foreground">The SlavicMind ecosystem</span>
          </div>
          <h1 className="mt-6 font-serif text-4xl sm:text-6xl leading-[1.02] tracking-tight text-balance">
            Choose a Slavic language.
            <br />
            <span className="italic text-crimson">Learn how they connect.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            One course is live today and built properly. The rest are on the map, not pretending to
            exist — we publish a language only when its grammar, vocabulary and exercises are real.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <SectionHeading
          eyebrow="Available now"
          title="Ready to learn"
          subtitle="A full course with grammar lab, vocabulary, stories, mind games and progress tracking."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AVAILABLE_LANGUAGES.map((l) => (
            <LanguageCard key={l.code} lang={l} />
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 bg-surface/20">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <SectionHeading
            eyebrow="On the roadmap"
            title="Planned languages"
            subtitle="No fake courses. These entries mark where SlavicMind is heading once Polish has proven itself."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PLANNED_LANGUAGES.map((l) => (
              <LanguageCard key={l.code} lang={l} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/60">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-balance">
            Start where the material is deepest.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Polish is the flagship: seven cases explained in Bulgarian, aspect pairs, verb
            government, folklore stories and ten mind games.
          </p>
          <Link
            to="/learn/polish"
            className="mt-8 inline-flex min-h-[52px] items-center gap-2 rounded-lg bg-crimson-gradient px-7 text-ivory shadow-glow transition hover:opacity-95"
          >
            Open the Polish hub <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
