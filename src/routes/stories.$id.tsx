import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SpeakButton } from "@/components/SpeakButton";
import { STORIES } from "@/data/stories";
import { addXp } from "@/lib/progress";
import { ArrowLeft, Check, X, Sparkles } from "lucide-react";

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
        <Link to="/stories" className="mt-4 inline-block text-crimson">← All stories</Link>
      </div>
    </div>
  ),
});

function StoryReader() {
  const { id } = Route.useParams();
  const story = STORIES.find((s) => s.id === id);
  if (!story) throw notFound();

  const [showBg, setShowBg] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [scored, setScored] = useState(false);

  const submit = () => {
    if (scored) return;
    let correct = 0;
    story.questions.forEach((q, i) => { if (answers[i] === q.answer) correct += 1; });
    addXp(20 + correct * 10, `Story · ${story.title.pl}`);
    setScored(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-6 py-12">
          <Link to="/stories" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ivory">
            <ArrowLeft className="h-4 w-4" /> Stories
          </Link>
          <div className="mt-6 animate-fade-up">
            <div className="text-xs uppercase tracking-[0.3em] text-crimson">{story.level} · {story.minutes} min</div>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl">{story.title.pl}</h1>
            <div className="mt-1 text-muted-foreground italic">{story.title.bg}</div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => setShowBg((v) => !v)}
              className="px-3 py-1.5 rounded-md border border-border/70 bg-surface/40 text-xs hover:border-crimson/60"
            >
              {showBg ? "Hide Bulgarian" : "Show Bulgarian"}
            </button>
            <SpeakButton text={story.paragraphs.map((p) => p.pl).join(" ")} size="md" label="Listen to the whole story" />
          </div>

          <article className="mt-8 space-y-6">
            {story.paragraphs.map((p, i) => (
              <div key={i} className="rounded-2xl border border-border/70 bg-card-gradient p-6">
                <div className="flex items-start gap-3">
                  <p className="font-serif text-lg leading-relaxed flex-1">{p.pl}</p>
                  <SpeakButton text={p.pl} />
                </div>
                {showBg && <p className="mt-3 text-sm text-muted-foreground">{p.bg}</p>}
              </div>
            ))}
          </article>

          <div className="mt-10">
            <div className="text-xs uppercase tracking-[0.3em] text-rose">Comprehension</div>
            <h3 className="mt-2 font-serif text-2xl">Quick check</h3>
            <div className="mt-5 space-y-5">
              {story.questions.map((q, i) => (
                <div key={i} className="rounded-2xl border border-border/70 bg-card-gradient p-5">
                  <div className="font-serif">{q.q}</div>
                  <div className="text-xs text-muted-foreground">{q.bg}</div>
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
                          className={`text-left px-3 py-2 rounded-lg border text-sm transition flex items-center justify-between ${cls}`}
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
                className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-crimson-gradient text-ivory shadow-glow hover:opacity-95 transition disabled:opacity-40"
              >
                Submit answers
              </button>
            ) : (
              <div className="mt-6 inline-flex items-center gap-2 text-sm text-gold">
                <Sparkles className="h-4 w-4" /> Nice work — XP added.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
