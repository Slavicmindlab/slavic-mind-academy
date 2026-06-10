import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AuthState = { user: User | null; session: Session | null; loading: boolean };

let cached: AuthState = { user: null, session: null, loading: true };
const listeners = new Set<(s: AuthState) => void>();
let initialized = false;

function setState(next: AuthState) {
  cached = next;
  listeners.forEach((l) => l(next));
}

function init() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  supabase.auth.getSession().then(({ data }) => {
    setState({ user: data.session?.user ?? null, session: data.session, loading: false });
  });
  supabase.auth.onAuthStateChange((_evt, session) => {
    setState({ user: session?.user ?? null, session, loading: false });
  });
}

export function useAuth() {
  const [s, setS] = useState<AuthState>(cached);
  useEffect(() => {
    init();
    listeners.add(setS);
    setS(cached);
    return () => { listeners.delete(setS); };
  }, []);
  return s;
}

export async function signOut() {
  await supabase.auth.signOut();
}
