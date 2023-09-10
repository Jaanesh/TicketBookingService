import express, { type Response, type Request, NextFunction } from "express";
import log4js from "log4js";
import "dotenv/config";
import { attachNewLoggerInstanceToReq } from "./middlewares/Logger.js";
import { appLevelLogger } from "./helpers/Logger.js";
import { NotFoundError } from "./errorHandlers/NotFoundError.js";
import { constructErrorDetails } from "./helpers/Error.js";
import { PORT } from "./constants/AppConstants.js";
import ticketBookingRouter from "./routes/TicketBooking.js";
import startupChecks from "./startupChecks/index.js";

const app = express();
app.use(express.json());

app.use("/", ticketBookingRouter);

app.use(
  "*",
  attachNewLoggerInstanceToReq,
  (req: Request, res: Response, next: NextFunction) => {
    const err = new NotFoundError(`No path matched for url=${req.originalUrl}`);
    next(err);
  }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  const { httpStatusCode, message } = constructErrorDetails(err);
  res.status(httpStatusCode).json({ url: req.originalUrl, message });
});

if (startupChecks) {
  app.listen(PORT);
  appLevelLogger.info(
    `Startup checks are successful.App started successfully on port=${PORT}`
  );
} else {
  appLevelLogger.info(
    "App not started as startup checks failed.Please checks the logs for more details"
  );
  log4js.shutdown();
  process.exit();
}
