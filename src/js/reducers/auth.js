// @flow
import { handleActions } from "redux-actions";
import * as App from "../actions/application";
import * as Auth from "../actions/auth";
import * as Items from "../actions/items";
import * as Options from "../actions/options";

import type { AuthState } from "../types/auth";

const initialState: AuthState = {
  isFetching: false,
  authenticated: false,
  hasJwtToken: false,
  user: null
};

export default handleActions({
  // Create app
  [App.CREATE_APP_SUCCESS]: (state: AuthState, { payload }) => ({
    ...state,
    authenticated: true,
    user: payload.user
  }),

  // Sign in
  [Auth.SIGN_IN_REQUEST]: (state: AuthState) => ({
    ...state,
    isFetching: true
  }),

  [Auth.SIGN_IN_SUCCESS]: (state: AuthState, { payload }) => ({
    ...state,
    isFetching: false,
    authenticated: true,
    hasJwtToken: true,
    user: payload
  }),

  [Auth.SIGN_IN_FAILURE]: (state: AuthState, { payload }) => ({
    ...state,
    isFetching: false,
    authenticated: false,
    error: payload
  }),


  // Sign out
  [Auth.SIGN_OUT_REQUEST]: (state: AuthState) => ({
    ...state,
    isFetching: true
  }),

  [Auth.SIGN_OUT_SUCCESS]: (state: AuthState) => ({
    ...state,
    isFetching: false,
    authenticated: false,
    hasJwtToken: false,
    user: null
  }),

  [Auth.SIGN_OUT_FAILURE]: (state: AuthState, { payload }) => ({
    ...state,
    isFetching: false,
    error: payload
  }),


  // Fetch
  [Auth.FETCH_CURRENT_USER_REQUEST]: (state: AuthState) => ({
    ...state,
    isFetching: true
  }),

  [Auth.FETCH_CURRENT_USER_SUCCESS]: (state: AuthState, { payload }) => ({
    ...state,
    user: payload,
    authenticated: true,
    hasJwtToken: true,
    isFetching: false
  }),

  [Auth.FETCH_CURRENT_USER_FAILURE]: (state: AuthState, { payload }) => ({
    ...state,
    authenticated: false,
    isFetching: false,
    error: payload
  }),


  // Profile
  [Options.UPDATE_PROFILE_SUCCESS]: (state: AuthState, { payload }) => ({
    ...state,
    user: { ...state, ...payload }
  }),


  // Add item
  [Items.ADD_ITEM_FILE_SUCCESS]: (state: AuthState) => ({
    ...state,
    user: !state.user ? null : {
      ...state.user,
      today_upload: state.user.today_upload + 1
    }
  }),

  [Items.ADD_ITEM_URL_SUCCESS]: (state: AuthState) => ({
    ...state,
    user: !state.user ? null : {
      ...state.user,
      today_upload: state.user.today_upload + 1
    }
  })
}, initialState);
