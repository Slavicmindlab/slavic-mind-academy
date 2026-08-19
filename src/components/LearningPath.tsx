import { ClientOnly } from "@/components/ClientOnly";
import { ProgressBar } from "@/components/ProgressBar";
import { LearningPathItem } from "@/components/LearningPathItem";
import { useProgress } from "@/lib/progress";
import { PATH_STEPS, pathCompletion, stepStatus } from "@/lib/learning-path";

/**
 * The Polish learning path, rendered from PATH_STEPS. Nothing is locked: every
 * step is a live link. Statuses come from stepStatus(), which only reports
 * "done" when the stored progress genuinely supports it.
 */
export function LearningPath() {
  return (
    <ClientOnly fallback={<div className="h-[520px] rounded-2xl border border-border/60 bg-surface/20" />}>
      <LearningPathInner />
    </ClientOnly>
  );
}

function LearningPathInner() {
  const p = useProgress();
  const statuses = PATH_STEPS.map((s) => stepStatus(s, p));
  const firstOpen = statuses.findIndex((s) => s !== "done");
  const { done, total } = pathCompletion(p);

  return (
    <div>
      <div className="max-w-md">
        <ProgressBar label="Tracked steps completed" value={done} max={total} />
        <p className="mt-2 text-xs text-muted-foreground">
          Some steps (grammar reading, quests, stories) aren't tracked, so they always stay open.
        </p>
      </div>
      <ol className="mt-6 grid gap-3">
        {PATH_STEPS.map((step, i) => (
          <LearningPathItem
            key={step.id}
            step={step}
            status={statuses[i]}
            index={i}
            isFirstOpen={i === firstOpen}
          />
        ))}
      </ol>
    </div>
  );
}
