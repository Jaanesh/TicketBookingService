import { TICKET_PURCHASE_LIMIT_PER_REQ } from "../constants/TicketBookingConstants.js";
import { BadRequestError } from "../errorHandlers/BadRequestError.js";
import { calculateTotalNumberOfTickets } from "../helpers/PaymentHelper.js";
import { Tickets } from "../types/TicketBooking.js";

export const isValidAccountId = (val: string): boolean => {
  if (Number(val) < 1) {
    throw new BadRequestError(
      "accountId is not valid.It should be greater than 0."
    );
  }
  return true;
};

export const isAdultTicketBooked = (adultTicketCount: number): boolean => {
  if (adultTicketCount < 1) {
    throw new BadRequestError(
      "There should be atleast one adult ticket ordered in the request"
    );
  }
  return true;
};

export const isValidInfantTicketsBooked = (tickets: Tickets): boolean => {
  if (tickets.adult < tickets.infant) {
    throw new BadRequestError(
      `Not enough adult tickets booked to keep infants`
    );
  }
  return true;
};

export const isOrderedTicketCountWithInRange = (tickets: Tickets): boolean => {
  const totalTicketsOrdered = calculateTotalNumberOfTickets(tickets);

  if (totalTicketsOrdered > Number(TICKET_PURCHASE_LIMIT_PER_REQ as string)) {
    throw new BadRequestError(
      `Ordered tickets count exceeds the purchase limit per request`
    );
  }
  if (totalTicketsOrdered < 1) {
    throw new BadRequestError(`Ticket count should be greater than 0`);
  }

  return true;
};
