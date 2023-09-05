import { hashSync } from "bcrypt";

import { prisma } from "@/util/server/prisma/prisma";
import { PostRegister } from "./interface";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { databaseError } from "@/util/server/error";

export const createUser = async (payload: PostRegister) => {
  try {
    const user = await prisma.user.create({
      data: {
        ...payload,
        password: hashSync(payload.password, 10),
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
    return user;
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      switch (err.code) {
        case "P2002":
          throw databaseError("email is already exist");
        default:
          throw databaseError(err.message);
      }
    } else {
      throw err;
    }
  }
};
