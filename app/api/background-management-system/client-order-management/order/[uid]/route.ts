import { NextRequest } from "next/server";

import { apiResponse, response } from "@/app/api/api";
import { prisma } from "@/util/server/prisma/prisma";
import { PatchOrder } from "../interface";

export const GET = async () => {
  const r = { ...response };
  try {
  } catch (err) {}
  return apiResponse(r);
};

export const POST = async () => {
  const r = { ...response };
  try {
  } catch (err) {}
  return apiResponse(r);
};

export const PATCH = async (
  req: NextRequest,
  context: { params: { uid: string } }
) => {
  const r = { ...response };
  const { uid } = context.params;
  try {
    const payload: PatchOrder = await req.json();
    const { orderProducts, clientId, ...p } = payload;
    const updatedOrder = await prisma.order.update({
      where: {
        uid,
      },
      data: {
        ...p,
        client: {
          connect: {
            id: Number(clientId),
          },
        },
      },
    });
    const updatedProducts = orderProducts
      ? await Promise.all(
          orderProducts.map((product) =>
            prisma.orderProduct.update({
              where: {
                orderUid_productUid: {
                  orderUid: uid,
                  productUid: product.productUid,
                },
              },
              data: {
                amount: Number(product.amount),
                note: product.note,
              },
            })
          )
        )
      : [];
    const updated = { ...updatedOrder, ...updatedProducts };
    r.response = {
      status: "success",
      message: "update order success",
      data: updated,
    };
    r.statusCode = 200;
  } catch (err) {
    r.response = {
      status: "failed",
      message: "update order failed",
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
    const orderProducts = await prisma.orderProduct.deleteMany({
      where: {
        orderUid: uid,
      },
    });
    const order = await prisma.order.delete({
      where: {
        uid: uid,
      },
    });
    r.response = {
      status: "success",
      message: "delete order success",
      data: { ...orderProducts, order },
    };
    r.statusCode = 200;
  } catch (err) {
    r.response = {
      status: "failed",
      message: "delete order failed",
      data: err,
    };
    r.statusCode = 400;
    console.error(err);
  }
  return apiResponse(r);
};
