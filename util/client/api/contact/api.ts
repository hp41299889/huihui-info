import { PostContact } from "@/app/api/contact/interface";
import { nextApi } from "../request";

export const postContact = async (payload: PostContact) => {
  return await nextApi.post("/contact", payload);
};
