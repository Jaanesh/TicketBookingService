import { describe, expect, it } from "@jest/globals";
import {
  calculateTotalOfSeats,
  constructPayloadForSeatResService,
} from "../../../helpers/SeatReservationHelper";
import { Tickets } from "../../../types/TicketBooking";
import { TicketCategory } from "../../../constants/TicketBookingConstants";
import { SeatReservationServicePayload } from "../../../types/SeatReservationService";

describe("helpers.SeatReservationHelper", () => {
  describe("calculateTotalOfSeats", () => {
    it("should return total count of adult and child tickets", () => {
      const tickets: Tickets = {
        [TicketCategory.ADULT]: 1,
        [TicketCategory.CHILD]: 1,
        [TicketCategory.INFANT]: 1,
      };
      expect(calculateTotalOfSeats(tickets)).toBe(2);
    });
  });

  describe("constructPayloadForSeatResService", () => {
    it("should return payload for seat reservation service when accountId and ticketObj is passed", () => {
      const tickets: Tickets = {
        [TicketCategory.ADULT]: 1,
        [TicketCategory.CHILD]: 1,
        [TicketCategory.INFANT]: 1,
      };
      const accountId = "1234567890";
      const result: SeatReservationServicePayload = {
        accountId,
        totalSeats: 2,
      };

      expect(constructPayloadForSeatResService(accountId, tickets)).toEqual(
        result
      );
    });
  });
});
