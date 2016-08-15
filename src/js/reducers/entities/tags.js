/* eslint-disable */
import _ from "lodash";
import { handleActions } from "redux-actions";
import * as Tags from "../../actions/tags";

function mergeEntities(state, entities) {
  return _.assign(state, entities || {});
}

export default handleActions({
  // Fetch
  [Tags.FETCH_TAGS_SUCCESS]: (state, { payload }) => (
    mergeEntities(state, payload.entities.tags)
  ),


  // Add
  [Tags.ADD_TAG_SUCCESS]: (state, { payload }) => (
    mergeEntities(state, payload.entities.tags)
  ),


  // Update
  [Tags.UPDATE_TAG_REQUEST]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload.id ? entity : {
        ...entity,
        ...payload,
        isUpdaing: false
      }
    )
  ),

  [Tags.UPDATE_TAG_SUCCESS]: (state, { payload }) => (
    mergeEntities(state, payload.entities.tags)
  ),

  [Tags.UPDATE_TAG_FAILURE]: (state, { meta }) => (
    _.mapValues(state, entity =>
      entity.id !== meta.entity.id ? entity : {
        ...entity,
        ...meta.entity,
        isUpdating: false
      }
    )
  ),


  // Delete
  [Tags.DELETE_TAG_REQUEST]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload ? entity : {
        ...entity,
        isDeleting: true
      }
    )
  ),

  [Tags.DELETE_TAG_SUCCESS]: (state, { payload }) => (
    _.pickBy(state, (entity, id) =>
      id !== payload
    )
  ),

  [Tags.DELETE_TAG_FAILURE]: (state, { meta }) => (
    _.mapValues(state, entity =>
      entity.id !== meta.id ? entity : {
        ...entity,
        isDeleting: false
      }
    )
  )
}, {});
