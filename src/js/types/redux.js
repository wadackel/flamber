// @flow
import type { AppState } from "./application";
import type { AuthState } from "./auth";
import type { NotificationState } from "./notification";
import type { OptionsState } from "./options";
import type { BoardState, BoardEntitiesState } from "./board";
import type { ItemState, ItemEntitiesState } from "./item";
import type { TagState, TagEntitiesState } from "./tag";
import type { FeedState, FeedEntitiesState } from "./feed";

export type ConnectState = {
  entities: {
    boards: BoardEntitiesState;
    items: ItemEntitiesState;
    tags: TagEntitiesState;
    feeds: FeedEntitiesState;
  };
  application: AppState;
  auth: AuthState;
  notifications: NotificationState;
  boards: BoardState;
  items: ItemState;
  options: OptionsState;
  tags: TagState;
  feeds: FeedState;
};
