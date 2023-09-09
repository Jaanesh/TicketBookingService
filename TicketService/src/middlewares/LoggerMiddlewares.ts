import type { Request, Response, NextFunction } from "express";
import { createLoggerInstance } from "../helpers/Logger.js";
import { calculateResponseTime } from "../utils/App.js";

export const attachNewLoggerInstanceToReq = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();
  const logger = createLoggerInstance();
  req.session = { logger, startTime } as Request["session"];
  next();
};

export const addDetailsToLoggerContext = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { logger } = req.session;
  logger.addContext("url", req.originalUrl);
  logger.addContext("accountId", req?.body?.accountId);
  next();
};

export const printRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { logger } = req.session;
  const { headers, method, originalUrl, body } = req;
  const reqDetails = {
    method,
    url: originalUrl,
    headers,
    body,
  };
  logger.info(reqDetails);
  next();
};

export const printResponse = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { logger, startTime, result } = req.session;
  const processingTime = `${calculateResponseTime(startTime)} ms`;
  const resDetails = {
    response: result,
    processingTime,
  };
  logger.info(resDetails);
  next();
};
