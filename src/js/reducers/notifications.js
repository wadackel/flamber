import { handleActions } from "redux-actions";
import * as Notifications from "../actions/notifications";

const initialState = {
  message: null,
  action: null // type, text
};

export default handleActions({
  [Notifications.SHOW_NOTIFY]: (state, { payload, meta }) => ({
    ...state,
    message: payload,
    action: meta
  }),

  [Notifications.HIDE_NOTIFY]: state => ({
    ...state,
    message: "",
    action: null
  })
}, initialState);
