import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://slavicmind-app.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const CASE_SLUGS = ["mianownik", "dopelniacz", "celownik", "biernik", "narzednik", "miejscownik", "wolacz"];

// Story ids are stable — mirror src/data/stories.ts. Update when stories change.
const STORY_IDS = ["baba-yaga", "wawel-dragon", "krakus"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/dashboard", changefreq: "daily", priority: "0.7" },
          { path: "/vocabulary", changefreq: "weekly", priority: "0.9" },
          { path: "/grammar", changefreq: "weekly", priority: "0.9" },
          { path: "/grammar/conjugation", changefreq: "monthly", priority: "0.8" },
          { path: "/grammar/aspect", changefreq: "monthly", priority: "0.8" },
          { path: "/grammar/verbs", changefreq: "monthly", priority: "0.7" },
          { path: "/grammar/connections", changefreq: "monthly", priority: "0.7" },
          ...CASE_SLUGS.map((s) => ({ path: `/grammar/cases/${s}`, changefreq: "monthly" as const, priority: "0.8" })),
          { path: "/stories", changefreq: "weekly", priority: "0.8" },
          ...STORY_IDS.map((id) => ({ path: `/stories/${id}`, changefreq: "monthly" as const, priority: "0.6" })),
          { path: "/daily", changefreq: "daily", priority: "0.8" },
          { path: "/games", changefreq: "weekly", priority: "0.9" },
          { path: "/games/memory", priority: "0.6" },
          { path: "/games/crossword", priority: "0.6" },
          { path: "/games/quiz", priority: "0.6" },
          { path: "/games/sentence", priority: "0.6" },
          { path: "/games/conjugation", priority: "0.6" },
          { path: "/games/match", priority: "0.6" },
          { path: "/games/listening", priority: "0.6" },
          { path: "/games/battle", priority: "0.6" },
          { path: "/games/wordchain", priority: "0.6" },
          { path: "/games/fillblank", priority: "0.6" },
          { path: "/quest", changefreq: "weekly", priority: "0.9" },
          { path: "/guide/difficulty", changefreq: "monthly", priority: "0.7" },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ].filter(Boolean).join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
