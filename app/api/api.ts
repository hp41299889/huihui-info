import { NextResponse } from "next/server";

import { ApiResponse } from "./interface";

export const response: ApiResponse = {
  statusCode: 500,
  response: {
    status: "failed",
    message: "server error",
    data: undefined,
  },
};

export const apiResponse = (response: ApiResponse) => {
  return NextResponse.json(response.response, { status: response.statusCode });
};
