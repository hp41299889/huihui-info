import { NextRequest } from "next/server";

import { apiErrorHandler, apiResponse, response } from "@/app/api/api";
import { PatchClient } from "@/app/api/background-management-system/client-order-management/client/interface";
import {
  deleteClientById,
  findFirstClientById,
  updateClientById,
} from "../model";

export const GET = async (
  _: NextRequest,
  context: { params: { id: number } }
) => {
  const r = { ...response };
  const { id } = context.params;
  try {
    const client = await findFirstClientById(id);
    r.response = {
      status: "success",
      message: "read client success",
      data: client,
    };
    r.statusCode = 200;
  } catch (err) {
    return apiErrorHandler(err);
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
    const updated = await updateClientById(id, payload);
    r.response = {
      status: "success",
      message: "update client success",
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
  context: { params: { id: number } }
) => {
  const r = { ...response };
  const { id } = context.params;
  try {
    const deleted = await deleteClientById(id);
    r.response = {
      status: "success",
      message: "delete client success",
      data: deleted,
    };
    r.statusCode = 200;
  } catch (err) {
    return apiErrorHandler(err);
  }
  return apiResponse(r);
};
