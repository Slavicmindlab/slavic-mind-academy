import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Ornament } from "@/components/SlavicMindLogo";
import { STORIES } from "@/data/stories";
import { ArrowRight, Clock, BookOpen } from "lucide-react";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Stories — SlavicMind" },
      { name: "description", content: "Short Polish reading exercises with parallel Bulgarian translation, audio, and comprehension questions." },
    ],
  }),
  component: StoriesHub,
});

function StoriesHub() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6 py-12">
          <div className="text-center animate-fade-up">
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">Czytanki</div>
            <h1 className="mt-3 font-serif text-5xl md:text-6xl">Stories & reading</h1>
            <Ornament className="mx-auto mt-4 w-72 text-crimson" />
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Малки сцени от полския живот — с превод, звук и кратки въпроси за разбиране.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-5">
            {STORIES.map((s) => (
              <Link
                key={s.id}
                to="/stories/$id"
                params={{ id: s.id }}
                className="group rounded-2xl border border-border/70 bg-card-gradient p-7 hover:border-crimson/60 hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start justify-between">
                  <BookOpen className="h-6 w-6 text-crimson" />
                  <span className="font-mono text-xs px-2 py-0.5 rounded-full border border-border/60 text-muted-foreground">{s.level}</span>
                </div>
                <h3 className="mt-5 font-serif text-2xl">{s.title.pl}</h3>
                <div className="text-sm text-rose">{s.title.bg}</div>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {s.minutes} min</span>
                  <span>·</span>
                  <span>{s.tags.join(" · ")}</span>
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-xs text-crimson">
                  Read <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
