import { NextRequest } from "next/server";

import { apiErrorHandler, apiResponse, response } from "@/app/api/api";
import { PostClient } from "./interface";
import { createClient, findManyClients } from "./model";

export const GET = async () => {
  const r = { ...response };
  try {
    const clients = await findManyClients();
    r.response = {
      status: "success",
      message: "read clients success",
      data: clients,
    };
    r.statusCode = 200;
  } catch (err) {
    return apiErrorHandler(err);
  }
  return apiResponse(r);
};

export const POST = async (req: NextRequest) => {
  const r = { ...response };
  try {
    const payload: PostClient = await req.json();
    const client = await createClient(payload);
    r.response = {
      status: "success",
      message: "create client success",
      data: client,
    };
    r.statusCode = 201;
  } catch (err) {
    return apiErrorHandler(err);
  }
  return apiResponse(r);
};
