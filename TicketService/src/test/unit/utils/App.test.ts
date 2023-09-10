import { describe, expect, it } from "@jest/globals";
import { calculateResponseTime, hasValue } from "../../../utils/App";

describe("utils.App", () => {
  describe("hasValue", () => {
    it("should return false when empty string is passed", () => {
      expect(hasValue("")).toBe(false);
    });

    it("should return false when null is passed", () => {
      expect(hasValue(null)).toBe(false);
    });

    it("should return false when undefined is passed", () => {
      expect(hasValue(undefined)).toBe(false);
    });

    it("should return true when valid string is passed", () => {
      expect(hasValue("success")).toBe(true);
    });
  });

  describe("calculateResponseTime", () => {
    it("should return response time when start and end time is passed", () => {
      expect(calculateResponseTime(2, 3)).toBe(1);
    });
    it("should return response time when start is passed", () => {
      expect(calculateResponseTime(2)).toBeGreaterThan(1);
    });
  });
});
