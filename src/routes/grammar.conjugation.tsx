import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SpeakButton } from "@/components/SpeakButton";
import { CONJUGATION_GROUPS, CONJ_VERBS, PRONOUNS, type ConjugationGroup } from "@/data/grammar";
import { addXp, recordGrammarDrill } from "@/lib/progress";
import { ArrowLeft, Sparkles } from "lucide-react";

export const Route = createFileRoute("/grammar/conjugation")({
  head: () => ({
    meta: [
      { title: "Polish conjugation — SlavicMind" },
      { name: "description", content: "All four Polish conjugation groups with present, past, and aspect pairs." },
    ],
  }),
  component: ConjugationPage,
});

function ConjugationPage() {
  const [group, setGroup] = useState<ConjugationGroup>("I");
  const verbs = useMemo(() => CONJ_VERBS.filter((v) => v.group === group), [group]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6 py-12">
          <Link to="/grammar" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ivory">
            <ArrowLeft className="h-4 w-4" /> Grammar
          </Link>
          <div className="mt-6 animate-fade-up">
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">Koniugacja</div>
            <h1 className="mt-3 font-serif text-5xl">The four conjugation groups</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              Полските глаголи се делят на четири групи спрямо окончанията в сегашно време.
              Изберете група и разгледайте парадигмата.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {(Object.keys(CONJUGATION_GROUPS) as ConjugationGroup[]).map((g) => (
              <button
                key={g}
                onClick={() => { setGroup(g); recordGrammarDrill(); }}
                className={`px-4 py-2 rounded-md border text-sm font-mono transition ${
                  group === g
                    ? "border-crimson/60 bg-crimson/10 text-ivory"
                    : "border-border/70 bg-surface/40 text-muted-foreground hover:text-ivory"
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-border/70 bg-card-gradient p-7">
            <div className="font-serif text-2xl">{CONJUGATION_GROUPS[group].name}</div>
            <div className="mt-1 font-mono text-crimson text-sm">{CONJUGATION_GROUPS[group].pattern}</div>
            <p className="mt-2 text-sm text-muted-foreground">{CONJUGATION_GROUPS[group].bg}</p>
          </div>

          <div className="mt-6 grid lg:grid-cols-2 gap-5">
            {verbs.length === 0 && (
              <div className="text-sm text-muted-foreground">No verbs catalogued for this group yet.</div>
            )}
            {verbs.map((v) => (
              <div key={v.infinitive} className="rounded-2xl border border-border/70 bg-card-gradient p-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-serif text-2xl">{v.infinitive}</h3>
                  <SpeakButton text={v.infinitive} />
                  <span className="text-xs px-2 py-0.5 rounded-full border border-border/60 text-muted-foreground font-mono">
                    {v.aspect === "imperf" ? "imperf." : "perf."}
                  </span>
                  {v.pair && <span className="text-xs text-rose font-mono">↔ {v.pair}</span>}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{v.bg} · {v.en}</div>
                <table className="mt-4 w-full text-sm">
                  <tbody>
                    {PRONOUNS.map((p) => (
                      <tr key={p} className="border-t border-border/60">
                        <td className="py-2 pr-3 font-mono text-muted-foreground">{p}</td>
                        <td className="py-2 font-serif text-lg">{v.present[p]}</td>
                        <td className="py-2 text-right">
                          <SpeakButton text={v.present[p]} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-3 text-xs text-muted-foreground">
                  past (m. sg.) · <span className="font-mono text-ivory">{v.past_m_sg}</span>
                </div>
                <button
                  onClick={() => addXp(15, `Conjugation · ${v.infinitive}`)}
                  className="mt-4 inline-flex items-center gap-2 text-xs text-crimson hover:opacity-80"
                >
                  <Sparkles className="h-3.5 w-3.5" /> I memorised this (+15 XP)
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
