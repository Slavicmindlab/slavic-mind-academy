import { defineTool } from "@lovable.dev/mcp-js";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_kingdoms",
  title: "List Case Quest kingdom progress",
  description:
    "Return the signed-in user's progress across the seven Polish grammatical case kingdoms in Case Quest (cleared, boss defeated, attempts, best score).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    const userId = ctx.getUserId();
    if (!ctx.isAuthenticated() || !userId)
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("user_kingdoms")
      .select("case_slug, cleared, boss_defeated, attempts, best_score, updated_at")
      .eq("user_id", userId);
    if (error)
      return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { count: data?.length ?? 0, kingdoms: data ?? [] },
    };
  },
});
