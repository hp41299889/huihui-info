import {
  PatchClient,
  PostClient,
} from "@/app/api/background-management-system/client-order-management/client/interface";
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

export const patchProduct = async (id: string, payload: PatchProduct) => {
  return nextApi.patch(`${apiUrl}/product/${id}`, payload);
};

export const deleteProduct = async (id: string) => {
  return nextApi.delete(`${apiUrl}/product/${id}`);
};

// order
export const getOrders = async () => {
  return nextApi.get(`${apiUrl}/order`);
};

export const postOrder = async () => {
  return nextApi.post(`${apiUrl}/order`);
};

export const patchOrder = async () => {
  return nextApi.patch(`${apiUrl}/order`);
};

export const deleteOrder = async () => {
  return nextApi.delete(`${apiUrl}/order`);
};
