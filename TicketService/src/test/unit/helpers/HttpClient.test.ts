/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it, jest } from "@jest/globals";
import axios, {
  Axios,
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from "axios";
import { HttpClient } from "../../../helpers/HttpClient";
import {
  SeatReservationServicePayload,
  SeatReservationServiceResponse,
} from "../../../types/SeatReservationService";
import log4js, { Logger } from "log4js";

describe("helpers.HttpClient", () => {
  it(" should call axios create method when the new object is created ", () => {
    axios.create = jest.fn((config?: CreateAxiosDefaults): AxiosInstance => {
      return {} as AxiosInstance;
    });
    new HttpClient();
    expect(axios.create).toBeCalled();
  });

  it("should call post method and return the response when api is successful ", async () => {
    const responseData: SeatReservationServiceResponse = {
      message: "success",
    };

    axios.create = jest.fn((config?: CreateAxiosDefaults): AxiosInstance => {
      //@ts-ignore
      return {
        post: jest.fn().mockImplementation(
          //@ts-ignore
          async <T = any, R = AxiosResponse<T, any>, D = any>(
            url: string,
            data?: D | undefined,
            config?: AxiosRequestConfig<D> | undefined
          ): Promise<R> => {
            return Promise.resolve({
              data: { message: "success" },
            } as R);
          }
        ),
      } as AxiosInstance;
    });

    const httpClient = new HttpClient();

    const data: SeatReservationServicePayload = {
      accountId: "1234567890",
      totalSeats: 0,
    };

    log4js.getLogger = jest.fn((category?: string | undefined): Logger => {
      //@ts-ignore
      return {
        error: jest.fn((message: any, ...args: any[]) => {}),
        info: jest.fn((message: any, ...args: any[]) => {}),
      } as Logger;
    });
    const logger = log4js.getLogger();

    const response = await httpClient.post<
      SeatReservationServicePayload,
      SeatReservationServiceResponse
    >(logger, "dummyURL", data);

    expect(response.data).toEqual(responseData);
    expect(logger.info).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledTimes(0);
  });

  it("should call post method and handle expection when api is not successful ", async () => {
    const responseData: SeatReservationServiceResponse = {
      message: "success",
    };

    axios.create = jest.fn((config?: CreateAxiosDefaults): AxiosInstance => {
      //@ts-ignore
      return {
        post: jest.fn().mockImplementation(
          //@ts-ignore
          async <T = any, R = AxiosResponse<T, any>, D = any>(
            url: string,
            data?: D | undefined,
            config?: AxiosRequestConfig<D> | undefined
          ): Promise<R> => {
            return Promise.reject({
              code: 500,
              message: "failure in backend",
            } as R);
          }
        ),
      } as AxiosInstance;
    });

    const httpClient = new HttpClient();

    const data: SeatReservationServicePayload = {
      accountId: "1234567890",
      totalSeats: 0,
    };

    log4js.getLogger = jest.fn((category?: string | undefined): Logger => {
      //@ts-ignore
      return {
        error: jest.fn((message: any, ...args: any[]) => {}),
        info: jest.fn((message: any, ...args: any[]) => {}),
      } as Logger;
    });
    const logger = log4js.getLogger();

    try {
      await httpClient.post<
        SeatReservationServicePayload,
        SeatReservationServiceResponse
      >(logger, "dummyURL", data);
    } catch (err) {
      const error = err as AxiosError<SeatReservationServiceResponse>;
      expect(logger.info).toHaveBeenCalledTimes(0);
      expect(logger.error).toHaveBeenCalledTimes(1);
      expect(error.code).toBe(500);
      expect(error.message).toBe("failure in backend");
    }
  });
});
