import { defineTool } from "@lovable.dev/mcp-js";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "get_progress",
  title: "Get my SlavicMind progress",
  description: "Return the signed-in user's XP, level, current streak, hero name, and XP earned today.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated())
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("user_progress")
      .select("xp, xp_today, streak, hero_name, last_active")
      .eq("user_id", ctx.getUserId())
      .maybeSingle();
    if (error)
      return { content: [{ type: "text", text: error.message }], isError: true };
    const xp = data?.xp ?? 0;
    const level = Math.floor(Math.sqrt(xp / 50)) + 1;
    const payload = {
      xp,
      level,
      xp_today: data?.xp_today ?? 0,
      streak: data?.streak ?? 0,
      hero_name: data?.hero_name ?? "Traveller",
      last_active: data?.last_active ?? null,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
