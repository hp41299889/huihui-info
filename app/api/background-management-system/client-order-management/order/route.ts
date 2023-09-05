import { NextRequest } from "next/server";

import { apiResponse, response } from "@/app/api/api";
import { PostOrder } from "./interface";
import { createOrder, findManyOrders } from "./model";

export const GET = async () => {
  const r = { ...response };
  try {
    const orders = await findManyOrders();
    r.response = {
      status: "success",
      message: "read orders success",
      data: orders,
    };
    r.statusCode = 200;
  } catch (err) {
    r.response = {
      status: "failed",
      message: "read orders failed",
      data: err,
    };
  }
  return apiResponse(r);
};

export const POST = async (req: NextRequest) => {
  const r = { ...response };
  try {
    const payload: PostOrder = await req.json();
    const order = await createOrder(payload);
    r.response = {
      status: "success",
      message: "create order success",
      data: order,
    };
    r.statusCode = 201;
  } catch (err) {
    r.response = {
      status: "failed",
      message: "create order failed",
      data: err,
    };
    r.statusCode = 400;
    console.error(err);
  }
  return apiResponse(r);
};
