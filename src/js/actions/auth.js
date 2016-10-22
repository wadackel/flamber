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

export const signInRequest = (provider: AuthProvider): SignInRequestAction => (
  { type: SIGN_IN_REQUEST, payload: provider }
);

export const signInSuccess = (user: User): SignInSuccessAction => (
  { type: SIGN_IN_SUCCESS, payload: user }
);

export const signInFailure = (error: Error): SignInFailureAction => (
  { type: SIGN_IN_FAILURE, payload: error, error: true }
);


// Sign out
export const SIGN_OUT_REQUEST = "SIGN_OUT_REQUEST";
export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
export const SIGN_OUT_FAILURE = "SIGN_OUT_FAILURE";

export const signOutRequest = (): SignOutRequestAction => (
  { type: SIGN_OUT_REQUEST }
);

export const signOutSuccess = (): SignOutSuccessAction => (
  { type: SIGN_OUT_SUCCESS }
);

export const signOutFailure = (error: Error): SignOutFailureAction => (
  { type: SIGN_OUT_FAILURE, payload: error, error: true }
);


// Fetch
export const FETCH_CURRENT_USER_REQUEST = "FETCH_CURRENT_USER_REQUEST";
export const FETCH_CURRENT_USER_SUCCESS = "FETCH_CURRENT_USER_SUCCESS";
export const FETCH_CURRENT_USER_FAILURE = "FETCH_CURRENT_USER_FAILURE";

export const fetchCurrentUserRequest = (): FetchCurrentUserRequestAction => (
  { type: FETCH_CURRENT_USER_REQUEST }
);

export const fetchCurrentUserSuccess = (user: User): FetchCurrentUserSuccessAction => (
  { type: FETCH_CURRENT_USER_SUCCESS, payload: user }
);

export const fetchCurrentUserFailure = (error: Error): FetchCurrentUserFailureAction => (
  { type: FETCH_CURRENT_USER_FAILURE, payload: error, error: true }
);
