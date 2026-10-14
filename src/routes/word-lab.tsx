import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SpeakButton } from "@/components/SpeakButton";
import {
  WORD_LAB_ENTRIES,
  WORD_LAB_KIND_LABELS,
  WORD_LAB_STATUS_LABELS,
  type WordLabEntry,
  type WordLabKind,
  type WordLabLevel,
} from "@/data/word-lab";
import {
  ArrowLeft,
  BookOpenCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleAlert,
  ExternalLink,
  FlaskConical,
  Search,
  ShieldCheck,
} from "lucide-react";

const TITLE = "Word Lab — Bulgarian ↔ Polish etymology | SlavicMind";
const DESC =
  "Source-backed Bulgarian–Polish word passports with pronunciation, Proto-Slavic roots, sound correspondences, examples and mini tasks.";
const URL = "https://tanstack-start-app.slavic-mindstudy.workers.dev/word-lab";

type KindFilter = "all" | WordLabKind;
type LevelFilter = "all" | WordLabLevel;
type AnswerState = Record<string, number>;

export const Route = createFileRoute("/word-lab")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: WordLabPage,
});

function WordLabPage() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<KindFilter>("all");
  const [level, setLevel] = useState<LevelFilter>("all");
  const [expanded, setExpanded] = useState<string[]>([]);
  const [answers, setAnswers] = useState<AnswerState>({});

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return WORD_LAB_ENTRIES.filter((entry) => {
      if (kind !== "all" && entry.kind !== kind) return false;
      if (level !== "all" && entry.level !== level) return false;
      if (!needle) return true;

      const haystack = [
        entry.bg.word,
        entry.pl.word,
        entry.protoSlavic,
        entry.connection,
        entry.etymology,
        entry.soundPattern,
        ...entry.relatives.flatMap((relative) => [relative.language, relative.word]),
      ]
        .join(" ")
        .toLocaleLowerCase();
      return haystack.includes(needle);
    });
  }, [kind, level, query]);

  const kinds = Object.keys(WORD_LAB_KIND_LABELS) as WordLabKind[];
  const levels = [...new Set(WORD_LAB_ENTRIES.map((entry) => entry.level))];

  const toggleExpanded = (id: string) => {
    setExpanded((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <Link
            to="/connections"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ivory"
          >
            <ArrowLeft className="h-4 w-4" /> Slavic Connections
          </Link>

          <header className="mt-7 max-w-4xl animate-fade-up">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-crimson">
              <FlaskConical className="h-4 w-4" /> Word Lab · Лаборатория на думата
            </div>
            <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">
              Every word has a passport.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Сравнявай български и полски думи отвъд приликата на повърхността — с произношение,
              исторически корен, звукови съответствия, примери, минизадачи и видими източници.
            </p>
          </header>

          <section className="mt-8 grid gap-4 rounded-2xl border border-border/70 bg-surface/30 p-5 sm:grid-cols-[auto_1fr] sm:p-6">
            <ShieldCheck className="h-7 w-7 text-crimson" />
            <div>
              <h2 className="font-serif text-xl">Academic method, in plain sight</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Всяка карта показва редакционен статус, дата на проверка и първични речникови или
                научни източници. Знакът * пред праславянска форма означава реконструкция, а не
                запазен писмен запис. Съдържанието не се публикува автоматично от AI.
              </p>
            </div>
          </section>

          <section aria-label="Word Lab filters" className="mt-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search вода, woda, *rǫka, Czech…"
                className="w-full rounded-lg border border-border/70 bg-surface/50 py-3 pl-11 pr-4 outline-none transition placeholder:text-muted-foreground focus:border-crimson"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <FilterButton active={kind === "all"} onClick={() => setKind("all")}>
                All types
              </FilterButton>
              {kinds.map((item) => (
                <FilterButton key={item} active={kind === item} onClick={() => setKind(item)}>
                  {WORD_LAB_KIND_LABELS[item]}
                </FilterButton>
              ))}
              <span className="mx-1 hidden h-9 w-px bg-border sm:block" aria-hidden />
              <FilterButton active={level === "all"} onClick={() => setLevel("all")}>
                All levels
              </FilterButton>
              {levels.map((item) => (
                <FilterButton key={item} active={level === item} onClick={() => setLevel(item)}>
                  {item}
                </FilterButton>
              ))}
            </div>
          </section>

          <div className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "word passport" : "word passports"}
          </div>

          <section className="mt-5 grid gap-6 lg:grid-cols-2">
            {filtered.map((entry) => (
              <WordPassport
                key={entry.id}
                entry={entry}
                open={expanded.includes(entry.id)}
                selectedAnswer={answers[entry.id]}
                onToggle={() => toggleExpanded(entry.id)}
                onAnswer={(answer) => setAnswers((current) => ({ ...current, [entry.id]: answer }))}
              />
            ))}
          </section>

          {filtered.length === 0 && (
            <div className="mt-14 text-center text-muted-foreground">
              Няма карта за тази комбинация от търсене и филтри.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-9 rounded-full border px-3 text-xs transition ${
        active
          ? "border-crimson/70 bg-crimson/10 text-ivory"
          : "border-border/70 text-muted-foreground hover:border-crimson/50 hover:text-ivory"
      }`}
    >
      {children}
    </button>
  );
}

function WordPassport({
  entry,
  open,
  selectedAnswer,
  onToggle,
  onAnswer,
}: {
  entry: WordLabEntry;
  open: boolean;
  selectedAnswer: number | undefined;
  onToggle: () => void;
  onAnswer: (answer: number) => void;
}) {
  const answered = selectedAnswer !== undefined;
  const correct = selectedAnswer === entry.task.answer;
  const issueUrl = `https://github.com/Slavicmindlab/slavic-mind-academy/issues/new?title=${encodeURIComponent(
    `Word Lab correction: ${entry.bg.word} ↔ ${entry.pl.word}`,
  )}&body=${encodeURIComponent(`Word passport: ${entry.id}\n\nDescribe the possible error and add a source:\n`)}`;

  return (
    <article className="self-start overflow-hidden rounded-2xl border border-border/70 bg-card-gradient">
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-crimson/40 bg-crimson/5 px-2.5 py-1 text-[10px] uppercase tracking-wider text-crimson">
              {WORD_LAB_KIND_LABELS[entry.kind]}
            </span>
            <span className="rounded-full border border-border/70 px-2.5 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">
              {entry.level}
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            {WORD_LAB_STATUS_LABELS[entry.status]}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <WordPanel language="Bulgarian" word={entry.bg.word} ipa={entry.bg.ipa} lang="bg-BG" />
          <WordPanel language="Polish" word={entry.pl.word} ipa={entry.pl.ipa} lang="pl-PL" />
        </div>

        <div className="mt-5 rounded-xl border border-border/60 bg-surface/35 p-4">
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Proto-Slavic
          </div>
          <div className="mt-1 font-serif text-2xl text-gold">{entry.protoSlavic}</div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{entry.connection}</p>
        </div>

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="mt-5 flex min-h-11 w-full items-center justify-between rounded-lg border border-border/70 px-4 text-sm transition hover:border-crimson/50"
        >
          {open ? "Hide full passport" : "Open full passport"}
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/70 px-5 py-6 sm:px-6">
          <PassportSection title="Etymology">{entry.etymology}</PassportSection>
          <PassportSection title="Regular sound clue">{entry.soundPattern}</PassportSection>

          <div className="mt-5">
            <div className="text-[10px] uppercase tracking-[0.2em] text-crimson">
              Slavic relatives
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {entry.relatives.map((relative) => (
                <span
                  key={`${entry.id}-${relative.language}`}
                  className="rounded-lg border border-border/60 bg-surface/30 px-3 py-2 text-sm"
                >
                  <span className="text-muted-foreground">{relative.language}</span> ·{" "}
                  {relative.word}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Example language="Bulgarian" sentence={entry.bg.example} lang="bg-BG" />
            <Example language="Polish" sentence={entry.pl.example} lang="pl-PL" />
          </div>

          <div className="mt-6 rounded-xl border border-gold/30 bg-gold/5 p-4">
            <div className="text-[10px] uppercase tracking-[0.2em] text-gold">Mini task</div>
            <p className="mt-2 text-sm leading-relaxed">{entry.task.prompt}</p>
            <div className="mt-3 grid gap-2">
              {entry.task.choices.map((choice, index) => {
                const selected = selectedAnswer === index;
                return (
                  <button
                    key={choice}
                    type="button"
                    onClick={() => onAnswer(index)}
                    className={`min-h-11 rounded-lg border px-3 text-left text-sm transition ${
                      selected
                        ? correct
                          ? "border-emerald-500/70 bg-emerald-500/10"
                          : "border-crimson/70 bg-crimson/10"
                        : "border-border/70 hover:border-gold/60"
                    }`}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
            {answered && (
              <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                {correct ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                ) : (
                  <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-crimson" />
                )}
                {correct ? "Correct. " : "Not quite. "}
                {entry.task.explanation}
              </p>
            )}
          </div>

          <div className="mt-6 border-t border-border/60 pt-5">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-crimson">
              <BookOpenCheck className="h-4 w-4" /> Sources
            </div>
            <ul className="mt-3 space-y-3">
              {entry.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start justify-between gap-3 text-sm hover:text-crimson"
                  >
                    <span>
                      <span className="block">{source.title}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {source.institution} · {source.role}
                      </span>
                    </span>
                    <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-crimson" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
              <span>Последна редакционна проверка: {entry.reviewedAt}</span>
              <a
                href={issueUrl}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-border underline-offset-4 hover:text-crimson"
              >
                Докладвай грешка
              </a>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

function WordPanel({
  language,
  word,
  ipa,
  lang,
}: {
  language: string;
  word: string;
  ipa: string;
  lang: "bg-BG" | "pl-PL";
}) {
  return (
    <div className="min-w-0 rounded-xl border border-border/60 bg-surface/35 p-3 sm:p-4">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{language}</div>
      <div className="mt-2 flex items-center gap-2">
        <div className="min-w-0 font-serif text-2xl sm:text-3xl">{word}</div>
        <SpeakButton text={word} lang={lang} label={`Listen to ${word}`} />
      </div>
      <div className="mt-1 font-mono text-xs text-muted-foreground">{ipa}</div>
    </div>
  );
}

function PassportSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5 first:mt-0">
      <div className="text-[10px] uppercase tracking-[0.2em] text-crimson">{title}</div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

function Example({
  language,
  sentence,
  lang,
}: {
  language: string;
  sentence: string;
  lang: "bg-BG" | "pl-PL";
}) {
  return (
    <div className="rounded-xl border border-border/60 p-3">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{language}</div>
      <div className="mt-2 flex items-start justify-between gap-2">
        <p className="font-serif text-base leading-relaxed">{sentence}</p>
        <SpeakButton text={sentence} lang={lang} label={`Listen to ${sentence}`} />
      </div>
    </div>
  );
}
