import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

export const prisma = new PrismaClient();

export type OrderCreateInput = Prisma.OrderCreateInput;
