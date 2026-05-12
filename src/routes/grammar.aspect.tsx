import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SpeakButton } from "@/components/SpeakButton";
import { ASPECT_PAIRS } from "@/data/grammar";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/grammar/aspect")({
  head: () => ({
    meta: [
      { title: "Verb aspect — SlavicMind" },
      { name: "description", content: "Polish verb aspect explained: imperfective vs perfective, with paired examples." },
    ],
  }),
  component: AspectPage,
});

function AspectPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-5xl px-6 py-12">
          <Link to="/grammar" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ivory">
            <ArrowLeft className="h-4 w-4" /> Grammar
          </Link>
          <div className="mt-6 animate-fade-up">
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">Aspekt</div>
            <h1 className="mt-3 font-serif text-5xl">Imperfective ↔ Perfective</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl">
              Двата вида (imperfective / perfective) са сърцето на полската глаголна система.
              Imperfective описва процеса; perfective — завършения резултат.
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {ASPECT_PAIRS.map((p) => (
              <div key={p.imperf} className="rounded-2xl border border-border/70 bg-card-gradient p-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-serif text-2xl">{p.imperf}</span>
                  <SpeakButton text={p.imperf} />
                  <span className="text-muted-foreground">↔</span>
                  <span className="font-serif text-2xl text-rose">{p.perf}</span>
                  <SpeakButton text={p.perf} />
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{p.bg} · {p.en}</div>
                <p className="mt-3 text-sm text-ivory/80 italic">{p.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
