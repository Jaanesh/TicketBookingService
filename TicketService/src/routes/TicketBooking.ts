import { HttpStatusCode } from "axios";
import {
  attachNewLoggerInstanceToReq,
  addDetailsToLoggerContext,
  printRequest,
  printResponse,
} from "../middlewares/LoggerMiddlewares.js";
import {
  constructTicketBookingResponse,
  payForTickets,
  reserveSeats,
  validateTicketBookingReq,
} from "../middlewares/TicketBooking.js";
import express from "express";
import { Request, Response } from "express-serve-static-core";

const router = express.Router();

router.post(
  "/movie/ticketsBooking",
  attachNewLoggerInstanceToReq,
  addDetailsToLoggerContext,
  printRequest,
  validateTicketBookingReq,
  payForTickets,
  reserveSeats,
  constructTicketBookingResponse,
  printResponse,
  (req: Request, res: Response) => {
    res.status(HttpStatusCode.Ok).json(req.session.result);
  }
);

export default router;
