// @flow
import { assign, mapValues, pickBy } from "lodash";
import { handleActions } from "redux-actions";
// import * as I from "../../actions/items";
import * as T from "../../actions/tags";

import type {
  TagId,
  TagEntity,
  TagEntitiesState,

  FetchTagsSuccessAction,
  AddTagRequestAction,
  AddTagSuccessAction,
  AddTagFailureAction,
  UpdateTagRequestAction,
  UpdateTagSuccessAction,
  UpdateTagFailureAction,
  DeleteTagRequestAction,
  DeleteTagSuccessAction,
  DeleteTagFailureAction
} from "../../types/tag";


function mergeEntities(state: TagEntitiesState, entities: ?TagEntitiesState): TagEntitiesState {
  return assign(state, entities || {});
}

function mapEntities(state: TagEntitiesState, ids: Array<TagId>, iteratee: Function): TagEntitiesState {
  return mapValues(state, (entity: TagEntity): TagEntity =>
    ids.indexOf(entity.id) > -1 ? iteratee(entity) : entity
  );
}

function removeEntities(state: TagEntitiesState, ids: Array<TagId>): TagEntitiesState {
  return pickBy(state, (entity: TagEntity): boolean =>
    ids.indexOf(entity.id) === -1
  );
}


export default handleActions({
  // Fetch
  [T.FETCH_TAGS_SUCCESS]: (state: TagEntitiesState, action: FetchTagsSuccessAction): TagEntitiesState => (
    mergeEntities(state, action.payload.entities.tags)
  ),


  // Add
  [T.ADD_TAG_REQUEST]: (state: TagEntitiesState, action: AddTagRequestAction): TagEntitiesState => (
    mergeEntities(state, { [action.payload.id]: action.payload })
  ),

  [T.ADD_TAG_SUCCESS]: (state: TagEntitiesState, action: AddTagSuccessAction): TagEntitiesState => (
    mergeEntities(removeEntities(state, [action.meta.id]), action.payload.entities.tags)
  ),

  [T.ADD_TAG_FAILURE]: (state: TagEntitiesState, action: AddTagFailureAction): TagEntitiesState => (
    action.meta
      ? removeEntities(state, [action.meta.id])
      : state
  ),


  // Update
  [T.UPDATE_TAG_REQUEST]: (state: TagEntitiesState, action: UpdateTagRequestAction): TagEntitiesState => (
    mapEntities(state, [action.payload.id], (entity: TagEntity): TagEntity => ({
      ...entity,
      ...action.payload,
      isUpdating: false
    }))
  ),

  [T.UPDATE_TAG_SUCCESS]: (state: TagEntitiesState, action: UpdateTagSuccessAction): TagEntitiesState => (
    mergeEntities(state, action.payload.entities.tags)
  ),

  [T.UPDATE_TAG_FAILURE]: (state: TagEntitiesState, action: UpdateTagFailureAction): TagEntitiesState => (
    action.meta
      ? mapEntities(state, [action.meta.id], (entity: TagEntity): TagEntity => ({
        ...entity,
        ...action.meta,
        isUpdating: false
      }))
      : state
  ),


  // Delete
  [T.DELETE_TAG_REQUEST]: (state: TagEntitiesState, action: DeleteTagRequestAction): TagEntitiesState => (
    mapEntities(state, [action.payload], (entity: TagEntity) => ({
      ...entity,
      isDeleting: true
    }))
  ),

  [T.DELETE_TAG_SUCCESS]: (state: TagEntitiesState, action: DeleteTagSuccessAction): TagEntitiesState => (
    removeEntities(state, [action.payload.result.tag])
  ),

  [T.DELETE_TAG_FAILURE]: (state: TagEntitiesState, action: DeleteTagFailureAction): TagEntitiesState => (
    action.meta
      ? mapEntities(state, [action.meta], (entity: TagEntity) => ({
        ...entity,
        isDeleting: false
      }))
      : state
  )

  // TODO
  // [I.REGISTER_ITEM_TAG_SUCCESS]: (state, { meta }) => (
  //   pickBy(state, (entity, id) =>
  //     id !== meta.tagId
  //   )
  // ),
  //
  // [I.REGISTER_ITEM_TAG_FAILURE]: (state, { meta }) => (
  //   pickBy(state, (entity, id) =>
  //     id !== meta.tagId
  //   )
  // )
}, {});
