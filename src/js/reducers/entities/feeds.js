// @flow
import { assign } from "lodash";
import { handleActions } from "redux-actions";
import * as F from "../../actions/feeds";

import type {
  FeedState,

  FetchFeedsSuccessAction,
  AddFeedSuccessAction
} from "../../types/feed";

function mergeEntities(state, entities) {
  return assign(state, entities || {});
}

export default handleActions({
  [F.FETCH_FEEDS_SUCCESS]: (state: FeedState, action: FetchFeedsSuccessAction): FeedState => (
    mergeEntities(state, action.payload.entities.feeds)
  ),

  [F.ADD_FEED_SUCCESS]: (state: FeedState, action: AddFeedSuccessAction): FeedState => (
    mergeEntities(state, action.payload.entities.feeds)
  )
}, {});
