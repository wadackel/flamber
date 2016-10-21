// @flow
import type { ConnectState } from "../types/redux";
import type { FeedClient } from "../types/feed";

export const getFeedEntities = (state: ConnectState): Array<FeedClient> =>
  state.feeds.results.map(id => state.entities.feeds[id]);
