import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";
import { WORDS } from "@/data/vocabulary";

export default defineTool({
  name: "add_favorite",
  title: "Add a word to my favorites",
  description: "Add a Polish vocabulary word (by SlavicMind word id) to the signed-in user's favorites.",
  inputSchema: {
    word_id: z.string().trim().min(1).describe("SlavicMind vocabulary word id (e.g. 'g1', 'v4'). Use search_vocabulary to look one up."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: async ({ word_id }, ctx) => {
    const userId = ctx.getUserId();
    if (!ctx.isAuthenticated() || !userId)
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    if (!WORDS.some((w) => w.id === word_id))
      return { content: [{ type: "text", text: `Unknown word_id: ${word_id}` }], isError: true };
    const supabase = supabaseForUser(ctx);
    const { error } = await supabase
      .from("user_favorites")
      .upsert({ user_id: userId, word_id }, { onConflict: "user_id,word_id" });
    if (error)
      return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: `Added ${word_id} to favorites.` }],
      structuredContent: { ok: true, word_id },
    };
  },
});
