import type { NextFunction, Response, Request } from "express";
import {
  SEAT_RESERVATION_SERVICE_URL,
  PAYMENT_SERVICE_URL,
  ticketPriceList,
} from "../constants/TicketBookingConstants.js";
import {
  isValidAccountId,
  isAdultTicketBooked,
  isOrderedTicketCountWithInRange,
  isValidInfantTicketsBooked,
} from "../validations/TicketBooking.js";
import { constructPayloadForPaymentService } from "../helpers/PaymentHelper.js";
import { httpClient } from "../helpers/HttpClient.js";
import {
  PaymentResponse,
  PaymentServicePayload,
} from "../types/PaymentService.js";
import { constructPayloadForSeatResService } from "../helpers/SeatReservationHelper.js";
import {
  SeatReservationServicePayload,
  SeatReservationServiceResponse,
} from "../types/SeatReservationService.js";
import { BadRequestError } from "../errorHandlers/BadRequestError.js";

export const validateTicketBookingReq = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { logger } = req.session;

  try {
    if (req?.body?.accountId && req?.body?.tickets) {
      const { accountId, tickets } = req.body;
      const validAccount = isValidAccountId(accountId);

      const adult = tickets.adult || 0;
      const child = tickets.child || 0;
      const infant = tickets.infant || 0;

      req.session.tickets = {
        adult,
        child,
        infant,
      };

      const validTicketCount = isOrderedTicketCountWithInRange(tickets);
      const adultTicketBooked = isAdultTicketBooked(adult);
      const validInfantTicktBooked = isValidInfantTicketsBooked(tickets);

      if (
        validAccount &&
        adultTicketBooked &&
        validTicketCount &&
        validInfantTicktBooked
      ) {
        next();
      }
    } else {
      throw new BadRequestError(`Booking details not present in the request.`);
    }
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

export const payForTickets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accountId } = req.body;
  const { logger, tickets } = req.session;

  try {
    const data = constructPayloadForPaymentService(
      accountId,
      tickets,
      ticketPriceList
    );
    await httpClient.post<PaymentServicePayload, PaymentResponse>(
      logger,
      PAYMENT_SERVICE_URL as string,
      data
    );

    next();
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

export const reserveSeats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accountId } = req.body;
  const { logger, tickets } = req.session;

  try {
    const data = constructPayloadForSeatResService(accountId, tickets);
    await httpClient.post<
      SeatReservationServicePayload,
      SeatReservationServiceResponse
    >(logger, SEAT_RESERVATION_SERVICE_URL as string, data);
    next();
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

export const constructTicketBookingResponse = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = {
    message: "Ticket Booking is successful",
  };
  req.session.result = result;
  next();
};
