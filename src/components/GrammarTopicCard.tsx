import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface GrammarTopic {
  to: string;
  title: string;
  body: string;
  icon?: LucideIcon;
  /** An existing practice route that genuinely drills this topic. */
  practice?: { to: string; label: string };
}

export function GrammarTopicCard({ topic }: { topic: GrammarTopic }) {
  const Icon = topic.icon;
  return (
    <div className="flex flex-col rounded-2xl border border-border/70 bg-card-gradient p-6 transition hover:border-crimson/60">
      {Icon && <Icon className="h-5 w-5 text-crimson" aria-hidden="true" />}
      <h3 className={`font-serif text-xl ${Icon ? "mt-4" : ""}`}>{topic.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{topic.body}</p>
      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5">
        <Link
          to={topic.to}
          className="inline-flex min-h-[36px] items-center gap-1 text-xs text-crimson"
        >
          Open {topic.title} <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>
        {topic.practice && (
          <Link
            to={topic.practice.to}
            className="inline-flex min-h-[36px] items-center gap-1 rounded-full border border-border/70 px-3 text-xs text-muted-foreground transition hover:border-crimson/60 hover:text-crimson"
          >
            {topic.practice.label}
          </Link>
        )}
      </div>
    </div>
  );
}
