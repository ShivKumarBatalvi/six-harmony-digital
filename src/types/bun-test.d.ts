// Minimal typings for bun:test so typecheck passes without loading bun-types
// globally (bun-types conflicts with the DOM fetch types used in src/integrations).
declare module "bun:test" {
  export function describe(name: string, fn: () => void): void;
  export function test(name: string, fn: () => void | Promise<void>): void;
  export function expect(actual: unknown): {
    toEqual(expected: unknown): void;
    toBe(expected: unknown): void;
    toContain(expected: unknown): void;
    toHaveProperty(key: string): void;
    toThrow(expected?: unknown): void;
    not: {
      toHaveProperty(key: string): void;
      toContain(expected: unknown): void;
      toBe(expected: unknown): void;
      toEqual(expected: unknown): void;
    };
  };
}
