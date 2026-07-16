import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getProgress from "./tools/get_progress";
import searchVocabulary from "./tools/search_vocabulary";
import listFavorites from "./tools/list_favorites";
import addFavorite from "./tools/add_favorite";
import listKingdoms from "./tools/list_kingdoms";
import listBestScores from "./tools/list_best_scores";

// The OAuth issuer MUST be the direct Supabase host. SUPABASE_URL is rewritten
// to the .lovable.cloud proxy on publish; the project ref survives unchanged.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "slavicmind-mcp",
  title: "SlavicMind",
  version: "0.1.0",
  instructions:
    "Tools for the SlavicMind Polish learning platform. Read the signed-in learner's XP, streak, kingdom progress, and best game scores; search the Polish↔Bulgarian↔English vocabulary; manage their favorited words.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    getProgress,
    searchVocabulary,
    listFavorites,
    addFavorite,
    listKingdoms,
    listBestScores,
  ],
});
