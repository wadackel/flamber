import { createAction } from "redux-actions";

export const SHOW_ERROR = "SHOW_ERROR";
export const HIDE_ERROR = "HIDE_ERROR";

export const showError = createAction(SHOW_ERROR);
export const hideError = createAction(HIDE_ERROR);
