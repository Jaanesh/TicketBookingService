import { describe, expect, it, jest } from "@jest/globals";
import type { Request, Response, NextFunction } from "express";
import {
  constructTicketBookingResponse,
  payForTickets,
  reserveSeats,
  validateTicketBookingReq,
} from "../../../middlewares/TicketBooking";
import { TicketCategory } from "../../../constants/TicketBookingConstants";
import {
  isValidAccountId,
  isAdultTicketBooked,
  isValidInfantTicketsBooked,
  isOrderedTicketCountWithInRange,
} from "../../../validations/TicketBooking";
import { httpClient } from "../../../helpers/HttpClient";

jest.mock("../../../helpers/SeatReservationHelper", () => {
  const constructPayloadForSeatResService = jest.fn(() => {});
  return { constructPayloadForSeatResService };
});

jest.mock("../../../helpers/PaymentHelper", () => {
  const constructPayloadForPaymentService = jest.fn(() => {});
  return { constructPayloadForPaymentService };
});

jest.mock("../../../helpers/HttpClient", () => {
  const httpClient = {
    post: jest.fn(),
  };
  return { httpClient };
});

jest.mock("../../../validations/TicketBooking", () => {
  const isValidAccountId = jest.fn();
  const isAdultTicketBooked = jest.fn();
  const isValidInfantTicketsBooked = jest.fn();
  const isOrderedTicketCountWithInRange = jest.fn();

  return {
    isValidAccountId,
    isAdultTicketBooked,
    isValidInfantTicketsBooked,
    isOrderedTicketCountWithInRange,
  };
});

