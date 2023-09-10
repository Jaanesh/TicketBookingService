import { describe, expect, it } from "@jest/globals";
import { isValidLogLevel } from "../../../utils/Logger.js";

describe("utils.Logger", () => {
  describe("isValidLogLevel", () => {
    it("should return true when the loglevel passed is valid ", () => {
      expect(isValidLogLevel("DEBUG")).toBe(true);
    });
    it("should return false when the loglevel passed is not valid ", () => {
      expect(isValidLogLevel("DEBUGG")).toBe(false);
    });
  });
});
