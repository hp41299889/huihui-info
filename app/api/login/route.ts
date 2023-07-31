import { NextRequest } from "next/server";
import Joi from "joi";

import { apiResponse, response } from "@/app/api/api";
import { auth, generateToken } from "@/util/server/login";
import { PostLogin } from "./interface";

export const GET = async () => {
  const r = { ...response };
  r.response = {
    status: "success",
    message: "hi",
    data: "good",
  };
  r.statusCode = 200;
  return apiResponse(r);
};

export const POST = async (req: NextRequest) => {
  const r = { ...response };
  const payload: PostLogin = await req.json();
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(payload);
  if (error) {
    r.response = {
      status: "failed",
      message: "login failed",
      data: "format error",
    };
    r.statusCode = 400;
    return apiResponse(r);
  }
  const { username, password } = payload;
  const authentication = await auth(username, password);
  if (!authentication) {
    r.response = {
      status: "failed",
      message: "login failed",
      data: "username or password incorrect",
    };
    r.statusCode = 401;
    return apiResponse(r);
  }
  const token = generateToken(username);
  r.response = {
    status: "success",
    message: "login success",
    data: token,
  };
  r.statusCode = 201;
  return apiResponse(r);
};
