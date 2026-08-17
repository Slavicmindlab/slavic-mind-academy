import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SpeakButton } from "@/components/SpeakButton";
import { ClientOnly } from "@/components/ClientOnly";
import { useProgress, levelFromXp } from "@/lib/progress";
import { WORDS } from "@/data/vocabulary";
import {
  IDIOMS, HISTORY_FACTS, LITERATURE_QUOTES, MEMES,
  GREETINGS, getDayPhase, PHASE_LABEL, PHASE_TAGLINE, RECOMMENDED_PATH,
  type DayPhase,
} from "@/data/daily";
import {
  ArrowRight, Sparkles, Brain, Trophy, Languages, BookOpen, Gamepad2,
  Flame, Sunrise, Sun, Moon, Sunset, Quote, Landmark, Smile, Zap, Crown,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SlavicMind — Learn Polish, made for Bulgarians" },
      { name: "description", content: "A modern, intelligent way for Bulgarian students to master Polish — vocabulary, cases, mind games, AI tutoring, folklore, and history." },
      { property: "og:title", content: "SlavicMind — Learn Polish, made for Bulgarians" },
      { property: "og:description", content: "Modern Slavic language platform: vocabulary, Polish cases, gamified mind games, history, literature, mythology." },
      { property: "og:url", content: "https://slavicmind-app.lovable.app/" },
      { name: "twitter:title", content: "SlavicMind — Learn Polish, made for Bulgarians" },
      { name: "twitter:description", content: "Modern Slavic language platform: vocabulary, Polish cases, gamified mind games, history, literature, mythology." },
    ],
    links: [{ rel: "canonical", href: "https://slavicmind-app.lovable.app/" }],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <ClientOnly fallback={<HeroFallback />}>
        <DynamicHero />
      </ClientOnly>
      <ClientOnly fallback={<div className="h-[320px] border-t border-border/60 bg-surface/30" />}>
        <DailyGrid />
      </ClientOnly>
      <LanguageStrip />
      <ConnectionsBand />
      <Features />
      <CasesPreview />
      <CTA />
      <Footer />
    </div>
  );
}

// ─── Languages: Polish now, the family next ──────────────────────────────

