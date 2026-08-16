import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
  as: As = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <div className="text-[11px] uppercase tracking-[0.3em] text-crimson">{eyebrow}</div>
        )}
        <As className="mt-3 font-serif text-3xl sm:text-4xl tracking-tight text-balance">{title}</As>
        {subtitle && (
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
