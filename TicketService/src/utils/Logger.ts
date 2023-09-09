export const isValidLogLevel = (logLevel: string | undefined): boolean => {
  if (
    logLevel === "ALL" ||
    logLevel === "MARK" ||
    logLevel === "TRACE" ||
    logLevel === "DEBUG" ||
    logLevel === "INFO" ||
    logLevel === "WARN" ||
    logLevel === "ERROR" ||
    logLevel === "FATAL" ||
    logLevel === "OFF"
  ) {
    return true;
  }
  return false;
};
