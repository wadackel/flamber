// @flow
import type { ConnectState } from "../types/redux";
import type { FeedId, FeedEntity } from "../types/feed";

export const getFeedEntities = (state: ConnectState): Array<FeedEntity> =>
  state.feeds.results.map(id => state.entities.feeds[id]);

export const getFeedEntityById = (state: ConnectState, id: FeedId): ?FeedEntity =>
  state.entities.feeds[id];
