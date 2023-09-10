import { describe, expect, it } from "@jest/globals";
import { generateTimeAndDate } from "../../../utils/Date.js";
import { timeFormats } from "../../../constants/TimeFormats.js";

describe("utils.Date", () => {
  describe("generateTimeAndDate", () => {
    it("should return data and Time in the YYYY-MM-DDTHH:mm:ss format ", () => {
      expect(generateTimeAndDate(timeFormats.dateTime)).toMatch(
        /[\d]{4}-[\d]{2}-[\d]{2}T[\d]{2}:[\d]{2}:[\d]{2}/
      );
    });
  });
});
