import moment from "moment";
import { timeFormats } from "../constants/TimeFormats.js";

export const generateTimeAndDate = (
  val: (typeof timeFormats)[keyof typeof timeFormats]
) => {
  return moment().format(val);
};
