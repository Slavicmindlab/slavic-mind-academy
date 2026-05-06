import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/vocabulary", label: "Vocabulary" },
];

export function SiteHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative h-8 w-8 rounded-lg bg-crimson-gradient grid place-items-center shadow-glow">
            <BookOpen className="h-4 w-4 text-ivory" />
          </div>
          <span className="font-serif text-xl tracking-tight">
            Slavic<span className="text-crimson italic">Mind</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => {
            const active = path === n.to;
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
            to="/dashboard"
            className="hidden sm:inline-flex text-sm px-4 py-2 rounded-md bg-crimson-gradient text-ivory hover:opacity-90 transition shadow-glow"
          >
            Start learning
          </Link>
        </div>
      </div>
    </header>
  );
}
