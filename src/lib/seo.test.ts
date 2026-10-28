import { describe, expect, test } from "bun:test";
import { businessSchema, serviceAreas, serviceStructuredData } from "./seo";
import { isSitemapRouteIncluded, sitemapStaticPaths, sitemapXML } from "./sitemap";
import type { AnyRoute, AnyRouter } from "@tanstack/react-router";

describe("approved business data", () => {
  test("limits service areas to the six supplied cities", () => {
    expect(serviceAreas).toEqual(["Auckland", "Palmerston North", "Whanganui", "Rotorua", "Timaru", "Christchurch"]);
  });
  test("does not publish an unprovided telephone", () => expect(businessSchema).not.toHaveProperty("telephone"));
  test("does not publish an unprovided street address", () => expect(businessSchema).not.toHaveProperty("address"));
  test("service schemas share the approved business identifier and locations", () => {
    const [service] = serviceStructuredData("Commercial cleaning", "/commercial-cleaning", "Agreed site services", []);
    const data = JSON.parse(service.children);
    expect(data.url).toBe("https://sixharmony.co.nz/commercial-cleaning");
    expect(data.provider["@id"]).toBe("https://sixharmony.co.nz/#business");
    expect(data.areaServed.map((area: { name: string }) => area.name)).toEqual(serviceAreas);
  });
});

describe("public sitemap", () => {
  test("uses absolute business-domain URLs and does not invent lastmod", () => {
    const xml = sitemapXML("https://sixharmony.co.nz", [{ path: "/" }, { path: "/services" }]);
    expect(xml).toContain("<loc>https://sixharmony.co.nz/</loc>");
    expect(xml).toContain("<loc>https://sixharmony.co.nz/services</loc>");
    expect(xml).not.toContain("lastmod");
  });
  test("excludes endpoints and excluded private descendants", () => {
    const endpoint = { isRoot: false, options: { staticData: { sitemap: false } } } as unknown as AnyRoute;
    const child = { isRoot: false, options: { staticData: { sitemap: true } }, parentRoute: { options: { staticData: { sitemap: "exclude-subtree" } } } } as unknown as AnyRoute;
    expect(isSitemapRouteIncluded(endpoint)).toBe(false);
    expect(isSitemapRouteIncluded(child)).toBe(false);
  });
  test("includes newly registered public static routes without a manual URL list", () => {
    const route = { id: "/new-public-page", fullPath: "/new-public-page", options: { staticData: { sitemap: true } } };
    const router = { routesById: { [route.id]: route }, buildLocation: ({ to }: { to: string }) => ({ pathname: to, publicHref: to }), getMatchedRoutes: () => ({ routeParams: {}, foundRoute: route }) } as unknown as AnyRouter;
    expect(sitemapStaticPaths(router)).toEqual(["/new-public-page"]);
  });
  test("rejects unsafe sitemap paths", () => expect(() => sitemapXML("https://sixharmony.co.nz", [{ path: "//other.example" }])).toThrow("Invalid sitemap path"));
});
