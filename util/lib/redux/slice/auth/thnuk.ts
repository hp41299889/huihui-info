import { createAsyncThunk } from "@reduxjs/toolkit";

import { postLogin } from "@/util/client/api/auth";
import { PostLogin } from "@/app/api/login/interface";

export const loginThunk = createAsyncThunk(
  "/login",
  async (payload: PostLogin) => (await postLogin(payload)).data
);
