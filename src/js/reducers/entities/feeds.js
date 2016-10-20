// @flow
import { assign } from "lodash";
import { handleActions } from "redux-actions";
import * as F from "../../actions/feeds";

import type {
  FeedState,

  AddFeedSuccessAction
} from "../../types/feed";

function mergeEntities(state, entities) {
  return assign(state, entities || {});
}

export default handleActions({
  [F.ADD_FEED_SUCCESS]: (state: FeedState, action: AddFeedSuccessAction) => (
    mergeEntities(state, action.payload.entities.feeds)
  )
}, {});
