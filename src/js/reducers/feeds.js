// @flow
import { handleActions } from "redux-actions";
import * as F from "../actions/feeds";

import type {
  FeedState,

  AddFeedSuccessAction,
  AddFeedFailureAction
} from "../types/feed";

const initialState: FeedState = {
  isFetching: false,
  isAdding: false,
  results: [],
  error: null
};

export default handleActions({
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
  })
}, initialState);
