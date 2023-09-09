import { PORT } from "../constants/AppConstants.js";
import { LOG_LEVEL } from "../constants/LogConstants.js";
import {
  PAYMENT_SERVICE_URL,
  SEAT_RESERVATION_SERVICE_URL,
  TICKET_PURCHASE_LIMIT_PER_REQ,
  ticketPriceList,
} from "../constants/TicketBookingConstants.js";
import { appLevelLogger } from "../helpers/Logger.js";
import { hasValue } from "../utils/App.js";
import { isValidLogLevel } from "../utils/Logger.js";

let startupChecks = true;

const {
  adult: adultTicketPrice,
  child: childTicketPrice,
  infant: infantTicketPrice,
} = ticketPriceList;

try {
  if (!hasValue(PORT) || !/^([0-9]){4,5}$/.test((PORT as string).trim())) {
    startupChecks = false;
    appLevelLogger.error(`PORT=${PORT} is not in the expected format.`);
  }

  if (!hasValue(LOG_LEVEL) || !isValidLogLevel(LOG_LEVEL as string)) {
    startupChecks = false;
    appLevelLogger.error(
      `LOG_LEVEL=${LOG_LEVEL} is not in the expected format.`
    );
  }

  if (
    !hasValue(TICKET_PURCHASE_LIMIT_PER_REQ) ||
    !/^([0-9]){1,2}$/.test((TICKET_PURCHASE_LIMIT_PER_REQ as string).trim())
  ) {
    startupChecks = false;
    appLevelLogger.error(
      `TICKET_PURCHASE_LIMIT_PER_REQ=${TICKET_PURCHASE_LIMIT_PER_REQ} is not in the expected format.`
    );
  }

  if (!hasValue(PAYMENT_SERVICE_URL)) {
    startupChecks = false;
    appLevelLogger.error(
      `PAYMENT_SERVICE_URL=${PAYMENT_SERVICE_URL} is not in the expected format.`
    );
  }

  if (!hasValue(SEAT_RESERVATION_SERVICE_URL)) {
    startupChecks = false;
    appLevelLogger.error(
      `SEAT_RESERVATION_SERVICE_URL=${SEAT_RESERVATION_SERVICE_URL} is not in the expected format.`
    );
  }

  if (
    !hasValue(adultTicketPrice) ||
    !/^([0-9])+$/.test((adultTicketPrice as string).trim())
  ) {
    startupChecks = false;
    appLevelLogger.error(
      `ADULT_TICKET_PRICE=${adultTicketPrice} is not in the expected format.`
    );
  }

  if (
    !hasValue(childTicketPrice) ||
    !/^([0-9])+$/.test((childTicketPrice as string).trim())
  ) {
    startupChecks = false;
    appLevelLogger.error(
      `CHILD_TICKET_PRICE=${childTicketPrice} is not in the expected format.`
    );
  }

  if (
    !hasValue(infantTicketPrice) ||
    !/^([0-9])+$/.test((infantTicketPrice as string).trim())
  ) {
    startupChecks = false;
    appLevelLogger.error(
      `INFANT_TICKET_PRICE=${infantTicketPrice} is not in the expected format.`
    );
  }
} catch (err) {
  startupChecks = false;
  appLevelLogger.error(err);
}

export default startupChecks;
