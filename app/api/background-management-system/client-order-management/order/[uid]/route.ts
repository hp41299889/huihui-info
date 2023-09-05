import { NextRequest } from "next/server";

import { apiResponse, response } from "@/app/api/api";
import { PatchOrder } from "../interface";
import { deleteOrderByUid, updateOrderByUid } from "../model";

export const PATCH = async (
  req: NextRequest,
  context: { params: { uid: string } }
) => {
  const r = { ...response };
  const { uid } = context.params;
  try {
    const payload: PatchOrder = await req.json();
    const updated = updateOrderByUid(uid, payload);
    r.response = {
      status: "success",
      message: "update order success",
      data: updated,
    };
    r.statusCode = 200;
  } catch (err) {
    r.response = {
      status: "failed",
      message: "update order failed",
      data: err,
    };
    r.statusCode = 400;
    console.error(err);
  }
  return apiResponse(r);
};

export const DELETE = async (
  _: NextRequest,
  context: { params: { uid: string } }
) => {
  const r = { ...response };
  const { uid } = context.params;
  try {
    const order = await deleteOrderByUid(uid);
    r.response = {
      status: "success",
      message: "delete order success",
      data: order,
    };
    r.statusCode = 200;
  } catch (err) {
    r.response = {
      status: "failed",
      message: "delete order failed",
      data: err,
    };
    r.statusCode = 400;
    console.error(err);
  }
  return apiResponse(r);
};
