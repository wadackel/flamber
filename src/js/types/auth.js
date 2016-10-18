// @flow
import type { Action, PayloadAction, ErrorAction } from "./action";
import type { User } from "./user";

export type AuthState = {
  isFetching: boolean;
  authenticated: boolean;
  hasJwtToken: boolean;
  user: ?User;
};

export type AuthProvider = "google";

export type SignInRequestAction = PayloadAction<"SIGN_IN_REQUEST", AuthProvider>;
export type SignInSuccessAction = PayloadAction<"SIGN_IN_SUCCESS", User>;
export type SignInFailureAction = ErrorAction<"SIGN_IN_FAILURE", Error>;

export type SignOutRequestAction = Action<"SIGN_OUT_REQUEST">;
export type SignOutSuccessAction = Action<"SIGN_OUT_SUCCESS">;
export type SignOutFailureAction = ErrorAction<"SIGN_OUT_FAILURE", Error>;

export type FetchCurrentUserRequestAction = Action<"FETCH_CURRENT_USER_REQUEST">;
export type FetchCurrentUserSuccessAction = PayloadAction<"FETCH_CURRENT_USER_SUCCESS", User>;
export type FetchCurrentUserFailureAction = ErrorAction<"FETCH_CURRENT_USER_FAILURE", Error>;
