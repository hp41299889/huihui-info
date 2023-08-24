import { ReduxState } from "../../store";

export const selectAppFeedbackSnackbar = (state: ReduxState) => {
  return state.app.feedback.snackbar;
};
