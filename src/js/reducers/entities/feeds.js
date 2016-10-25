// @flow
import { assign, mapValues, pickBy } from "lodash";
import { handleActions } from "redux-actions";
import * as F from "../../actions/feeds";

import type {
  FeedId,
  FeedEntity,
  FeedEntitiesState,

  FetchFeedsSuccessAction,
  AddFeedSuccessAction,
  DeleteFeedRequestAction,
  DeleteFeedSuccessAction,
  DeleteFeedFailureAction
} from "../../types/feed";


function mergeEntities(state: FeedEntitiesState, entities: ?FeedEntitiesState): FeedEntitiesState {
  return assign(state, entities || {});
}

function mapEntities(state: FeedEntitiesState, ids: Array<FeedId>, iteratee: Function): FeedEntitiesState {
  return mapValues(state, (entity: FeedEntity) =>
    ids.indexOf(entity.id) > -1 ? iteratee(entity) : entity
  );
}

function removeEntities(state: FeedEntitiesState, ids: Array<FeedId>): FeedEntitiesState {
  return pickBy(state, (entity: FeedEntity): boolean =>
    ids.indexOf(entity.id) === -1
  );
}


export default handleActions({
  // Fetch
  [F.FETCH_FEEDS_SUCCESS]: (state: FeedEntitiesState, action: FetchFeedsSuccessAction): FeedEntitiesState => (
    mergeEntities(state, action.payload.entities.feeds)
  ),


  // Add
  [F.ADD_FEED_SUCCESS]: (state: FeedEntitiesState, action: AddFeedSuccessAction): FeedEntitiesState => (
    mergeEntities(state, action.payload.entities.feeds)
  ),


  // Delete
  [F.DELETE_FEED_REQUEST]: (state: FeedEntitiesState, action: DeleteFeedRequestAction): FeedEntitiesState => (
    mapEntities(state, [action.payload], (entity: FeedEntity) => ({
      ...entity,
      isDeleting: true
    }))
  ),

  [F.DELETE_FEED_SUCCESS]: (state: FeedEntitiesState, action: DeleteFeedSuccessAction): FeedEntitiesState => (
    removeEntities(state, [action.payload.result.feed])
  ),

  [F.DELETE_FEED_FAILURE]: (state: FeedEntitiesState, action: DeleteFeedFailureAction): FeedEntitiesState => (
    mapEntities(state, [action.meta ? action.meta.id : ""], (entity: FeedEntity) => ({
      ...entity,
      isDeleting: false
    }))
  )
}, {});
