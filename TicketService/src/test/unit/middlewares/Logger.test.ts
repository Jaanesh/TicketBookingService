import { describe, expect, it, jest } from "@jest/globals";
import type { Request, Response, NextFunction } from "express";
import {
  addDetailsToLoggerContext,
  attachNewLoggerInstanceToReq,
  printRequest,
  printResponse,
} from "../../../middlewares/Logger";
import { afterEach } from "node:test";

jest.mock("../../../helpers/Logger", () => {
  const createLoggerInstance = () => {
    const logger = {
      info: jest.fn(),
      error: jest.fn(),
      addContext: jest.fn(),
      removeContext: jest.fn(),
    };

    return logger;
  };

  return { createLoggerInstance };
});

jest.mock("../../../utils/App", () => {
  const calculateResponseTime = () => {
    return 10;
  };
  return { calculateResponseTime };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("middlewares.", () => {
  describe("attachNewLoggerInstanceToReq", () => {
    it("should add startTime and loggerInstannce to req session", () => {
      //@ts-ignore
      const req: Request = {
        session: {},
      } as Request;

      //@ts-ignore
      const res: Response = {
        session: {},
      } as Response;

      const next: NextFunction = jest.fn();

      attachNewLoggerInstanceToReq(req, res, next);

      //@ts-ignore
      expect(req.session.logger).toBeDefined();
      //@ts-ignore
      expect(req.session.startTime).toBeDefined();
      expect(next).toBeCalledTimes(1);
    });
  });

  describe("addDetailsToLoggerContext", () => {
    it("should add url,accountId to context", () => {
      //@ts-ignore
      const req: Request = {
        originalUrl: "dummyURL",
        body: {
          accountId: "1234567890",
        },
        session: {
          logger: {
            info: jest.fn(),
            error: jest.fn(),
            addContext: jest.fn(),
          },
        },
      } as Request;

      //@ts-ignore
      const res: Response = {
        session: {},
      } as Response;

      const next: NextFunction = jest.fn();

      addDetailsToLoggerContext(req, res, next);

      //@ts-ignore
      expect(req.session.logger.addContext).toHaveBeenNthCalledWith(
        1,
        "url",
        "dummyURL"
      );
      //@ts-ignore
      expect(req.session.logger.addContext).toHaveBeenNthCalledWith(
        2,
        "accountId",
        "1234567890"
      );
      expect(next).toBeCalledTimes(1);
    });
  });

  describe("printRequest", () => {
    it("should add url,accountId to context", () => {
      //@ts-ignore
      const req: Request = {
        originalUrl: "dummyURL",
        body: {
          accountId: "1234567890",
        },
        session: {
          logger: {
            info: jest.fn(),
            error: jest.fn(),
            addContext: jest.fn(),
          },
        },
        headers: {
          type: "application/json",
        },
        method: "POST",
      } as Request;

      //@ts-ignore
      const res: Response = {
        session: {},
      } as Response;

      const next: NextFunction = jest.fn();

      const reqDetails = {
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        body: req.body,
      };

      printRequest(req, res, next);
      //@ts-ignore
      expect(req.session.logger.info).toHaveBeenNthCalledWith(1, reqDetails);
      expect(next).toBeCalledTimes(1);
    });
  });

  describe("printResponse", () => {
    it("should add url,accountId to context", () => {
      //@ts-ignore
      const req: Request = {
        session: {
          logger: {
            info: jest.fn(),
            error: jest.fn(),
            addContext: jest.fn(),
          },
          startTime: 10,
          result: {
            name: "dummyResult",
          },
        },
      } as Request;

      //@ts-ignore
      const res: Response = {
        session: {},
      } as Response;

      const next: NextFunction = jest.fn();

      const result = {
        response: {
          name: "dummyResult",
        },
        processingTime: "10 ms",
      };

      printResponse(req, res, next);
      //@ts-ignore
      expect(req.session.logger.info).toHaveBeenNthCalledWith(1, result);
      expect(next).toBeCalledTimes(1);
    });
  });
});
