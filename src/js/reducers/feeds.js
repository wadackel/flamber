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
  [F.ADD_FEED_REQUEST]: (state: FeedState) => ({
    ...state,
    isAdding: true
  }),

  // TODO
  [F.ADD_FEED_SUCCESS]: (state: FeedState, action: AddFeedSuccessAction) => ({
    ...state,
    isAdding: false,
    error: null
  }),

  [F.ADD_FEED_FAILURE]: (state: FeedState, action: AddFeedFailureAction) => ({
    ...state,
    isAdding: false,
    error: action.payload
  })
}, initialState);
