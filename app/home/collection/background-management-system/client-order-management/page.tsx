"use client";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { FC } from "react";

import CreateClientForm from "@/app/component/form/client-order-management/createClientForm";
import ClientTable from "@/app/component/table/client-order-management/clientTable";

const Page: FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      padding="20px"
      marginRight="84px"
      width="100%"
    >
      <Stack width="100%" spacing={2}>
        <Typography
          display="flex"
          justifyContent="center"
          variant="h4"
          fontWeight={600}
        >
          客戶訂單管理
        </Typography>
        <Typography variant="subtitle1">新增客戶表單</Typography>
        <Box border="1px solid" padding="12px">
          <CreateClientForm />
        </Box>
        <Divider />
        <Typography variant="subtitle1">客戶管理表格</Typography>
        <Box border="1px solid" padding="12px">
          <ClientTable />
        </Box>
      </Stack>
    </Box>
  );
};

export default Page;
