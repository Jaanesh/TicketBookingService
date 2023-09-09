export const TICKET_PURCHASE_LIMIT_PER_REQ =
  process.env.MAX_TICKET_PURCHASE_LIMIT_PER_REQUEST;

export const PAYMENT_SERVICE_URL = process.env.TICKET_PAYMENT_SERVICE_URL;
export const SEAT_RESERVATION_SERVICE_URL =
  process.env.SEAT_RESERVATION_SERVICE_URL;

export const TicketCategory = {
  ADULT: "adult",
  CHILD: "child",
  INFANT: "infant",
} as const;

export const ticketPriceList = {
  [TicketCategory.ADULT]: process.env.ADULT_TICKET_PRICE,
  [TicketCategory.CHILD]: process.env.CHILD_TICKET_PRICE,
  [TicketCategory.INFANT]: process.env.INFANT_TICKET_PRICE,
};
