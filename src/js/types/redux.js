// @flow
import type { AuthState } from "./auth";
import type { OptionsState } from "./options";
import type { FeedState } from "./feed";

export type ConnectState = {
  auth: AuthState;
  options: OptionsState;
  feeds: FeedState;
};
