// @flow
import { handleActions } from "redux-actions";
import * as F from "../../actions/feeds";

import type {
  FeedState,

  AddFeedSuccessAction
} from "../../types/feed";

export default handleActions({
  // TODO
  [F.ADD_FEED_SUCCESS]: (state: FeedState, action: AddFeedSuccessAction) => ({
    ...state
  })
}, {});
