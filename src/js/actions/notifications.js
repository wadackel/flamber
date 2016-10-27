// @flow
import type {
  StoreNotifyAction,
  ShowNotifyAction,
  HideNotifyAction,
  NotifyAction
} from "../types/notification";


export const SHOW_NOTIFY = "SHOW_NOTIFY";
export const showNotify = (text: string, action?: StoreNotifyAction): ShowNotifyAction => (
  { type: SHOW_NOTIFY, payload: { text, action } }
);

export const HIDE_NOTIFY = "HIDE_NOTIFY";
export const hideNotify = (): HideNotifyAction => ({ type: HIDE_NOTIFY });

export const NOTIFY_ACTION = "NOTIFY_ACTION";
export const notifyAction = (): NotifyAction => ({ type: NOTIFY_ACTION });
