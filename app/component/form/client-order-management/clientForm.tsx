import { FC, useEffect } from "react";
import {
  Dialog,
  Box,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Alert,
  AlertTitle,
  Stack,
  Container,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  FormControl,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import dayjs, { Dayjs } from "dayjs";

import { useForm, Controller } from "react-hook-form";
import {
  PatchClient,
  PostClient,
} from "@/app/api/background-management-system/client-order-management/client/interface";
import { DatePicker } from "@mui/x-date-pickers";
import { useDispatch } from "@/util/lib/redux/store";
import {
  deleteClient,
  patchClient,
  postClient,
} from "@/util/client/api/background-management-system/client-order-management";

import { setAppFeedbackSnackbar } from "@/util/lib/redux/slice/app/slice";
import { Client } from "@/app/home/collection/background-management-system/client-order-management/interface";

export type FormType = "create" | "edit" | "delete";

interface Props {
  open: boolean;
  type: FormType;
  client: Client | undefined;
  onClose: () => void;
  afterAction: () => Promise<void>;
}

interface FomData extends Omit<PostClient, "birth"> {
  birth: Dayjs;
  confirm: boolean;
}

const ClientForm: FC<Props> = (props: Props) => {
  const { open, type, client, onClose, afterAction } = props;
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FomData>({
    defaultValues: {
      birth: dayjs(),
      confirm: false,
    },
  });

  const onSubmit = async (formData: FomData) => {
    switch (type) {
      case "create": {
        setValue("confirm", true);
        const payload: PostClient = {
          ...formData,
          birth: formData.birth.toISOString(),
        };
        try {
          const res = await postClient(payload);
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
        const payload: PatchClient = {
          ...formData,
          birth: formData.birth.toISOString(),
        };
        try {
          const res = await patchClient(client?.id!, payload);
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
          const res = await deleteClient(client?.id!);
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
      email: client?.email,
      name: client?.name,
      phone: client?.phone,
      address: client?.address,
      note: client?.note,
      birth: dayjs(client?.birth),
    });
  }, [client, reset]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {type === "create" && "新增"}
        {type === "edit" && "編輯"}
        {type === "delete" && "刪除"}
        客戶表單
      </DialogTitle>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {type === "delete" ? (
            <>
              <Alert severity="error">
                <AlertTitle>警告！</AlertTitle>
                此動作確認後無法反悔
              </Alert>
            </>
          ) : (
            <Grid container spacing={2}>
              <Grid lg={4}>
                <TextField
                  id="name"
                  label="姓名"
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
                  {...register("note")}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Stack direction="row" justifyContent="space-between">
            <Container>
              {type === "delete" && (
                <Controller
                  name="confirm"
                  control={control}
                  defaultValue={false}
                  rules={{ required: true }}
                  render={({ field, formState: { errors } }) => (
                    <FormControl error={Boolean(errors.confirm)}>
                      <FormControlLabel
                        control={<Checkbox {...field} checked={field.value} />}
                        label="我已經確認，想要刪除這筆資料"
                      />
                      {errors.confirm && (
                        <FormHelperText>必須完成重複確認</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              )}
            </Container>
            <Stack direction="row" spacing={1}>
              <Button variant="contained" type="submit">
                確認
              </Button>
              <Button variant="contained" onClick={onClose}>
                取消
              </Button>
            </Stack>
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ClientForm;
