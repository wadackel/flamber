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

export type SignInRequestAction = PayloadAction<AuthProvider>;
export type SignInSuccessAction = PayloadAction<User>;
export type SignInFailureAction = ErrorAction<Error>;

export type SignOutRequestAction = Action;
export type SignOutSuccessAction = Action;
export type SignOutFailureAction = ErrorAction<Error>;

export type FetchCurrentUserRequestAction = Action;
export type FetchCurrentUserSuccessAction = PayloadAction<User>;
export type FetchCurrentUserFailureAction = ErrorAction<Error>;
