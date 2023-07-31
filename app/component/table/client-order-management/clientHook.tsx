import { useCallback, useState, useEffect } from "react";

import { Client } from "@/app/home/collection/background-management-system/client-order-management/interface";
import { getClients } from "@/util/client/api/background-management-system/client-order-management";

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);

  const fetchClients = useCallback(async () => {
    const res = await getClients();
    if (res.data.status === "success") {
      setClients(res.data.data);
    }
  }, []);
  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  return { clients, fetchClients };
};
