import { TicketCategory } from "../constants/TicketBookingConstants.js";

export type Tickets = {
  [TicketCategory.ADULT]: number;
  [TicketCategory.CHILD]: number;
  [TicketCategory.INFANT]: number;
};
