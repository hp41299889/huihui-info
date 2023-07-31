import { FC, useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  IconButton,
  Stack,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";

import { toLocaleDateTime } from "@/util/time";
import { Client } from "@/app/home/collection/background-management-system/client-order-management/interface";
import { Add, Delete, Edit } from "@mui/icons-material";
import ClientForm, {
  FormType,
} from "@/app/component/form/client-order-management/clientForm";
import { useClients } from "./clientHook";

const ClientTable: FC = () => {
  const { clients, fetchClients } = useClients();
  const [client, setClient] = useState<Client>();
  const [formType, setFormType] = useState<FormType>("create");
  const [formModal, setFormModal] = useState<boolean>(false);

  const onClickNewClient = () => {
    setFormType("create");
    setClient(undefined);
    setFormModal(true);
  };

  const onClickEditClient = (client: Client) => {
    setFormType("edit");
    setClient(client);
    setFormModal(true);
  };

  const onClickDeleteClient = (client: Client) => {
    setFormType("delete");
    setClient(client);
    setFormModal(true);
  };

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Typography>客戶管理</Typography>
        <Stack direction="row">
          <Tooltip title="新增">
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => onClickNewClient()}
            >
              新增
            </Button>
          </Tooltip>
        </Stack>
      </Stack>
      <TableContainer>
        <Table size="small">
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
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((c, i) => (
              <TableRow key={c.id}>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.phone}</TableCell>
                <TableCell>{toLocaleDateTime(c.birth)}</TableCell>
                <TableCell>{c.address}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.note}</TableCell>
                <TableCell>{toLocaleDateTime(c.createdAt)}</TableCell>
                <TableCell>{toLocaleDateTime(c.updatedAt)}</TableCell>
                <TableCell>
                  <Stack direction="row">
                    <Tooltip title="編輯">
                      <IconButton onClick={() => onClickEditClient(c)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="刪除">
                      <IconButton onClick={() => onClickDeleteClient(c)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ClientForm
        open={formModal}
        type={formType}
        client={client}
        onClose={() => setFormModal(false)}
        afterAction={fetchClients}
      />
    </Box>
  );
};

export default ClientTable;
