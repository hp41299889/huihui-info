import { NextRequest } from "next/server";
import Joi from "joi";

import { apiErrorHandler, apiResponse, response } from "../api";
import { PostRegister } from "./interface";
import { createUser } from "./model";
import { validateError } from "@/util/server/error";
import { sendMail } from "@/util/server/gmail";
import { serverConfig } from "@/util/config/config";

export const POST = async (req: NextRequest) => {
  const r = { ...response };
  try {
    const payload: PostRegister = await req.json();
    const schema = Joi.object<PostRegister>({
      username: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().required(),
    });
    if (schema.validate(payload).error) {
      throw validateError("payload format error");
    }
    const user = await createUser(payload);
    const result = await sendMail(
      "huihui-info-會員驗證",
      `
      請點選以下連結以完成會員驗證<br>
      <br>
      <a href="${serverConfig.baseUrl}/api/validate/${user.id}">點我驗證</a>
      `,
      "register",
      payload.email,
      payload.username
    );
    r.statusCode = 201;
    r.response = {
      status: "success",
      message: "post register success",
      data: result,
    };
  } catch (err) {
    return apiErrorHandler(err);
  }
  return apiResponse(r);
};
