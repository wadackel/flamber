// @flow
import { handleActions } from "redux-actions";
import * as F from "../actions/feeds";

import type {
  FeedState,

  FetchFeedsSuccessAction,
  FetchFeedsFailureAction,

  AddFeedSuccessAction,
  AddFeedFailureAction,

  DeleteFeedSuccessAction,
  DeleteFeedFailureAction
} from "../types/feed";

const initialState: FeedState = {
  isFetching: false,
  isAdding: false,
  results: [],
  error: null
};

export default handleActions({
  // Fetch
  [F.FETCH_FEEDS_REQUEST]: (state: FeedState): FeedState => ({
    ...state,
    isFetching: true
  }),

  [F.FETCH_FEEDS_SUCCESS]: (state: FeedState, action: FetchFeedsSuccessAction): FeedState => ({
    ...state,
    isFetching: false,
    error: null,
    results: action.payload.result.feeds
  }),

  [F.FETCH_FEEDS_FAILURE]: (state: FeedState, action: FetchFeedsFailureAction): FeedState => ({
    ...state,
    isFetching: false,
    error: action.payload
  }),


  // Add
  [F.ADD_FEED_REQUEST]: (state: FeedState): FeedState => ({
    ...state,
    isAdding: true
  }),

  [F.ADD_FEED_SUCCESS]: (state: FeedState, action: AddFeedSuccessAction): FeedState => ({
    ...state,
    isAdding: false,
    error: null,
    results: [...state.results, action.payload.result.feed]
  }),

  [F.ADD_FEED_FAILURE]: (state: FeedState, action: AddFeedFailureAction): FeedState => ({
    ...state,
    isAdding: false,
    error: action.payload
  }),


  // Delete
  [F.DELETE_FEED_SUCCESS]: (state: FeedState, action: DeleteFeedSuccessAction): FeedState => ({
    ...state,
    error: null,
    results: state.results.filter(id => id !== action.payload.result.feed)
  }),

  [F.DELETE_FEED_FAILURE]: (state: FeedState, action: DeleteFeedFailureAction): FeedState => ({
    ...state,
    error: action.payload
  })
}, initialState);
