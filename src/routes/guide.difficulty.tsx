import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { ArrowRight, Castle, BookOpen, Languages } from "lucide-react";

const CANONICAL = "https://slavicmind-app.lovable.app/guide/difficulty";
const TITLE = "Is Polish hard to learn for Bulgarians? — SlavicMind";
const DESCRIPTION = "An honest guide to how difficult Polish really is for Bulgarian speakers — what's easier thanks to Slavic roots, what's harder, and how to bridge the gap fast.";

export const Route = createFileRoute("/guide/difficulty")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Is Polish hard to learn for Bulgarians?" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: CANONICAL },
      { name: "twitter:title", content: "Is Polish hard to learn for Bulgarians?" },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Is Polish hard to learn for Bulgarians?",
        description: DESCRIPTION,
        inLanguage: "en",
        author: { "@type": "Organization", name: "SlavicMind" },
        mainEntityOfPage: CANONICAL,
      }),
    }],
  }),
  component: GuidePage,
});

function GuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <article className="relative mx-auto max-w-3xl px-6 py-16">
          <div className="text-xs uppercase tracking-[0.3em] text-crimson">Guide · Polish for Bulgarians</div>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl">Is Polish hard to learn for Bulgarians?</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Short answer: <span className="text-ivory">no — not compared to English speakers.</span> Bulgarians share centuries of Slavic
            grammar, vocabulary, and sound patterns with Polish. That's a real head start. But there are also traps that
            catch native Bulgarian ears exactly because the languages feel so close.
          </p>

          <h2 className="mt-12 font-serif text-2xl">What's easier for Bulgarians</h2>
          <h3 className="mt-4 font-serif text-lg text-crimson">Shared Slavic vocabulary</h3>
          <p className="mt-2 text-muted-foreground">
            Thousands of everyday Polish words are transparent from Bulgarian: <em>woda / вода</em>, <em>dom / дом</em>,
            <em> matka / майка (майчин)</em>, <em>chleb / хляб</em>, <em>noc / нощ</em>. You start with a vocabulary head
            start of several thousand cognates.
          </p>
          <h3 className="mt-4 font-serif text-lg text-crimson">Verb aspect feels natural</h3>
          <p className="mt-2 text-muted-foreground">
            Perfective vs imperfective (<em>pisać / napisać</em>) trips up English speakers for months. Bulgarians already
            think in aspect through <em>свършен</em> and <em>несвършен вид</em> — the intuition transfers.
          </p>
          <h3 className="mt-4 font-serif text-lg text-crimson">Sound system</h3>
          <p className="mt-2 text-muted-foreground">
            Palatalization, soft consonants, and stress patterns are much closer to Bulgarian than to English. Polish
            <em> ś, ć, ź, ń</em> map neatly onto sounds you already produce.
          </p>

          <h2 className="mt-12 font-serif text-2xl">What's harder — even for Bulgarians</h2>
          <h3 className="mt-4 font-serif text-lg text-crimson">The seven cases</h3>
          <p className="mt-2 text-muted-foreground">
            Modern Bulgarian dropped its case system; Polish kept all seven. This is the single biggest jump. The good
            news: you already recognize case endings from Old Church Slavonic and set expressions
            (<em>слава Богу</em>, <em>довиждане</em>). Our{" "}
            <Link to="/quest" className="text-crimson hover:underline">Case Quest RPG</Link>{" "}
            walks you through one kingdom per case.
          </p>
          <h3 className="mt-4 font-serif text-lg text-crimson">False friends</h3>
          <p className="mt-2 text-muted-foreground">
            <em>Uroda</em> means <em>beauty</em>, not <em>freak</em>. <em>Zapomnieć</em> means <em>to forget</em>, not
            <em> to remember</em>. Because the words feel Bulgarian, the wrong meaning slips out fast.
          </p>
          <h3 className="mt-4 font-serif text-lg text-crimson">Consonant clusters &amp; spelling</h3>
          <p className="mt-2 text-muted-foreground">
            <em>Źdźbło</em>, <em>chrząszcz</em>, <em>szczęście</em> — Polish orthography demands a few weeks of drills
            before it stops looking like keyboard noise.
          </p>

          <h2 className="mt-12 font-serif text-2xl">A realistic timeline</h2>
          <p className="mt-2 text-muted-foreground">
            The FSI puts Polish at roughly 1100 hours for an English speaker to reach professional working proficiency.
            A motivated Bulgarian learner typically hits comfortable conversational Polish (B1) in{" "}
            <span className="text-ivory">6–9 months</span> of consistent daily practice — roughly half the time it takes
            an English speaker. Reading is even faster: many Bulgarians can decode a Polish news headline on day one.
          </p>

          <h2 className="mt-12 font-serif text-2xl">How SlavicMind bridges the gap</h2>
          <p className="mt-2 text-muted-foreground">
            Every explanation is written from a Bulgarian starting point — cases are anchored in familiar
            Old-Church-Slavonic endings, vocabulary is paired Polish&harr;Bulgarian&harr;English, and games surface the
            exact patterns that catch Bulgarian speakers off guard.
          </p>

          <div className="mt-8 grid sm:grid-cols-3 gap-3">
            <Link to="/grammar" className="group p-5 rounded-xl border border-border/70 bg-card-gradient hover:border-crimson/60 transition">
              <BookOpen className="h-5 w-5 text-crimson" />
              <div className="mt-3 font-serif text-lg">Grammar hub</div>
              <div className="mt-1 text-xs text-muted-foreground">Cases, conjugation, aspect.</div>
            </Link>
            <Link to="/quest" className="group p-5 rounded-xl border border-border/70 bg-card-gradient hover:border-crimson/60 transition">
              <Castle className="h-5 w-5 text-crimson" />
              <div className="mt-3 font-serif text-lg">Case Quest</div>
              <div className="mt-1 text-xs text-muted-foreground">Seven kingdoms, seven cases.</div>
            </Link>
            <Link to="/vocabulary" className="group p-5 rounded-xl border border-border/70 bg-card-gradient hover:border-crimson/60 transition">
              <Languages className="h-5 w-5 text-crimson" />
              <div className="mt-3 font-serif text-lg">Vocabulary</div>
              <div className="mt-1 text-xs text-muted-foreground">490+ paired words.</div>
            </Link>
          </div>

          <div className="mt-10">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-crimson hover:underline">
              Start learning <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
