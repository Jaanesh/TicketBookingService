import { TicketCategory } from "../constants/TicketBookingConstants.js";

export type PaymentServicePayload = {
  accountId: string;
  ticket: {
    totalPrice: number;
    totalCount: number;
    [TicketCategory.ADULT]: {
      count: number;
      price: number;
    };
    [TicketCategory.CHILD]: {
      count: number;
      price: number;
    };
    [TicketCategory.INFANT]: {
      count: number;
      price: number;
    };
  };
};

export type PaymentResponse = {
  message: string;
};
