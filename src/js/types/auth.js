// @flow
import type { User } from "./user";

export type AuthState = {
  isFetching: boolean;
  authenticated: boolean;
  hasJwtToken: boolean;
  user: ?User;
};
