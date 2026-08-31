import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Ornament } from "@/components/SlavicMindLogo";
import { STORIES } from "@/data/stories";
import { useStoryState } from "@/lib/story-state";
import { ArrowRight, BookmarkCheck, CheckCircle2, Clock, BookOpen } from "lucide-react";

// @ts-expect-error routeTree.gen.ts is regenerated during the production build.
export const Route = createFileRoute("/stories/")({
  head: () => ({
    meta: [
      { title: "Polish Reading Stories — Parallel BG Text | SlavicMind" },
      {
        name: "description",
        content:
          "Short Polish reading exercises with parallel Bulgarian translation, native audio, comprehension questions, and XP rewards — for A1 through B2.",
      },
      { property: "og:title", content: "Polish reading stories with Bulgarian translation" },
      {
        property: "og:description",
        content:
          "Read Polish short stories with parallel Bulgarian text, audio, and comprehension quizzes.",
      },
      { property: "og:url", content: "https://slavicmind-app.lovable.app/stories" },
    ],
    links: [{ rel: "canonical", href: "https://slavicmind-app.lovable.app/stories" }],
  }),
  component: StoriesHub,
});

function StoriesHub() {
  const storyState = useStoryState();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
          <div className="text-center animate-fade-up">
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">Czytanki</div>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl">Stories & reading</h1>
            <Ornament className="mx-auto mt-4 w-72 max-w-full text-crimson" />
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Малки сцени от полския живот — четими текстове с превод, звук, въпроси и възможност
              да запазиш или отбележиш прочетеното.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 grid md:grid-cols-2 gap-5">
            {STORIES.map((s) => {
              const isRead = storyState.read.includes(s.id);
              const isSaved = storyState.saved.includes(s.id);
              return (
                <Link
                  key={s.id}
                  to="/stories/$id"
                  params={{ id: s.id }}
                  className="group rounded-2xl border border-border/70 bg-card-gradient p-5 sm:p-7 hover:border-crimson/60 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson/70 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <BookOpen className="h-6 w-6 text-crimson shrink-0" />
                    <div className="flex flex-wrap justify-end items-center gap-2">
                      {isSaved && (
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-gold">
                          <BookmarkCheck className="h-3.5 w-3.5" /> Saved
                        </span>
                      )}
                      {isRead && (
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-emerald-400">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Read
                        </span>
                      )}
                      <span className="font-mono text-xs px-2 py-0.5 rounded-full border border-border/60 text-muted-foreground">
                        {s.level}
                      </span>
                    </div>
                  </div>
                  <h2 className="mt-5 font-serif text-2xl">{s.title.pl}</h2>
                  <div className="text-sm text-rose">{s.title.bg}</div>
                  <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {s.minutes} min
                    </span>
                    <span>·</span>
                    <span>{s.tags.join(" · ")}</span>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1 text-xs text-crimson">
                    {isRead ? "Read again" : "Read"}{" "}
                    <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
