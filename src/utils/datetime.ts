import moment from "moment";

export const localDateTime = (date: string) => {
  return moment(date).local().format("HH:mm DD-MM-YYYY");
};
