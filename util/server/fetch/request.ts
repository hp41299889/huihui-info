import axios, { AxiosInstance } from "axios";

import { serverConfig } from "@/util/config/config";

const request = (baseURL = ""): AxiosInstance => {
  const instance = axios.create({
    baseURL,
  });
  return instance;
};

export const serverApi = request(serverConfig.baseUrl);
