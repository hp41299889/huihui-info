import { PostClient } from "@/app/api/background-management-system/client-order-management/client/interface";
import { nextApi } from "@/util/client/api/request";

const apiUrl = "/background-management-system/client-order-management/client";

export const getClients = async () => {
  return nextApi.get(apiUrl);
};

export const postClient = async (payload: PostClient) => {
  return nextApi.post(apiUrl, payload);
};

export const patchClient = async () => {};

export const deleteClient = async () => {};
