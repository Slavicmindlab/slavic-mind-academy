import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { Loader2, ShieldCheck, X } from "lucide-react";

type AuthorizationDetails = {
  client?: { name?: string; client_uri?: string } | null;
  redirect_uri?: string;
  scope?: string;
  redirect_url?: string;
  redirect_to?: string;
} | null;

// Minimal typed wrapper for the beta supabase.auth.oauth namespace.
type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<{ data: AuthorizationDetails; error: { message: string } | null }>;
  approveAuthorization: (id: string) => Promise<{ data: { redirect_url?: string; redirect_to?: string } | null; error: { message: string } | null }>;
  denyAuthorization: (id: string) => Promise<{ data: { redirect_url?: string; redirect_to?: string } | null; error: { message: string } | null }>;
};
function oauthApi(): OAuthApi {
  return (supabase.auth as unknown as { oauth: OAuthApi }).oauth;
}

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("Missing authorization_id");
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      const next = location.pathname + location.searchStr;
      throw redirect({ to: "/auth", search: { next } });
    }
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id")!;
    const { data, error } = await oauthApi().getAuthorizationDetails(authorizationId);
    if (error) throw new Error(error.message);
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    return data;
  },
  component: ConsentPage,
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-md px-6 py-16 text-center">
        <h1 className="font-serif text-2xl">Authorization unavailable</h1>
        <p className="mt-3 text-sm text-muted-foreground">{String((error as Error)?.message ?? error)}</p>
      </main>
    </div>
  ),
});

function ConsentPage() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState<"approve" | "deny" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  async function decide(approve: boolean) {
    setError(null);
    setBusy(approve ? "approve" : "deny");
    const api = oauthApi();
    const { data, error } = approve
      ? await api.approveAuthorization(authorization_id)
      : await api.denyAuthorization(authorization_id);
    if (error) {
      setBusy(null);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(null);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  const clientName = details?.client?.name ?? "An application";
  const scopes = (details?.scope ?? "").split(/\s+/).filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-md px-6 py-16">
        <div className="rounded-2xl border border-border/70 bg-card-gradient p-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-crimson">
            <ShieldCheck className="h-3 w-3" /> Authorize access
          </div>
          <h1 className="mt-3 font-serif text-2xl">
            Connect <span className="text-crimson italic">{clientName}</span> to SlavicMind
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This lets {clientName} use SlavicMind as you{email ? ` (${email})` : ""}.
          </p>

          {details?.redirect_uri && (
            <p className="mt-4 text-xs text-muted-foreground break-all">
              Will redirect to: <span className="font-mono">{details.redirect_uri}</span>
            </p>
          )}

          {scopes.length > 0 && (
            <ul className="mt-4 space-y-1 text-sm">
              {scopes.map((s: string) => (
                <li key={s} className="text-muted-foreground">• {s}</li>
              ))}
            </ul>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            App permissions and backend policies still decide what data is accessible.
          </p>

          {error && <p role="alert" className="mt-4 text-xs text-crimson">{error}</p>}

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => decide(true)}
              disabled={busy !== null}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-crimson-gradient text-ivory text-sm shadow-glow hover:opacity-95 transition disabled:opacity-50"
            >
              {busy === "approve" && <Loader2 className="h-4 w-4 animate-spin" />}
              Approve
            </button>
            <button
              onClick={() => decide(false)}
              disabled={busy !== null}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border bg-surface hover:bg-surface-2 transition text-sm disabled:opacity-50"
            >
              {busy === "deny" ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
              Cancel
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