function LanguageStrip() {
  const polish = LANGUAGES.find((l) => l.code === "pl")!;
  const planned = LANGUAGES.filter((l) => l.status === "planned");

  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-xs uppercase tracking-[0.3em] text-crimson">Languages</div>
        <h2 className="mt-3 font-serif text-3xl md:text-4xl tracking-tight text-balance">
          One language done properly, then the family.
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-start">
          <Link
            to="/learn/polish"
            className="group block rounded-2xl border border-crimson/40 bg-card-gradient p-7 transition hover:-translate-y-0.5 hover:border-crimson/70"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-lg border border-crimson/40 bg-surface-2 font-serif text-2xl">
                {polish.glyph}
              </span>
              <span className="rounded-full border border-crimson/50 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-crimson">
                Available now
              </span>
            </div>
            <div className="mt-5 font-serif text-3xl">{polish.name}</div>
            <div className="font-mono text-xs text-muted-foreground">{polish.nativeName} · {polish.group}</div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{polish.blurb}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-crimson">
              Start learning Polish <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>

          <div className="rounded-2xl border border-border/60 bg-surface/20 p-7">
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Planned</div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {planned.map((l) => (
                <li
                  key={l.code}
                  className="rounded-full border border-border/70 px-3 py-1.5 text-xs text-muted-foreground"
                >
                  {l.name} <span className="font-mono opacity-60">{l.nativeName}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              These courses are not built yet. When they arrive they will share one grammar
              vocabulary, so what you learn in Polish carries over.
            </p>
            <Link to="/learn" className="mt-5 inline-flex items-center gap-1.5 text-xs text-crimson">
              See the language roadmap <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Slavic Connections teaser ───────────────────────────────────────────

const CONNECTION_EXAMPLE = [
  { lang: "Bulgarian", word: "глава" },
  { lang: "Polish", word: "głowa" },
  { lang: "Czech", word: "hlava" },
  { lang: "Slovak", word: "hlava" },
];

function ConnectionsBand() {
  return (
    <section className="border-t border-border/60 bg-surface/20">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-crimson">Slavic Connections</div>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl tracking-tight text-balance">
            Related languages keep their family resemblance.
          </h2>
          <p className="mt-4 text-sm md:text-base leading-relaxed text-muted-foreground">
            Slavic languages preserve recognisable relationships in vocabulary, grammar and sound
            patterns. Once you can see the pattern, a new Slavic language stops being a blank page.
            SlavicMind is building this into a full comparison layer — for now it lives inside the
            Polish course as parallel Bulgarian explanations.
          </p>
          <Link to="/learn/polish" className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-border/80 bg-surface/40 px-5 text-sm transition hover:bg-surface">
            See it in the Polish course <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="rounded-2xl border border-border/70 bg-card-gradient p-7">
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            "head" across four Slavic languages
          </div>
          <dl className="mt-5 divide-y divide-border/60">
            {CONNECTION_EXAMPLE.map((c) => (
              <div key={c.lang} className="flex items-baseline justify-between gap-4 py-3">
                <dt className="text-sm text-muted-foreground">{c.lang}</dt>
                <dd className="font-serif text-2xl">{c.word}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs italic text-muted-foreground">
            Same root, three different outcomes of one sound change.
          </p>
        </div>
      </div>
    </section>
  );
}


// ─── Time-aware hero ──────────────────────────────────────────────────────

const PHASE_ICON: Record<DayPhase, typeof Sun> = {
  morning: Sunrise, afternoon: Sun, evening: Sunset, night: Moon,
};

const PHASE_BG: Record<DayPhase, string> = {
  morning:   "bg-gradient-to-br from-amber-500/15 via-rose-400/10 to-transparent",
  afternoon: "bg-gradient-to-br from-sky-400/15 via-amber-300/10 to-transparent",
  evening:   "bg-gradient-to-br from-rose-500/15 via-orange-500/10 to-transparent",
  night:     "bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent",
};

const PHASE_ACCENT: Record<DayPhase, string> = {
  morning:   "text-amber-400",
  afternoon: "text-sky-300",
  evening:   "text-rose-400",
  night:     "text-indigo-300",
};

function HeroFallback() {
  return (
    <section className="relative overflow-hidden grain">
      <div className="absolute inset-0 bg-hero pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-32">
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight">SlavicMind</h1>
      </div>
    </section>
  );
}

function DynamicHero() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);
  const phase = getDayPhase(now.getHours());
  const greet = GREETINGS[phase];
  const Icon = PHASE_ICON[phase];
  const progress = useProgress();
  const { level, into, needed } = levelFromXp(progress.xp);

  return (
    <section className="relative overflow-hidden grain">
      <div className={`absolute inset-0 pointer-events-none ${PHASE_BG[phase]}`} />
      <div className="absolute inset-0 bg-hero opacity-60 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24">
        <div className="max-w-3xl">
          <div className="animate-fade-up inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/80 bg-surface/60 backdrop-blur text-xs">
            <Icon className={`h-3.5 w-3.5 ${PHASE_ACCENT[phase]}`} />
            <span className="text-muted-foreground">{PHASE_LABEL[phase]} · </span>
            <span className={PHASE_ACCENT[phase]}>
              {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>

          <h1 className="animate-fade-up delay-100 mt-6 font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-balance">
            Learn Slavic languages.
            <br />
            <span className="italic text-crimson">Understand how they connect.</span>
          </h1>
          <p className="animate-fade-up delay-200 mt-5 text-base md:text-lg text-muted-foreground max-w-2xl text-balance">
            SlavicMind starts with Polish — grammar, vocabulary, stories and mind games in one
            place — and grows into a platform for the whole Slavic family.
          </p>
          <p className="animate-fade-up delay-200 mt-6 text-sm md:text-base">
            <span className={PHASE_ACCENT[phase]}>{greet.pl}</span>
            <span className="text-muted-foreground">, wędrowcze · {greet.bg} · {greet.en}</span>
          </p>
          <p className="animate-fade-up delay-300 mt-3 text-sm md:text-base text-muted-foreground max-w-2xl">
            {PHASE_TAGLINE[phase]}
          </p>

          <div className="animate-fade-up delay-300 mt-8 flex flex-wrap items-center gap-3">
            <Link to="/learn/polish" className="group inline-flex min-h-[52px] items-center gap-2 px-6 rounded-lg bg-crimson-gradient text-ivory text-sm font-medium shadow-glow hover:opacity-95 transition">
              Start learning Polish
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link to={RECOMMENDED_PATH[phase].href} className="inline-flex min-h-[52px] items-center gap-2 px-6 rounded-lg border border-border/80 bg-surface/40 hover:bg-surface text-sm transition">
              {RECOMMENDED_PATH[phase].title}
            </Link>
          </div>
          <p className="mt-3 text-xs text-muted-foreground italic">
            {RECOMMENDED_PATH[phase].reason}
          </p>


          {/* Live progress bar */}
          <div className="animate-fade-up delay-500 mt-10 grid grid-cols-3 gap-6 max-w-xl">
            <Stat icon={Flame} label="Streak" value={`${progress.streak} d`} accent={PHASE_ACCENT[phase]} />
            <Stat icon={Zap} label="XP today" value={`${progress.xpToday}`} accent={PHASE_ACCENT[phase]} />
            <Stat icon={Crown} label={`Level ${level}`} value={`${into}/${needed}`} accent={PHASE_ACCENT[phase]} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon: Icon, label, value, accent }: { icon: typeof Sun; label: string; value: string; accent: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-surface/40 backdrop-blur p-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
        <Icon className={`h-3 w-3 ${accent}`} /> {label}
      </div>
      <div className="mt-1 font-serif text-2xl">{value}</div>
    </div>
  );
}

// ─── Daily grid: word / idiom / history / literature / meme ──────────────

function dailyIndex(salt: number) {
  const d = new Date();
  return d.getFullYear() * 1000 + (d.getMonth() + 1) * 31 + d.getDate() + salt;
}

function DailyGrid() {
  const word = useMemo(() => WORDS[dailyIndex(0) % WORDS.length], []);
  const idiom = useMemo(() => IDIOMS[dailyIndex(1) % IDIOMS.length], []);
  const fact = useMemo(() => HISTORY_FACTS[dailyIndex(2) % HISTORY_FACTS.length], []);
  const quote = useMemo(() => LITERATURE_QUOTES[dailyIndex(3) % LITERATURE_QUOTES.length], []);
  const meme = useMemo(() => MEMES[dailyIndex(4) % MEMES.length], []);

  return (
    <section className="relative border-t border-border/60 bg-surface/20">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">Dziś · today</div>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">Twoja codzienna porcja</h2>
          </div>
          <Link to="/dashboard" className="hidden md:inline-flex items-center gap-1 text-xs text-crimson">
            Full dashboard <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Word of the day */}
          <DailyCard tag="Słowo dnia" Icon={Sparkles} accent="text-crimson">
            <div className="flex items-baseline gap-3 flex-wrap">
              <div className="font-serif text-3xl">{word.pl}</div>
              <div className="font-mono text-xs text-muted-foreground">/{word.pronunciation}/</div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">{word.bg} · {word.en}</div>
            <div className="mt-4 flex items-center gap-3">
              <SpeakButton text={word.pl} />
              <Link to="/vocabulary" className="text-xs text-crimson inline-flex items-center gap-1">
                Vocabulary <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </DailyCard>

          {/* Idiom */}
          <DailyCard tag="Idiom" Icon={Quote} accent="text-rose">
            <div className="font-serif text-xl leading-snug">{idiom.pl}</div>
            <div className="mt-2 text-xs text-muted-foreground italic">lit. "{idiom.literal}"</div>
            <div className="mt-3 text-sm">{idiom.meaning}</div>
            <div className="mt-1 text-xs text-muted-foreground">{idiom.bg}</div>
          </DailyCard>

          {/* History fact */}
          <DailyCard tag="Historia" Icon={Landmark} accent="text-amber-400">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-amber-400 text-lg">{fact.year}</span>
              <span className="font-serif text-xl">{fact.title}</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{fact.body}</p>
          </DailyCard>

          {/* Literature quote */}
          <DailyCard tag="Literatura" Icon={BookOpen} accent="text-indigo-300">
            <div className="font-serif text-lg italic leading-snug">"{quote.pl}"</div>
            <div className="mt-2 text-xs text-muted-foreground">{quote.en}</div>
            <div className="mt-3 text-xs">
              <span className="text-indigo-300">{quote.author}</span>
              <span className="text-muted-foreground"> · {quote.work}</span>
            </div>
          </DailyCard>

          {/* Meme */}
          <DailyCard tag="Mem" Icon={Smile} accent="text-emerald-400">
            <div className="font-serif text-lg leading-snug whitespace-pre-line">{meme.pl}</div>
            <div className="mt-2 text-xs text-muted-foreground">{meme.en}</div>
            <div className="mt-3 text-xs italic text-emerald-400/80">{meme.vibe}</div>
          </DailyCard>

          {/* Recommended path quick-link */}
          <DailyCard tag="Polecane" Icon={Brain} accent="text-crimson">
            <div className="font-serif text-xl">Zacznij teraz</div>
            <p className="mt-2 text-sm text-muted-foreground">Dopasowane do pory dnia.</p>
            <ClientOnly fallback={<div className="mt-4 h-9" />}>
              <RecommendedLink />
            </ClientOnly>
          </DailyCard>
        </div>
      </div>
    </section>
  );
}

function RecommendedLink() {
  const phase = getDayPhase(new Date().getHours());
  const rec = RECOMMENDED_PATH[phase];
  return (
    <Link to={rec.href} className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-crimson-gradient text-ivory text-sm">
      {rec.title} <ArrowRight className="h-3.5 w-3.5" />
    </Link>
  );
}

function DailyCard({ tag, Icon, accent, children }: { tag: string; Icon: typeof Sun; accent: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card-gradient p-6 hover:border-crimson/40 transition">
      <div className={`flex items-center gap-2 text-xs uppercase tracking-[0.3em] ${accent}`}>
        <Icon className="h-3.5 w-3.5" /> {tag}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

// ─── Below-the-fold sections (unchanged) ─────────────────────────────────

const FEATURES = [
  { icon: Languages, title: "Vocabulary system", body: "Polish, Bulgarian and English side-by-side. Pronunciation, examples, favorites and difficulty tags." },
  { icon: BookOpen, title: "The seven cases", body: "Mianownik to Wołacz — explained in Bulgarian, with ending tables, prepositions and quizzes." },
  { icon: Gamepad2, title: "Mind games", body: "Crosswords, memory cards, sentence builders, word chains. Learning that feels like play." },
  { icon: Brain, title: "AI tutor", body: "Generates quizzes, explains your grammar mistakes, and tailors study suggestions." },
  { icon: Trophy, title: "Gamified progress", body: "XP, levels, achievements, and streaks that quietly reward consistency." },
  { icon: Sparkles, title: "Daily ritual", body: "A word of the day, a brain challenge, and a continue-where-you-left-off button." },
];

function Features() {
  return (
    <section className="relative py-24 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.3em] text-crimson">Why SlavicMind</div>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl tracking-tight text-balance">
            Everything you need, nothing you don't.
          </h2>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/40 rounded-2xl overflow-hidden border border-border/60">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-card-gradient p-8 hover:bg-surface-2 transition-colors">
              <f.icon className="h-6 w-6 text-crimson" />
              <h3 className="mt-5 font-serif text-xl">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const CASES = [
  { name: "Mianownik", q: "Kto? Co?", desc: "Именителен — кой? какво?" },
  { name: "Dopełniacz", q: "Kogo? Czego?", desc: "Родителен — на кого? на какво?" },
  { name: "Celownik", q: "Komu? Czemu?", desc: "Дателен — на кого? на какво?" },
  { name: "Biernik", q: "Kogo? Co?", desc: "Винителен — кого? какво?" },
  { name: "Narzędnik", q: "Kim? Czym?", desc: "Творителен — с кого? с какво?" },
  { name: "Miejscownik", q: "O kim? O czym?", desc: "Местен — за кого? за какво?" },
  { name: "Wołacz", q: "O!", desc: "Звателен — обръщение." },
];

function CasesPreview() {
  return (
    <section className="relative py-24 border-t border-border/60 overflow-hidden">
      <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-xl">
          <div className="text-xs uppercase tracking-[0.3em] text-crimson">Седемте падежа</div>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl tracking-tight">
            The seven Polish cases, demystified.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Each case explained in Bulgarian with parallel logic, ending tables, prepositions, and short interactive drills.
          </p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CASES.map((c, i) => (
            <div key={c.name} className="group relative rounded-xl border border-border/70 bg-card-gradient p-6 hover:border-crimson/60 transition-all hover:-translate-y-0.5">
              <div className="font-mono text-xs text-muted-foreground">0{i + 1}</div>
              <div className="mt-3 font-serif text-2xl">{c.name}</div>
              <div className="mt-1 text-sm text-crimson/90 font-mono">{c.q}</div>
              <div className="mt-3 text-sm text-muted-foreground">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative py-24 border-t border-border/60">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Flame className="h-8 w-8 mx-auto text-crimson" />
        <h2 className="mt-6 font-serif text-4xl md:text-6xl tracking-tight text-balance">
          Begin your <span className="italic text-crimson">streak</span> today.
        </h2>
        <p className="mt-5 text-muted-foreground text-lg max-w-xl mx-auto">
          Five minutes a day. A new word, a small drill, a tiny win.
        </p>
        <Link to="/dashboard" className="mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-lg bg-crimson-gradient text-ivory shadow-glow hover:opacity-95 transition animate-glow">
          Enter SlavicMind <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="font-serif">
          Slavic<span className="text-crimson italic">Mind</span> · Sofia ↔ Warszawa
        </div>
        <div>© {new Date().getFullYear()} — Quiet learning, Slavic roots.</div>
      </div>
    </footer>
  );
}
