import { FC, useEffect } from "react";
import {
  Dialog,
  Box,
  TextField,
  DialogTitle,
  DialogContent,
  Alert,
  AlertTitle,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useForm, Controller } from "react-hook-form";

import {
  PatchClient,
  PostClient,
} from "@/app/api/background-management-system/client-order-management/client/interface";
import { useDispatch } from "@/util/lib/redux/store";
import {
  deleteClient,
  patchClient,
  postClient,
} from "@/util/client/api/background-management-system/client-order-management";
import { setAppFeedbackSnackbar } from "@/util/lib/redux/slice/app/slice";
import { FormProps } from "./interface";
import ModalAction from "@/app/component/modal/modalAction";
import { Client } from "@/app/home/collection/background-management-system/client-order-management/interface";

interface FormData extends Omit<PostClient, "birth"> {
  birth: Dayjs;
  confirm: boolean;
}

interface Props extends FormProps {
  data: Client | null;
}

const ClientForm: FC<Props> = (props: Props) => {
  const { open, type, data, onClose, afterAction } = props;
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      birth: dayjs(),
      confirm: false,
    },
  });

  const onSubmit = async (formData: FormData) => {
    const { name, phone, birth, address, email, note } = formData;
    switch (type) {
      case "create": {
        setValue("confirm", true);
        const p: PostClient = {
          name,
          phone,
          address,
          email,
          note,
          birth: birth.toISOString(),
        };
        try {
          const res = await postClient(p);
          if (res.data.status === "success") {
            onClose();
            dispatch(
              setAppFeedbackSnackbar({
                open: true,
                type: "success",
                message: "新增客戶成功！",
              })
            );
            afterAction();
          }
        } catch (err) {
          dispatch(
            setAppFeedbackSnackbar({
              open: true,
              type: "error",
              message: "新增客戶失敗！",
            })
          );
          console.error(err);
        }
        break;
      }
      case "edit": {
        setValue("confirm", true);
        const p: PatchClient = {
          name,
          phone,
          address,
          email,
          note,
          birth: birth.toISOString(),
        };
        try {
          const res = await patchClient(data?.id!, p);
          if (res.data.status === "success") {
            onClose();
            dispatch(
              setAppFeedbackSnackbar({
                open: true,
                type: "success",
                message: "編輯客戶成功！",
              })
            );
            afterAction();
          }
        } catch (err) {
          dispatch(
            setAppFeedbackSnackbar({
              open: true,
              type: "error",
              message: "編輯客戶失敗！",
            })
          );
          console.error(err);
        }
        break;
      }
      case "delete": {
        try {
          const res = await deleteClient(data?.id!);
          if (res.data.status === "success") {
            onClose();
            dispatch(
              setAppFeedbackSnackbar({
                open: true,
                type: "success",
                message: "刪除客戶成功！",
              })
            );
            afterAction();
          }
        } catch (err) {
          dispatch(
            setAppFeedbackSnackbar({
              open: true,
              type: "error",
              message: "刪除客戶失敗！",
            })
          );
          console.error(err);
        }
        break;
      }
    }
  };

  useEffect(() => {
    reset({
      ...data,
      birth: dayjs(data?.birth),
    });
  }, [data, reset]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {type === "create" && "新增"}
        {type === "edit" && "編輯"}
        {type === "delete" && "刪除"}
        客戶表單
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
                <TextField
                  id="name"
                  label="姓名"
                  disabled={type === "watch"}
                  fullWidth
                  {...register("name", { required: true })}
                  error={Boolean(errors.name)}
                  helperText={errors.name && "姓名為必填"}
                />
              </Grid>
              <Grid lg={4}>
                <TextField
                  id="phone"
                  label="連絡電話"
                  disabled={type === "watch"}
                  fullWidth
                  {...register("phone", { required: true })}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone && "連絡電話為必填"}
                />
              </Grid>
              <Grid lg={4}>
                <Controller
                  control={control}
                  name="birth"
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    formState: { errors },
                  }) => (
                    <DatePicker
                      label="出生日期"
                      value={value}
                      onChange={onChange}
                      disabled={type === "watch"}
                      format="YYYY/MM/DD"
                      slotProps={{
                        textField: {
                          id: "birth",
                          error: Boolean(errors.birth),
                          helperText: <>{errors.birth && "出生日期為必填"}</>,
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid lg={5}>
                <TextField
                  id="address"
                  label="地址"
                  fullWidth
                  disabled={type === "watch"}
                  {...register("address", { required: true })}
                  error={Boolean(errors.address)}
                  helperText={errors.address && "地址為必填"}
                />
              </Grid>
              <Grid lg={5}>
                <TextField
                  id="email"
                  label="E-mail"
                  fullWidth
                  disabled={type === "watch"}
                  {...register("email", { required: true })}
                  error={Boolean(errors.email)}
                  helperText={errors.email && "E-mail為必填"}
                />
              </Grid>
              <Grid lg={10}>
                <TextField
                  id="note"
                  label="備註"
                  fullWidth
                  disabled={type === "watch"}
                  {...register("note")}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <Divider />
        <ModalAction type={type} control={control} onClose={onClose} />
      </Box>
    </Dialog>
  );
};

export default ClientForm;
