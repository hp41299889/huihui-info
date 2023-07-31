import { Dayjs } from "dayjs";

export interface PostClient {
  email: string;
  name: string;
  phone: string;
  birth: string;
  address: string;
  note?: string;
}
