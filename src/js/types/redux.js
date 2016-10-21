// @flow
import type { AuthState } from "./auth";
import type { OptionsState } from "./options";
import type { FeedState, FeedId, FeedClient } from "./feed";

export type ConnectState = {
  entities: {
    feeds: { [key: FeedId]: FeedClient };
  };
  auth: AuthState;
  options: OptionsState;
  feeds: FeedState;
};
