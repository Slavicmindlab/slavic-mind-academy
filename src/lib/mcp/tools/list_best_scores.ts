import { defineTool } from "@lovable.dev/mcp-js";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_best_scores",
  title: "List my best game scores",
  description: "Return the signed-in user's best score for each SlavicMind mind game.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    const userId = ctx.getUserId();
    if (!ctx.isAuthenticated() || !userId)
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("user_best_scores")
      .select("game_id, score, updated_at")
      .eq("user_id", userId)
      .order("score", { ascending: false });
    if (error)
      return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { count: data?.length ?? 0, scores: data ?? [] },
    };
  },
});
