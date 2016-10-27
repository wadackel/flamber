// @flow
import type { Action, PayloadAction } from "./action";

export type StoreNotifyAction = PayloadAction<string, {
  text: string;
  value: any;
}>;
export type ShowNotifyPayload = {
  text: string;
  action: ?StoreNotifyAction;
};
export type ShowNotifyAction = PayloadAction<"SHOW_NOTIFY", ShowNotifyPayload>;
export type HideNotifyAction = Action<"HIDE_NOTIFY">;
export type NotifyAction = Action<"NOTIFY_ACTION">;

export type NotificationState = {
  message: string;
  action: ?StoreNotifyAction;
};
