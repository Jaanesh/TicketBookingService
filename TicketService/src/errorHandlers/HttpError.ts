import { HttpStatusCode } from "../constants/HttpStatusCode.js";

export class HttpError extends Error {
  private httpStatusCode;
  constructor(name: string, message: string, httpStatusCode: HttpStatusCode) {
    super(message);
    this.name = name;
    this.httpStatusCode = httpStatusCode;
  }

  public getErrorName() {
    return this.name;
  }
  public getHttpStatusCode() {
    return this.httpStatusCode;
  }
  public getMessage() {
    return this.message;
  }

  public isHttpError() {
    return true;
  }
}
