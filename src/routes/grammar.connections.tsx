import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SpeakButton } from "@/components/SpeakButton";
import { VERB_GOVERNANCE, CASE_LABELS, CASE_ORDER, type CaseSlug } from "@/data/grammar";
import { ArrowLeft, Search, Link2 } from "lucide-react";

export const Route = createFileRoute("/grammar/connections")({
  head: () => ({
    meta: [
      { title: "Verb ↔ Case connections — SlavicMind" },
      {
        name: "description",
        content:
          "Searchable map of Polish verbs and the cases or prepositions they require — słuchać + dopełniacz, pomagać + celownik, interesować się + narzędnik.",
      },
    ],
  }),
  component: ConnectionsPage,
});

type Filter = "all" | CaseSlug;

function ConnectionsPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return VERB_GOVERNANCE.filter((v) => {
      if (filter !== "all" && !v.governs.some((g) => g.case === filter)) return false;
      if (!needle) return true;
      const hay = `${v.verb} ${v.bg} ${v.en} ${v.example.pl} ${v.example.bg} ${v.governs
        .map((g) => `${g.case} ${g.prep ?? ""} ${g.note}`)
        .join(" ")}`.toLowerCase();
      return hay.includes(needle);
    });
  }, [q, filter]);

  // group by primary case for the stats strip
  const counts = useMemo(() => {
    const c: Record<CaseSlug, number> = {
      mianownik: 0, dopelniacz: 0, celownik: 0, biernik: 0,
      narzednik: 0, miejscownik: 0, wolacz: 0,
    };
    VERB_GOVERNANCE.forEach((v) => v.governs.forEach((g) => { c[g.case] += 1; }));
    return c;
  }, []);

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
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">Połączenia</div>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl flex items-center gap-3">
              Verb ↔ Case connections
              <Link2 className="h-7 w-7 text-crimson" />
            </h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              Which case (or preposition + case) does each Polish verb demand?
              Полезен бърз справочник: <span className="font-mono text-rose">słuchać + dopełniacz</span>,{" "}
              <span className="font-mono text-rose">pomagać + celownik</span>,{" "}
              <span className="font-mono text-rose">interesować się + narzędnik</span>.
            </p>
          </div>

          {/* Case filter strip */}
          <div className="mt-8 flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-full border text-xs transition ${
                filter === "all"
                  ? "border-crimson text-crimson bg-surface/60"
                  : "border-border/70 text-muted-foreground hover:text-ivory"
              }`}
            >
              All · {VERB_GOVERNANCE.length}
            </button>
            {CASE_ORDER.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-3 py-1.5 rounded-full border text-xs transition ${
                  filter === c
                    ? "border-crimson text-crimson bg-surface/60"
                    : "border-border/70 text-muted-foreground hover:text-ivory"
                }`}
              >
                {CASE_LABELS[c].pl} · {counts[c]}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="mt-6 relative">
            <Search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search verbs, meanings, prepositions, examples…"
              className="w-full pl-11 pr-4 py-3 rounded-lg bg-surface/60 border border-border/70 focus:border-crimson outline-none transition placeholder:text-muted-foreground"
            />
          </div>

          {/* Cards */}
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {filtered.map((v) => (
              <div
                key={v.verb}
                className="rounded-2xl border border-border/70 bg-card-gradient p-6 hover:border-crimson/60 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-serif text-2xl">{v.verb}</h3>
                      <SpeakButton text={v.verb} />
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {v.bg} · {v.en}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {v.governs.map((g, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-crimson/40 bg-crimson/5 text-ivory font-mono"
                      title={g.note}
                    >
                      {g.prep && <span className="text-rose">{g.prep}</span>}
                      <span className="text-crimson">{CASE_LABELS[g.case].pl}</span>
                      <span className="text-muted-foreground">· {CASE_LABELS[g.case].bg}</span>
                    </span>
                  ))}
                </div>

                <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                  {v.governs.map((g, i) => (
                    <li key={i} className="leading-relaxed">— {g.note}</li>
                  ))}
                </ul>

                <div className="mt-5 rounded-lg border border-border/60 bg-surface/40 p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Example</span>
                    <SpeakButton text={v.example.pl} />
                  </div>
                  <p className="mt-2 italic font-serif text-lg">"{v.example.pl}"</p>
                  <p className="mt-1 text-sm text-muted-foreground">{v.example.bg}</p>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-16 text-center text-muted-foreground">
              No connections match — try another verb or case.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
