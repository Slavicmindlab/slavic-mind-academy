import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SpeakButton } from "@/components/SpeakButton";
import { STORIES } from "@/data/stories";
import { addXp } from "@/lib/progress";
import {
  markStoryRead,
  toggleStorySaved,
  useStoryState,
} from "@/lib/story-state";
import { NextStep } from "@/components/NextStep";
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Check,
  CheckCircle2,
  Circle,
  Sparkles,
  X,
} from "lucide-react";

export const Route = createFileRoute("/stories/$id")({
  head: ({ params }) => {
    const s = STORIES.find((x) => x.id === params.id);
    const title = s?.title.pl ?? "Story";
    const bg = s?.title.bg ?? "";
    const desc = s
      ? `Read "${s.title.pl}" (${bg}) — a ${s.level} Polish reading exercise (${s.minutes} min) with parallel Bulgarian translation, audio pronunciation, and comprehension questions.`
      : "A Polish reading exercise with parallel Bulgarian translation, audio, and comprehension questions on SlavicMind.";
    const url = `https://slavicmind-app.lovable.app/stories/${params.id}`;
    return {
      meta: [
        { title: `${title} — SlavicMind Stories` },
        { name: "description", content: desc },
        { property: "og:title", content: `${title} — Polish reading` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:title", content: `${title} — Polish reading` },
        { name: "twitter:description", content: desc },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: StoryReader,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center bg-background">
      <div className="text-center">
        <h1 className="font-serif text-3xl">Story not found</h1>
        <Link to="/stories" className="mt-4 inline-block text-crimson">
          ← All stories
        </Link>
      </div>
    </div>
  ),
});

function StoryReader() {
  const { id } = Route.useParams();
  const story = STORIES.find((s) => s.id === id);
  if (!story) throw notFound();

  const idx = STORIES.findIndex((s) => s.id === id);
  const nextStory = STORIES[(idx + 1) % STORIES.length];
  const storyState = useStoryState();
  const isRead = storyState.read.includes(id);
  const isSaved = storyState.saved.includes(id);

  const [showBg, setShowBg] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [scored, setScored] = useState(false);
  const [markedParagraphs, setMarkedParagraphs] = useState<number[]>([]);

  const toggleParagraph = (index: number) => {
    setMarkedParagraphs((current) =>
      current.includes(index) ? current.filter((i) => i !== index) : [...current, index],
    );
  };

  const submit = () => {
    if (scored) return;
    let correct = 0;
    story.questions.forEach((q, i) => {
      if (answers[i] === q.answer) correct += 1;
    });
    addXp(20 + correct * 10, `Story · ${story.title.pl}`);
    markStoryRead(id, true);
    setScored(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <main className="relative mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
          <Link
            to="/stories"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ivory"
          >
            <ArrowLeft className="h-4 w-4" /> Stories
          </Link>

          <header className="mt-6 animate-fade-up">
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">
              {story.level} · {story.minutes} min
            </div>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl leading-tight">
              {story.title.pl}
            </h1>
            <div className="mt-2 text-base text-muted-foreground italic">{story.title.bg}</div>
          </header>

          <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setShowBg((v) => !v)}
              className="min-h-10 px-3 py-2 rounded-md border border-border/70 bg-surface/40 text-xs hover:border-crimson/60"
            >
              {showBg ? "Hide Bulgarian" : "Show Bulgarian"}
            </button>
            <button
              type="button"
              onClick={() => toggleStorySaved(id)}
              className="min-h-10 px-3 py-2 rounded-md border border-border/70 bg-surface/40 text-xs hover:border-crimson/60 inline-flex items-center gap-2"
            >
              {isSaved ? <BookmarkCheck className="h-4 w-4 text-gold" /> : <Bookmark className="h-4 w-4" />}
              {isSaved ? "Saved" : "Save story"}
            </button>
            <button
              type="button"
              onClick={() => markStoryRead(id, !isRead)}
              className="min-h-10 px-3 py-2 rounded-md border border-border/70 bg-surface/40 text-xs hover:border-crimson/60 inline-flex items-center gap-2"
            >
              {isRead ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Circle className="h-4 w-4" />}
              {isRead ? "Read" : "Mark as read"}
            </button>
            <SpeakButton
              text={story.paragraphs.map((p) => p.pl).join(" ")}
              size="md"
              label="Listen to the whole story"
            />
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Select any text to copy it, or mark a paragraph while you read.
          </p>

          <article className="mt-8 space-y-5 sm:space-y-6 select-text">
            {story.paragraphs.map((p, i) => {
              const marked = markedParagraphs.includes(i);
              return (
                <section
                  key={i}
                  className={`rounded-2xl border p-5 sm:p-7 transition-colors ${
                    marked
                      ? "border-gold/50 bg-gold/5"
                      : "border-border/70 bg-card-gradient"
                  }`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-serif text-xl sm:text-2xl leading-8 sm:leading-9 text-ivory">
                        {p.pl}
                      </p>
                      {showBg && (
                        <p className="mt-4 text-sm sm:text-base leading-7 text-muted-foreground border-t border-border/50 pt-4">
                          {p.bg}
                        </p>
                      )}
                    </div>
                    <div className="shrink-0 flex flex-col gap-2">
                      <SpeakButton text={p.pl} />
                      <button
                        type="button"
                        onClick={() => toggleParagraph(i)}
                        aria-label={marked ? "Unmark paragraph" : "Mark paragraph"}
                        className="h-9 w-9 rounded-md border border-border/70 bg-surface/40 grid place-items-center hover:border-gold/60"
                      >
                        {marked ? (
                          <CheckCircle2 className="h-4 w-4 text-gold" />
                        ) : (
                          <Circle className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>
                </section>
              );
            })}
          </article>

          <section className="mt-10">
            <div className="text-xs uppercase tracking-[0.3em] text-rose">Comprehension</div>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl">Quick check</h2>
            <div className="mt-5 space-y-5">
              {story.questions.map((q, i) => (
                <div key={i} className="rounded-2xl border border-border/70 bg-card-gradient p-5 sm:p-6">
                  <div className="font-serif text-lg">{q.q}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{q.bg}</div>
                  <div className="mt-3 grid sm:grid-cols-3 gap-2">
                    {q.choices.map((c, ci) => {
                      const picked = answers[i] === ci;
                      const isAnswer = q.answer === ci;
                      let cls = "border-border/70 hover:border-crimson/60";
                      if (scored) {
                        if (isAnswer) cls = "border-emerald-500/60 bg-emerald-500/5";
                        else if (picked) cls = "border-destructive/60 bg-destructive/5";
                        else cls = "border-border/40 opacity-60";
                      } else if (picked) {
                        cls = "border-crimson/60 bg-crimson/5";
                      }
                      return (
                        <button
                          key={ci}
                          disabled={scored}
                          onClick={() => setAnswers((a) => ({ ...a, [i]: ci }))}
                          className={`min-h-11 text-left px-3 py-2 rounded-lg border text-sm transition flex items-center justify-between ${cls}`}
                        >
                          <span>{c}</span>
                          {scored && isAnswer && <Check className="h-3.5 w-3.5 text-emerald-400" />}
                          {scored && picked && !isAnswer && <X className="h-3.5 w-3.5 text-destructive" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {!scored ? (
              <button
                onClick={submit}
                disabled={Object.keys(answers).length < story.questions.length}
                className="mt-6 w-full sm:w-auto min-h-11 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-crimson-gradient text-ivory shadow-glow hover:opacity-95 transition disabled:opacity-40"
              >
                Submit answers
              </button>
            ) : (
              <div className="mt-6 inline-flex items-center gap-2 text-sm text-gold">
                <Sparkles className="h-4 w-4" /> Nice work — XP added and story marked as read.
              </div>
            )}
          </section>

          <NextStep
            links={[
              ...(nextStory && nextStory.id !== id
                ? [
                    {
                      to: "/stories/$id",
                      params: { id: nextStory.id },
                      label: `Next story · ${nextStory.title.pl}`,
                    },
                  ]
                : []),
              { to: "/vocabulary", label: "Save new words" },
              { to: "/learn/polish", label: "Your Polish path" },
            ]}
          />
        </main>
      </div>
    </div>
  );
}
