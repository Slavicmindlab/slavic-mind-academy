import { useEffect, useState, type ReactNode } from "react";

/**
 * Renders children only on the client, after hydration. Use this to wrap any
 * component whose initial render depends on Math.random(), Date, localStorage,
 * window, or other non-deterministic / client-only state — otherwise React
 * aborts hydration (#418) and event handlers never attach, leaving the UI
 * visually mounted but unresponsive.
 */
export function ClientOnly({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <>{fallback}</>;
  return <>{children}</>;
}
