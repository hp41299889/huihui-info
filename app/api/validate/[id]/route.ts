import { NextRequest } from "next/server";
import { response, apiErrorHandler, apiResponse } from "../../api";
import { prisma } from "@/util/server/prisma/prisma";
import { databaseError } from "@/util/server/error";

export const GET = async (
  _: NextRequest,
  context: { params: { id: number } }
) => {
  const r = { ...response };
  const { id } = context.params;
  try {
    try {
      const result = await prisma.user.update({
        where: { id: Number(id) },
        data: { isVerify: true },
      });
      r.statusCode = 200;
      r.response = {
        status: "success",
        message: "email validate success",
        data: "驗證成功",
      };
    } catch (e) {
      throw databaseError("user email validate error");
    }
  } catch (err) {
    throw apiErrorHandler(err);
  }
  return apiResponse(r);
};
