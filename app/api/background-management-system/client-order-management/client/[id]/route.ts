import { NextRequest } from "next/server";

import { apiResponse, response } from "@/app/api/api";
import { prisma } from "@/prisma/prisma";

export const GET = async (req: NextRequest) => {
  const r = { ...response };
  const { pathname } = req.nextUrl;
  r.response = {
    status: "success",
    message: "read clients success",
    data: pathname,
  };
  r.statusCode = 200;
  return apiResponse(r);
};
