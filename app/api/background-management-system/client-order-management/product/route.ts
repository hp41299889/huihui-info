import { NextRequest } from "next/server";

import { apiErrorHandler, apiResponse, response } from "@/app/api/api";
import { PostProduct } from "./interface";
import { createProduct, findManyProducts } from "./model";

export const GET = async () => {
  const r = { ...response };
  try {
    const products = await findManyProducts();
    r.response = {
      status: "success",
      message: "read products success",
      data: products,
    };
    r.statusCode = 200;
  } catch (err) {
    return apiErrorHandler(err);
  }
  return apiResponse(r);
};

export const POST = async (req: NextRequest) => {
  const r = { ...response };
  const payload: PostProduct = await req.json();
  try {
    const created = await createProduct(payload);
    r.response = {
      status: "success",
      message: "create product success",
      data: created,
    };
    r.statusCode = 201;
  } catch (err) {
    return apiErrorHandler(err);
  }
  return apiResponse(r);
};
