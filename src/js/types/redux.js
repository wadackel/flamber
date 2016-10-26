// @flow
import type { AuthState } from "./auth";
import type { NotificationState } from "./notification";
import type { OptionsState } from "./options";
import type { BoardState, BoardEntitiesState } from "./board";
import type { TagState, TagEntitiesState } from "./tag";
import type { FeedState, FeedEntitiesState } from "./feed";

export type ConnectState = {
  entities: {
    boards: BoardEntitiesState;
    tags: TagEntitiesState;
    feeds: FeedEntitiesState;
  };
  auth: AuthState;
  notifications: NotificationState;
  boards: BoardState;
  options: OptionsState;
  tags: TagState;
  feeds: FeedState;
};
