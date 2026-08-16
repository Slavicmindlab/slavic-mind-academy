import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, LogIn, LogOut, Flame, Zap, Crown } from "lucide-react";
import { useProgress, levelFromXp } from "@/lib/progress";
import { useAuth, signOut } from "@/hooks/useAuth";

export function MobileNav({ items }: { items: { to: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const p = useProgress();
  const { user } = useAuth();
  const lvl = levelFromXp(p.xp).level;

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="grid h-11 w-11 place-items-center rounded-md border border-border/70 hover:bg-surface/60 transition"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto border-t border-border/60 bg-background/98 backdrop-blur-xl">
          <div className="px-6 py-6">
            <div className="grid grid-cols-3 gap-3">
              <MiniStat icon={Flame} label="Streak" value={`${p.streak}d`} className="text-crimson" />
              <MiniStat icon={Zap} label="XP" value={`${p.xp}`} className="text-gold" />
              <MiniStat icon={Crown} label="Level" value={`${lvl}`} className="text-muted-foreground" />
            </div>

            <nav className="mt-6 flex flex-col">
              {items.map((n) => {
                const active = n.to === "/" ? path === "/" : path.startsWith(n.to);
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    className={`flex min-h-[52px] items-center rounded-lg px-4 text-base transition-colors ${
                      active ? "bg-surface-2 text-ivory" : "text-muted-foreground hover:bg-surface/60"
                    }`}
                  >
                    {n.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 border-t border-border/60 pt-6">
              {user ? (
                <button
                  onClick={() => {
                    void signOut();
                    setOpen(false);
                  }}
                  className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-lg border border-border/70 text-sm"
                >
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              ) : (
                <Link
                  to="/auth"
                  search={{ next: "" }}
                  className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-crimson-gradient text-sm text-ivory"
                >
                  <LogIn className="h-4 w-4" /> Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MiniStat({
  icon: Icon,
  label,
  value,
  className,
}: {
  icon: typeof Flame;
  label: string;
  value: string;
  className: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-surface/40 p-3 text-center">
      <Icon className={`mx-auto h-4 w-4 ${className}`} />
      <div className="mt-1 font-serif text-lg">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}
