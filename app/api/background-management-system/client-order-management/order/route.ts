import { NextRequest } from "next/server";

import { apiResponse, response } from "@/app/api/api";
import { prisma, OrderCreateInput } from "@/prisma/prisma";
import { PostOrder } from "./interface";
import dayjs from "dayjs";

export const GET = async () => {
  const r = { ...response };
  try {
    const orders = await prisma.order.findMany({
      include: {
        client: {
          select: {
            name: true,
          },
        },
        orderProducts: {
          select: {
            productUid: true,
            amount: true,
            note: true,
          },
        },
      },
    });
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
    const payload: PostOrder = await req.json();
    const { clientId, date, note, orderProducts } = payload;
    const orderData: OrderCreateInput = {
      client: {
        connect: {
          id: Number(clientId),
        },
      },
      date: dayjs(date).toISOString(),
      note,
      orderProducts: {
        create: orderProducts.map((item) => ({
          product: {
            connect: {
              uid: item.productUid,
            },
          },
          amount: Number(item.amount),
          note: item.note,
        })),
      },
    };
    const order = await prisma.order.create({ data: orderData });
    r.response = {
      status: "success",
      message: "create order success",
      data: order,
    };
    r.statusCode = 201;
  } catch (err) {
    r.response = {
      status: "failed",
      message: "create order failed",
      data: err,
    };
    r.statusCode = 400;
    console.error(err);
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
