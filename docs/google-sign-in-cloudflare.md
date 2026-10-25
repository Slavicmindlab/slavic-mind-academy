# Google sign-in on Cloudflare (deployment gate)

The database remains the existing Lovable Cloud project. Do not create a
replacement Supabase project, migrate data, reset progress, or add a Google
client secret to frontend variables.

## Why the existing sign-in fails

The deployed `/auth` page called Supabase's Google OAuth provider directly.
That endpoint returned `Unsupported provider: missing OAuth secret`, while the
project's Google settings use **Managed by Lovable**.

Lovable's installed `@lovable.dev/cloud-auth-js` SDK uses `/~oauth/initiate` by
default. That path returns 404 on the Cloudflare Worker. This change sends
Google sign-in through the existing project's published Lovable broker instead.
The SDK preserves its state validation for popup responses, and the existing
Supabase session handling and database remain in use.

## Required before merging or deploying

Keep **Managed by Lovable** selected in More → Users → Settings → Google.

Authorize this exact application return URL in the **existing Lovable project's
authentication redirect allowlist**:

```
https://tanstack-start-app.slavic-mindstudy.workers.dev/auth
```

The read-only broker probe on 2026-10-25 rejected that URL with
`Authorization request is invalid: redirect_uri is not allowed`. This is a
separate deployment blocker; this code does not bypass the allowlist. Configure
it through Lovable's auth settings, or ask Lovable support to authorize the
external frontend's URL for this project. Google Cloud's Authorized redirect
URIs field is not the Lovable application's return-URL allowlist.

The application can append a `next` query parameter to `/auth`. Ensure the
allowlist supports the actual return URLs used by protected pages, using the
narrowest supported rule. Do not allow arbitrary domains or use a global `*`.
Preview deployments and localhost likewise need their own explicitly authorized
return URLs before a real sign-in can succeed there.

If Lovable cannot authorize this external origin, **do not merge this PR as a
working login fix**. A supported alternative hosting/auth configuration must
first be agreed; creating a second database is outside this change.

## Verification

The browser regression intercepts the outgoing OAuth request, so it cannot
create an account or change production data. It verifies the Google button
targets the project's broker rather than the unconfigured direct Supabase
provider or the Worker's missing `/~oauth/initiate` route.

After the allowlist is configured and a deployment is separately authorized:

1. Sign in with the existing Google account from `/auth`.
2. Confirm that the browser returns to the Cloudflare `/auth` route and reaches
   the dashboard with the existing profile and progress.
3. Repeat from a protected page with `next` set; ensure it stays on this origin.
4. Check cancelled sign-in, sign-out, mobile, and the Lovable preview.

Typecheck, lint, build, and an intercepted browser request cannot prove the
Google consent flow works. End-to-end authentication is still required.
