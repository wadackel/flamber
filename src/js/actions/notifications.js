import { createAction } from "redux-actions";

export const SHOW_NOTIFY = "SHOW_NOTIFY";
export const showNotify = createAction(SHOW_NOTIFY, null, (payload, action) => action);

export const HIDE_NOTIFY = "HIDE_NOTIFY";
export const hideNotify = createAction(HIDE_NOTIFY);

export const NOTIFY_ACTION = "NOTIFY_ACTION";
export const notifyAction = createAction(NOTIFY_ACTION);
