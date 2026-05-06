import type { SVGProps } from "react";

/**
 * SlavicMind mark — a stylized "S" formed by two interlocking arcs
 * inspired by Slavic knotwork and illuminated-manuscript initials.
 * The negative space hints at a brain hemisphere; a single dot marks
 * the "thought".
 */
export function SlavicMindLogo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient id="sm-stroke" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="oklch(0.95 0.012 80)" />
          <stop offset="100%" stopColor="oklch(0.85 0.05 60)" />
        </linearGradient>
      </defs>
      {/* outer manuscript ring */}
      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeOpacity="0.35" strokeWidth="0.6" />
      <circle cx="20" cy="20" r="16.2" stroke="currentColor" strokeOpacity="0.18" strokeWidth="0.4" />
      {/* four cardinal serifs — knot anchors */}
      <path d="M20 2 L20 5 M20 35 L20 38 M2 20 L5 20 M35 20 L38 20" stroke="currentColor" strokeOpacity="0.5" strokeWidth="0.6" strokeLinecap="round" />
      {/* the stylized S — two interlocking arcs (top hooks right, bottom hooks left) */}
      <path
        d="M28 12 C 28 8, 22 7, 18 9 C 14 11, 13 16, 17 19 C 20 21, 25 21, 27 24 C 29 27, 26 31, 22 31 C 17 31, 13 29, 12 26"
        stroke="url(#sm-stroke)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* knot crossing dot — the "mind" */}
      <circle cx="22" cy="20" r="1.1" fill="currentColor" />
    </svg>
  );
}

/**
 * A thin, repeating manuscript ornament — used as a subtle divider.
 * Inspired by Cyrillic chapter marks and Polish lacework.
 */
export function Ornament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 12"
      className={className}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <line x1="0" y1="6" x2="96" y2="6" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.5" />
      <line x1="144" y1="6" x2="240" y2="6" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.5" />
      {/* central diamond knot */}
      <path d="M120 1 L126 6 L120 11 L114 6 Z" stroke="currentColor" strokeOpacity="0.7" strokeWidth="0.6" />
      <circle cx="120" cy="6" r="1" fill="currentColor" />
      <circle cx="104" cy="6" r="0.8" fill="currentColor" fillOpacity="0.6" />
      <circle cx="136" cy="6" r="0.8" fill="currentColor" fillOpacity="0.6" />
    </svg>
  );
}

/**
 * Corner flourish for cards & sections — placed absolutely.
 */
export function CornerKnot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <path d="M2 14 L2 2 L14 2" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.6" />
      <path d="M2 8 L8 8 L8 2" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
      <circle cx="8" cy="8" r="1" fill="currentColor" fillOpacity="0.6" />
    </svg>
  );
}
