import { describe, it, expect } from "vitest";
import { parseSafeJSON } from "@/lib/json";
import { getDemoCampusConfig } from "@/lib/campus";
import { GET as getMapConfig } from "@/app/api/map-config/route";

describe("Safe JSON Parsing & Map-Config Optimization", () => {
  describe("1. parseSafeJSON defensive parsing", () => {
    it("handles undefined, null, and literal strings without throwing", () => {
      expect(parseSafeJSON(undefined)).toBeNull();
      expect(parseSafeJSON(null)).toBeNull();
      expect(parseSafeJSON("undefined")).toBeNull();
      expect(parseSafeJSON("null")).toBeNull();
      expect(parseSafeJSON("")).toBeNull();
      expect(parseSafeJSON("   ")).toBeNull();
      expect(parseSafeJSON("[object Object]")).toBeNull();
    });

    it("returns custom fallback when provided", () => {
      const fallback = { status: "empty" };
      expect(parseSafeJSON(undefined, fallback)).toEqual(fallback);
      expect(parseSafeJSON("undefined", fallback)).toEqual(fallback);
      expect(parseSafeJSON("malformed json {", fallback)).toEqual(fallback);
    });

    it("correctly parses valid JSON strings", () => {
      expect(parseSafeJSON('{"name":"DeFi Trail","power":1}')).toEqual({
        name: "DeFi Trail",
        power: 1,
      });
      expect(parseSafeJSON("[1, 2, 3]")).toEqual([1, 2, 3]);
      expect(parseSafeJSON('"hello"')).toBe("hello");
      expect(parseSafeJSON("12345")).toBe(12345);
    });
  });

  describe("2. Map-Config performance and caching headers", () => {
    it("memoizes getDemoCampusConfig across calls", () => {
      const first = getDemoCampusConfig();
      const second = getDemoCampusConfig();
      expect(first).toBe(second); // Same reference when epoch is unchanged
      expect(first.slots).toHaveLength(5);
    });

    it("returns HTTP 200 with Cache-Control headers in GET /api/map-config", async () => {
      const res = await getMapConfig();
      expect(res.status).toBe(200);

      const cacheControl = res.headers.get("Cache-Control");
      expect(cacheControl).toContain("public");
      expect(cacheControl).toContain("s-maxage=3600");
    });
  });
});

