import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export type NextStepLink = { to: string; params?: Record<string, string>; label: string };

/**
 * One small "where to go next" strip for leaf pages (a case, a story, a drill).
 * Deliberately tiny — leaf pages should not repeat the hub UI.
 */
export function NextStep({ title = "Next step", links }: { title?: string; links: NextStepLink[] }) {
  return (
    <nav aria-label={title} className="mt-10 rounded-2xl border border-border/70 bg-surface/30 p-5">
      <div className="text-xs uppercase tracking-[0.3em] text-rose">{title}</div>
      <ul className="mt-3 flex flex-wrap gap-2">
        {links.map((l) => (
          <li key={`${l.to}${JSON.stringify(l.params ?? {})}`}>
            <Link
              to={l.to}
              params={l.params as never}
              className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-card-gradient px-4 py-2 text-sm transition hover:border-crimson/60 hover:text-ivory"
            >
              {l.label}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
