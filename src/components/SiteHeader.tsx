import { Link, useRouterState } from "@tanstack/react-router";
import { SlavicMindLogo } from "@/components/SlavicMindLogo";

const nav = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/vocabulary", label: "Vocabulary" },
  { to: "/games/memory", label: "Mind games" },
];

export function SiteHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative h-9 w-9 rounded-lg bg-surface-2 border border-border/70 grid place-items-center text-ivory transition group-hover:border-crimson/60 group-hover:shadow-glow">
            <SlavicMindLogo className="h-7 w-7" />
          </div>
          <span className="font-serif text-xl tracking-tight">
            Slavic<span className="text-crimson italic">Mind</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => {
            const active = path === n.to || (n.to !== "/" && path.startsWith(n.to));
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
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
          <Link
            to="/games/memory"
            className="hidden sm:inline-flex text-sm px-4 py-2 rounded-md bg-crimson-gradient text-ivory hover:opacity-90 transition shadow-glow"
          >
            Play
          </Link>
        </div>
      </div>
    </header>
  );
}
