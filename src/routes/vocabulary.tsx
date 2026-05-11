import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { WORDS, CATEGORIES as ALL_CATEGORIES, type Word } from "@/data/vocabulary";
import { Search, Volume2, Star, Filter } from "lucide-react";
import { SpeakButton } from "@/components/SpeakButton";
import { speak } from "@/lib/speak";
import { useProgress, toggleFavorite } from "@/lib/progress";

export const Route = createFileRoute("/vocabulary")({
  head: () => ({
    meta: [
      { title: "Vocabulary — SlavicMind" },
      { name: "description", content: "180+ Polish words across 24 categories: pronunciation, grammar, examples." },
    ],
  }),
  component: Vocabulary,
});

const CATEGORIES = ["All", ...ALL_CATEGORIES] as const;
const LEVELS = ["All", "A1", "A2", "B1", "B2"] as const;

function Vocabulary() {
  const p = useProgress();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [lvl, setLvl] = useState<(typeof LEVELS)[number]>("All");
  const [favOnly, setFavOnly] = useState(false);
  const [active, setActive] = useState<Word | null>(null);

  const favs = new Set(p.favorites);

  const filtered = useMemo(() => {
    return WORDS.filter((w) => {
      if (cat !== "All" && w.category !== cat) return false;
      if (lvl !== "All" && w.difficulty !== lvl) return false;
      if (favOnly && !favs.has(w.id)) return false;
      if (q && !`${w.pl} ${w.bg} ${w.en}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [q, cat, lvl, favOnly, p.favorites]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 py-12">
          <div className="animate-fade-up flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-crimson">Słownictwo</div>
              <h1 className="mt-3 font-serif text-4xl md:text-5xl">Vocabulary</h1>
              <p className="mt-2 text-muted-foreground max-w-xl">
                {WORDS.length} words across {ALL_CATEGORIES.length} categories — Polish, Bulgarian, English.
              </p>
            </div>
            <button
              onClick={() => setFavOnly((v) => !v)}
              className={`px-4 py-2.5 rounded-lg border text-sm flex items-center gap-2 transition ${favOnly ? "border-crimson text-crimson bg-surface/60" : "border-border/70 text-muted-foreground hover:text-ivory"}`}
            >
              <Star className="h-4 w-4" fill={favOnly ? "currentColor" : "none"} />
              Favorites · {p.favorites.length}
            </button>
          </div>

          {/* Filters */}
          <div className="mt-8 grid md:grid-cols-[1fr_auto_auto] gap-3 items-stretch">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search in three languages…"
                className="w-full pl-11 pr-4 py-3 rounded-lg bg-surface/60 border border-border/70 focus:border-crimson outline-none transition placeholder:text-muted-foreground"
              />
            </div>
            <Select value={cat} onChange={(v) => setCat(v as any)} options={CATEGORIES as any} />
            <Select value={lvl} onChange={(v) => setLvl(v as any)} options={LEVELS as any} />
          </div>

          {/* Category chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            {(["All", ...ALL_CATEGORIES] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCat(c as any)}
                className={`text-xs px-3 py-1.5 rounded-full border transition ${cat === c ? "border-crimson text-crimson bg-surface/60" : "border-border/60 text-muted-foreground hover:text-ivory"}`}
              >{c}</button>
            ))}
          </div>

          {/* Grid */}
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((w) => (
              <button
                key={w.id}
                onClick={() => setActive(w)}
                className="text-left group rounded-xl border border-border/70 bg-card-gradient p-6 hover:border-crimson/60 hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-serif text-2xl">{w.pl}</div>
                    <div className="mt-1 font-mono text-xs text-muted-foreground">/{w.pronunciation}/</div>
                  </div>
                  <span
                    role="button"
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(w.id); }}
                    className={`h-8 w-8 grid place-items-center rounded-full border transition ${favs.has(w.id) ? "border-crimson text-crimson" : "border-border/70 text-muted-foreground hover:text-ivory"}`}
                  >
                    <Star className="h-4 w-4" fill={favs.has(w.id) ? "currentColor" : "none"} />
                  </span>
                </div>
                <div className="mt-5 space-y-1.5">
                  <div className="text-sm"><span className="text-muted-foreground">BG · </span>{w.bg}</div>
                  <div className="text-sm"><span className="text-muted-foreground">EN · </span>{w.en}</div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                  <span className="font-mono">{w.pos}</span>
                  {w.gender !== "—" && <span className="font-mono text-rose">·{" "}{w.gender}.</span>}
                  {w.plural !== "—" && <span className="font-mono">· pl. {w.plural}</span>}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex gap-2">
                    <Pill>{w.category}</Pill>
                    <Pill tone="crimson">{w.difficulty}</Pill>
                  </div>
                  <SpeakButton text={w.pl} lang="pl-PL" />
                </div>
              </button>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="mt-16 text-center text-muted-foreground">No words match your filters.</div>
          )}
        </div>
      </div>

      {active && <WordSheet word={active} onClose={() => setActive(null)} fav={favs.has(active.id)} onFav={() => toggleFavorite(active.id)} />}
    </div>
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: readonly string[] }) {
  return (
    <div className="relative">
      <Filter className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none pl-9 pr-8 py-3 rounded-lg bg-surface/60 border border-border/70 focus:border-crimson outline-none text-sm"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Pill({ children, tone }: { children: React.ReactNode; tone?: "crimson" }) {
  return (
    <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full border ${tone === "crimson" ? "border-crimson/50 text-crimson" : "border-border/70 text-muted-foreground"}`}>
      {children}
    </span>
  );
}

function WordSheet({ word, onClose, fav, onFav }: { word: Word; onClose: () => void; fav: boolean; onFav: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 animate-fade-up" onClick={onClose}>
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-2xl border border-border/70 bg-card-gradient p-8 shadow-elegant max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">{word.category} · {word.difficulty}</div>
            <h3 className="mt-3 font-serif text-4xl">{word.pl}</h3>
            <div className="mt-1 font-mono text-sm text-muted-foreground">/{word.pronunciation}/</div>
          </div>
          <button onClick={onFav} className={`h-10 w-10 grid place-items-center rounded-full border ${fav ? "border-crimson text-crimson" : "border-border/70"}`}>
            <Star className="h-4 w-4" fill={fav ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-widest">
          <span className="px-2 py-1 rounded-full border border-border/70 font-mono">{word.pos}</span>
          {word.gender !== "—" && <span className="px-2 py-1 rounded-full border border-rose/60 text-rose font-mono">gender · {word.gender}</span>}
          {word.plural !== "—" && <span className="px-2 py-1 rounded-full border border-border/70 font-mono">plural · {word.plural}</span>}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="p-4 rounded-lg bg-surface/60 border border-border/60">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Български</div>
            <div className="mt-1 font-serif text-xl">{word.bg}</div>
          </div>
          <div className="p-4 rounded-lg bg-surface/60 border border-border/60">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">English</div>
            <div className="mt-1 font-serif text-xl">{word.en}</div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Example</span>
            <SpeakButton text={word.example.pl} lang="pl-PL" />
          </div>
          <p className="mt-2 italic">"{word.example.pl}"</p>
          <p className="text-sm text-muted-foreground">{word.example.bg}</p>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={() => speak(word.pl, "pl-PL")}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border/70 hover:bg-surface-2 transition text-sm"
          >
            <Volume2 className="h-4 w-4" /> Listen
          </button>
          <button onClick={onClose} className="flex-1 px-4 py-3 rounded-lg bg-crimson-gradient text-ivory text-sm shadow-glow hover:opacity-95 transition">
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
