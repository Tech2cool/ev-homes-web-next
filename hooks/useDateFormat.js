"use client";
import moment from "moment-timezone";

export const dateFormatWithTime = (dateStr) => {
  const localTime = moment.utc(dateStr).local().format("DD MMM YYYY HH:mm");
  return localTime;
};

export const dateFormatOnly = (dateStr) => {
  const localTime = moment.utc(dateStr).local().format("DD MMM YYYY");
  return localTime;
};
