import _ from "lodash";
import { handleActions } from "redux-actions";
import * as Boards from "../../actions/boards";
import * as Items from "../../actions/items";


function mergeEntities(state, entities) {
  return _.assign(state, entities || {});
}

export default handleActions({
  // Fetch
  [Boards.FETCH_BOARDS_SUCCESS]: (state, { payload }) => (
    mergeEntities(state, payload.entities.boards)
  ),


  // Add
  [Boards.ADD_BOARD_SUCCESS]: (state, { payload }) => (
    mergeEntities(state, payload.entities.boards)
  ),


  // Update
  [Boards.UPDATE_BOARD_REQUEST]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload.id ? entity : {
        ...entity,
        ...payload,
        isUpdating: true
      }
    )
  ),

  [Boards.UPDATE_BOARD_SUCCESS]: (state, { payload }) => {
    const board = payload.entities.boards[payload.result.boards[0]];

    return _.mapValues(state, entity =>
      entity.id !== board.id ? entity : {
        ...entity,
        ...board,
        isUpdating: false
      }
    );
  },


  // Delete
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

  [Boards.DELETE_BOARD_FAILURE]: (state, { meta }) => (
    _.mapValues(state, entity =>
      entity.id !== meta.id ? entity : {
        ...entity,
        isDeleting: false
      }
    )
  ),


  // Select
  [Boards.SELECT_BOARD_TOGGLE]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload ? entity : {
        ...entity,
        select: !entity.select
      }
    )
  ),


  // Select delete
  [Boards.SELECTED_BOARDS_DELETE_REQUEST]: state => (
    _.mapValues(state, entity =>
      !entity.select ? entity : {
        ...entity,
        isDeleting: true
      }
    )
  ),

  [Boards.SELECTED_BOARDS_DELETE_FAILURE]: state => (
    _.mapValues(state, entity =>
      !entity.select ? entity : {
        ...entity,
        isDeleting: false
      }
    )
  ),


  // Items
  [Items.ADD_ITEM_SUCCESS]: (state, { payload }) => (
    _.mapValues(state, entity => {
      const item = payload.entities.items[payload.result.item];
      return item.board !== entity.id ? entity : {
        ...entity,
        items: [...entity.items, item.id]
      };
    })
  ),

  [Items.DELETE_ITEM_SUCCESS]: (state, { payload }) => (
    _.mapValues(state, entity => ({
      ...entity,
      items: entity.items.filter(id => id !== payload.id)
    }))
  ),

  [Items.SELECTED_ITEMS_DELETE_SUCCESS]: (state, { payload }) => (
    _.mapValues(state, entity => ({
      ...entity,
      items: entity.items.filter(id => !payload.some(o => o.id === id))
    }))
  ),

  [Items.MOVE_ITEM_SUCCESS]: (state, { payload, meta }) => (
    _.mapValues(mergeEntities(state, payload.entities.boards), entity =>
      entity.id !== meta.prevBoard ? entity : {
        ...entity,
        items: entity.items.filter(id =>
          payload.result.items.indexOf(id) < -1
        )
      }
    )
  )
}, {});
