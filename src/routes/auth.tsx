import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { SiteHeader } from "@/components/SiteHeader";
import { Loader2, Mail, Lock, Sparkles } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — SlavicMind" },
      {
        name: "description",
        content:
          "Sign in to sync your Polish learning progress across all your devices in real time.",
      },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({
    next: typeof s.next === "string" ? s.next : "",
  }),
  component: AuthPage,
});

function safeNext(raw: string): string {
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/dashboard";
  return raw;
}

function AuthPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { next } = Route.useSearch();
  const target = safeNext(next);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const authReturnUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const url = new URL("/auth", window.location.origin);
    if (target !== "/dashboard") url.searchParams.set("next", target);
    return url.toString();
  }, [target]);

  useEffect(() => {
    if (!loading && user) navigate({ to: target });
  }, [user, loading, navigate, target]);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setBusy(true);

    try {
      if (mode === "signup") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: authReturnUrl ? { emailRedirectTo: authReturnUrl } : undefined,
        });
        if (signUpError) throw signUpError;

        if (data.session) {
          setNotice("Account created. Signing you in…");
        } else {
          setNotice(
            "Account created. Check your email to confirm your address, then return here to sign in.",
          );
        }
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) throw signInError;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    setNotice(null);
    setBusy(true);

    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: authReturnUrl ? { redirectTo: authReturnUrl } : undefined,
      });
      if (oauthError) throw oauthError;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Google sign-in failed");
      setBusy(false);
    }
  }

  function switchMode() {
    setMode((current) => (current === "signin" ? "signup" : "signin"));
    setError(null);
    setNotice(null);
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative grain">
        <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-md px-6 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-crimson">
              <Sparkles className="h-3 w-3" /> Sync your progress
            </div>
            <h1 className="mt-4 font-serif text-4xl">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Real-time XP, streaks, and kingdoms across every device.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-border/70 bg-card-gradient p-6">
            <button
              type="button"
              onClick={handleGoogle}
              disabled={busy}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border bg-surface hover:bg-surface-2 transition text-sm disabled:opacity-50"
            >
              <GoogleIcon /> Continue with Google
            </button>

            <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
              <div className="h-px flex-1 bg-border/60" /> or{" "}
              <div className="h-px flex-1 bg-border/60" />
            </div>

            <form onSubmit={handleEmail} className="space-y-3">
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  Email
                </span>
                <div className="mt-1 flex items-center gap-2 rounded-lg border border-border bg-surface/60 px-3 py-2.5">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                    placeholder="you@example.com"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  Password
                </span>
                <div className="mt-1 flex items-center gap-2 rounded-lg border border-border bg-surface/60 px-3 py-2.5">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    autoComplete={mode === "signin" ? "current-password" : "new-password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </label>

              {error && (
                <p
                  role="alert"
                  className="rounded-lg border border-crimson/30 bg-crimson/10 px-3 py-2 text-xs text-crimson"
                >
                  {error}
                </p>
              )}
              {notice && (
                <p
                  role="status"
                  className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-300"
                >
                  {notice}
                </p>
              )}

              <button
                type="submit"
                disabled={busy}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-crimson-gradient text-ivory text-sm shadow-glow hover:opacity-95 transition disabled:opacity-50"
              >
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                {mode === "signin" ? "Sign in" : "Create account"}
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
              <button type="button" onClick={switchMode} className="text-crimson hover:underline">
                {mode === "signin" ? "Create an account" : "Sign in"}
              </button>
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            <Link to="/" className="hover:text-ivory">
              ← Continue without an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.3 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 7.3 29.5 5 24 5 16.3 5 9.6 9.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.3 0 10.2-2 13.9-5.3l-6.4-5.4c-2 1.4-4.6 2.3-7.5 2.3-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.4 39.6 16.1 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.7l6.4 5.4C41 35.5 44 30.3 44 24c0-1.2-.1-2.3-.4-3.5z"
      />
    </svg>
  );
}
