import { Tickets } from "../TicketBooking.js";
declare global {
  namespace Express {
    export interface Request {
      session: {
        logger: Logger;
        startTime: ReturnType<typeof Date.now>;
        tickets: Tickets;
        result: {
          message: string;
        };
      };
    }
  }
}

export {};
