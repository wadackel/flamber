// @flow
import { find } from "lodash";

import type { ConnectState } from "../types/redux";
import type { FeedId, FeedEntity } from "../types/feed";

export const getFeedEntities = (state: ConnectState): Array<FeedEntity> =>
  state.feeds.results.map(id => state.entities.feeds[id]);

export const getFeedEntityById = (state: ConnectState, id: FeedId): ?FeedEntity =>
  state.entities.feeds[id];

export const getFeedEntityByURL = (state: ConnectState, url: string): ?FeedEntity =>
  find(state.entities.feeds, (o: FeedEntity): boolean => o.url === url);
