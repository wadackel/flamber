// @flow
import type { AuthState } from "./auth";
import type { OptionsState } from "./options";
import type { FeedState, FeedEntitiesState } from "./feed";

export type ConnectState = {
  entities: {
    feeds: FeedEntitiesState;
  };
  auth: AuthState;
  options: OptionsState;
  feeds: FeedState;
};
