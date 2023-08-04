"use client";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FC } from "react";
import _ from "lodash";

import ManagementTable from "@/app/component/table/client-order-management/managementTable";
import {
  useClients,
  useOrders,
  useProducts,
} from "@/app/component/table/client-order-management/hook";
import ClientForm from "@/app/component/form/client-order-management/clientForm";
import { toLocaleDate, toLocaleDateTime } from "@/util/time";
import { TableMetadata } from "@/app/component/table/client-order-management/interface";
import ProductForm from "@/app/component/form/client-order-management/productForm";
import OrderForm from "@/app/component/form/client-order-management/orderForm";
import { Client, Order, Product } from "./interface";

const clientMetadata: TableMetadata[] = [
  { key: "name", label: "姓名" },
  { key: "phone", label: "連絡電話" },
  {
    key: "birth",
    label: "出生日期",
    preDisplay: (c: Client) => toLocaleDate(c.birth),
  },
  { key: "address", label: "地址" },
  { key: "email", label: "E-mail" },
  { key: "note", label: "備註" },
  {
    key: "createdAt",
    label: "建立時間",
    preDisplay: (c: Client) => toLocaleDateTime(c.createdAt),
  },
  {
    key: "updatedAt",
    label: "更新時間",
    preDisplay: (c: Client) => toLocaleDateTime(c.updatedAt),
  },
];

const productMetadata: TableMetadata[] = [
  { key: "name", label: "名稱" },
  { key: "price", label: "售價" },
  { key: "note", label: "備註" },
  {
    key: "createdAt",
    label: "建立時間",
    preDisplay: (p: Product) => toLocaleDateTime(p.createdAt),
  },
  {
    key: "updatedAt",
    label: "更新時間",
    preDisplay: (p: Product) => toLocaleDateTime(p.updatedAt),
  },
];

const orderMetadata: TableMetadata[] = [
  {
    key: "client.name",
    label: "客戶姓名",
    preDisplay: (o) => _.get(o, "client.name"),
  },
  {
    key: "date",
    label: "訂單日期",
    preDisplay: (o: Order) => toLocaleDate(o.date),
  },
  { key: "note", label: "備註" },
  {
    key: "createdAt",
    label: "建立時間",
    preDisplay: (o: Order) => toLocaleDateTime(o.createdAt),
  },
  {
    key: "updatedAt",
    label: "更新時間",
    preDisplay: (o: Order) => toLocaleDateTime(o.updatedAt),
  },
];

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
        <Typography variant="subtitle1">客戶管理表格</Typography>
        <Box border="1px solid" padding="12px">
          <ManagementTable
            title="客戶管理"
            metadata={clientMetadata}
            useData={useClients}
            Form={ClientForm}
          />
        </Box>
        <Divider />
        <Typography variant="subtitle1">產品管理表格</Typography>
        <Box border="1px solid" padding="12px">
          <ManagementTable
            title="產品管理"
            metadata={productMetadata}
            useData={useProducts}
            Form={ProductForm}
          />
        </Box>
        <Divider />
        <Typography variant="subtitle1">訂單管理表格</Typography>
        <Box border="1px solid" padding="12px">
          <ManagementTable
            title="訂單管理"
            metadata={orderMetadata}
            useData={useOrders}
            Form={OrderForm}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default Page;
