export const calculateResponseTime = (
  startTime: number,
  endTime: number = Date.now()
) => endTime - startTime;

export const hasValue = (value: string | null | undefined): boolean =>
  Boolean(value?.trim().length);
