import { NextRequest } from "next/server";
import Joi from "joi";

import { apiResponse, response } from "../api";
import { PostContact } from "./interface";
import { sendMail } from "@/util/server/gmail";
import { validateError } from "@/util/server/error";

export const POST = async (req: NextRequest) => {
  const r = { ...response };
  const payload: PostContact = await req.json();
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    message: Joi.string().required(),
    phone: Joi.string().required(),
    company: Joi.string(),
  });
  const { error } = schema.validate(payload);
  if (error) {
    throw validateError("payload format error");
  }
  const { name, email, message, phone } = payload;
  const result = await sendMail(
    "huihui-info-合作聯絡",
    `
    收到來自huihui-info的通知<br>
    <br>
    來自${email}的"${name}"：<br>
    <br>
    ${message}<br>
    <br>
    ${phone ? `連絡電話：${phone}` : ""}
    `,
    "contact"
  );
  r.response = {
    status: "success",
    message: "hi",
    data: result,
  };
  r.statusCode = 200;
  return apiResponse(r);
};
