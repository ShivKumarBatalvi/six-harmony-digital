# Project conventions
- Canonical business metadata and shared service-area values live in src/lib/seo.ts so public pages and structured data use a consistent source.
- Service narrative and FAQ content live in src/lib/service-content.ts; ServicePage renders them and route metadata derives FAQ JSON-LD from the same answers to prevent drift.
- Every route explicitly declares staticData.sitemap; the server sitemap derives public paths from the router and excludes endpoints and non-public routes.
- Use SiteFooter on content pages so service and location navigation stays consistent.
- Keyword H1s occupy the existing small header-label position; the original slogans retain their visual styling as H2s to preserve the design.
