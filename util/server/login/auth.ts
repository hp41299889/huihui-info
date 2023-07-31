import { authConfig } from "@/util/config/config";

const { username, password } = authConfig;

export const auth = async (u: string, p: string) => {
  return (await checkUsername(u)) && (await checkPassword(p));
};

const checkUsername = async (u: string) => {
  return u === username;
};

const checkPassword = async (p: string) => {
  return p === password;
};
