import { HttpStatusCode } from "axios";

export class HttpError extends Error {
  private httpStatusCode: HttpStatusCode;
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
