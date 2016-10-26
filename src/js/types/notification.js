// @flow
import type { Action, PayloadAction } from "./action";

export type ShowNotifyPayload = PayloadAction<string, any>;
export type ShowNotifyAction = PayloadAction<"SHOW_NOTIFY", string>;
export type HideNotifyAction = Action<"HIDE_NOTIFY">;
export type NotifyAction = Action<"NOTIFY_ACTION">;

export type NotificationState = {
  message: ?string;
  action: ?ShowNotifyPayload;
};
