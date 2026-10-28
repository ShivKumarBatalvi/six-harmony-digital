import { createFileRoute } from "@tanstack/react-router";
import { siteUrl } from "@/lib/seo";
export const Route = createFileRoute("/robots.txt")({
  staticData: { sitemap: false },
  server: { handlers: { GET: () => new Response(`User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } }) } },
});
