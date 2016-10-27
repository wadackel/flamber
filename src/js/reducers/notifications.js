// @flow
import { handleActions } from "redux-actions";
import * as Notifications from "../actions/notifications";

import type {
  NotificationState,
  ShowNotifyAction
} from "../types/notification";


const initialState: NotificationState = {
  message: "",
  action: null
};

export default handleActions({
  [Notifications.SHOW_NOTIFY]: (state: NotificationState, action: ShowNotifyAction): NotificationState => ({
    ...state,
    message: action.payload.text,
    action: action.payload.action
  }),

  [Notifications.HIDE_NOTIFY]: (state: NotificationState): NotificationState => ({
    ...state,
    message: "",
    action: null
  })
}, initialState);
