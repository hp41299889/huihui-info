import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { databaseError } from "@/util/server/error";
import { prisma } from "@/util/server/prisma/prisma";
import { PatchOrder, PostOrder } from "./interface";

export const findManyOrders = async () => {
  try {
    return await prisma.order.findMany({
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
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      switch (err.code) {
        default:
          throw databaseError(err.message);
      }
    } else {
      throw err;
    }
  }
};

export const findFirstOrderByUid = async (uid: string) => {
  try {
    return await prisma.order.findFirst({ where: { uid } });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      switch (err.code) {
        default:
          throw databaseError(err.message);
      }
    } else {
      throw err;
    }
  }
};

export const createOrder = async (payload: PostOrder) => {
  try {
    const { clientId, date, note, orderProducts } = payload;
    return prisma.order.create({
      data: {
        client: {
          connect: {
            id: clientId,
          },
        },
        date,
        note,
        orderProducts: {
          create: orderProducts.map((i) => ({
            product: {
              connect: {
                uid: i.productUid,
              },
            },
            amount: i.amount,
            note: i.note,
          })),
        },
      },
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      switch (err.code) {
        default:
          throw databaseError(err.message);
      }
    } else {
      throw err;
    }
  }
};

export const updateOrderByUid = async (uid: string, payload: PatchOrder) => {
  try {
    const { orderProducts, clientId, ...p } = payload;
    const updatedOrder = await prisma.order.update({
      where: { uid },
      data: {
        ...p,
        client: {
          connect: {
            id: clientId,
          },
        },
      },
    });
    const updatedProducts = orderProducts
      ? await Promise.all(
          orderProducts.map((i) =>
            prisma.orderProduct.update({
              where: {
                orderUid_productUid: {
                  orderUid: uid,
                  productUid: i.productUid,
                },
              },
              data: {
                amount: i.amount,
                note: i.note,
              },
            })
          )
        )
      : [];
    return { ...updatedOrder, ...updatedProducts };
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      switch (err.code) {
        default:
          throw databaseError(err.message);
      }
    } else {
      throw err;
    }
  }
};

export const deleteOrderByUid = async (uid: string) => {
  try {
    const orderProducts = await prisma.orderProduct.deleteMany({
      where: {
        orderUid: uid,
      },
    });
    const order = await prisma.order.delete({
      where: {
        uid,
      },
    });
    return { ...orderProducts, order };
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      switch (err.code) {
        default:
          throw databaseError(err.message);
      }
    } else {
      throw err;
    }
  }
};
