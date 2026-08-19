import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass } from "lucide-react";
import { ClientOnly } from "@/components/ClientOnly";
import { useProgress } from "@/lib/progress";
import { recommendNext } from "@/lib/learning-path";

/**
 * Deterministic "what next" card. The recommendation comes from
 * recommendNext() in src/lib/learning-path.ts and nothing else — no invented
 * personalisation, no claims about last activity or weak skills.
 */
export function ContinueLearning({ className = "" }: { className?: string }) {
  return (
    <ClientOnly fallback={<div className={`h-[168px] rounded-2xl border border-border/70 bg-card-gradient ${className}`} />}>
      <ContinueLearningInner className={className} />
    </ClientOnly>
  );
}

function ContinueLearningInner({ className }: { className?: string }) {
  const p = useProgress();
  const rec = recommendNext(p);

  return (
    <div className={`rounded-2xl border border-border/70 bg-card-gradient p-6 sm:p-8 ${className}`}>
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-crimson">
        <Compass className="h-3 w-3" aria-hidden="true" /> Recommended next
      </div>
      <h2 className="mt-4 font-serif text-2xl sm:text-3xl text-balance">{rec.title}</h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{rec.reason}</p>
      <Link
        to={rec.to}
        className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-lg bg-crimson-gradient px-6 text-sm text-ivory shadow-glow transition hover:opacity-95"
      >
        {rec.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
