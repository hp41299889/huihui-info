import { ReduxState } from "@/util/lib/redux/store";

export const selectAppFeedbackSnackbar = (state: ReduxState) => {
  return state.app.feedback.snackbar;
};
