import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { databaseError } from "@/util/server/error";
import { prisma } from "@/util/server/prisma/prisma";
import { PatchClient, PostClient } from "./interface";

export const findManyClients = async () => {
  try {
    return await prisma.client.findMany();
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

export const findFirstClientById = async (id: number) => {
  try {
    return await prisma.client.findFirst({ where: { id } });
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

export const createClient = async (payload: PostClient) => {
  try {
    return prisma.client.create({
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

export const updateClientById = async (id: number, payload: PatchClient) => {
  try {
    return await prisma.client.update({
      where: { id },
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

export const deleteClientById = async (id: number) => {
  try {
    return await prisma.client.delete({ where: { id } });
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
