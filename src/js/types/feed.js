// @flow
import type { PayloadAction, ErrorAction } from "./action";

export type FeedId = string;
export type Feed = {
  id: FeedId;
  url: string;
  name: string;
  favicon: string;
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


// TODO: Fetch


// Add
export type AddFeedRequestAction = PayloadAction<"ADD_FEED_REQUEST", string>;
export type AddFeedSuccessAction = PayloadAction<"ADD_FEED_SUCCESS", Feed>;
export type AddFeedFailureAction = ErrorAction<"ADD_FEED_FAILURE", Error>;


// TODO: Update
// TODO: Delete
