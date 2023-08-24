"use client";
import {
  FormControl,
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

interface Props {
  onSwitchToLogin: () => void;
}

const RegisterForm = (props: Props) => {
  const { onSwitchToLogin } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async () => {};

  return (
    <FormControl component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Typography>
          註冊
          <Button onClick={onSwitchToLogin}>我有帳號，我要登入</Button>
        </Typography>
        <TextField id="username" label="帳號" {...register("username")} />
        <TextField id="password" label="密碼" {...register("password")} />
        <Button variant="contained" type="submit">
          註冊
        </Button>
      </Stack>
    </FormControl>
  );
};

export default RegisterForm;
