import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { ArrowRight, Sparkles, Brain, Trophy, Languages, BookOpen, Gamepad2, Flame } from "lucide-react";

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
      <Features />
      <CasesPreview />
      <CTA />
      <Footer />
    </div>
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
