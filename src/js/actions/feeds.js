// @flow
import type {
  FeedId,
  FeedEntity,

  FetchFeedsSuccessPayload,
  FetchFeedsRequestAction,
  FetchFeedsSuccessAction,
  FetchFeedsFailureAction,

  AddFeedSuccessPayload,
  AddFeedRequestAction,
  AddFeedSuccessAction,
  AddFeedFailureAction,

  DeleteFeedSuccessPayload,
  DeleteFeedRequestAction,
  DeleteFeedSuccessAction,
  DeleteFeedFailureAction
} from "../types/feed";


// Fetch
export const FETCH_FEEDS_REQUEST = "FETCH_FEEDS_REQUEST";
export const FETCH_FEEDS_SUCCESS = "FETCH_FEEDS_SUCCESS";
export const FETCH_FEEDS_FAILURE = "FETCH_FEEDS_FAILURE";

export const fetchFeedsRequest = (): FetchFeedsRequestAction => (
  { type: FETCH_FEEDS_REQUEST }
);

export const fetchFeedsSuccess = (payload: FetchFeedsSuccessPayload): FetchFeedsSuccessAction => (
  { type: FETCH_FEEDS_SUCCESS, payload }
);

export const fetchFeedsFailure = (error: Error): FetchFeedsFailureAction => (
  { type: FETCH_FEEDS_FAILURE, payload: error, error: true }
);


// Add
export const ADD_FEED_REQUEST = "ADD_FEED_REQUEST";
export const ADD_FEED_SUCCESS = "ADD_FEED_SUCCESS";
export const ADD_FEED_FAILURE = "ADD_FEED_FAILURE";

export const addFeedRequest = (url: string): AddFeedRequestAction => (
  { type: ADD_FEED_REQUEST, payload: url }
);

export const addFeedSuccess = (payload: AddFeedSuccessPayload): AddFeedSuccessAction => (
  { type: ADD_FEED_SUCCESS, payload }
);

export const addFeedFailure = (error: Error): AddFeedFailureAction => (
  { type: ADD_FEED_FAILURE, payload: error, error: true }
);


// Delete
export const DELETE_FEED_REQUEST = "DELETE_FEED_REQUEST";
export const DELETE_FEED_SUCCESS = "DELETE_FEED_SUCCESS";
export const DELETE_FEED_FAILURE = "DELETE_FEED_FAILURE";

export const deleteFeedRequest = (id: FeedId): DeleteFeedRequestAction => (
  { type: DELETE_FEED_REQUEST, payload: id }
);

export const deleteFeedSuccess = (payload: DeleteFeedSuccessPayload): DeleteFeedSuccessAction => (
  { type: DELETE_FEED_SUCCESS, payload }
);

export const deleteFeedFailure = (error: Error, entity: FeedEntity): DeleteFeedFailureAction => (
  { type: DELETE_FEED_FAILURE, payload: error, error: true, meta: entity }
);
