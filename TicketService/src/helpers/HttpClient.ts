import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";
import { Logger } from "log4js";
import { calculateResponseTime } from "../utils/App.js";

export class HttpClient {
  private http: AxiosInstance = axios.create();

  private printReqRes<ReqBodyType, ResBodyType>(
    logger: Logger,
    url: string,
    method: Method,
    data: ReqBodyType,
    reqConfig: AxiosRequestConfig,
    responseTime: string,
    response: AxiosResponse<ResBodyType> | null = null,
    errResponse: AxiosError<ResBodyType> | null = null
  ) {
    const reqResDetails = {
      reqFired: {
        method,
        url,
        headers: reqConfig.headers,
        params: reqConfig.params,
        body: data,
      },
      resReceived: {
        responseTime,
        errorMessage: errResponse?.message,
        errorCode: errResponse?.code,
        status: response?.status || errResponse?.response?.status,
        headers: response?.headers || errResponse?.response?.headers,
        body: response?.data || errResponse?.response?.data,
      },
    };

    if (errResponse) {
      logger.error(reqResDetails);
    } else {
      logger.info(reqResDetails);
    }
  }

  public async post<ReqBodyType, ResBodyType>(
    logger: Logger,
    url: string,
    data: ReqBodyType,
    options?: {
      headers?: { [key: string]: string };
      params?: { [key: string]: string };
    }
  ): Promise<AxiosResponse<ResBodyType>> {
    const reqConfig: AxiosRequestConfig = {
      headers: options?.headers,
      params: options?.params,
    };
    const startTime = Date.now();
    try {
      const response = await this.http.post<ResBodyType>(
        url,
        { data },
        reqConfig
      );

      this.printReqRes(
        logger,
        url,
        "POST",
        data,
        reqConfig,
        `${calculateResponseTime(startTime)} ms`,
        response
      );
      return response;
    } catch (err) {
      this.printReqRes(
        logger,
        url,
        "POST",
        data,
        reqConfig,
        `${calculateResponseTime(startTime)} ms`,
        null,
        err as AxiosError<ResBodyType>
      );
      throw err;
    }
  }
}

export const httpClient = new HttpClient();
