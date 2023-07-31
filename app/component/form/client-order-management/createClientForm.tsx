"use client";
import { FC } from "react";
import { Box, Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Grid from "@mui/material/Unstable_Grid2";
import { useForm, Controller } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { PostClient } from "@/app/api/background-management-system/client-order-management/client/interface";
import { postClient } from "@/util/client/api/background-management-system/client-order-management";
import { useDispatch } from "@/util/lib/redux/store";
import { setAppFeedbackSnackbar } from "@/util/lib/redux/slice/app/slice";

interface FomData extends Omit<PostClient, "birth"> {
  birth: Dayjs;
}

const CreateClientForm: FC = () => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FomData>({
    defaultValues: {
      birth: dayjs(),
    },
  });

  const onSubmit = async (formData: FomData) => {
    const payload: PostClient = {
      ...formData,
      birth: formData.birth.toISOString(),
    };
    try {
      const response = await postClient(payload);
      if (response.data.status === "success") {
        reset();
        dispatch(
          setAppFeedbackSnackbar({
            open: true,
            type: "success",
            message: "新增客戶成功！",
          })
        );
      }
    } catch (err) {
      dispatch(
        setAppFeedbackSnackbar({
          open: true,
          type: "error",
          message: "新增客戶失敗！",
        })
      );
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
            render={({ field: { onChange, value }, formState: { errors } }) => (
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
          <TextField id="note" label="備註" fullWidth {...register("note")} />
        </Grid>
        <Grid lg={1} lgOffset={11}>
          <Button variant="contained" type="submit">
            送出
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateClientForm;
