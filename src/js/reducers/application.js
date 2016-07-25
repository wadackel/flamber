import { handleActions } from "redux-actions";
import * as App from "../actions/application";

const initialState = {
  isDeleting: false
};

export default handleActions({

  // TODO: Delete all application data
  [App.DELETE_APP_REQUEST]: state => ({
    ...state,
    isDeleting: true
  }),

  [App.DELETE_APP_SUCCESS]: state => ({
    ...state,
    isDeleting: false
  }),

  [App.DELETE_APP_FAILURE]: state => ({
    ...state,
    isDeleting: false
  })
}, initialState);
