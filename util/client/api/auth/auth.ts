import { authApi } from "@/util/client/api/request";
import { PostLogin } from "@/app/api/login/interface";

export const postLogin = (payload: PostLogin) => {
  return authApi.post("/api/login", payload);
};
