import { Link, useRouterState } from "@tanstack/react-router";
import { SlavicMindLogo } from "@/components/SlavicMindLogo";
import { SoundToggle } from "@/components/SoundToggle";
import { ClientOnly } from "@/components/ClientOnly";
import { useProgress, levelFromXp } from "@/lib/progress";
import { useAuth, signOut } from "@/hooks/useAuth";
import { Flame, Zap, LogIn, LogOut, Radio } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/daily", label: "Daily" },
  { to: "/vocabulary", label: "Vocabulary" },
  { to: "/grammar", label: "Grammar" },
  { to: "/games", label: "Mind games" },
  { to: "/stories", label: "Stories" },
];

function HeaderStats() {
  const p = useProgress();
  const lvl = levelFromXp(p.xp).level;
  const { user } = useAuth();
  return (
    <>
      <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-md border border-border/70 bg-surface/40 text-xs">
        {user && <Radio className="h-3 w-3 text-emerald-400 animate-pulse" aria-label="Live sync" />}
        <span className="flex items-center gap-1 text-crimson"><Flame className="h-3.5 w-3.5" />{p.streak}</span>
        <span className="flex items-center gap-1 text-gold"><Zap className="h-3.5 w-3.5" />{p.xp}</span>
        <span className="text-muted-foreground font-mono">L{lvl}</span>
      </div>
      <SoundToggle />
      {user ? (
        <button
          onClick={() => signOut()}
          title={user.email ?? "Sign out"}
          className="inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-md border border-border/70 hover:bg-surface/60 transition"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Sign out</span>
        </button>
      ) : (
        <Link
          to="/auth"
          className="inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-md border border-border/70 hover:bg-surface/60 transition"
        >
          <LogIn className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Sign in</span>
        </Link>
      )}
    </>
  );
}

export function SiteHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname });

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
          <ClientOnly>
            <HeaderStats />
          </ClientOnly>
        </div>
      </div>
    </header>
  );
}
