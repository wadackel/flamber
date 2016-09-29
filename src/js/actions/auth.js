// @flow
import { createAction } from "redux-actions";


// Sign in
export const SIGN_IN_REQUEST: string = "SIGN_IN_REQUEST";
export const SIGN_IN_SUCCESS: string = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAILURE: string = "SIGN_IN_FAILURE";

export const signInRequest = createAction(SIGN_IN_REQUEST);
export const signInSuccess = createAction(SIGN_IN_SUCCESS);
export const signInFailure = createAction(SIGN_IN_FAILURE);


// Sign out
export const SIGN_OUT_REQUEST: string = "SIGN_OUT_REQUEST";
export const SIGN_OUT_SUCCESS: string = "SIGN_OUT_SUCCESS";
export const SIGN_OUT_FAILURE: string = "SIGN_OUT_FAILURE";

export const signOutRequest = createAction(SIGN_OUT_REQUEST);
export const signOutSuccess = createAction(SIGN_OUT_SUCCESS);
export const signOutFailure = createAction(SIGN_OUT_FAILURE);


// Fetch
export const FETCH_CURRENT_USER_REQUEST: string = "FETCH_CURRENT_USER_REQUEST";
export const FETCH_CURRENT_USER_SUCCESS: string = "FETCH_CURRENT_USER_SUCCESS";
export const FETCH_CURRENT_USER_FAILURE: string = "FETCH_CURRENT_USER_FAILURE";

export const fetchCurrentUserRequest = createAction(FETCH_CURRENT_USER_REQUEST);
export const fetchCurrentUserSuccess = createAction(FETCH_CURRENT_USER_SUCCESS);
export const fetchCurrentUserFailure = createAction(FETCH_CURRENT_USER_FAILURE);
