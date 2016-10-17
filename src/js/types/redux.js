// @flow
import type { AuthState } from "./auth";
import type { OptionsState } from "./options";

export type ConnectState = {
  auth: AuthState;
  options: OptionsState;
};
