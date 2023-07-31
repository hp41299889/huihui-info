import { NextRequest } from "next/server";

import { apiResponse, response } from "@/app/api/api";
import { prisma } from "@/prisma/prisma";

export const GET = async () => {
  const r = { ...response };
  try {
    const orders = await prisma.order.findMany();
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
  } catch (err) {}
  return apiResponse(r);
};

export const PATCH = async () => {
  const r = { ...response };
  try {
  } catch (err) {}
  return apiResponse(r);
};

export const DELETE = async () => {
  const r = { ...response };
  try {
  } catch (err) {}
  return apiResponse(r);
};
