// @flow
import type { Action, PayloadAction, ErrorAction } from "./action";
import type { ArrayNormalized, SingleNormalized } from "./normalize";

export type FeedId = number;
export type Feed = {
  id: FeedId;
  url: string;
  name: string;
  favicon: ?string;
  created_at: Date;
  updated_at: Date;
};
export type FeedClient = $All<Feed, {
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


// Fetch
export type FetchFeedsSuccessPayload = ArrayNormalized<"feeds", FeedClient, FeedId>;
export type FetchFeedsRequestAction = Action<"FETCH_FEEDS_REQUEST">;
export type FetchFeedsSuccessAction = PayloadAction<"FETCH_FEEDS_SUCCESS", FetchFeedsSuccessPayload>;
export type FetchFeedsFailureAction = ErrorAction<"FETCH_FEEDS_FAILURE", Error>;


// Add
export type AddFeedSuccessPayload = SingleNormalized<"feeds", "feed", FeedClient, FeedId>;
export type AddFeedRequestAction = PayloadAction<"ADD_FEED_REQUEST", string>;
export type AddFeedSuccessAction = PayloadAction<"ADD_FEED_SUCCESS", AddFeedSuccessPayload>;
export type AddFeedFailureAction = ErrorAction<"ADD_FEED_FAILURE", Error>;


// TODO: Update
// TODO: Delete
