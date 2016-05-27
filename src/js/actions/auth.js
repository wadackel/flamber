import { createAction } from "redux-actions";

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_COMPLETE = "AUTH_COMPLETE";
export const AUTH_ERROR = "AUTH_ERROR";

export const authRequest = createAction(AUTH_REQUEST);
export const authComplete = createAction(AUTH_COMPLETE);
export const authError = createAction(AUTH_ERROR);
