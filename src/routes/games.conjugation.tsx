import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Ornament } from "@/components/SlavicMindLogo";
import { CONJUGATIONS } from "@/data/vocabulary";
import { ArrowLeft, RotateCcw, Sparkles, Check } from "lucide-react";

export const Route = createFileRoute("/games/conjugation")({
  head: () => ({
    meta: [
      { title: "Conjugation Drill — SlavicMind" },
      { name: "description", content: "Drill the present tense paradigm of Polish verbs." },
    ],
  }),
  component: Conjugation,
});

const PRONOUNS = [
  { key: "ja", label: "ja", bg: "аз" },
  { key: "ty", label: "ty", bg: "ти" },
  { key: "on", label: "on / ona", bg: "той / тя" },
  { key: "my", label: "my", bg: "ние" },
  { key: "wy", label: "wy", bg: "вие" },
  { key: "oni", label: "oni / one", bg: "те" },
] as const;

function Conjugation() {
  const [idx, setIdx] = useState(0);
  const verb = CONJUGATIONS[idx];
  const [vals, setVals] = useState<Record<string, string>>({});
  const [xp, setXp] = useState(0);

  useEffect(() => { setVals({}); }, [idx]);

  const correctness = useMemo(() => {
    const r: Record<string, boolean | null> = {};
    for (const p of PRONOUNS) {
      const v = (vals[p.key] || "").trim().toLowerCase();
      const target = verb.forms[p.key as keyof typeof verb.forms];
      r[p.key] = v ? v === target : null;
    }
    return r;
  }, [vals, verb]);

  const allRight = PRONOUNS.every((p) => correctness[p.key] === true);

  const next = () => {
    if (allRight) setXp((x) => x + 60);
    setIdx((i) => (i + 1) % CONJUGATIONS.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-6 py-10">
          <div className="flex items-center justify-between">
            <Link to="/games" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ivory">
              <ArrowLeft className="h-4 w-4" /> Mind games
            </Link>
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">Mind game · 05</div>
          </div>

          <div className="mt-6 text-center">
            <h1 className="font-serif text-4xl md:text-6xl">Conjugation Drill</h1>
            <Ornament className="mx-auto mt-4 w-64 text-crimson" />
            <p className="mt-4 text-muted-foreground">Czas teraźniejszy — the Polish present tense.</p>
          </div>

          {/* Verb card */}
          <div className="mt-8 rounded-2xl border border-border/70 bg-card-gradient p-7">
            <div className="flex items-baseline justify-between flex-wrap gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-crimson">Infinitive · Bezokolicznik</div>
                <h2 className="mt-2 font-serif text-4xl">{verb.infinitive}</h2>
                <div className="mt-1 text-sm text-muted-foreground">{verb.bg} · {verb.en}</div>
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                Verb {idx + 1} / {CONJUGATIONS.length} · <span className="text-gold">+{xp} XP</span>
              </span>
            </div>

            <div className="mt-7 divide-y divide-border/60">
              {PRONOUNS.map((p) => {
                const state = correctness[p.key];
                return (
                  <div key={p.key} className="grid grid-cols-[7rem_1fr_auto] gap-3 items-center py-3">
                    <div>
                      <div className="font-serif text-lg">{p.label}</div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.bg}</div>
                    </div>
                    <input
                      value={vals[p.key] || ""}
                      onChange={(e) => setVals((v) => ({ ...v, [p.key]: e.target.value }))}
                      placeholder="…"
                      className={`px-4 py-2.5 rounded-lg bg-surface/60 border outline-none font-serif text-lg transition
                        ${state === true ? "border-crimson text-ivory"
                          : state === false ? "border-rose/70 text-rose"
                          : "border-border/70 focus:border-crimson"}`}
                    />
                    <div className="w-6 grid place-items-center">
                      {state === true && <Check className="h-4 w-4 text-crimson" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                onClick={() => setVals({})}
                className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-border/70 hover:bg-surface-2 transition"
              >
                <RotateCcw className="h-4 w-4" /> Clear
              </button>
              <button
                onClick={next}
                disabled={!allRight}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition
                  ${allRight ? "bg-crimson-gradient text-ivory shadow-glow" : "border border-border/70 text-muted-foreground"}`}
              >
                <Sparkles className="h-4 w-4" /> Next verb
              </button>
            </div>
          </div>

          {allRight && (
            <div className="animate-fade-up mt-6 text-center text-sm text-muted-foreground">
              <span className="text-crimson font-mono">✓ paradigm complete</span> — bardzo dobrze!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
