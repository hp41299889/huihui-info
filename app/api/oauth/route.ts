import { NextRequest } from "next/server";

import { apiErrorHandler, apiResponse, response } from "../api";
import { oauth } from "@/util/server/oauth";

export const GET = async (_: NextRequest) => {
  const r = { ...response };
  try {
    r.statusCode = 200;
    r.response = {
      status: "success",
      message: "oauth",
      data: await oauth(),
    };
  } catch (err) {
    throw apiErrorHandler(err);
  }
  return apiResponse(r);
};
