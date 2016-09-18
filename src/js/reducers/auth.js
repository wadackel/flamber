import { handleActions } from "redux-actions";
import * as App from "../actions/application";
import * as Auth from "../actions/auth";

const initialState = {
  isFetching: false,
  authenticated: false,
  hasJwtToken: false,
  user: null
};

export default handleActions({
  // Create app
  [App.CREATE_APP_SUCCESS]: (state, { payload }) => ({
    ...state,
    authenticated: true,
    user: payload.user
  }),

  // Sign in
  [Auth.SIGN_IN_REQUEST]: state => ({
    ...state,
    isFetching: true
  }),

  [Auth.SIGN_IN_SUCCESS]: (state, { payload }) => ({
    ...state,
    isFetching: false,
    authenticated: true,
    hasJwtToken: true,
    user: payload
  }),

  [Auth.SIGN_IN_FAILURE]: (state, { payload }) => ({
    ...state,
    isFetching: false,
    authenticated: false,
    error: payload
  }),


  // Sign out
  [Auth.SIGN_OUT_REQUEST]: state => ({
    ...state,
    isFetching: true
  }),

  [Auth.SIGN_OUT_SUCCESS]: state => ({
    ...state,
    isFetching: false,
    authenticated: false,
    hasJwtToken: false,
    user: null
  }),

  [Auth.SIGN_OUT_FAILURE]: (state, { payload }) => ({
    ...state,
    isFetching: false,
    error: payload
  }),


  // Fetch
  [Auth.FETCH_CURRENT_USER_REQUEST]: state => ({
    ...state,
    isFetching: true
  }),

  [Auth.FETCH_CURRENT_USER_SUCCESS]: (state, { payload }) => ({
    ...state,
    user: payload,
    authenticated: true,
    hasJwtToken: true,
    isFetching: false
  }),

  [Auth.FETCH_CURRENT_USER_FAILURE]: (state, { payload }) => ({
    ...state,
    authenticated: false,
    isFetching: false,
    error: payload
  })
}, initialState);
