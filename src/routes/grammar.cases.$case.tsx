import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { CASES, WORDS } from "@/data/vocabulary";
import { SpeakButton } from "@/components/SpeakButton";
import { addXp, recordGrammarDrill } from "@/lib/progress";
import { ArrowLeft, Check, X, Sparkles } from "lucide-react";

export const Route = createFileRoute("/grammar/cases/$case")({
  head: ({ params }) => {
    const c = CASES.find((x) => x.slug === params.case);
    return {
      meta: [
        { title: `${c?.name ?? "Case"} — SlavicMind Grammar` },
        { name: "description", content: c?.intro ?? "Polish grammar case." },
      ],
    };
  },
  component: CaseDetail,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="font-serif text-3xl">Case not found</h1>
        <Link to="/grammar" className="mt-4 inline-block text-crimson">← Back to grammar</Link>
      </div>
    </div>
  ),
});

function CaseDetail() {
  const { case: slug } = Route.useParams();
  const c = CASES.find((x) => x.slug === slug);
  if (!c) throw notFound();

  useEffect(() => { recordGrammarDrill(); }, [slug]);

  // Mini quiz: pick the case-question for a given example
  const quizPool = useMemo(() => {
    return CASES.map((x) => x.question);
  }, []);
  const [picked, setPicked] = useState<string | null>(null);
  const correct = picked === c.question;
  const onPick = (q: string) => {
    if (picked) return;
    setPicked(q);
    if (q === c.question) addXp(20, `Quiz · ${c.name}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-5xl px-6 py-12">
          <Link to="/grammar" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ivory">
            <ArrowLeft className="h-4 w-4" /> All cases
          </Link>

          <div className="mt-6 animate-fade-up">
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">{c.bg} · {c.en}</div>
            <h1 className="mt-3 font-serif text-5xl md:text-6xl">{c.name}</h1>
            <div className="mt-2 font-mono text-crimson">{c.question} · <span className="text-rose">{c.questionBg}</span></div>
            <p className="mt-4 text-muted-foreground max-w-2xl">{c.intro}</p>
          </div>

          <div className="mt-10 grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-2xl border border-border/70 bg-card-gradient p-7">
              <div className="text-xs uppercase tracking-[0.3em] text-rose">Endings</div>
              <h3 className="mt-3 font-serif text-2xl">Końcówki</h3>
              <table className="mt-5 w-full text-sm">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    <th className="text-left py-2">Number</th>
                    <th className="text-left py-2">m</th>
                    <th className="text-left py-2">f</th>
                    <th className="text-left py-2">n</th>
                  </tr>
                </thead>
                <tbody>
                  {c.endings.map((row) => (
                    <tr key={row.label} className="border-t border-border/60">
                      <td className="py-3 font-mono text-muted-foreground">{row.label}</td>
                      <td className="py-3 font-serif text-lg">{row.m}</td>
                      <td className="py-3 font-serif text-lg">{row.f}</td>
                      <td className="py-3 font-serif text-lg">{row.n}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-2xl border border-border/70 bg-card-gradient p-7">
              <div className="text-xs uppercase tracking-[0.3em] text-rose">Prepositions</div>
              <h3 className="mt-3 font-serif text-2xl">Przyimki</h3>
              {c.prepositions.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">— no fixed prepositions —</p>
              ) : (
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.prepositions.map((p) => (
                    <span key={p} className="px-3 py-1.5 rounded-full border border-border/70 bg-surface/60 font-mono text-sm">{p}</span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-border/70 bg-card-gradient p-7">
            <div className="text-xs uppercase tracking-[0.3em] text-rose">Example</div>
            <div className="mt-3 flex items-center gap-3 flex-wrap">
              <h3 className="font-serif text-3xl">{c.example.pl}</h3>
              <SpeakButton text={c.example.pl} lang="pl-PL" size="md" />
            </div>
            <p className="mt-2 text-muted-foreground">{c.example.bg}</p>
          </div>

          {/* Mini quiz */}
          <div className="mt-8 rounded-2xl border border-border/70 bg-card-gradient p-7">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-rose">Quick check</div>
                <h3 className="mt-2 font-serif text-2xl">Which question fits {c.name}?</h3>
              </div>
              <span className="text-xs text-muted-foreground">+20 XP</span>
            </div>
            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              {quizPool.map((q) => {
                const isPicked = picked === q;
                const isCorrect = q === c.question;
                let cls = "border-border/70 hover:border-crimson/60";
                if (picked) {
                  if (isCorrect) cls = "border-emerald-500/60 bg-emerald-500/5";
                  else if (isPicked) cls = "border-destructive/60 bg-destructive/5";
                  else cls = "border-border/40 opacity-60";
                }
                return (
                  <button
                    key={q}
                    onClick={() => onPick(q)}
                    className={`text-left px-4 py-3 rounded-lg border font-mono text-sm transition flex items-center justify-between ${cls}`}
                  >
                    <span>{q}</span>
                    {picked && isCorrect && <Check className="h-4 w-4 text-emerald-400" />}
                    {picked && isPicked && !isCorrect && <X className="h-4 w-4 text-destructive" />}
                  </button>
                );
              })}
            </div>
            {picked && (
              <div className="mt-4 text-sm flex items-center gap-2 text-muted-foreground">
                <Sparkles className="h-4 w-4 text-gold" />
                {correct ? "Beautiful — that's the case." : `Not quite — the right question is ${c.question}.`}
              </div>
            )}
          </div>

          {/* Sample words from vocabulary tagged with relevant POS */}
          <div className="mt-10 text-xs uppercase tracking-widest text-muted-foreground">Try declining these nouns mentally</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {WORDS.filter((w) => w.pos === "noun").slice(0, 12).map((w) => (
              <span key={w.id} className="px-3 py-1.5 rounded-full border border-border/60 bg-surface/40 text-sm">
                {w.pl} <span className="text-rose font-mono text-xs">·{w.gender}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
