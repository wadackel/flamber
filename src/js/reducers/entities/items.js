/* eslint-disable */
import _ from "lodash";
import { handleActions } from "redux-actions";
import * as Boards from "../../actions/boards";
import * as Items from "../../actions/items";

export default handleActions({
  [Items.BG_SYNC_ITEMS_SUCCESS]: (state, { payload }) => (
    _.assign(state, payload.entities.items || {})
  ),

  [Boards.FETCH_BOARDS_SUCCESS]: (state, { payload }) => (
    _.assign(state, payload.entities.items || {})
  ),

  [Items.ADD_ITEM_SUCCESS]: (state, { payload }) => (
    _.assign(state, payload.entities.items || {})
  ),

  [Items.DELETE_ITEM_REQUEST]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload ? entity : {
        ...entity,
        isDeleting: true
      }
    )
  ),

  [Items.DELETE_ITEM_SUCCESS]: (state, { payload }) => (
    _.pickBy(state, (entity, id) =>
      id !== payload.id
    )
  )
}, {});
