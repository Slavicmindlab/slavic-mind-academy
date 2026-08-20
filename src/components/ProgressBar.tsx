/**
 * A labelled progress bar. Only ever fed a real numerator and denominator —
 * never an invented percentage. If there is no honest denominator, callers
 * should render a plain count instead of using this component.
 */
export function ProgressBar({
  label,
  value,
  max,
  unit,
}: {
  label: string;
  value: number;
  max: number;
  unit?: string;
}) {
  const safeMax = max > 0 ? max : 1;
  const pct = Math.max(0, Math.min(100, Math.round((value / safeMax) * 100)));
  const text = `${value} / ${max}${unit ? ` ${unit}` : ""}`;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</span>
        <span className="font-mono text-xs text-muted-foreground">{text}</span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={text}
        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface-2"
      >
        <div
          className="h-full bg-crimson-gradient transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
