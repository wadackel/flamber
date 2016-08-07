import { handleActions } from "redux-actions";
import * as Errors from "../actions/errors";

const initialState = {
  hasError: false,
  message: ""
};

export default handleActions({
  [Errors.SHOW_ERROR]: (state, { payload }) => ({
    ...state,
    hasError: true,
    message: payload
  }),

  [Errors.HIDE_ERROR]: state => ({
    ...state,
    hasError: false,
    message: ""
  })
}, initialState);
