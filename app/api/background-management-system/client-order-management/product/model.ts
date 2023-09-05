import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { databaseError } from "@/util/server/error";
import { prisma } from "@/util/server/prisma/prisma";
import { PatchProduct, PostProduct } from "./interface";

export const findManyProducts = async () => {
  try {
    return await prisma.product.findMany();
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

export const findFirstProductByUid = async (uid: string) => {
  try {
    return await prisma.product.findFirst({ where: { uid } });
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

export const createProduct = async (payload: PostProduct) => {
  try {
    return prisma.product.create({
      data: payload,
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

export const updateProductByUid = async (
  uid: string,
  payload: PatchProduct
) => {
  try {
    return await prisma.product.update({
      where: { uid },
      data: payload,
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

export const deleteProductByUid = async (uid: string) => {
  try {
    return await prisma.product.delete({ where: { uid } });
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
