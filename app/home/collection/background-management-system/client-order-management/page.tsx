"use client";
import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import _ from "lodash";

import ManagementTable from "@/app/component/table/client-order-management/managementTable";
import { TableMetadata } from "@/app/component/table/client-order-management/interface";
import ClientForm from "@/app/component/form/client-order-management/clientForm";
import {
  Client,
  Order,
  Product,
} from "@/app/api/background-management-system/interface";
import { toLocaleDate, toLocaleDateTime } from "@/util/time";
import {
  useClients,
  useOrders,
  useProducts,
} from "@/app/component/table/client-order-management/hook";
import ProductForm from "@/app/component/form/client-order-management/productForm";
import OrderForm from "@/app/component/form/client-order-management/orderForm";

const clientMetadata: TableMetadata<Client>[] = [
  { key: "name", label: "姓名", width: "120px" },
  { key: "phone", label: "連絡電話", width: "140px" },
  {
    key: "birth",
    label: "出生日期",
    preProcess: (d) => toLocaleDate(d.birth),
    width: "140px",
  },
  { key: "address", label: "地址" },
  { key: "email", label: "E-mail" },
  { key: "note", label: "備註" },
  {
    key: "createdAt",
    label: "建立時間",
    preProcess: (d) => toLocaleDateTime(d.createdAt),
    width: "180px",
  },
  {
    key: "updatedAt",
    label: "更新時間",
    preProcess: (d) => toLocaleDateTime(d.updatedAt),
    width: "180px",
  },
];

const productMetadata: TableMetadata<Product>[] = [
  { key: "name", label: "名稱", width: "150px" },
  { key: "price", label: "售價", width: "150px" },
  { key: "note", label: "備註" },
  {
    key: "createdAt",
    label: "建立時間",
    preProcess: (d) => toLocaleDateTime(d.createdAt),
    width: "180px",
  },
  {
    key: "updatedAt",
    label: "更新時間",
    preProcess: (d) => toLocaleDateTime(d.updatedAt),
    width: "180px",
  },
];

const orderMetadata: TableMetadata<Order>[] = [
  {
    key: "client.name",
    label: "客戶姓名",
    preProcess: (d) => _.get(d, "client.name"),
    width: "150px",
  },
  {
    key: "date",
    label: "訂單日期",
    preProcess: (d) => toLocaleDate(d.date),
    width: "140px",
  },
  { key: "note", label: "備註" },
  {
    key: "createdAt",
    label: "建立時間",
    preProcess: (d) => toLocaleDateTime(d.createdAt),
    width: "180px",
  },
  {
    key: "updatedAt",
    label: "更新時間",
    preProcess: (d) => toLocaleDateTime(d.updatedAt),
    width: "180px",
  },
];

const Page = () => {
  const {
    data: clients,
    fetcher: fetchClients,
    loading: loadingClients,
  } = useClients();
  const {
    data: products,
    fetcher: fetchProducts,
    loading: loadingProducts,
  } = useProducts();
  const {
    data: orders,
    fetcher: fetchOrders,
    loading: loadingOrders,
  } = useOrders();

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
          {loadingClients ? (
            <CircularProgress />
          ) : (
            <ManagementTable
              title="客戶管理"
              metadata={clientMetadata}
              datas={clients}
              Form={ClientForm}
              afterAction={fetchClients}
            />
          )}
        </Box>
        <Divider />
        <Typography variant="subtitle1">產品管理表格</Typography>
        <Box border="1px solid" padding="12px">
          {loadingProducts ? (
            <CircularProgress />
          ) : (
            <ManagementTable
              title="產品管理"
              metadata={productMetadata}
              datas={products}
              afterAction={fetchProducts}
              Form={ProductForm}
            />
          )}
        </Box>
        <Divider />
        <Typography variant="subtitle1">訂單管理表格</Typography>
        <Box border="1px solid" padding="12px">
          {loadingOrders ? (
            <CircularProgress />
          ) : (
            <ManagementTable
              title="訂單管理"
              metadata={orderMetadata}
              datas={orders}
              afterAction={fetchOrders}
              Form={OrderForm}
            />
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default Page;
