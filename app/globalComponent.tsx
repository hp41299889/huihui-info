"use client";
import { ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";

import { useDispatch, useSelector } from "@/util/client/redux";
import { selectAppFeedbackSnackbar } from "@/util/client/redux/slice/app";
import { setAppFeedbackSnackbar } from "@/util/client/redux/slice/app";

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
