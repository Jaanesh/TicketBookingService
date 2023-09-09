import log4js, {
  Configuration,
  type CustomLayout,
  type LoggingEvent,
  type StandardOutputAppender,
} from "log4js";
import { generateTimeAndDate } from "../utils/Date.js";
import { timeFormats } from "../constants/TimeFormats.js";
import {
  CustomLogAppender,
  CustomLogCategory,
  CustomLogLayout,
  CustomLogType,
  LOG_LEVEL,
} from "../constants/LogConstants.js";
import { isValidLogLevel } from "../utils/Logger.js";

const loggerLevel = isValidLogLevel(LOG_LEVEL) ? (LOG_LEVEL as string) : "INFO";
const appType = "TICKETING SERVICE";

const createLayoutConfig = (customLogType: CustomLogType) => {
  return (logEvent: LoggingEvent): string => {
    const log = {
      logType: customLogType,
      appType,
      logLevel: logEvent.level.levelStr,
      dateTime: generateTimeAndDate(timeFormats.dateTime),
      url: logEvent.context?.url,
      location: `${logEvent.fileName}-${logEvent.functionName}:${logEvent.lineNumber}`,
      data: logEvent.data,
    };
    return JSON.stringify(log, null, 1);
  };
};

log4js.addLayout(CustomLogLayout.APP, () =>
  createLayoutConfig(CustomLogType.APP)
);
log4js.addLayout(CustomLogLayout.REQ_RES, () =>
  createLayoutConfig(CustomLogType.REQ_RES)
);

const createStdoutAppender = (layout: CustomLayout): StandardOutputAppender => {
  return {
    type: "stdout",
    layout,
  };
};

const createCustomLayout = (type: CustomLogLayout): CustomLayout => {
  return {
    type,
  };
};

const appenders: Configuration["appenders"] = {
  [CustomLogAppender.APP_STDOUT]: createStdoutAppender(
    createCustomLayout(CustomLogLayout.APP)
  ),
  [CustomLogAppender.REQ_RES_STDOUT]: createStdoutAppender(
    createCustomLayout(CustomLogLayout.REQ_RES)
  ),
};

const categories: Configuration["categories"] = {
  [CustomLogCategory.APP]: {
    appenders: [CustomLogAppender.APP_STDOUT],
    level: loggerLevel,
    enableCallStack: true,
  },
  [CustomLogCategory.REQ_RES]: {
    appenders: [CustomLogAppender.REQ_RES_STDOUT],
    level: loggerLevel,
    enableCallStack: true,
  },
};

const config: Configuration = {
  appenders,
  categories,
};

log4js.configure(config);

export const appLevelLogger = log4js.getLogger(CustomLogCategory.APP);

export const createLoggerInstance = () =>
  log4js.getLogger(CustomLogCategory.REQ_RES);
