import { FC, useEffect, useState } from "react";
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { DatePicker } from "@mui/x-date-pickers";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";

import ModalAction from "@/app/component/modal/modalAction";
import {
  useClients,
  useProducts,
} from "@/app/component/table/client-order-management/hook";
import {
  Client,
  Order,
  Product,
} from "@/app/home/collection/background-management-system/client-order-management/interface";
import { FormProps } from "./interface";
import {
  PatchOrder,
  PostOrder,
} from "@/app/api/background-management-system/client-order-management/order/interface";
import { Add, RemoveCircle } from "@mui/icons-material";
import {
  deleteOrder,
  patchOrder,
  postOrder,
} from "@/util/client/api/background-management-system/client-order-management";
import { useDispatch } from "@/util/lib/redux/store";
import { setAppFeedbackSnackbar } from "@/util/lib/redux/slice/app/slice";

interface FormData extends Omit<PostOrder, "date"> {
  confirm: boolean;
  client: { name: string };
  date: Dayjs;
}

interface Props extends FormProps {
  data: Order | null;
}

const OrderForm: FC<Props> = (props: Props) => {
  const { open, type, data, onClose, afterAction } = props;
  const dispatch = useDispatch();
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
  const [subTotal, setSubTotal] = useState<number>(0);

  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      confirm: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "orderProducts",
  });

  const onSubmit = async (formData: FormData) => {
    const { clientId, date, note, orderProducts } = formData;
    switch (type) {
      case "create": {
        setValue("confirm", true);
        const p: PostOrder = {
          clientId,
          note,
          orderProducts,
          date: dayjs(date).toISOString(),
        };
        try {
          const res = await postOrder(p);
          if (res.data.status === "success") {
            onClose();
            dispatch(
              setAppFeedbackSnackbar({
                open: true,
                type: "success",
                message: "新增訂單成功！",
              })
            );
          }
          afterAction();
        } catch (err) {
          dispatch(
            setAppFeedbackSnackbar({
              open: true,
              type: "error",
              message: "新增訂單失敗！",
            })
          );
          console.error(err);
        }
        break;
      }
      case "edit": {
        try {
          setValue("confirm", true);
          const p: PatchOrder = {
            clientId,
            note,
            orderProducts,
            date: dayjs(date).toISOString(),
          };
          const res = await patchOrder(data?.uid!, p);
          if (res.data.status === "success") {
            onClose();
            dispatch(
              setAppFeedbackSnackbar({
                open: true,
                type: "success",
                message: "編輯訂單成功！",
              })
            );
            afterAction();
          }
        } catch (err) {
          dispatch(
            setAppFeedbackSnackbar({
              open: true,
              type: "error",
              message: "編輯訂單失敗！",
            })
          );
          console.error(err);
        }
        break;
      }
      case "delete": {
        try {
          const res = await deleteOrder(data?.uid!);
          if (res.data.status === "success") {
            onClose();
            dispatch(
              setAppFeedbackSnackbar({
                open: true,
                type: "success",
                message: "刪除訂單成功！",
              })
            );
            afterAction();
          }
        } catch (err) {
          dispatch(
            setAppFeedbackSnackbar({
              open: true,
              type: "error",
              message: "刪除訂單失敗！",
            })
          );
          console.error(err);
        }
        break;
      }
    }
  };

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const subTotle = fields.reduce((acc, cur) => {
      const target = products.find((p) => p.uid === cur.productUid);
      if (target) {
        const toAdd = target.price * cur.amount;
        acc += toAdd;
      }
      return acc;
    }, 0);
    setSubTotal(subTotle);
  }, [fields, products]);

  useEffect(() => {
    reset({
      ...data,
      date: dayjs(data?.date),
    });
  }, [data, reset]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {type === "create" && "新增"}
        {type === "edit" && "編輯"}
        {type === "delete" && "刪除"}
        訂單表單
      </DialogTitle>
      <Divider />
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {type === "delete" ? (
            <Alert severity="error">
              <AlertTitle>警告！</AlertTitle>
              此動作確認後無法反悔
            </Alert>
          ) : (
            <Grid container spacing={2}>
              <Grid lg={4}>
                <Controller
                  name="clientId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      value={clients.find((c) => c.id === value)}
                      onChange={(_, newVlaue) => {
                        onChange(newVlaue?.id ? newVlaue.id : 0);
                      }}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      options={clients}
                      loading={loadingClients}
                      getOptionLabel={(o: Client) => o.name}
                      renderInput={(params) => (
                        <TextField {...params} label="客戶姓名" />
                      )}
                      fullWidth
                      disabled={type === "watch"}
                    />
                  )}
                />
              </Grid>
              <Grid lg={4}>
                <Controller
                  name="date"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      value={value}
                      format="YYYY/MM/DD"
                      label="訂單日期"
                      onChange={(v) => onChange(v)}
                      disabled={type === "watch"}
                    />
                  )}
                />
              </Grid>
              <Grid lg={10}>
                <TextField
                  id="id"
                  label="備註"
                  fullWidth
                  {...register("note")}
                  disabled={type === "watch"}
                />
              </Grid>
              <Grid lg={12}>
                <Stack direction="row">
                  <Typography>List</Typography>
                  {type !== "watch" && (
                    <Button
                      variant="outlined"
                      startIcon={<Add />}
                      onClick={() => {
                        append({ productUid: "", amount: 0 });
                      }}
                    >
                      Add
                    </Button>
                  )}
                </Stack>
                <List>
                  {fields.map((l, i) => (
                    <ListItem key={l.id}>
                      <Stack direction="row" spacing={2}>
                        <Controller
                          name={`orderProducts.${i}.productUid`}
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <Autocomplete
                              // TODO a props object a key warning
                              value={products.find((p) => p.uid === value)}
                              loading={loadingProducts}
                              onChange={(_, v) => onChange(v?.uid)}
                              options={products}
                              isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                              }
                              getOptionLabel={(o: Product) => o.name}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  key={`p_${l.id}`}
                                  label="產品名稱"
                                />
                              )}
                              fullWidth
                              disabled={type === "watch"}
                            />
                          )}
                        />
                        <TextField
                          id="amount"
                          label="數量"
                          type="number"
                          fullWidth
                          {...register(`orderProducts.${i}.amount`)}
                          disabled={type === "watch"}
                        />
                        <TextField
                          id="note"
                          label="備註"
                          fullWidth
                          {...register(`orderProducts.${i}.note`)}
                          disabled={type === "watch"}
                        />
                      </Stack>
                      {fields.length > 1 && (
                        <IconButton
                          disabled={type === "watch"}
                          onClick={() => remove(i)}
                        >
                          <RemoveCircle />
                        </IconButton>
                      )}
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid lg={3}>小計：{subTotal}</Grid>
            </Grid>
          )}
        </DialogContent>
        <Divider />
        <ModalAction type={type} control={control} onClose={onClose} />
      </Box>
    </Dialog>
  );
};

export default OrderForm;
