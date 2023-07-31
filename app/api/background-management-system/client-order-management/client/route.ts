import { NextRequest } from "next/server";

import { apiResponse, response } from "@/app/api/api";
import { prisma } from "@/prisma/prisma";
import { PostClient } from "./interface";

export const GET = async () => {
  const r = { ...response };
  try {
    const clients = await prisma.client.findMany();
    r.response = {
      status: "success",
      message: "read clients success",
      data: clients,
    };
    r.statusCode = 200;
  } catch (err) {
    r.response = {
      status: "failed",
      message: "read clients failed",
      data: err,
    };
    r.statusCode = 400;
  }
  return apiResponse(r);
};

export const POST = async (req: NextRequest) => {
  const r = { ...response };
  try {
    const payload: PostClient = await req.json();
    const client = await prisma.client.create({
      data: { ...payload },
    });
    r.response = {
      status: "success",
      message: "create client success",
      data: client,
    };
    r.statusCode = 201;
  } catch (err) {
    r.response = {
      status: "failed",
      message: "create client failed",
      data: err,
    };
    r.statusCode = 400;
  }
  return apiResponse(r);
};
