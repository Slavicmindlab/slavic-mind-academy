// Never render provider-supplied descriptions: callback URLs can contain secrets.
export function oauthReturnError(hash: string, search: string): string | null {
  const fragment = new URLSearchParams(hash.replace(/^#/, ""));
  const query = new URLSearchParams(search.replace(/^\?/, ""));
  const error = fragment.get("error") || query.get("error");
  if (!error) return null;

  if (error === "access_denied") {
    return "Google sign-in was cancelled or access was denied. You can try again.";
  }

  if (error === "server_error") {
    return "Google sign-in could not be completed by the sign-in service. No session was created. Please contact SlavicMind support (OAuth server_error).";
  }

  return "Google sign-in failed. Please try again or contact SlavicMind support.";
}
