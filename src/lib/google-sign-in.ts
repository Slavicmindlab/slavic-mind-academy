import { createLovableAuth } from "@lovable.dev/cloud-auth-js";
import { supabase } from "@/integrations/supabase/client";

// The OAuth broker belongs to the existing Lovable project, even when the
// frontend runs on Cloudflare. Workers does not provide /~oauth/initiate.
const OAUTH_BROKER_URL = "https://slavicmind-app.lovable.app/~oauth/initiate";

export async function signInWithGoogle(redirectUri: string) {
  const result = await createLovableAuth({
    oauthBrokerUrl: OAUTH_BROKER_URL,
  }).signInWithOAuth("google", { redirect_uri: redirectUri });

  if (result.error) throw result.error;
  // Full-page redirects return tokens to /auth, where the existing Supabase
  // client detects the session. Preview popup flows return tokens here instead.
  if (result.redirected) return;

  const { error } = await supabase.auth.setSession(result.tokens);
  if (error) throw error;
}
