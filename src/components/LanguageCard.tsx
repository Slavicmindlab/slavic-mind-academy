import { Link } from "@tanstack/react-router";
import { ArrowRight, Lock } from "lucide-react";
import type { SlavicLanguage } from "@/data/languages";

export function LanguageCard({ lang }: { lang: SlavicLanguage }) {
  const available = lang.status === "available" && lang.href;

  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-lg border border-border/70 bg-surface-2 font-serif text-xl">
          {lang.glyph}
        </div>
        <span
          className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] ${
            available
              ? "border-crimson/50 text-crimson"
              : "border-border/70 text-muted-foreground"
          }`}
        >
          {available ? "Available" : "Planned"}
        </span>
      </div>
      <div className="mt-4 font-serif text-2xl">{lang.name}</div>
      <div className="text-xs font-mono text-muted-foreground">
        {lang.nativeName} · {lang.group}
      </div>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{lang.blurb}</p>
      <div className="mt-4 inline-flex items-center gap-1.5 text-xs">
        {available ? (
          <span className="text-crimson inline-flex items-center gap-1.5">
            Start learning <ArrowRight className="h-3.5 w-3.5" />
          </span>
        ) : (
          <span className="text-muted-foreground inline-flex items-center gap-1.5">
            <Lock className="h-3 w-3" /> Course not built yet
          </span>
        )}
      </div>
    </>
  );

  const base =
    "block rounded-2xl border border-border/70 bg-card-gradient p-6 min-h-[44px] transition";

  if (available) {
    return (
      <Link to={lang.href!} className={`${base} hover:border-crimson/60 hover:-translate-y-0.5`}>
        {inner}
      </Link>
    );
  }
  return <div className={`${base} opacity-70`}>{inner}</div>;
}
