// @flow
import { identity } from "lodash";
import { createAction } from "redux-actions";

export const SHOW_NOTIFY: string = "SHOW_NOTIFY";
export const showNotify = createAction(SHOW_NOTIFY, identity, (payload: Object, action: any) => action);

export const HIDE_NOTIFY: string = "HIDE_NOTIFY";
export const hideNotify = createAction(HIDE_NOTIFY);

export const NOTIFY_ACTION: string = "NOTIFY_ACTION";
export const notifyAction = createAction(NOTIFY_ACTION);
