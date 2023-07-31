import { NextRequest } from "next/server";

import { apiResponse, response } from "@/app/api/api";
import { prisma } from "@/prisma/prisma";
import { PostClient } from "./interface";

export const GET = async (req: NextRequest) => {
  const r = { ...response };
  const clients = await prisma.client.findMany();
  r.response = {
    status: "success",
    message: "read clients success",
    data: clients,
  };
  r.statusCode = 200;
  return apiResponse(r);
};

export const POST = async (req: NextRequest) => {
  const r = { ...response };
  const payload: PostClient = await req.json();
  const client = await prisma.client.create({
    data: { ...payload },
  });
  return apiResponse(r);
};

export const PATCH = async (req: NextRequest) => {
  const r = { ...response };
  const payload: PostClient = await req.json();
  // const client = await prisma.client.create({
  //   data: { ...payload },
  // });
  return apiResponse(r);
};

export const DELETE = async (req: NextRequest) => {
  const r = { ...response };
  // const payload: PostClient = await req.json();
  // const client = await prisma.client.create({
  //   data: { ...payload },
  // });
  return apiResponse(r);
};
