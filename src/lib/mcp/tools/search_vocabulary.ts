import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { WORDS } from "@/data/vocabulary";

export default defineTool({
  name: "search_vocabulary",
  title: "Search Polish vocabulary",
  description:
    "Search the SlavicMind Polish↔Bulgarian↔English vocabulary. Filter by free-text query, category, or difficulty level (A1/A2/B1/B2). Returns Polish word, translations, pronunciation, gender, plural, and an example sentence.",
  inputSchema: {
    query: z.string().trim().optional().describe("Free-text search over Polish, Bulgarian, and English."),
    category: z.string().optional().describe("Vocabulary category (e.g. 'Food', 'Verbs')."),
    difficulty: z.enum(["A1", "A2", "B1", "B2"]).optional(),
    limit: z.number().int().min(1).max(50).optional().describe("Max results (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query, category, difficulty, limit }) => {
    const q = query?.toLowerCase().trim();
    let results = WORDS.filter((w) => {
      if (category && w.category.toLowerCase() !== category.toLowerCase()) return false;
      if (difficulty && w.difficulty !== difficulty) return false;
      if (q && !(`${w.pl} ${w.bg} ${w.en}`.toLowerCase().includes(q))) return false;
      return true;
    }).slice(0, limit ?? 20);
    return {
      content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
      structuredContent: { count: results.length, results },
    };
  },
});
