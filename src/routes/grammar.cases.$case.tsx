import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { CASES } from "@/data/vocabulary";
import { DECLENSIONS, type CaseSlug } from "@/data/grammar";
import { CASE_LESSONS } from "@/data/case-lessons";
import { SpeakButton } from "@/components/SpeakButton";
import { addXp, recordGrammarDrill } from "@/lib/progress";
import { NextStep } from "@/components/NextStep";
import { ArrowLeft, Check, X, Sparkles, RotateCcw } from "lucide-react";

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
      <div className="text-center px-4">
        <h1 className="font-serif text-3xl">Case not found</h1>
        <Link to="/grammar" className="mt-4 inline-block text-crimson">
          ← Back to grammar
        </Link>
      </div>
    </div>
  ),
});

function normalize(value: string) {
  return value.trim().toLocaleLowerCase("pl-PL");
}

function CaseDetail() {
  const { case: slug } = Route.useParams();
  const c = CASES.find((x) => x.slug === slug);
  if (!c) throw notFound();

  const caseSlug = slug as CaseSlug;
  const examples = CASE_LESSONS[caseSlug];

  useEffect(() => {
    recordGrammarDrill();
  }, [slug]);

  const quizPool = useMemo(() => CASES.map((x) => x.question), []);
  const [picked, setPicked] = useState<string | null>(null);
  const correct = picked === c.question;
  const onPick = (q: string) => {
    if (picked) return;
    setPicked(q);
    if (q === c.question) addXp(20, `Quiz · ${c.name}`);
  };

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [exerciseAnswer, setExerciseAnswer] = useState("");
  const [exerciseChecked, setExerciseChecked] = useState(false);
  const currentExercise = examples[exerciseIndex % examples.length];
  const exerciseCorrect = normalize(exerciseAnswer) === normalize(currentExercise.form);

  const checkExercise = () => {
    if (!exerciseAnswer.trim() || exerciseChecked) return;
    setExerciseChecked(true);
    if (normalize(exerciseAnswer) === normalize(currentExercise.form)) {
      addXp(10, `Case drill · ${c.name}`);
    }
  };

  const nextExercise = () => {
    setExerciseIndex((i) => (i + 1) % examples.length);
    setExerciseAnswer("");
    setExerciseChecked(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-12">
          <Link
            to="/grammar"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ivory"
          >
            <ArrowLeft className="h-4 w-4" /> All cases
          </Link>

          <div className="mt-6 animate-fade-up">
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">
              {c.bg} · {c.en}
            </div>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl">{c.name}</h1>
            <div className="mt-2 font-mono text-crimson">
              {c.question} · <span className="text-rose">{c.questionBg}</span>
            </div>
            <p className="mt-4 text-muted-foreground max-w-2xl">{c.intro}</p>
          </div>

          <div className="mt-10 grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-2xl border border-border/70 bg-card-gradient p-5 sm:p-7 overflow-x-auto">
              <div className="text-xs uppercase tracking-[0.3em] text-rose">Endings</div>
              <h3 className="mt-3 font-serif text-2xl">Końcówki</h3>
              <table className="mt-5 w-full min-w-[520px] text-sm">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    <th className="text-left py-2">Number</th>
                    <th className="text-left py-2">masculine</th>
                    <th className="text-left py-2">feminine</th>
                    <th className="text-left py-2">neuter</th>
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

            <div className="rounded-2xl border border-border/70 bg-card-gradient p-5 sm:p-7">
              <div className="text-xs uppercase tracking-[0.3em] text-rose">Prepositions</div>
              <h3 className="mt-3 font-serif text-2xl">Przyimki</h3>
              {c.prepositions.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">— no fixed prepositions —</p>
              ) : (
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.prepositions.map((p) => (
                    <span
                      key={p}
                      className="px-3 py-1.5 rounded-full border border-border/70 bg-surface/60 font-mono text-sm"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <section className="mt-8">
            <div className="text-xs uppercase tracking-[0.3em] text-rose">
              Examples · masculine, feminine, neuter
            </div>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl">Singular and plural in context</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
              Every gender is shown in both numbers. The highlighted form is the form required by
              {` ${c.name}`}.
            </p>
            <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {examples.map((example) => (
                <article
                  key={`${example.gender}-${example.number}`}
                  className="rounded-2xl border border-border/70 bg-card-gradient p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {example.gender === "m"
                        ? "masculine"
                        : example.gender === "f"
                          ? "feminine"
                          : "neuter"}
                      {` · ${example.number}`}
                    </span>
                    <SpeakButton text={example.form} />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2 flex-wrap">
                    <span className="font-serif text-lg text-muted-foreground">{example.lemma}</span>
                    <span className="text-muted-foreground">→</span>
                    <strong className="font-serif text-2xl text-ivory">{example.form}</strong>
                  </div>
                  <div className="mt-4 flex items-start gap-3">
                    <p className="font-serif text-lg leading-relaxed flex-1">{example.sentence}</p>
                    <SpeakButton text={example.sentence} />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{example.bg}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-crimson/30 bg-card-gradient p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-rose">Case exercise</div>
                <h3 className="mt-2 font-serif text-2xl">Write the correct form</h3>
              </div>
              <span className="text-xs text-muted-foreground">+10 XP · {exerciseIndex + 1}/{examples.length}</span>
            </div>

            <div className="mt-5 rounded-xl border border-border/70 bg-surface/35 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="font-serif text-lg sm:text-xl">{currentExercise.prompt}</p>
                <SpeakButton text={currentExercise.sentence} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {currentExercise.gender === "m"
                  ? "masculine"
                  : currentExercise.gender === "f"
                    ? "feminine"
                    : "neuter"}
                {` · ${currentExercise.number}`}
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <input
                value={exerciseAnswer}
                onChange={(e) => {
                  setExerciseAnswer(e.target.value);
                  if (exerciseChecked) setExerciseChecked(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") checkExercise();
                }}
                autoComplete="off"
                spellCheck={false}
                aria-label={`Answer for ${c.name} exercise`}
                placeholder="Type the Polish form…"
                className="min-w-0 flex-1 rounded-lg border border-border/70 bg-background/60 px-4 py-3 text-base outline-none focus:border-crimson/70 focus:ring-2 focus:ring-crimson/20"
              />
              <button
                type="button"
                onClick={checkExercise}
                disabled={!exerciseAnswer.trim() || exerciseChecked}
                className="rounded-lg bg-crimson-gradient px-5 py-3 text-sm font-medium text-ivory disabled:opacity-40"
              >
                Check
              </button>
            </div>

            {exerciseChecked && (
              <div
                className={`mt-4 rounded-lg border p-4 text-sm ${
                  exerciseCorrect
                    ? "border-emerald-500/50 bg-emerald-500/5"
                    : "border-destructive/50 bg-destructive/5"
                }`}
              >
                <div className="flex items-center gap-2 font-medium">
                  {exerciseCorrect ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <X className="h-4 w-4 text-destructive" />
                  )}
                  {exerciseCorrect
                    ? "Dobrze — that form works here."
                    : `Not quite. The correct form is ${currentExercise.form}.`}
                </div>
                <p className="mt-2 text-muted-foreground">{currentExercise.sentence}</p>
                <button
                  type="button"
                  onClick={nextExercise}
                  className="mt-3 inline-flex items-center gap-2 text-crimson hover:text-rose"
                >
                  <RotateCcw className="h-4 w-4" /> Next example
                </button>
              </div>
            )}
          </section>

          <div className="mt-8 rounded-2xl border border-border/70 bg-card-gradient p-5 sm:p-7">
            <div className="text-xs uppercase tracking-[0.3em] text-rose">Quick check</div>
            <div className="mt-2 flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-serif text-2xl">Which question fits {c.name}?</h3>
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
                    type="button"
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

          <div className="mt-10">
            <div className="text-xs uppercase tracking-[0.3em] text-rose">
              Paradigms · sample nouns
            </div>
            <h3 className="mt-2 font-serif text-2xl">Full declension reference</h3>
            <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DECLENSIONS.map((d) => {
                const sg = d.singular[caseSlug];
                const pl = d.plural[caseSlug];
                return (
                  <div
                    key={d.lemma}
                    className="rounded-2xl border border-border/70 bg-card-gradient p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-serif text-xl">{d.lemma}</div>
                        <div className="text-xs text-muted-foreground">
                          {d.bg} · {d.en} · <span className="font-mono text-rose">{d.gender}</span>
                        </div>
                      </div>
                      <SpeakButton text={d.lemma} />
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <div className="rounded-md border border-border/60 bg-surface/40 p-2 min-w-0">
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                          singular
                        </div>
                        <div className="mt-1 flex items-center justify-between gap-2 min-w-0">
                          <span className="font-serif text-lg text-ivory break-words">{sg}</span>
                          <SpeakButton text={sg} />
                        </div>
                      </div>
                      <div className="rounded-md border border-border/60 bg-surface/40 p-2 min-w-0">
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                          plural
                        </div>
                        <div className="mt-1 flex items-center justify-between gap-2 min-w-0">
                          <span className="font-serif text-lg text-ivory break-words">{pl}</span>
                          <SpeakButton text={pl} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <NextStep
            title={`Practise ${c.name}`}
            links={[
              { to: "/quest", label: "Case Quest — the seven kingdoms" },
              { to: "/games/fillblank", label: "Fill the blank drill" },
              { to: "/grammar", label: "Back to Grammar Lab" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
