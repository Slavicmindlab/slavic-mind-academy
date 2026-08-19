import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, CircleDot, Circle } from "lucide-react";
import type { PathStep, StepStatus } from "@/lib/learning-path";

/** Status label + icon. Status is never communicated by colour alone. */
function statusMeta(status: StepStatus, isFirstOpen: boolean) {
  if (status === "done") return { label: "Completed", Icon: Check, tone: "text-gold border-gold/50" };
  if (status === "started") return { label: "Continue", Icon: CircleDot, tone: "text-crimson border-crimson/60" };
  return { label: isFirstOpen ? "Start" : "Open", Icon: Circle, tone: "text-muted-foreground border-border/80" };
}

export function LearningPathItem({
  step,
  status,
  index,
  isFirstOpen,
}: {
  step: PathStep;
  status: StepStatus;
  index: number;
  isFirstOpen: boolean;
}) {
  const { label, Icon, tone } = statusMeta(status, isFirstOpen);
  return (
    <li>
      <Link
        to={step.to}
        className="group flex gap-4 rounded-2xl border border-border/70 bg-card-gradient p-5 transition hover:border-crimson/60 focus-visible:border-crimson/60"
      >
        <div className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border ${tone}`}>
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
            <span className="rounded-full border border-border/70 px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
              {step.kind}
            </span>
            <span className="rounded-full border border-border/70 px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
              {label}
            </span>
          </div>
          <div className="mt-2 font-serif text-xl text-balance">{step.title}</div>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.blurb}</p>
        </div>
        <ArrowRight
          className="mt-1 hidden h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-crimson sm:block"
          aria-hidden="true"
        />
      </Link>
    </li>
  );
}
