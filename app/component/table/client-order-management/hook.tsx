import { useCallback, useState, useEffect } from "react";

import {
  Client,
  Product,
  Order,
} from "@/app/api/background-management-system/interface";
import {
  getClients,
  getProducts,
  getOrders,
} from "@/util/client/api/background-management-system/client-order-management";
import { TableHook } from "./interface";

export const useClients: TableHook<Client> = () => {
  const [data, setData] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetcher = useCallback(async () => {
    setLoading(true);
    const res = await getClients();
    if (res.data.status === "success") {
      setData(res.data.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  return { data, fetcher, loading };
};

export const useProducts: TableHook<Product> = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetcher = useCallback(async () => {
    setLoading(true);
    const res = await getProducts();
    if (res.data.status === "success") {
      setData(res.data.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  return { data, fetcher, loading };
};

export const useOrders: TableHook<Order> = () => {
  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetcher = useCallback(async () => {
    setLoading(true);
    const res = await getOrders();
    if (res.data.status === "success") {
      setData(res.data.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  return { data, fetcher, loading };
};
