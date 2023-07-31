import dayjs, { Dayjs } from "dayjs";

export const toDayjs = (time: string | Date | Dayjs) => {
  return dayjs(time);
};

export const toLocaleDate = (time: string | Date | Dayjs) => {
  return toDayjs(time).format("YYYY/MM/DD");
};

export const toLocaleDateTime = (time: string | Date | Dayjs) => {
  return toDayjs(time).format("YYYY/MM/DD HH:mm:ss");
};
