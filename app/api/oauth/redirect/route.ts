import { NextRequest } from "next/server";

import { apiErrorHandler, apiResponse, response } from "../../api";
import { oauthClient } from "@/util/server/oauth";

export const GET = async (req: NextRequest) => {
  const r = { ...response };
  try {
    const code = req.nextUrl.searchParams.get("code");
    if (!code) {
      throw "redirect error";
    }
    const { tokens } = await oauthClient.getToken(code);
    oauthClient.setCredentials(tokens);
    r.statusCode = 200;
    r.response = {
      status: "success",
      message: "oauth success",
      data: "set credentials success",
    };
  } catch (err) {
    throw apiErrorHandler(err);
  }
  return apiResponse(r);
};
