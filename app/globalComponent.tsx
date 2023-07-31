"use client";
import { ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";

import { useDispatch, useSelector } from "@/util/lib/redux/store";
import { selectAppFeedbackSnackbar } from "@/util/lib/redux/slice/app/selector";
import { setAppFeedbackSnackbar } from "@/util/lib/redux/slice/app/slice";

const GlobalComponent = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const snackbar = useSelector(selectAppFeedbackSnackbar);

  return (
    <>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() =>
          dispatch(
            setAppFeedbackSnackbar({ open: false, type: "error", message: "" })
          )
        }
      >
        <Alert
          onClose={() =>
            dispatch(
              setAppFeedbackSnackbar({
                open: false,
                type: "error",
                message: "",
              })
            )
          }
          severity={snackbar.type}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default GlobalComponent;
