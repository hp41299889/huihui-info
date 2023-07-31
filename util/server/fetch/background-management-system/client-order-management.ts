import { serverApi } from "@/util/server/fetch/request";

const apiUrl =
  "/api/background-management-system/client-order-management/client";

export const getClients = async () => {
  return serverApi.get(apiUrl);
};
