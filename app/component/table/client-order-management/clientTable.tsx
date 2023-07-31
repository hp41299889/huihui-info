import { FC, useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

import { getClients } from "@/util/client/api/background-management-system/client-order-management";

const ClientTable: FC = () => {
  const [clients, setClients] = useState<any[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await getClients();
      setClients(res.data.data);
    };
    fetch();
  }, []);
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>姓名</TableCell>
            <TableCell>連絡電話</TableCell>
            <TableCell>出生日期</TableCell>
            <TableCell>地址</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>備註</TableCell>
            <TableCell>建立時間</TableCell>
            <TableCell>更新時間</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((c, i) => (
            <TableRow key={c.id}>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.phone}</TableCell>
              <TableCell>{c.birth.toString()}</TableCell>
              <TableCell>{c.address}</TableCell>
              <TableCell>{c.email}</TableCell>
              <TableCell>{c.note}</TableCell>
              <TableCell>{c.createdAt}</TableCell>
              <TableCell>{c.updatedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClientTable;
