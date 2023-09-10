import { HttpStatusCode } from "../constants/HttpStatusCode.js";
import { HttpError } from "./HttpError.js";

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super("NotFoundError", message, HttpStatusCode.NotFound);
  }
}
