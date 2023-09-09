import { SeatReservationServicePayload } from "../types/SeatReservationService.js";
import { Tickets } from "../types/TicketBooking.js";

export const calculateTotalOfSeats = (tickets: Tickets) => {
  return tickets.adult + tickets.child;
};

export const constructPayloadForSeatResService = (
  accountId: string,
  tickets: Tickets
): SeatReservationServicePayload => {
  return {
    accountId,
    totalSeats: calculateTotalOfSeats(tickets),
  };
};
