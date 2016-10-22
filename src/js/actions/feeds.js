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

export function fetchFeedsRequest(): FetchFeedsRequestAction {
  return { type: FETCH_FEEDS_REQUEST };
}

export function fetchFeedsSuccess(payload: FetchFeedsSuccessPayload): FetchFeedsSuccessAction {
  return { type: FETCH_FEEDS_SUCCESS, payload };
}

export function fetchFeedsFailure(error: Error): FetchFeedsFailureAction {
  return { type: FETCH_FEEDS_FAILURE, payload: error, error: true };
}


// Add
export const ADD_FEED_REQUEST = "ADD_FEED_REQUEST";
export const ADD_FEED_SUCCESS = "ADD_FEED_SUCCESS";
export const ADD_FEED_FAILURE = "ADD_FEED_FAILURE";

export function addFeedRequest(url: string): AddFeedRequestAction {
  return { type: ADD_FEED_REQUEST, payload: url };
}

export function addFeedSuccess(payload: AddFeedSuccessPayload): AddFeedSuccessAction {
  return { type: ADD_FEED_SUCCESS, payload };
}

export function addFeedFailure(error: Error): AddFeedFailureAction {
  return { type: ADD_FEED_FAILURE, payload: error, error: true };
}


// Delete
export const DELETE_FEED_REQUEST = "DELETE_FEED_REQUEST";
export const DELETE_FEED_SUCCESS = "DELETE_FEED_SUCCESS";
export const DELETE_FEED_FAILURE = "DELETE_FEED_FAILURE";

export function deleteFeedRequest(id: FeedId): DeleteFeedRequestAction {
  return { type: DELETE_FEED_REQUEST, payload: id };
}

export function deleteFeedSuccess(payload: DeleteFeedSuccessPayload): DeleteFeedSuccessAction {
  return { type: DELETE_FEED_SUCCESS, payload };
}

export function deleteFeedFailure(error: Error, entity: FeedEntity): DeleteFeedFailureAction {
  return { type: DELETE_FEED_FAILURE, payload: error, error: true, meta: entity };
}
