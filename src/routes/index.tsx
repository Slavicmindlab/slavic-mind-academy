import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SpeakButton } from "@/components/SpeakButton";
import { WORDS } from "@/data/vocabulary";
import { ArrowRight, Sparkles, Brain, Trophy, Languages, BookOpen, Gamepad2, Flame, Sunrise, Sun, Moon, Quote } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SlavicMind — Learn Polish, made for Bulgarians" },
      { name: "description", content: "A modern, intelligent way for Bulgarian students to master Polish — vocabulary, cases, mind games, and AI tutoring." },
      { property: "og:title", content: "SlavicMind — Learn Polish, made for Bulgarians" },
      { property: "og:description", content: "Modern Slavic language platform: vocabulary, Polish cases, gamified mind games, and AI tutoring." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <DailyStrip />
      <Features />
      <CasesPreview />
      <CTA />
      <Footer />
    </div>
  );
}

type Greet = { pl: string; bg: string; en: string; icon: typeof Sun };
function getGreeting(): Greet {
  const h = new Date().getHours();
  if (h < 5) return { pl: "Dobranoc", bg: "Лека нощ", en: "Good night", icon: Moon };
  if (h < 11) return { pl: "Dzień dobry", bg: "Добро утро", en: "Good morning", icon: Sunrise };
  if (h < 18) return { pl: "Dzień dobry", bg: "Добър ден", en: "Good day", icon: Sun };
  if (h < 22) return { pl: "Dobry wieczór", bg: "Добър вечер", en: "Good evening", icon: Moon };
  return { pl: "Dobranoc", bg: "Лека нощ", en: "Good night", icon: Moon };
}

const TIPS = [
  { pl: "słuchać + dopełniacz", bg: "Глаголът „słuchać\" винаги е с родителен падеж: słucham muzyki." },
  { pl: "być + narzędnik", bg: "Професиите се изразяват с творителен: Jestem studentem." },
  { pl: "myśleć o + miejscownik", bg: "Темата на мислене върви с местен: Myślę o tobie." },
  { pl: "pomagać + celownik", bg: "Помагаш на някого — дателен: pomagam mamie." },
  { pl: "czekać na + biernik", bg: "Чакаш нещо — винителен с „na\": czekam na autobus." },
  { pl: "interesować się + narzędnik", bg: "Интересуваш се от нещо — творителен: literaturą." },
];

function DailyStrip() {
  const greet = useMemo(() => getGreeting(), []);
  const Icon = greet.icon;
  // Deterministic daily picks (so SSR + first paint match, then refresh after mount)
  const dayIndex = useMemo(() => {
    const d = new Date();
    return d.getFullYear() * 1000 + (d.getMonth() + 1) * 31 + d.getDate();
  }, []);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const word = WORDS[dayIndex % WORDS.length];
  const tip = TIPS[dayIndex % TIPS.length];

  return (
    <section className="relative border-t border-border/60 bg-surface/30">
      <div className="mx-auto max-w-7xl px-6 py-10 grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-border/70 bg-card-gradient p-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-crimson">
            <Icon className="h-4 w-4" /> {mounted ? "Dziś" : "Today"}
          </div>
          <div className="mt-3 font-serif text-3xl">{greet.pl}!</div>
          <div className="mt-1 text-sm text-muted-foreground">{greet.bg} · {greet.en}</div>
          <div className="mt-4 flex items-center gap-2">
            <SpeakButton text={greet.pl} />
            <span className="text-xs text-muted-foreground">tap to hear</span>
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card-gradient p-6">
          <div className="text-xs uppercase tracking-[0.3em] text-rose">Słowo dnia · word of the day</div>
          <div className="mt-3 flex items-baseline gap-3 flex-wrap">
            <div className="font-serif text-3xl">{word.pl}</div>
            <div className="font-mono text-xs text-muted-foreground">/{word.pronunciation}/</div>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">{word.bg} · {word.en}</div>
          <div className="mt-4 flex items-center gap-3">
            <SpeakButton text={word.pl} />
            <Link to="/vocabulary" className="text-xs text-crimson inline-flex items-center gap-1">
              Open vocabulary <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card-gradient p-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-crimson">
            <Quote className="h-3.5 w-3.5" /> Wskazówka · grammar tip
          </div>
          <div className="mt-3 font-serif text-2xl">{tip.pl}</div>
          <p className="mt-2 text-sm text-muted-foreground">{tip.bg}</p>
          <Link to="/grammar/verbs" className="mt-4 inline-flex items-center gap-1 text-xs text-crimson">
            Verbs &amp; cases <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden grain">
      <div className="absolute inset-0 bg-hero pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-32">
        <div className="max-w-3xl">
          <div className="animate-fade-up inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/80 bg-surface/60 backdrop-blur text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" />
            Created for Bulgarian students learning Polish
          </div>
          <h1 className="animate-fade-up delay-100 mt-6 font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-balance">
            A quieter way to <span className="italic text-crimson">master</span> Polish.
          </h1>
          <p className="animate-fade-up delay-200 mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl text-balance">
            SlavicMind blends Slavic philology with modern study science — vocabulary, the seven Polish cases, mind games, and a personal AI tutor. Built for the curious, the patient, and the obsessed.
          </p>
          <div className="animate-fade-up delay-300 mt-10 flex flex-wrap items-center gap-3">
            <Link to="/dashboard" className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-crimson-gradient text-ivory text-sm font-medium shadow-glow hover:opacity-95 transition">
              Open dashboard
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link to="/vocabulary" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-border/80 bg-surface/40 hover:bg-surface text-sm transition">
              Browse vocabulary
            </Link>
          </div>

          <div className="animate-fade-up delay-500 mt-16 grid grid-cols-3 gap-6 max-w-xl">
            {[
              { k: "7", v: "Polish cases" },
              { k: "230+", v: "Words & phrases" },
              { k: "8", v: "Mind games" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-serif text-3xl text-ivory">{s.k}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

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
    <section className="relative py-28 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.3em] text-crimson">Why SlavicMind</div>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl tracking-tight text-balance">
            Everything you need, nothing you don't.
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/40 rounded-2xl overflow-hidden border border-border/60">
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
    <section className="relative py-28 border-t border-border/60 overflow-hidden">
      <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xl">
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">Седемте падежа</div>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl tracking-tight">
              The seven Polish cases, demystified.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Each case explained in Bulgarian with parallel logic, ending tables, prepositions, and short interactive drills.
            </p>
          </div>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CASES.map((c, i) => (
            <div
              key={c.name}
              className="group relative rounded-xl border border-border/70 bg-card-gradient p-6 hover:border-crimson/60 transition-all hover:-translate-y-0.5"
            >
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
    <section className="relative py-28 border-t border-border/60">
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
