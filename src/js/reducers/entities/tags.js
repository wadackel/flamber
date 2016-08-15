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
  )
}, {});
