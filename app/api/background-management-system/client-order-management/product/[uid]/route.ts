import { NextRequest } from "next/server";

import { apiErrorHandler, apiResponse, response } from "@/app/api/api";
import { prisma } from "@/util/server/prisma/prisma";
import { PatchProduct } from "../interface";
import {
  deleteProductByUid,
  findFirstProductByUid,
  updateProductByUid,
} from "../model";

export const GET = async (
  _: NextRequest,
  context: { params: { uid: string } }
) => {
  const r = { ...response };
  const { uid } = context.params;
  try {
    const finded = await findFirstProductByUid(uid);
    r.response = {
      status: "success",
      message: "read product success",
      data: finded,
    };
    r.statusCode = 200;
  } catch (err) {
    return apiErrorHandler(err);
  }
  return apiResponse(r);
};

export const PATCH = async (
  req: NextRequest,
  context: { params: { uid: string } }
) => {
  const r = { ...response };
  const { uid } = context.params;
  try {
    const payload: PatchProduct = await req.json();
    const updated = await updateProductByUid(uid, payload);
    r.response = {
      status: "success",
      message: "update product success",
      data: updated,
    };
    r.statusCode = 200;
  } catch (err) {
    return apiErrorHandler(err);
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
    const deleted = await deleteProductByUid(uid);
    r.response = {
      status: "success",
      message: "delete product success",
      data: deleted,
    };
    r.statusCode = 200;
  } catch (err) {
    return apiErrorHandler(err);
  }
  return apiResponse(r);
};
