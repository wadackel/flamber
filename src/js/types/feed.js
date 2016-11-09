// @flow
import type { TypeMap } from "./map";
import type { Action, PayloadAction, ErrorAction, ErrorWithMetaAction } from "./action";
import type { ArrayNormalized, SingleNormalized } from "./normalize";

export type FeedId = string; // UUID

export type Feed = {
  id: FeedId;
  url: string;
  name: string;
  favicon: ?string;
  created_at: Date;
  updated_at: Date;
};

export type FeedEntity = $All<Feed, {
  isUpdating: boolean;
  isDeleting: boolean;
}>;

export type Feeds = Array<Feed>;

export type FeedState = {
  isFetching: boolean;
  isAdding: boolean;
  results: Array<FeedId>;
  error: ?Error;
};

export type FeedEntitiesState = TypeMap<FeedId, FeedEntity>;


// Fetch
export type FetchFeedsSuccessPayload = ArrayNormalized<"feeds", FeedEntity, FeedId>;
export type FetchFeedsRequestAction = Action<"FETCH_FEEDS_REQUEST">;
export type FetchFeedsSuccessAction = PayloadAction<"FETCH_FEEDS_SUCCESS", FetchFeedsSuccessPayload>;
export type FetchFeedsFailureAction = ErrorAction<"FETCH_FEEDS_FAILURE", Error>;


// Add
export type AddFeedSuccessPayload = SingleNormalized<"feeds", "feed", FeedEntity, FeedId>;
export type AddFeedRequestAction = PayloadAction<"ADD_FEED_REQUEST", string>;
export type AddFeedSuccessAction = PayloadAction<"ADD_FEED_SUCCESS", AddFeedSuccessPayload>;
export type AddFeedFailureAction = ErrorAction<"ADD_FEED_FAILURE", Error>;


// Delete
export type DeleteFeedSuccessPayload = SingleNormalized<"feeds", "feed", FeedEntity, FeedId>;
export type DeleteFeedRequestAction = PayloadAction<"DELETE_FEED_REQUEST", FeedId>;
export type DeleteFeedSuccessAction = PayloadAction<"DELETE_FEED_SUCCESS", DeleteFeedSuccessPayload>;
export type DeleteFeedFailureAction = ErrorWithMetaAction<"DELETE_FEED_FAILURE", Error, ?FeedEntity>;
