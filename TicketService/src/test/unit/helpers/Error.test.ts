import { describe, expect, it } from "@jest/globals";
import { BadRequestError } from "../../../errorHandlers/BadRequestError";
import { constructErrorDetails } from "../../../helpers/Error";
import { HttpStatusCode } from "../../../constants/HttpStatusCode";

describe("helpers.Error", () => {
  describe("constructErrorDetails", () => {
    it("should return obj containing message,httpStatusCode when instanceof HttpError is passed", () => {
      const badRequestErr = new BadRequestError("Bad input.");
      const errObj = constructErrorDetails(badRequestErr);
      expect(errObj.message).toBe("Bad input.");
      expect(errObj.httpStatusCode).toBe(HttpStatusCode.BadRequest);
    });

    it("should return obj containing message,httpStatusCode as internalServerError when Error is passed", () => {
      const runTimeErr = new Error();
      const errObj = constructErrorDetails(runTimeErr);
      expect(errObj.message).toBe(
        "Error occured while processing the request."
      );
      expect(errObj.httpStatusCode).toBe(HttpStatusCode.InternalServerError);
    });
  });
});
