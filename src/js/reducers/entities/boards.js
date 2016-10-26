// @flow
import { assign, mapValues, pickBy, without } from "lodash";
import { handleActions } from "redux-actions";
import * as B from "../../actions/boards";
import * as I from "../../actions/items";

import type {
  BoardId,
  BoardEntity,
  BoardEntitiesState,
  FetchBoardsSuccessAction,
  AddBoardSuccessAction
} from "../../types/board";


function mergeEntities(state: BoardEntitiesState, entities: BoardEntitiesState): BoardEntitiesState {
  return assign(state, entities || {});
}


export default handleActions({
  // Fetch
  [B.FETCH_BOARDS_SUCCESS]: (state: BoardEntitiesState, action: FetchBoardsSuccessAction): BoardEntitiesState => (
    mergeEntities(state, action.payload.entities.boards)
  ),


  // Add
  [B.ADD_BOARD_SUCCESS]: (state: BoardEntitiesState, action: AddBoardSuccessAction): BoardEntitiesState => (
    mergeEntities(state, action.payload.entities.boards)
  ),


  // Update
  [B.UPDATE_BOARD_REQUEST]: (state, { payload }) => (
    mapValues(state, entity =>
      entity.id !== payload.id ? entity : {
        ...entity,
        ...payload,
        isUpdating: true
      }
    )
  ),

  [B.UPDATE_BOARD_SUCCESS]: (state, { payload }) => {
    const board = payload.entities.boards[payload.result.boards[0]];

    return mapValues(state, entity =>
      entity.id !== board.id ? entity : {
        ...entity,
        ...board,
        isUpdating: false
      }
    );
  },

  [B.UPDATE_BOARD_FAILURE]: (state, { meta }) => (
    mapValues(state, entity =>
      entity.id !== meta.id ? entity : {
        ...entity,
        isUpdating: false
      }
    )
  ),


  // Delete
  [B.DELETE_BOARD_REQUEST]: (state, { payload }) => (
    mapValues(state, entity =>
      entity.id !== payload ? entity : {
        ...entity,
        isDeleting: true
      }
    )
  ),

  [B.DELETE_BOARD_SUCCESS]: (state, { payload }) => (
    pickBy(state, (entity: BoardEntity, id: BoardId): boolean =>
      id !== payload.id
    )
  ),

  [B.DELETE_BOARD_FAILURE]: (state, { meta }) => (
    mapValues(state, entity =>
      entity.id !== meta.id ? entity : {
        ...entity,
        isDeleting: false
      }
    )
  ),


  // Select
  [B.SELECT_BOARD_TOGGLE]: (state, { payload }) => (
    mapValues(state, entity =>
      entity.id !== payload ? entity : {
        ...entity,
        select: !entity.select
      }
    )
  ),


  // Select delete
  [B.SELECTED_BOARDS_DELETE_REQUEST]: state => (
    mapValues(state, entity =>
      !entity.select ? entity : {
        ...entity,
        isDeleting: true
      }
    )
  ),

  [B.SELECTED_BOARDS_DELETE_FAILURE]: state => (
    mapValues(state, entity =>
      !entity.select ? entity : {
        ...entity,
        isDeleting: false
      }
    )
  ),


  // I
  [I.ADD_ITEM_URL_SUCCESS]: (state, { payload }) => (
    mapValues(state, entity => {
      const item = payload.entities.items[payload.result.item];
      return item.board !== entity.id ? entity : {
        ...entity,
        items: [...entity.items, item.id]
      };
    })
  ),

  [I.ADD_ITEM_FILE_SUCCESS]: (state, { payload }) => (
    mapValues(state, entity => {
      const item = payload.entities.items[payload.result.item];
      return item.board !== entity.id ? entity : {
        ...entity,
        items: [...entity.items, item.id]
      };
    })
  ),

  [I.DELETE_ITEM_SUCCESS]: (state, { payload }) => (
    mapValues(state, entity => ({
      ...entity,
      items: entity.items.filter(id => id !== payload.id)
    }))
  ),

  [I.SELECTED_ITEMS_DELETE_SUCCESS]: (state, { payload }) => (
    mapValues(state, entity => ({
      ...entity,
      items: entity.items.filter(id => !payload.some(o => o.id === id))
    }))
  ),

  [I.MOVE_ITEM_SUCCESS]: (state, { payload, meta }) => (
    mapValues(mergeEntities(state, payload.entities.boards), entity =>
      entity.id !== meta.prevBoard ? entity : {
        ...entity,
        items: without(entity.items, ...payload.result.items)
      }
    )
  ),

  [I.SELECTED_ITEMS_MOVE_SUCCESS]: (state, { payload, meta }) => (
    mapValues(mergeEntities(state, payload.entities.boards), entity =>
      meta.prevBoards.indexOf(entity.id) < 0 ? entity : {
        ...entity,
        items: without(entity.items, ...payload.result.items)
      }
    )
  )
}, {});
