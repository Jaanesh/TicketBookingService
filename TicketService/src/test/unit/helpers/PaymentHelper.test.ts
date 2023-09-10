import { describe, expect, it } from "@jest/globals";
import "dotenv/config";
import {
  TicketCategory,
  ticketPriceList,
} from "../../../constants/TicketBookingConstants";
import { Tickets } from "../../../types/TicketBooking";
import {
  calculateTotalNumberOfTickets,
  calculateTotalPriceForEachTicketCategory,
  constructPayloadForPaymentService,
} from "../../../helpers/PaymentHelper";
import { PaymentServicePayload } from "../../../types/PaymentService";

describe("helpers.PaymentHelper", () => {
  describe("calculateTotalPriceForEachTicketCategory", () => {
    it("should return the total price of each category", () => {
      const tickets: Tickets = {
        [TicketCategory.ADULT]: 1,
        [TicketCategory.CHILD]: 1,
        [TicketCategory.INFANT]: 1,
      };
      const result: Tickets = {
        [TicketCategory.ADULT]: 20,
        [TicketCategory.CHILD]: 10,
        [TicketCategory.INFANT]: 0,
      };
      expect(
        calculateTotalPriceForEachTicketCategory(tickets, ticketPriceList)
      ).toEqual(result);
    });
  });

  describe("calculateTotalNumberOfTickets", () => {
    it("should return the total number of tickets", () => {
      const tickets: Tickets = {
        [TicketCategory.ADULT]: 1,
        [TicketCategory.CHILD]: 1,
        [TicketCategory.INFANT]: 1,
      };

      expect(calculateTotalNumberOfTickets(tickets)).toBe(3);
    });
  });

  describe("constructPayloadForPaymentService", () => {
    it("should return the payload for payment service", () => {
      const tickets: Tickets = {
        [TicketCategory.ADULT]: 1,
        [TicketCategory.CHILD]: 1,
        [TicketCategory.INFANT]: 1,
      };
      const accountId = "1234567890";

      const result: PaymentServicePayload = {
        accountId,
        ticket: {
          totalPrice: 30,
          totalCount: 3,
          [TicketCategory.ADULT]: {
            count: 1,
            price: 20,
          },
          [TicketCategory.CHILD]: {
            count: 1,
            price: 10,
          },
          [TicketCategory.INFANT]: {
            count: 1,
            price: 0,
          },
        },
      };

      expect(
        constructPayloadForPaymentService(accountId, tickets, ticketPriceList)
      ).toEqual(result);
    });
  });
});
