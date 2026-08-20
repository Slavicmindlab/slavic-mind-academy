import { Link } from "@tanstack/react-router";
import { Repeat, Swords, Type, Zap } from "lucide-react";

/** Short existing activities only — nothing new is invented here. */
const ITEMS = [
  { to: "/games/quiz", label: "Timed quiz", desc: "Rapid vocabulary recall.", icon: Zap },
  {
    to: "/games/conjugation",
    label: "Conjugation drill",
    desc: "Six pronouns, one verb.",
    icon: Repeat,
  },
  {
    to: "/games/fillblank",
    label: "Fill the blank",
    desc: "Pick the right case form.",
    icon: Type,
  },
  { to: "/quest", label: "Case Quest", desc: "One kingdom per case.", icon: Swords },
];

export function QuickPractice({ heading = "Quick practice" }: { heading?: string }) {
  return (
    <div>
      <h2 className="text-[11px] uppercase tracking-[0.3em] text-crimson">{heading}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((i) => (
          <Link
            key={i.to}
            to={i.to}
            className="group flex min-h-[88px] flex-col rounded-xl border border-border/70 bg-card-gradient p-4 transition hover:-translate-y-0.5 hover:border-crimson/60"
          >
            <i.icon className="h-4 w-4 text-crimson" aria-hidden="true" />
            <div className="mt-3 font-serif text-lg leading-tight">{i.label}</div>
            <div className="mt-1 text-xs text-muted-foreground">{i.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
