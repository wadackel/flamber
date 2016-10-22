// @flow
import type { AuthState } from "./auth";
import type { OptionsState } from "./options";
import type { TagState, TagEntitiesState } from "./tag";
import type { FeedState, FeedEntitiesState } from "./feed";

export type ConnectState = {
  entities: {
    tags: TagEntitiesState;
    feeds: FeedEntitiesState;
  };
  auth: AuthState;
  options: OptionsState;
  tags: TagState;
  feeds: FeedState;
};
