import { NextRequest } from "next/server";

import { apiResponse, response } from "@/app/api/api";
import { prisma } from "@/prisma/prisma";
import { PatchProduct } from "../interface";

export const GET = async (
  _: NextRequest,
  context: { params: { uid: string } }
) => {
  const r = { ...response };
  const { uid } = context.params;
  try {
    const finded = await prisma.product.findFirst({ where: { uid } });
    r.response = {
      status: "success",
      message: "read product success",
      data: finded,
    };
    r.statusCode = 200;
  } catch (err) {
    r.response = {
      status: "failed",
      message: "read product failed",
      data: err,
    };
    r.statusCode = 400;
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
    const updated = await prisma.product.update({
      where: { uid },
      data: payload,
    });
    r.response = {
      status: "success",
      message: "update product success",
      data: updated,
    };
    r.statusCode = 200;
  } catch (err) {
    r.response = {
      status: "failed",
      message: "update product failed",
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
    const deleted = await prisma.product.delete({ where: { uid } });
    r.response = {
      status: "success",
      message: "delete product success",
      data: deleted,
    };
    r.statusCode = 200;
  } catch (err) {
    r.response = {
      status: "failed",
      message: "delete product failed",
      data: err,
    };
    r.statusCode = 400;
  }
  return apiResponse(r);
};
