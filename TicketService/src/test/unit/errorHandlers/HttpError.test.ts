import { describe, expect, it, jest } from "@jest/globals";
import { HttpError } from "../../../errorHandlers/HttpError";
import { HttpStatusCode } from "../../../constants/HttpStatusCode";

describe("errorHandlers.HttpError", () => {
  it("should create a HttpError object successfully", () => {
    const httpError = new HttpError(
      "dummyName",
      "dummymessage",
      HttpStatusCode.InternalServerError
    );
    expect(httpError.getErrorName()).toBe("dummyName");
    expect(httpError.getMessage()).toBe("dummymessage");
    expect(httpError.getHttpStatusCode()).toBe(
      HttpStatusCode.InternalServerError
    );
    expect(httpError.isHttpError()).toBe(true);
  });
});
