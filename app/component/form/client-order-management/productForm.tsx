import { useEffect } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useForm } from "react-hook-form";

import ModalAction from "@/app/component/modal/modalAction";
import { FormProps } from "./interface";
import {
  Product,
  PatchProduct,
  PostProduct,
} from "@/app/api/background-management-system/interface";
import { deleteProduct, patchProduct, postProduct } from "@/util/client/api";
import { useDispatch } from "@/util/client/redux";
import { setAppFeedbackSnackbar } from "@/util/client/redux/slice/app";

interface FormData extends PostProduct {
  confirm: boolean;
}

const initData: FormData = {
  name: "",
  price: 0,
  note: "",
  confirm: false,
};

interface Props extends FormProps {
  data: Product | null;
}

const ProductForm = (props: Props) => {
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
    defaultValues: initData,
  });

  const onSubmit = async (formData: FormData) => {
    const { name, price, note } = formData;
    switch (type) {
      case "create": {
        setValue("confirm", true);
        try {
          const payload: PostProduct = {
            name,
            price,
            note,
          };
          const res = await postProduct(payload);
          if (res.data.status === "success") {
            onClose();
            dispatch(
              setAppFeedbackSnackbar({
                open: true,
                type: "success",
                message: "新增產品成功！",
              })
            );
            afterAction();
          }
        } catch (err) {
          dispatch(
            setAppFeedbackSnackbar({
              open: true,
              type: "error",
              message: "新增產品失敗！",
            })
          );
          console.error(err);
        }
        break;
      }
      case "edit": {
        setValue("confirm", true);
        try {
          const p: PatchProduct = {
            name,
            price,
            note,
          };
          const res = await patchProduct(data?.uid!, p);
          if (res.data.status === "success") {
            onClose();
            dispatch(
              setAppFeedbackSnackbar({
                open: true,
                type: "success",
                message: "編輯產品成功！",
              })
            );
            afterAction();
          }
        } catch (err) {
          dispatch(
            setAppFeedbackSnackbar({
              open: true,
              type: "error",
              message: "編輯產品失敗！",
            })
          );
          console.error(err);
        }
        break;
      }
      case "delete": {
        try {
          const res = await deleteProduct(data?.uid!);
          if (res.data.status === "success") {
            onClose();
            dispatch(
              setAppFeedbackSnackbar({
                open: true,
                type: "success",
                message: "刪除產品成功！",
              })
            );
            afterAction();
          }
        } catch (err) {
          dispatch(
            setAppFeedbackSnackbar({
              open: true,
              type: "error",
              message: "刪除產品失敗！",
            })
          );
          console.error(err);
        }
        break;
      }
    }
  };

  useEffect(() => {
    data ? reset({ ...data }) : reset(initData);
  }, [data, reset]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {type === "create" && "新增"}
        {type === "edit" && "編輯"}
        {type === "delete" && "刪除"}
        產品表單
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
              <Grid lg={5}>
                <TextField
                  id="name"
                  label="名稱"
                  fullWidth
                  {...register("name", { required: true })}
                  disabled={type === "watch"}
                  error={Boolean(errors.name)}
                  helperText={errors.name && "名稱為必填"}
                />
              </Grid>
              <Grid lg={5}>
                <TextField
                  id="price"
                  label="售價"
                  type="number"
                  fullWidth
                  {...register("price", { required: true })}
                  disabled={type === "watch"}
                  error={Boolean(errors.price)}
                  helperText={errors.price && "售價為必填"}
                />
              </Grid>
              <Grid lg={10}>
                <TextField
                  id="note"
                  label="備註"
                  fullWidth
                  {...register("note")}
                  disabled={type === "watch"}
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

export default ProductForm;
