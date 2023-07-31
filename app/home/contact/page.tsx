"use client";
import {
  Box,
  Button,
  FormLabel,
  TextField,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

import { postContact } from "@/util/client/api";
import { PostContact } from "@/app/api/contact/interface";

const Page: FC = () => {
  const [snackbar, setSnackbar] = useState<boolean>(false);
  const [snackbarType, setSnackbarType] = useState<AlertColor>("error");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostContact>();

  const onSubmit = async (formData: PostContact) => {
    try {
      const response = await postContact(formData);
      if (response.data.status === "success") {
        reset();
        setSnackbarType("success");
      }
    } catch (err) {
      setSnackbarType("error");
    }
    setSnackbar(true);
  };

  return (
    <Box
      id="postContactForm"
      display="flex"
      justifyContent="center"
      component="form"
      paddingTop="60px"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={2} rowGap={2} gap={3}>
        <Grid lg={12}>
          <FormLabel>聯絡諮詢</FormLabel>
        </Grid>
        <Grid lg={5}>
          <TextField
            id="name"
            label="姓名"
            {...register("name", { required: true })}
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name && "姓名為必填"}
          />
        </Grid>
        <Grid lg={5} lgOffset={1}>
          <TextField
            id="email"
            label="E-mail"
            {...register("email", { required: true })}
            fullWidth
            error={Boolean(errors.email)}
            helperText={errors.email && "E-mail為必填"}
          />
        </Grid>
        <Grid lg={5}>
          <TextField
            id="phone"
            label="連絡電話"
            {...register("phone", { required: true })}
            fullWidth
            error={Boolean(errors.phone)}
            helperText={errors.phone && "連絡電話為必填"}
          />
        </Grid>
        <Grid lg={5} lgOffset={1}>
          <TextField
            id="company"
            label="公司名稱"
            fullWidth
            {...register("company")}
          />
        </Grid>
        <Grid lg={12}>
          <TextField
            id="message"
            label="需求說明"
            minRows={8}
            multiline
            fullWidth
            {...register("message", { required: true })}
            error={Boolean(errors.message)}
            helperText={errors.message && "需求說明為必填"}
          />
        </Grid>
        <Grid lg={1} lgOffset={5} display="flex" justifyContent="center">
          <Button variant="contained" type="submit">
            送出
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setSnackbar(false)}
      >
        <Alert
          onClose={() => setSnackbar(false)}
          severity={snackbarType}
          sx={{ width: "100%" }}
        >
          {snackbarType === "success"
            ? "送出成功！請留意E-mail回信"
            : "送出失敗！"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Page;
