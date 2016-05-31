import { createAction } from "redux-actions";


// Sign in
export const SIGN_IN_REQUEST = "SIGN_IN_REQUEST";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAILURE = "SIGN_IN_FAILURE";

export const signInRequest = createAction(SIGN_IN_REQUEST);
export const signInSuccess = createAction(SIGN_IN_SUCCESS);
export const signInFailure = createAction(SIGN_IN_FAILURE);


// Sign out
export const SIGN_OUT_REQUEST = "SIGN_OUT_REQUEST";
export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
export const SIGN_OUT_FAILURE = "SIGN_OUT_FAILURE";

export const signOutRequest = createAction(SIGN_OUT_REQUEST);
export const signOutSuccess = createAction(SIGN_OUT_SUCCESS);
export const signOutFailure = createAction(SIGN_OUT_FAILURE);
