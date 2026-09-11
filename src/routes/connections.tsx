import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import {
  CONNECTION_KIND_LABELS,
  SLAVIC_CONNECTIONS,
  type ConnectionKind,
} from "@/data/slavic-connections";
import { ArrowLeft, ArrowRight, BookOpen, Search, Sparkles } from "lucide-react";

type Filter = "all" | ConnectionKind;

// @ts-expect-error routeTree.gen.ts is regenerated during the production build.
export const Route = createFileRoute("/connections")({
  head: () => ({
    meta: [
      { title: "Slavic Connections — Bulgarian ↔ Polish | SlavicMind" },
      {
        name: "description",
        content:
          "Compare Bulgarian and Polish through cognates, false friends, sound correspondences and grammar bridges built specifically for Slavic learners.",
      },
    ],
  }),
  component: ConnectionsPage,
});

function ConnectionsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return SLAVIC_CONNECTIONS.filter((item) => {
      if (filter !== "all" && item.kind !== filter) return false;
      if (!needle) return true;
      const haystack = `${item.title} ${item.summary} ${item.bg} ${item.pl} ${item.note} ${item.examples
        .map((example) => `${example.bg} ${example.pl}`)
        .join(" ")}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [filter, query]);

  const kinds = Object.keys(CONNECTION_KIND_LABELS) as ConnectionKind[];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ivory"
          >
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>

          <header className="mt-7 max-w-3xl animate-fade-up">
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">
              Slavic Connections
            </div>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl leading-tight">
              Bulgarian already gives you clues to Polish.
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
              Не просто списък със сходни думи. Тук виждаш кои прилики можеш да използваш, къде
              сходството подвежда и как българският ти помага да разбереш полската граматика.
            </p>
          </header>

          <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kinds.map((kind) => {
              const label = CONNECTION_KIND_LABELS[kind];
              const count = SLAVIC_CONNECTIONS.filter((item) => item.kind === kind).length;
              return (
                <button
                  key={kind}
                  type="button"
                  onClick={() => setFilter(filter === kind ? "all" : kind)}
                  className={`text-left rounded-xl border p-4 transition ${
                    filter === kind
                      ? "border-crimson/70 bg-crimson/5"
                      : "border-border/70 bg-surface/30 hover:border-crimson/50"
                  }`}
                >
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {count} connections
                  </div>
                  <div className="mt-2 font-serif text-xl">{label.title}</div>
                  <div className="mt-1 text-xs text-rose">{label.bg}</div>
                </button>
              );
            })}
          </section>

          <div className="mt-6 relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search вода, woda, гора, cases…"
              className="w-full rounded-lg border border-border/70 bg-surface/50 py-3 pl-11 pr-4 outline-none transition placeholder:text-muted-foreground focus:border-crimson"
            />
          </div>

          <section className="mt-8 grid gap-5 md:grid-cols-2">
            {filtered.map((item) => {
              const label = CONNECTION_KIND_LABELS[item.kind];
              return (
                <article
                  key={item.id}
                  className="rounded-2xl border border-border/70 bg-card-gradient p-5 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-crimson">
                        {label.title} · {label.bg}
                      </div>
                      <h2 className="mt-2 font-serif text-2xl sm:text-3xl">{item.title}</h2>
                    </div>
                    <Sparkles className="h-5 w-5 shrink-0 text-gold" />
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {item.summary}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-border/60 bg-surface/40 p-3">
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        Bulgarian
                      </div>
                      <div className="mt-1 font-serif text-lg">{item.bg}</div>
                    </div>
                    <div className="rounded-lg border border-border/60 bg-surface/40 p-3">
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        Polish
                      </div>
                      <div className="mt-1 font-serif text-lg">{item.pl}</div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {item.examples.map((example) => (
                      <div key={`${item.id}-${example.label}`} className="text-sm">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-rose">
                          {example.label}
                        </span>
                        <p className="mt-1 font-serif text-lg leading-relaxed">
                          {example.bg || example.pl}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 border-t border-border/60 pt-4 text-xs leading-relaxed text-muted-foreground">
                    {item.note}
                  </div>
                </article>
              );
            })}
          </section>

          {filtered.length === 0 && (
            <div className="mt-14 text-center text-muted-foreground">
              No connection matches this search yet.
            </div>
          )}

          <section className="mt-12 rounded-2xl border border-crimson/30 bg-surface/30 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <BookOpen className="mt-1 h-6 w-6 shrink-0 text-crimson" />
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-crimson">
                  Polish course
                </div>
                <h2 className="mt-2 font-serif text-2xl">Use the connection, then practise it.</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Connections explain why something feels familiar. The Polish course turns that
                  recognition into usable vocabulary and grammar.
                </p>
                <Link
                  to="/learn/polish"
                  className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg border border-border/80 px-4 text-sm hover:border-crimson/60"
                >
                  Continue to Polish <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
