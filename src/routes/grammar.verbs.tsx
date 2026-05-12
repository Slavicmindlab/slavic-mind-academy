import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SpeakButton } from "@/components/SpeakButton";
import { VERB_GOVERNANCE, CASE_LABELS } from "@/data/grammar";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/grammar/verbs")({
  head: () => ({
    meta: [
      { title: "Verbs & cases — SlavicMind" },
      { name: "description", content: "Polish verbs and the cases or prepositions they require." },
    ],
  }),
  component: VerbsPage,
});

function VerbsPage() {
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
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">Czasowniki & przypadki</div>
            <h1 className="mt-3 font-serif text-5xl">Verbs and the cases they govern</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl">
              Един от ключовете към полския: всеки глагол носи със себе си падеж или предлог.
              Запомни глагола заедно с управлението му.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {VERB_GOVERNANCE.map((v) => (
              <div key={v.verb} className="rounded-2xl border border-border/70 bg-card-gradient p-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-serif text-2xl">{v.verb}</span>
                  <SpeakButton text={v.verb} />
                  <span className="text-sm text-muted-foreground">{v.bg} · {v.en}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {v.governs.map((g, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full border border-crimson/40 bg-crimson/5 text-xs font-mono">
                      {g.prep ? `${g.prep} + ` : ""}{CASE_LABELS[g.case].pl}
                      <span className="text-muted-foreground"> · {CASE_LABELS[g.case].bg}</span>
                    </span>
                  ))}
                </div>
                {v.governs.map((g, i) => (
                  <p key={i} className="mt-2 text-sm text-muted-foreground">{g.note}</p>
                ))}
                <div className="mt-3 pt-3 border-t border-border/60 flex items-center gap-3 flex-wrap">
                  <span className="font-serif text-lg">{v.example.pl}</span>
                  <SpeakButton text={v.example.pl} />
                  <span className="text-sm text-muted-foreground">— {v.example.bg}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
