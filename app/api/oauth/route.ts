import { NextRequest } from "next/server";

import { apiResponse, response } from "../api";
import { oauthClient } from "@/util/server/gmail";

export const GET = async (req: NextRequest) => {
  const r = { ...response };
  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    r.response = {
      status: "failed",
      message: "get oauth error",
      data: "something error",
    };
    r.statusCode = 400;
    return apiResponse(r);
  }
  const { tokens } = await oauthClient.getToken(code);
  oauthClient.setCredentials(tokens);
  r.response = {
    status: "success",
    message: "oauth success",
    data: "set credentials success",
  };
  r.statusCode = 200;
  return apiResponse(r);
};
