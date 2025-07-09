import { format, formatDistance } from "date-fns";

export const dateFormat = (date, pattern = "dd MMM, yyyy") => {
  if (!date) return "";
  const dateObj = new Date(date);
  const output = format(dateObj, pattern);
  return output;
};

export const dateDistance = (date) => {
  if (!date) return "";
  const currentDate = new Date();
  const dateDistance = formatDistance(currentDate, new Date(date));
  return dateDistance;
};

export const dateDiff = (dateLarge, dateSmall) => {
  const diffInMs = new Date(dateLarge) - new Date(dateSmall);
  const diffInDays = diffInMs / (24 * 60 * 60 * 1000);

  if (diffInDays >= 1) {
    return Math.round(diffInDays);
  } else {
    return false;
  }
};

// add months to current date
export const addMonthsToCurrentDate = (months) => {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + months);
  return currentDate;
};
