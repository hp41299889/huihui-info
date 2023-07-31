"use client";
import { FC } from "react";
import {
  FormControl,
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { useDispatch } from "@/util/lib/redux/store";
import { loginThunk } from "@/util/lib/redux/slice/auth/thnuk";
import { PostLogin } from "@/app/api/login/interface";

interface Props {
  onSwitchToRegister: () => void;
}

const LoginForm: FC<Props> = (props: Props) => {
  const { onSwitchToRegister } = props;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostLogin>();
  const onSubmit = async (formData: PostLogin) => {
    dispatch(loginThunk(formData));
  };

  return (
    <FormControl component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Typography>登入</Typography>
        <TextField id="username" label="帳號" {...register("username")} />
        <TextField id="password" label="密碼" {...register("password")} />
        <Button onClick={onSwitchToRegister}>沒有帳號嗎？註冊一個</Button>
        <Button variant="contained" type="submit">
          登入
        </Button>
      </Stack>
    </FormControl>
  );
};

export default LoginForm;