describe("middlewares.", () => {
  describe("validateTicketBookingReq", () => {
    it("should throw error when req body is not present", () => {
      //@ts-ignore
      const req: Request = {
        session: {
          logger: {
            info: jest.fn(),
            error: jest.fn(),
            addContext: jest.fn(),
          },
        },
      } as Request;

      //@ts-ignore
      const res: Response = {} as Response;

      const next: NextFunction = jest.fn();

      validateTicketBookingReq(req, res, next);

      //@ts-ignore
      expect(req.session.logger.error).toHaveBeenCalledTimes(1);
      expect(next).toBeCalledTimes(1);
    });

    it("should call next middleware when validations are successfull", () => {
      //@ts-ignore
      const req: Request = {
        session: {
          logger: {
            info: jest.fn(),
            error: jest.fn(),
            addContext: jest.fn(),
          },
        },
        body: {
          accountId: "1234567890",
          tickets: {
            [TicketCategory.ADULT]: 1,
            [TicketCategory.CHILD]: 1,
            [TicketCategory.INFANT]: 1,
          },
        },
      } as Request;

      //@ts-ignore
      const res: Response = {
        session: {},
      } as Response;

      const next: NextFunction = jest.fn();

      //@ts-ignore
      isValidAccountId.mockImplementation(() => true);
      //@ts-ignore
      isAdultTicketBooked.mockImplementation(() => true);
      //@ts-ignore
      isValidInfantTicketsBooked.mockImplementation(() => true);
      //@ts-ignore
      isOrderedTicketCountWithInRange.mockImplementation(() => true);

      validateTicketBookingReq(req, res, next);

      expect(next).toBeCalledTimes(1);
    });
  });

  describe("payForTickets", () => {
    it("should invoke the api and call next middleware", async () => {
      //@ts-ignore
      const req: Request = {
        session: {
          logger: {
            info: jest.fn(),
            error: jest.fn(),
            addContext: jest.fn(),
          },
        },
        body: {
          accountId: "1234567890",
          tickets: {
            [TicketCategory.ADULT]: 1,
            [TicketCategory.CHILD]: 1,
            [TicketCategory.INFANT]: 1,
          },
        },
      } as Request;

      //@ts-ignore
      const res: Response = {
        session: {},
      } as Response;

      const next: NextFunction = jest.fn();

      //@ts-ignore
      httpClient.post.mockImplementation(async () =>
        Promise.resolve({ message: "success" })
      );

      await payForTickets(req, res, next);

      //@ts-ignore
      expect(req.session.logger.error).toHaveBeenCalledTimes(0);
      expect(next).toBeCalledTimes(1);
    });

    it("should invoke the api and call next middleware with err when api call fails", async () => {
      //@ts-ignore
      const req: Request = {
        session: {
          logger: {
            info: jest.fn(),
            error: jest.fn(),
            addContext: jest.fn(),
          },
        },
        body: {
          accountId: "1234567890",
          tickets: {
            [TicketCategory.ADULT]: 1,
            [TicketCategory.CHILD]: 1,
            [TicketCategory.INFANT]: 1,
          },
        },
      } as Request;

      //@ts-ignore
      const res: Response = {
        session: {},
      } as Response;

      const next: NextFunction = jest.fn();

      //@ts-ignore
      httpClient.post.mockImplementation(async () => Promise.reject());

      await payForTickets(req, res, next);

      //@ts-ignore
      expect(req.session.logger.error).toHaveBeenCalledTimes(1);
      expect(next).toBeCalledTimes(1);
    });
  });

  describe("reserveSeats", () => {
    it("should invoke the api and call next middleware", async () => {
      //@ts-ignore
      const req: Request = {
        session: {
          logger: {
            info: jest.fn(),
            error: jest.fn(),
            addContext: jest.fn(),
          },
        },
        body: {
          accountId: "1234567890",
          tickets: {
            [TicketCategory.ADULT]: 1,
            [TicketCategory.CHILD]: 1,
            [TicketCategory.INFANT]: 1,
          },
        },
      } as Request;

      //@ts-ignore
      const res: Response = {
        session: {},
      } as Response;

      const next: NextFunction = jest.fn();

      //@ts-ignore
      httpClient.post.mockImplementation(async () =>
        Promise.resolve({ message: "success" })
      );

      await reserveSeats(req, res, next);

      //@ts-ignore
      expect(req.session.logger.error).toHaveBeenCalledTimes(0);
      expect(next).toBeCalledTimes(1);
    });

    it("should invoke the api and call next middleware with err when api call fails", async () => {
      //@ts-ignore
      const req: Request = {
        session: {
          logger: {
            info: jest.fn(),
            error: jest.fn(),
            addContext: jest.fn(),
          },
        },
        body: {
          accountId: "1234567890",
          tickets: {
            [TicketCategory.ADULT]: 1,
            [TicketCategory.CHILD]: 1,
            [TicketCategory.INFANT]: 1,
          },
        },
      } as Request;

      //@ts-ignore
      const res: Response = {
        session: {},
      } as Response;

      const next: NextFunction = jest.fn();

      //@ts-ignore
      httpClient.post.mockImplementation(async () => Promise.reject());

      await reserveSeats(req, res, next);

      //@ts-ignore
      expect(req.session.logger.error).toHaveBeenCalledTimes(1);
      expect(next).toBeCalledTimes(1);
    });
  });

  describe("constructTicketBookingResponse", () => {
    it("should assign the result to req.session and call the next middleware", () => {
      //@ts-ignore
      const req: Request = {
        session: {
          logger: {
            info: jest.fn(),
            error: jest.fn(),
            addContext: jest.fn(),
          },
        },
        body: {
          accountId: "1234567890",
          tickets: {
            [TicketCategory.ADULT]: 1,
            [TicketCategory.CHILD]: 1,
            [TicketCategory.INFANT]: 1,
          },
        },
      } as Request;

      //@ts-ignore
      const res: Response = {
        session: {},
      } as Response;

      const next: NextFunction = jest.fn();

      constructTicketBookingResponse(req, res, next);

      const result = {
        message: "Ticket Booking is successful",
      };

      //@ts-ignore
      expect(req.session.result).toEqual(result);
      expect(next).toBeCalledTimes(1);
    });
  });
});
