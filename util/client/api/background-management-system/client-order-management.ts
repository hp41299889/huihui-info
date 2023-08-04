import {
  PatchClient,
  PostClient,
} from "@/app/api/background-management-system/client-order-management/client/interface";
import {
  PatchOrder,
  PostOrder,
} from "@/app/api/background-management-system/client-order-management/order/interface";
import {
  PatchProduct,
  PostProduct,
} from "@/app/api/background-management-system/client-order-management/product/interface";
import { nextApi } from "@/util/client/api/request";

const apiUrl = "/background-management-system/client-order-management";

// client
export const getClients = async () => {
  return nextApi.get(`${apiUrl}/client`);
};

export const postClient = async (payload: PostClient) => {
  return nextApi.post(`${apiUrl}/client`, payload);
};

export const patchClient = async (id: number, payload: PatchClient) => {
  return nextApi.patch(`${apiUrl}/client/${id}`, payload);
};

export const deleteClient = async (id: number) => {
  return nextApi.delete(`${apiUrl}/client/${id}`);
};

// product
export const getProducts = async () => {
  return nextApi.get(`${apiUrl}/product`);
};

export const postProduct = async (payload: PostProduct) => {
  return nextApi.post(`${apiUrl}/product`, payload);
};

export const patchProduct = async (uid: string, payload: PatchProduct) => {
  return nextApi.patch(`${apiUrl}/product/${uid}`, payload);
};

export const deleteProduct = async (uid: string) => {
  return nextApi.delete(`${apiUrl}/product/${uid}`);
};

// order
export const getOrders = async () => {
  return nextApi.get(`${apiUrl}/order`);
};

export const postOrder = async (payload: PostOrder) => {
  return nextApi.post(`${apiUrl}/order`, payload);
};

export const patchOrder = async (uid: string, payload: PatchOrder) => {
  return nextApi.patch(`${apiUrl}/order/${uid}`, payload);
};

export const deleteOrder = async (uid: string) => {
  return nextApi.delete(`${apiUrl}/order/${uid}`);
};
