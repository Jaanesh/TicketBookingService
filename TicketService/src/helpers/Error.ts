import { HttpStatusCode } from "../constants/HttpStatusCode.js";
import { HttpError } from "../errorHandlers/HttpError.js";

export function constructErrorDetails(err: Error) {
  let httpStatusCode = HttpStatusCode.InternalServerError;
  let message = "Error occured while processing the request.";

  if (err instanceof HttpError) {
    httpStatusCode = err.getHttpStatusCode();
    message = err.message;
  }

  return {
    httpStatusCode,
    message,
  };
}
