import {
  TicketCategory,
  ticketPriceList,
} from "../constants/TicketBookingConstants.js";
import { PaymentServicePayload } from "../types/PaymentService.js";
import { Tickets } from "../types/TicketBooking.js";

export const calculateTotalPriceForEachTicketCategory = (
  tickets: Tickets,
  priceList: typeof ticketPriceList
): Record<(typeof TicketCategory)[keyof typeof TicketCategory], number> => {
  const adultTicketPrice = tickets.adult * Number(priceList.adult as string);
  const childTicketPrice = tickets.child * Number(priceList.child as string);
  const infantTicketPrice = tickets.infant * Number(priceList.infant as string);

  return {
    [TicketCategory.ADULT]: adultTicketPrice,
    [TicketCategory.CHILD]: childTicketPrice,
    [TicketCategory.INFANT]: infantTicketPrice,
  };
};

export const calculateTotalNumberOfTickets = (tickets: Tickets) => {
  return tickets.adult + tickets.child + tickets.infant;
};

export const constructPayloadForPaymentService = (
  accountId: string,
  tickets: Tickets,
  priceList: typeof ticketPriceList
): PaymentServicePayload => {
  const priceObj = calculateTotalPriceForEachTicketCategory(tickets, priceList);

  const data = {
    accountId,
    ticket: {
      totalPrice: priceObj.adult + priceObj.child + priceObj.infant,
      totalCount: tickets.adult + tickets.child + tickets.infant,
      [TicketCategory.ADULT]: {
        count: tickets.adult,
        price: priceObj.adult,
      },
      [TicketCategory.CHILD]: {
        count: tickets.child,
        price: priceObj.child,
      },
      [TicketCategory.INFANT]: {
        count: tickets.infant,
        price: priceObj.infant,
      },
    },
  };

  return data;
};
