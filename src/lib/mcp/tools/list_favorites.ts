import { defineTool } from "@lovable.dev/mcp-js";
import { supabaseForUser } from "../supabase";
import { WORDS } from "@/data/vocabulary";

export default defineTool({
  name: "list_favorites",
  title: "List my favorite words",
  description: "Return the signed-in user's favorited Polish vocabulary entries with translations and examples.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    const userId = ctx.getUserId();
    if (!ctx.isAuthenticated() || !userId)
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("user_favorites")
      .select("word_id, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error)
      return { content: [{ type: "text", text: error.message }], isError: true };
    const byId = new Map(WORDS.map((w) => [w.id, w]));
    const favorites = (data ?? []).map((row) => ({
      word_id: row.word_id,
      created_at: row.created_at,
      word: byId.get(row.word_id) ?? null,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(favorites, null, 2) }],
      structuredContent: { count: favorites.length, favorites },
    };
  },
});
