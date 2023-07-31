import axios, { AxiosInstance } from "axios";

import { authConfig } from "@/util/config/config";

const request = (baseURL = ""): AxiosInstance => {
  const instance = axios.create({
    baseURL,
  });
  return instance;
};

export const authApi = request(authConfig.baseUrl);
export const nextApi = request("/api");
