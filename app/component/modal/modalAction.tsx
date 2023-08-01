import {
  Button,
  Checkbox,
  Container,
  DialogActions,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Stack,
} from "@mui/material";
import { FC } from "react";
import { Controller, Control } from "react-hook-form";

import { FormType } from "@/app/component/form/client-order-management/interface";

interface Props {
  type: FormType;
  control: Control<any>;
  onClose: () => void;
}

const ModalAction: FC<Props> = (props: Props) => {
  const { type, control, onClose } = props;
  return (
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
  );
};

export default ModalAction;