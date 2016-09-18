import { handleActions } from "redux-actions";
import * as App from "../actions/application";

const initialState = {
  isCreating: false,
  isDeleting: false,
  error: null
};

export default handleActions({
  // Create
  [App.CREATE_APP_REQUEST]: state => ({
    ...state,
    isCreating: true
  }),

  [App.CREATE_APP_SUCCESS]: state => ({
    ...state,
    isCreating: false,
    error: null
  }),

  [App.CREATE_APP_FAILURE]: (state, { payload }) => ({
    ...state,
    isCreating: false,
    error: payload
  }),


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
