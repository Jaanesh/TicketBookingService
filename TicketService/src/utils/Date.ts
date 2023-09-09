import moment from "moment";

export const generateTimeAndDate = (val: string) => {
  return moment().format(val);
};
