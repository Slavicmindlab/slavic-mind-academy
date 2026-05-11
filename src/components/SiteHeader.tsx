import { Link, useRouterState } from "@tanstack/react-router";
import { SlavicMindLogo } from "@/components/SlavicMindLogo";
import { SoundToggle } from "@/components/SoundToggle";
import { useProgress, levelFromXp } from "@/lib/progress";
import { Flame, Zap } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/vocabulary", label: "Vocabulary" },
  { to: "/grammar", label: "Grammar" },
  { to: "/games", label: "Mind games" },
];

export function SiteHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const p = useProgress();
  const lvl = levelFromXp(p.xp).level;

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative h-9 w-9 rounded-lg bg-surface-2 border border-border/70 grid place-items-center text-ivory transition group-hover:border-crimson/60 group-hover:shadow-glow">
            <SlavicMindLogo className="h-7 w-7" />
          </div>
          <span className="font-serif text-xl tracking-tight">
            Slavic<span className="text-crimson italic">Mind</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => {
            const active = n.to === "/" ? path === "/" : path.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`px-3.5 py-2 text-sm rounded-md transition-colors ${
                  active
                    ? "text-ivory bg-surface-2"
                    : "text-muted-foreground hover:text-ivory hover:bg-surface/60"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-md border border-border/70 bg-surface/40 text-xs">
            <span className="flex items-center gap-1 text-crimson"><Flame className="h-3.5 w-3.5" />{p.streak}</span>
            <span className="flex items-center gap-1 text-gold"><Zap className="h-3.5 w-3.5" />{p.xp}</span>
            <span className="text-muted-foreground font-mono">L{lvl}</span>
          </div>
          <SoundToggle />
          <Link
            to="/games"
            className="hidden sm:inline-flex text-sm px-4 py-2 rounded-md bg-crimson-gradient text-ivory hover:opacity-90 transition shadow-glow"
          >
            Play
          </Link>
        </div>
      </div>
    </header>
  );
}
