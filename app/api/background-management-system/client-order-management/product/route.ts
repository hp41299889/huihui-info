import { NextRequest } from "next/server";

import { apiResponse, response } from "@/app/api/api";
import { prisma } from "@/prisma/prisma";
import { PostProduct } from "./interface";

export const GET = async () => {
  const r = { ...response };
  try {
    const products = await prisma.product.findMany();
    r.response = {
      status: "success",
      message: "read products success",
      data: products,
    };
    r.statusCode = 200;
  } catch (err) {
    r.response = {
      status: "success",
      message: "read products success",
      data: err,
    };
    r.statusCode = 200;
  }
  return apiResponse(r);
};

export const POST = async (req: NextRequest) => {
  const r = { ...response };
  const payload: PostProduct = await req.json();
  try {
    const created = await prisma.product.create({ data: { ...payload } });
    r.response = {
      status: "success",
      message: "create product success",
      data: created,
    };
    r.statusCode = 201;
  } catch (err) {
    r.response = {
      status: "failed",
      message: "create product failed",
      data: err,
    };
    r.statusCode = 400;
  }
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
