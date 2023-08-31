import { NextRequest } from "next/server";

import { apiResponse, response } from "@/app/api/api";
import { prisma } from "@/util/server/prisma/prisma";
import { PatchClient } from "@/app/api/background-management-system/client-order-management/client/interface";

export const GET = async (
  _: NextRequest,
  context: { params: { id: number } }
) => {
  const r = { ...response };
  const { id } = context.params;
  try {
    const client = await prisma.client.findFirst({ where: { id: Number(id) } });
    r.response = {
      status: "success",
      message: "read client success",
      data: client,
    };
    r.statusCode = 200;
  } catch (err) {
    r.response = {
      status: "failed",
      message: "read client failed",
      data: err,
    };
    r.statusCode = 400;
  }
  return apiResponse(r);
};

export const PATCH = async (
  req: NextRequest,
  context: { params: { id: number } }
) => {
  const r = { ...response };
  const { id } = context.params;
  try {
    const payload: PatchClient = await req.json();
    const updated = await prisma.client.update({
      where: { id: Number(id) },
      data: payload,
    });
    r.response = {
      status: "success",
      message: "update client success",
      data: updated,
    };
    r.statusCode = 200;
  } catch (err) {
    r.response = {
      status: "failed",
      message: "update client failed",
      data: err,
    };
    r.statusCode = 400;
  }
  return apiResponse(r);
};

export const DELETE = async (
  _: NextRequest,
  context: { params: { id: number } }
) => {
  const r = { ...response };
  const { id } = context.params;
  try {
    const deleted = await prisma.client.delete({ where: { id: Number(id) } });
    r.response = {
      status: "success",
      message: "delete client success",
      data: deleted,
    };
    r.statusCode = 200;
  } catch (err) {
    r.response = {
      status: "failed",
      message: "delete client failed",
      data: err,
    };
    r.statusCode = 400;
    console.error(err);
  }
  return apiResponse(r);
};
