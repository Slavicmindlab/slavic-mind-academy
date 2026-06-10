import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { bindUser } from "@/lib/progress";
import { bindQuestUser } from "@/lib/quest";

export function AuthBridge() {
  const { user, loading } = useAuth();
  useEffect(() => {
    if (loading) return;
    void bindUser(user?.id ?? null);
    void bindQuestUser(user?.id ?? null);
  }, [user?.id, loading]);
  return null;
}
