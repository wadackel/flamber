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
  FetchBoardSuccessAction,
  AddBoardSuccessAction,
  UpdateBoardRequestAction,
  UpdateBoardSuccessAction,
  UpdateBoardFailureAction,
  DeleteBoardRequestAction,
  DeleteBoardSuccessAction,
  DeleteBoardFailureAction,
  SelectBoardToggleAction
} from "../../types/board";
import type {
  DeleteItemSuccessAction,
  SelectedItemsDeleteSuccessAction,
  MoveItemSuccessAction,
  SelectedItemsMoveSuccessAction
} from "../../types/item";


function mergeEntities(state: BoardEntitiesState, entities: BoardEntitiesState): BoardEntitiesState {
  return assign(state, entities || {});
}

function mapEntities(state: BoardEntitiesState, ids: Array<BoardId>, iteratee: Function): BoardEntitiesState {
  return mapValues(state, (entity: BoardEntity) =>
    ids.indexOf(entity.id) > -1 ? iteratee(entity) : entity
  );
}

function removeEntities(state: BoardEntitiesState, ids: Array<BoardId>): BoardEntitiesState {
  return pickBy(state, (entity: BoardEntity): boolean =>
    ids.indexOf(entity.id) === -1
  );
}


export default handleActions({
  // Fetch
  [B.FETCH_BOARDS_SUCCESS]: (state: BoardEntitiesState, action: FetchBoardsSuccessAction): BoardEntitiesState => (
    mergeEntities(state, action.payload.entities.boards)
  ),

  [B.FETCH_BOARD_SUCCESS]: (state: BoardEntitiesState, action: FetchBoardSuccessAction): BoardEntitiesState => (
    mergeEntities(state, action.payload.entities.boards)
  ),


  // Add
  [B.ADD_BOARD_SUCCESS]: (state: BoardEntitiesState, action: AddBoardSuccessAction): BoardEntitiesState => (
    mergeEntities(state, action.payload.entities.boards)
  ),


  // Update
  [B.UPDATE_BOARD_REQUEST]: (state: BoardEntitiesState, action: UpdateBoardRequestAction): BoardEntitiesState => (
    mapEntities(state, [action.payload.id], (entity: BoardEntity) => ({
      ...entity,
      ...action.payload,
      isUpdating: true
    }))
  ),

  [B.UPDATE_BOARD_SUCCESS]: (state: BoardEntitiesState, action: UpdateBoardSuccessAction): BoardEntitiesState => (
    mergeEntities(state, action.payload.entities.boards)
  ),

  [B.UPDATE_BOARD_FAILURE]: (state: BoardEntitiesState, action: UpdateBoardFailureAction): BoardEntitiesState => (
    action.meta
      ? mapEntities(state, [action.meta.id], (entity: BoardEntity) => ({
        ...entity,
        isUpdating: false
      }))
      : state
  ),


  // Delete
  [B.DELETE_BOARD_REQUEST]: (state: BoardEntitiesState, action: DeleteBoardRequestAction): BoardEntitiesState => (
    mapEntities(state, [action.payload], (entity: BoardEntity) => ({
      ...entity,
      isDeleting: true
    }))
  ),

  [B.DELETE_BOARD_SUCCESS]: (state: BoardEntitiesState, action: DeleteBoardSuccessAction): BoardEntitiesState => (
    removeEntities(state, [action.payload.result.board])
  ),

  [B.DELETE_BOARD_FAILURE]: (state: BoardEntitiesState, action: DeleteBoardFailureAction): BoardEntitiesState => (
    action.meta
      ? mapEntities(state, [action.meta.id], (entity: BoardEntity) => ({
        ...entity,
        isDeleting: false
      }))
      : state
  ),


  // Select
  [B.SELECT_BOARD_TOGGLE]: (state: BoardEntitiesState, action: SelectBoardToggleAction): BoardEntitiesState => (
    mapEntities(state, [action.payload], (entity: BoardEntity) => ({
      ...entity,
      select: !entity.select
    }))
  ),


  // Select delete
  [B.SELECTED_BOARDS_DELETE_REQUEST]: (state: BoardEntitiesState): BoardEntitiesState => (
    mapValues(state, (entity: BoardEntity) =>
      !entity.select ? entity : {
        ...entity,
        isDeleting: true
      }
    )
  ),

  [B.SELECTED_BOARDS_DELETE_FAILURE]: (state: BoardEntitiesState): BoardEntitiesState => (
    mapValues(state, (entity: BoardEntity) =>
      !entity.select ? entity : {
        ...entity,
        isDeleting: false
      }
    )
  ),


  // Items
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

  [I.DELETE_ITEM_SUCCESS]: (state: BoardEntitiesState, action: DeleteItemSuccessAction): BoardEntitiesState => (
    mapValues(state, (entity: BoardEntity) => ({
      ...entity,
      Items: entity.Items.filter(id => id !== action.payload.result.item)
    }))
  ),

  [I.SELECTED_ITEMS_DELETE_SUCCESS]:
    (state: BoardEntitiesState, action: SelectedItemsDeleteSuccessAction): BoardEntitiesState => (
    mapValues(state, (entity: BoardEntity) => ({
      ...entity,
      Items: entity.Items.filter(id => action.payload.result.items.indexOf(id) < 0)
    }))
  ),

  [I.MOVE_ITEM_SUCCESS]: (state: BoardEntitiesState, action: MoveItemSuccessAction): BoardEntitiesState => (
    action.meta
      ? mapValues(state, (entity: BoardEntity) => ({
        ...entity,
        Items: action.meta !== entity.id ? entity.Items : without(entity.Items, action.payload.result.item)
      }))
      : state
  ),

  [I.SELECTED_ITEMS_MOVE_SUCCESS]:
    (state: BoardEntitiesState, action: SelectedItemsMoveSuccessAction): BoardEntitiesState => (
    mapValues(state, (entity: BoardEntity) =>
      action.meta.indexOf(entity.id) < 0 ? entity : {
        ...entity,
        Items: without(entity.Items, ...action.payload.result.items)
      }
    )
  )
}, {});
