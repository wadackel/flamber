// @flow
import { assign, mapValues, pickBy } from "lodash";
import { normalize } from "normalizr";
import { handleActions } from "redux-actions";
import TagSchema from "../../schemas/tag";
import * as Items from "../../actions/items";
import * as Tags from "../../actions/tags";

import type {
  TagId,
  TagEntity,
  TagEntitiesState,

  FetchTagsSuccessAction,
  AddTagSuccessAction,
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
  [Tags.FETCH_TAGS_SUCCESS]: (state: TagEntitiesState, action: FetchTagsSuccessAction): TagEntitiesState => (
    mergeEntities(state, action.payload.entities.tags)
  ),


  // Add
  [Tags.ADD_TAG_SUCCESS]: (state: TagEntitiesState, action: AddTagSuccessAction): TagEntitiesState => (
    mergeEntities(state, action.payload.entities.tags)
  ),


  // Update
  [Tags.UPDATE_TAG_REQUEST]: (state: TagEntitiesState, action: UpdateTagRequestAction): TagEntitiesState => (
    mapEntities(state, [action.payload.id], (entity: TagEntity): TagEntity => ({
      ...entity,
      ...action.payload,
      isUpdating: false
    }))
  ),

  [Tags.UPDATE_TAG_SUCCESS]: (state: TagEntitiesState, action: UpdateTagSuccessAction): TagEntitiesState => (
    mergeEntities(state, action.payload.entities.tags)
  ),

  [Tags.UPDATE_TAG_FAILURE]: (state: TagEntitiesState, action: UpdateTagFailureAction): TagEntitiesState => (
    action.meta
      ? mapEntities(state, [action.meta.id], (entity: TagEntity): TagEntity => ({
        ...entity,
        ...action.meta,
        isUpdating: false
      }))
      : state
  ),


  // Delete
  [Tags.DELETE_TAG_REQUEST]: (state: TagEntitiesState, action: DeleteTagRequestAction): TagEntitiesState => (
    mapEntities(state, [action.payload], (entity: TagEntity) => ({
      ...entity,
      isDeleting: true
    }))
  ),

  [Tags.DELETE_TAG_SUCCESS]: (state: TagEntitiesState, action: DeleteTagSuccessAction): TagEntitiesState => (
    removeEntities(state, [action.payload.result.tag])
  ),

  [Tags.DELETE_TAG_FAILURE]: (state: TagEntitiesState, action: DeleteTagFailureAction): TagEntitiesState => (
    action.meta
      ? mapEntities(state, [action.meta], (entity: TagEntity) => ({
        ...entity,
        isDeleting: false
      }))
      : state
  ),


  // Register item tag
  [Items.REGISTER_ITEM_TAG_REQUEST]: (state, { payload }) => (
    mergeEntities(state,
      normalize({
        id: payload.tagId,
        user: "processing",
        name: payload.label,
        created: new Date(),
        modified: new Date()
      }, TagSchema).entities.tags
    )
  )

  // TODO
  // [Items.REGISTER_ITEM_TAG_SUCCESS]: (state, { meta }) => (
  //   pickBy(state, (entity, id) =>
  //     id !== meta.tagId
  //   )
  // ),
  //
  // [Items.REGISTER_ITEM_TAG_FAILURE]: (state, { meta }) => (
  //   pickBy(state, (entity, id) =>
  //     id !== meta.tagId
  //   )
  // )
}, {});
