import { describe, expect, test } from "bun:test";
import server from "./server";

describe("external-host asset delivery", () => {
  test("proxies any asset path to the fixed origin with one-year edge caching", async () => {
    const originalFetch = globalThis.fetch;
    let receivedUrl = "";
    let receivedOptions: unknown;
    globalThis.fetch = (async (input, options) => {
      receivedUrl = String(input);
      receivedOptions = options;
      return new Response("image bytes", { headers: { "Content-Type": "image/webp" } });
    }) as typeof fetch;
    try {
      const response = await server.fetch(new Request("https://sixharmony.co.nz/__l5e/assets-v1/future-id/future.webp?v=1"), {}, {});
      expect(receivedUrl).toBe("https://six-harmony-bloom.lovable.app/__l5e/assets-v1/future-id/future.webp?v=1");
      expect(receivedOptions).toEqual({ method: "GET", cf: { cacheEverything: true, cacheTtl: 31536000 } });
      expect(response.headers.get("Content-Type")).toBe("image/webp");
      expect(response.headers.get("Cache-Control")).toBe("public, max-age=31536000, immutable");
      expect(await response.text()).toBe("image bytes");
    } finally { globalThis.fetch = originalFetch; }
  });

  test("HEAD retains headers without a response body", async () => {
    const originalFetch = globalThis.fetch;
    let method: string | undefined;
    globalThis.fetch = (async (_input, options) => {
      method = options?.method;
      return new Response(null, { headers: { "Content-Type": "image/webp" } });
    }) as typeof fetch;
    try {
      const response = await server.fetch(new Request("https://sixharmony.co.nz/__l5e/assets-v1/id/photo.webp", { method: "HEAD" }), {}, {});
      expect(method).toBe("HEAD");
      expect(response.body).toBe(null);
      expect(response.headers.get("Content-Type")).toBe("image/webp");
    } finally { globalThis.fetch = originalFetch; }
  });

  test("passes upstream error status and body through", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async () => new Response("Missing asset", { status: 404 })) as typeof fetch;
    try {
      const response = await server.fetch(new Request("https://sixharmony.co.nz/__l5e/assets-v1/id/missing.webp"), {}, {});
      expect(response.status).toBe(404);
      expect(await response.text()).toBe("Missing asset");
    } finally { globalThis.fetch = originalFetch; }
  });
});