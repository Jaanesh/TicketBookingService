import { HttpStatusCode } from "../constants/HttpStatusCode.js";
import { HttpError } from "./HttpError.js";

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super("BadRequestError", message, HttpStatusCode.BadRequest);
  }
}
