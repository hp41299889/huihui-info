import { sign } from "jsonwebtoken";

import { authConfig } from "@/util/config/config";

export const generateToken = (username: string) => {
  return sign({ username }, authConfig.jwtSecret, { expiresIn: "1h" });
};
