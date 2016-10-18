// @flow
import type { User } from "../types/user";
import type {
  AuthProvider,

  SignInRequestAction,
  SignInSuccessAction,
  SignInFailureAction,

  SignOutRequestAction,
  SignOutSuccessAction,
  SignOutFailureAction,

  FetchCurrentUserRequestAction,
  FetchCurrentUserSuccessAction,
  FetchCurrentUserFailureAction
} from "../types/auth";


// Sign in
export const SIGN_IN_REQUEST = "SIGN_IN_REQUEST";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAILURE = "SIGN_IN_FAILURE";

export function signInRequest(provider: AuthProvider): SignInRequestAction {
  return { type: SIGN_IN_REQUEST, payload: provider };
}

export function signInSuccess(user: User): SignInSuccessAction {
  return { type: SIGN_IN_SUCCESS, payload: user };
}

export function signInFailure(error: Error): SignInFailureAction {
  return { type: SIGN_IN_FAILURE, payload: error, error: true };
}


// Sign out
export const SIGN_OUT_REQUEST = "SIGN_OUT_REQUEST";
export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
export const SIGN_OUT_FAILURE = "SIGN_OUT_FAILURE";

export function signOutRequest(): SignOutRequestAction {
  return { type: SIGN_OUT_REQUEST };
}

export function signOutSuccess(): SignOutSuccessAction {
  return { type: SIGN_OUT_SUCCESS };
}

export function signOutFailure(error: Error): SignOutFailureAction {
  return { type: SIGN_OUT_FAILURE, payload: error, error: true };
}


// Fetch
export const FETCH_CURRENT_USER_REQUEST = "FETCH_CURRENT_USER_REQUEST";
export const FETCH_CURRENT_USER_SUCCESS = "FETCH_CURRENT_USER_SUCCESS";
export const FETCH_CURRENT_USER_FAILURE = "FETCH_CURRENT_USER_FAILURE";

export function fetchCurrentUserRequest(): FetchCurrentUserRequestAction {
  return { type: FETCH_CURRENT_USER_REQUEST };
}

export function fetchCurrentUserSuccess(user: User): FetchCurrentUserSuccessAction {
  return { type: FETCH_CURRENT_USER_SUCCESS, payload: user };
}

export function fetchCurrentUserFailure(error: Error): FetchCurrentUserFailureAction {
  return { type: FETCH_CURRENT_USER_FAILURE, payload: error, error: true };
}
