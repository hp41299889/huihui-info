import { createSlice } from "@reduxjs/toolkit";

interface AuthSlice {
  token: string;
}

const initialState: AuthSlice = {
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});
