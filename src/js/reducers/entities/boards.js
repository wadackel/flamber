import _ from "lodash";
import { handleActions } from "redux-actions";
import * as Boards from "../../actions/boards";
import * as Items from "../../actions/items";

export default handleActions({
  [Boards.FETCH_BOARDS_SUCCESS]: (state, { payload }) => (
    payload.entities.boards || {}
  ),

  [Boards.ADD_BOARD_SUCCESS]: (state, { payload }) => (
    _.assign(state, payload.entities.boards)
  ),

  [Boards.DELETE_BOARD_REQUEST]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload ? entity : {
        ...entity,
        isDeleting: true
      }
    )
  ),

  [Boards.DELETE_BOARD_SUCCESS]: (state, { payload }) => (
    _.pickBy(state, (entity, id) =>
      id !== payload.id
    )
  ),

  [Items.ADD_ITEM_SUCCESS]: (state, { payload }) => (
    _.mapValues(state, entity => {
      const item = payload.entities.items[payload.result.item];
      return item.boardId !== entity.id ? entity : {
        ...entity,
        items: [...entity.items, item.id]
      };
    })
  )
}, {});
