import { describe, expect, it } from "@jest/globals";
import "dotenv/config";
import {
  isValidAccountId,
  isAdultTicketBooked,
  isValidInfantTicketsBooked,
  isOrderedTicketCountWithInRange,
} from "../../../validations/TicketBooking";
import { BadRequestError } from "../../../errorHandlers/BadRequestError";
import { Tickets } from "../../../types/TicketBooking";
import { TicketCategory } from "../../../constants/TicketBookingConstants";
import { HttpStatusCode } from "../../../constants/HttpStatusCode";

describe("validations.TicketBooking", () => {
  describe("isValidAccountId", () => {
    it("should return true when the valid accountId is passed", () => {
      expect(isValidAccountId("1234567890")).toBe(true);
    });
    it("should return err when the valid accountId less than 1", () => {
      try {
        isValidAccountId("-1234567890");
      } catch (err) {
        expect((err as BadRequestError).message).toBe(
          "accountId is not valid.It should be greater than 0."
        );
        expect((err as BadRequestError).getHttpStatusCode()).toBe(
          HttpStatusCode.BadRequest
        );
        expect((err as BadRequestError).name).toBe("BadRequestError");
      }
    });
  });

  describe("isAdultTicketBooked", () => {
    it("should return true when adult ticket count is greater than 0", () => {
      expect(isAdultTicketBooked(1)).toBe(true);
    });
    it("should return err when adult ticket count is less than 1", () => {
      try {
        isAdultTicketBooked(0);
      } catch (err) {
        expect((err as BadRequestError).message).toBe(
          "There should be atleast one adult ticket ordered in the request."
        );
        expect((err as BadRequestError).getHttpStatusCode()).toBe(
          HttpStatusCode.BadRequest
        );
        expect((err as BadRequestError).name).toBe("BadRequestError");
      }
    });
  });

  describe("isValidInfantTicketsBooked", () => {
    it("should return true when adult ticket count is greater than infant ticket count", () => {
      const ticket: Tickets = {
        [TicketCategory.ADULT]: 1,
        [TicketCategory.CHILD]: 0,
        [TicketCategory.INFANT]: 1,
      };
      expect(isValidInfantTicketsBooked(ticket)).toBe(true);
    });
    it("should return err when adult ticket count is less than infant ticket count", () => {
      try {
        const ticket: Tickets = {
          [TicketCategory.ADULT]: 1,
          [TicketCategory.CHILD]: 0,
          [TicketCategory.INFANT]: 2,
        };
        isValidInfantTicketsBooked(ticket);
      } catch (err) {
        expect((err as BadRequestError).message).toBe(
          "Not enough adult tickets booked to keep infants."
        );
        expect((err as BadRequestError).getHttpStatusCode()).toBe(
          HttpStatusCode.BadRequest
        );
        expect((err as BadRequestError).name).toBe("BadRequestError");
      }
    });
  });

  describe("isOrderedTicketCountWithInRange", () => {
    it("should return true when total tickets ordered is within TICKET_PURCHASE_LIMIT_PER_REQ", () => {
      const ticket: Tickets = {
        [TicketCategory.ADULT]: 1,
        [TicketCategory.CHILD]: 0,
        [TicketCategory.INFANT]: 1,
      };
      expect(isOrderedTicketCountWithInRange(ticket)).toBe(true);
    });
    it("should return err when total tickets ordered exceeds TICKET_PURCHASE_LIMIT_PER_REQ", () => {
      try {
        const ticket: Tickets = {
          [TicketCategory.ADULT]: 11,
          [TicketCategory.CHILD]: 10,
          [TicketCategory.INFANT]: 2,
        };
        isOrderedTicketCountWithInRange(ticket);
      } catch (err) {
        expect((err as BadRequestError).message).toBe(
          "Ordered tickets count exceeds the purchase limit per request."
        );
        expect((err as BadRequestError).getHttpStatusCode()).toBe(
          HttpStatusCode.BadRequest
        );
        expect((err as BadRequestError).name).toBe("BadRequestError");
      }
    });

    it("should return err when total tickets ordered is less than 1", () => {
      try {
        const ticket: Tickets = {
          [TicketCategory.ADULT]: 0,
          [TicketCategory.CHILD]: 0,
          [TicketCategory.INFANT]: 0,
        };
        isOrderedTicketCountWithInRange(ticket);
      } catch (err) {
        expect((err as BadRequestError).message).toBe(
          "Ticket count should be greater than 0."
        );
        expect((err as BadRequestError).getHttpStatusCode()).toBe(
          HttpStatusCode.BadRequest
        );
        expect((err as BadRequestError).name).toBe("BadRequestError");
      }
    });
  });
});
