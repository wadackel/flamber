// @flow
import { assign, mapValues, without, pickBy } from "lodash";
import { handleActions } from "redux-actions";
import * as B from "../../actions/boards";
import * as I from "../../actions/items";
import * as T from "../../actions/tags";

import type {
  ItemId,
  ItemEntity,
  ItemEntitiesState,
  FetchItemsSuccessAction,
  AddItemURLSuccessAction,
  AddItemFileSuccessAction,
  DeleteItemRequestAction,
  DeleteItemSuccessAction,
  DeleteItemFailureAction,
  StarItemToggleRequestAction,
  StarItemToggleSuccessAction,
  StarItemToggleFailureAction,
  UpdateItemNameRequestAction,
  UpdateItemNameSuccessAction,
  UpdateItemNameFailureAction,
  UpdateItemDescriptionRequestAction,
  UpdateItemDescriptionSuccessAction,
  UpdateItemDescriptionFailureAction,
  UpdateItemImageRequestAction,
  UpdateItemImageSuccessAction,
  UpdateItemImageFailureAction,
  AddItemTagRequestAction,
  AddItemTagSuccessAction,
  AddItemTagFailureAction,
  RemoveItemTagRequestAction,
  RemoveItemTagSuccessAction,
  RemoveItemTagFailureAction,
  MoveItemSuccessAction,
  SetSelectItemsAction,
  SelectItemToggleAction,
  SelectAllItemExecAction,
  UnselectAllItemExecAction,
  SelectStarItemExecAction,
  SelectedItemsStarSuccessAction,
  SelectedItemsStarFailureAction,
  SelectedItemsMoveRequestAction,
  SelectedItemsMoveSuccessAction,
  SelectedItemsMoveFailureAction,
  SelectedItemsDeleteSuccessAction,
  SelectedItemsDeleteFailureAction
} from "../../types/item";
import type { FetchBoardsSuccessAction } from "../../types/board";
import type { DeleteTagSuccessAction } from "../../types/tag";


function mergeEntities(state: ItemEntitiesState, entities: ItemEntitiesState): ItemEntitiesState {
  return assign(state, entities || {});
}

function mapEntities(state: ItemEntitiesState, ids: Array<ItemId>, iteratee: Function): ItemEntitiesState {
  return mapValues(state, (entity: ItemEntity) =>
    ids.indexOf(entity.id) > -1 ? iteratee(entity) : entity
  );
}

function removeEntities(state: ItemEntitiesState, ids: Array<ItemId>): ItemEntitiesState {
  return pickBy(state, (entity: ItemEntity): boolean =>
    ids.indexOf(entity.id) === -1
  );
}


export default handleActions({
  // Fetch
  [I.FETCH_ITEMS_SUCCESS]: (state: ItemEntitiesState, action: FetchItemsSuccessAction): ItemEntitiesState => (
    mergeEntities(state, action.payload.entities.items)
  ),


  // Add from URL
  [I.ADD_ITEM_URL_SUCCESS]: (state: ItemEntitiesState, action: AddItemURLSuccessAction): ItemEntitiesState => (
    mergeEntities(state, action.payload.entities.items)
  ),


  // Add from file
  [I.ADD_ITEM_FILE_SUCCESS]: (state: ItemEntitiesState, action: AddItemFileSuccessAction): ItemEntitiesState => (
    mergeEntities(state, action.payload.entities.items)
  ),


  // Delete
  [I.DELETE_ITEM_REQUEST]: (state: ItemEntitiesState, action: DeleteItemRequestAction): ItemEntitiesState => (
    mapEntities(state, [action.payload], (entity: ItemEntity) => ({
      ...entity,
      isDeleting: true
    }))
  ),

  [I.DELETE_ITEM_SUCCESS]: (state: ItemEntitiesState, action: DeleteItemSuccessAction): ItemEntitiesState => (
    removeEntities(state, [action.payload.result.item])
  ),

  [I.DELETE_ITEM_FAILURE]: (state: ItemEntitiesState, action: DeleteItemFailureAction): ItemEntitiesState => (
    action.meta
      ? mapEntities(state, [action.meta.id], (entity: ItemEntity) => ({
        ...entity,
        isDeleting: false
      }))
      : state
  ),


  // Star
  [I.STAR_ITEM_TOGGLE_REQUEST]: (state: ItemEntitiesState, action: StarItemToggleRequestAction): ItemEntitiesState => (
    mapEntities(state, [action.payload], (entity: ItemEntity) => ({
      ...entity,
      star: !entity.star
    }))
  ),

  [I.STAR_ITEM_TOGGLE_SUCCESS]: (state: ItemEntitiesState, action: StarItemToggleSuccessAction): ItemEntitiesState => (
    mapEntities(state, [action.payload.result.item], (entity: ItemEntity) => ({
      ...entity,
      star: action.payload.entities.items[action.payload.result.item].star
    }))
  ),

  [I.STAR_ITEM_TOGGLE_FAILURE]: (state: ItemEntitiesState, action: StarItemToggleFailureAction): ItemEntitiesState => (
    action.meta
      ? mapEntities(state, [action.meta], (entity: ItemEntity) => ({
        ...entity,
        star: !entity.star
      }))
      : state
  ),


  // Update name
  [I.UPDATE_ITEM_NAME_REQUEST]: (state: ItemEntitiesState, action: UpdateItemNameRequestAction): ItemEntitiesState => (
    mapEntities(state, [action.payload.id], (entity: ItemEntity) => ({
      ...entity,
      name: action.payload.name,
      isUpdating: true,
      isNameUpdating: true
    }))
  ),

  [I.UPDATE_ITEM_NAME_SUCCESS]: (state: ItemEntitiesState, action: UpdateItemNameSuccessAction): ItemEntitiesState => (
    mapEntities(state, [action.payload.result.item], (entity: ItemEntity) => ({
      ...entity,
      name: action.payload.entities.items[entity.id].name,
      isUpdating: false,
      isNameUpdating: false
    }))
  ),

  [I.UPDATE_ITEM_NAME_FAILURE]: (state: ItemEntitiesState, action: UpdateItemNameFailureAction): ItemEntitiesState => (
    mapEntities(state, [action.meta.id], (entity: ItemEntity) => ({
      ...entity,
      isUpdating: false,
      isNameUpdating: false
    }))
  ),


  // Update description
  [I.UPDATE_ITEM_DESCRIPTION_REQUEST]:
    (state: ItemEntitiesState, action: UpdateItemDescriptionRequestAction): ItemEntitiesState => (
    mapEntities(state, [action.payload.id], (entity: ItemEntity) => ({
      ...entity,
      description: action.payload.description,
      isUpdating: true,
      isDescriptionUpdating: true
    }))
  ),

  [I.UPDATE_ITEM_DESCRIPTION_SUCCESS]:
    (state: ItemEntitiesState, action: UpdateItemDescriptionSuccessAction): ItemEntitiesState => (
    mapEntities(state, [action.payload.result.item], (entity: ItemEntity) => ({
      ...entity,
      description: action.payload.entities.items[entity.id].description,
      isUpdating: false,
      isDescriptionUpdating: false
    }))
  ),

  [I.UPDATE_ITEM_DESCRIPTION_FAILURE]:
    (state: ItemEntitiesState, action: UpdateItemDescriptionFailureAction): ItemEntitiesState => (
    mapEntities(state, [action.meta.id], (entity: ItemEntity) => ({
      ...entity,
      isUpdating: false,
      isDescriptionUpdating: false
    }))
  ),


  // Update palette
  [I.UPDATE_ITEM_PALETTE_REQUEST]: (state, { payload }) => (
    mapValues(state, entity =>
      entity.id !== payload.id ? entity : {
        ...entity,
        palette: payload.palette,
        isUpdating: true,
        isPaletteUpdating: true
      }
    )
  ),

  [I.UPDATE_ITEM_PALETTE_SUCCESS]: (state, { payload }) => (
    mapValues(state, entity =>
      payload.result.items.indexOf(entity.id) < 0 ? entity : {
        ...entity,
        palette: payload.entities.items[entity.id].palette,
        isUpdating: false,
        isPaletteUpdating: false
      }
    )
  ),

  [I.UPDATE_ITEM_PALETTE_FAILURE]: (state, { meta }) => (
    mapValues(state, entity =>
      entity.id === meta.id ? entity : {
        ...entity,
        isUpdating: false,
        isPaletteUpdating: false
      }
    )
  ),


  // Image
  [I.UPDATE_ITEM_IMAGE_REQUEST]:
    (state: ItemEntitiesState, action: UpdateItemImageRequestAction): ItemEntitiesState => (
    mapEntities(state, [action.payload.id], (entity: ItemEntity) => ({
      ...entity,
      isUpdating: true,
      isImageUpdating: true
    }))
  ),

  [I.UPDATE_ITEM_IMAGE_SUCCESS]:
    (state: ItemEntitiesState, action: UpdateItemImageSuccessAction): ItemEntitiesState => (
    mergeEntities(state, action.payload.entities.items)
  ),

  [I.UPDATE_ITEM_IMAGE_FAILURE]:
    (state: ItemEntitiesState, action: UpdateItemImageFailureAction): ItemEntitiesState => (
    mapEntities(state, [action.meta.id], (entity: ItemEntity) => ({
      ...entity,
      isUpdating: false,
      isImageUpdating: false
    }))
  ),


  // Add tag
  [I.ADD_ITEM_TAG_REQUEST]: (state: ItemEntitiesState, action: AddItemTagRequestAction): ItemEntitiesState => (
    mapEntities(state, [action.payload.id], (entity: ItemEntity) => ({
      ...entity,
      Tags: [...entity.Tags, action.payload.tagId],
      isUpdating: true,
      isTagAdding: true
    }))
  ),

  [I.ADD_ITEM_TAG_SUCCESS]: (state: ItemEntitiesState, action: AddItemTagSuccessAction): ItemEntitiesState => (
    mapEntities(state, [action.payload.result.item], (entity: ItemEntity) => ({
      ...entity,
      isUpdating: false,
      isTagAdding: false
    }))
  ),

  [I.ADD_ITEM_TAG_FAILURE]: (state: ItemEntitiesState, action: AddItemTagFailureAction): ItemEntitiesState => (
    mapEntities(state, [action.meta.id], (entity: ItemEntity) => ({
      ...entity,
      isUpdating: false,
      isTagAdding: false
    }))
  ),


  // Remove tag
  [I.REMOVE_ITEM_TAG_REQUEST]: (state: ItemEntitiesState, action: RemoveItemTagRequestAction): ItemEntitiesState => (
    mapEntities(state, [action.payload.id], (entity: ItemEntity) => ({
      ...entity,
      Tags: without(entity.Tags, action.payload.tagId),
      isUpdating: true,
      isTagRemoving: true
    }))
  ),

  [I.REMOVE_ITEM_TAG_SUCCESS]: (state: ItemEntitiesState, action: RemoveItemTagSuccessAction): ItemEntitiesState => (
    mapEntities(state, [action.payload.result.item], (entity: ItemEntity) => ({
      ...entity,
      isUpdating: false,
      isTagRemoving: false
    }))
  ),

  [I.REMOVE_ITEM_TAG_FAILURE]: (state: ItemEntitiesState, action: RemoveItemTagFailureAction): ItemEntitiesState => (
    mapEntities(state, [action.meta.id], (entity: ItemEntity) => ({
      ...entity,
      isUpdating: false,
      isTagRemoving: false
    }))
  ),


  // Move
  [I.MOVE_ITEM_SUCCESS]: (state: ItemEntitiesState, action: MoveItemSuccessAction): ItemEntitiesState => (
    mergeEntities(state, action.payload.entities.items)
  ),


  // Set select items
  [I.SET_SELECT_ITEMS]: (state: ItemEntitiesState, action: SetSelectItemsAction): ItemEntitiesState => (
    mapValues(state, (entity: ItemEntity) => ({
      ...entity,
      select: action.payload.indexOf(entity.id) > -1
    }))
  ),


  // Select
  [I.SELECT_ITEM_TOGGLE]: (state: ItemEntitiesState, action: SelectItemToggleAction): ItemEntitiesState => (
    mapEntities(state, [action.payload], (entity: ItemEntity) => ({
      ...entity,
      select: !entity.select
    }))
  ),


  // Select all
  [I.SELECT_ALL_ITEM_EXEC]: (state: ItemEntitiesState, action: SelectAllItemExecAction): ItemEntitiesState => (
    mapEntities(state, action.payload.map(o => o.id), (entity: ItemEntity) => ({
      ...entity,
      select: true
    }))
  ),


  // Unselect all
  [I.UNSELECT_ALL_ITEM_EXEC]: (state: ItemEntitiesState, action: UnselectAllItemExecAction): ItemEntitiesState => (
    mapEntities(state, action.payload.map(o => o.id), (entity: ItemEntity) => ({
      ...entity,
      select: false
    }))
  ),


  // Select star item
  [I.SELECT_STAR_ITEM_EXEC]: (state: ItemEntitiesState, action: SelectStarItemExecAction): ItemEntitiesState => (
    mapEntities(state, action.payload.map(o => o.id), (entity: ItemEntity) => ({
      ...entity,
      select: entity.star
    }))
  ),


  // Selected delete
  [I.SELECTED_ITEMS_DELETE_REQUEST]: (state: ItemEntitiesState): ItemEntitiesState => (
    mapValues(state, (entity: ItemEntity) =>
      !entity.select ? entity : {
        ...entity,
        isDeleting: true
      }
    )
  ),

  [I.SELECTED_ITEMS_DELETE_SUCCESS]:
    (state: ItemEntitiesState, action: SelectedItemsDeleteSuccessAction): ItemEntitiesState => (
    removeEntities(state, action.payload.result.items)
  ),

  [I.SELECTED_ITEMS_DELETE_FAILURE]:
    (state: ItemEntitiesState, action: SelectedItemsDeleteFailureAction): ItemEntitiesState => (
    action.meta
      ? mapEntities(state, action.meta.map(o => o.id), (entity: ItemEntity) => ({
        ...entity,
        isDeleting: false
      }))
      : state
  ),


  // Selected star
  [I.SELECTED_ITEMS_STAR_REQUEST]: (state: ItemEntitiesState): ItemEntitiesState => (
    mapValues(state, (entity: ItemEntity) =>
      !entity.select ? entity : {
        ...entity,
        isUpdating: true
      }
    )
  ),

  [I.SELECTED_ITEMS_STAR_SUCCESS]:
  (state: ItemEntitiesState, action: SelectedItemsStarSuccessAction): ItemEntitiesState => (
    mapEntities(state, action.payload.result.items, (entity: ItemEntity) => ({
      ...entity,
      select: false,
      isUpdating: false,
      star: action.payload.entities.items[entity.id].star
    }))
  ),

  [I.SELECTED_ITEMS_STAR_FAILURE]:
  (state: ItemEntitiesState, action: SelectedItemsStarFailureAction): ItemEntitiesState => (
    action.meta
      ? mapEntities(state, action.meta.map(o => o.id), (entity: ItemEntity) => ({
        ...entity,
        isUpdating: false
      }))
      : state
  ),


  // Selected move
  [I.SELECTED_ITEMS_MOVE_REQUEST]:
    (state: ItemEntitiesState, action: SelectedItemsMoveRequestAction): ItemEntitiesState => (
    mapValues(state, (entity: ItemEntity) => (
      entity.board_id !== action.payload || !entity.select ? entity : {
        ...entity,
        isMoving: true
      }
    ))
  ),

  [I.SELECTED_ITEMS_MOVE_SUCCESS]:
    (state: ItemEntitiesState, action: SelectedItemsMoveSuccessAction): ItemEntitiesState => (
    mergeEntities(state, action.payload.entities.items)
  ),

  [I.SELECTED_ITEMS_MOVE_FAILURE]:
    (state: ItemEntitiesState, action: SelectedItemsMoveFailureAction): ItemEntitiesState => (
    mapValues(state, (entity: ItemEntity) =>
      action.meta.prevBoards.indexOf(entity.board_id) < 0 ? entity : {
        ...entity,
        isMoving: false
      }
    )
  ),


  // Boards
  [B.FETCH_BOARDS_SUCCESS]: (state: ItemEntitiesState, action: FetchBoardsSuccessAction): ItemEntitiesState => (
    mergeEntities(state, action.payload.entities.items)
  ),

  // Tags
  [T.DELETE_TAG_SUCCESS]: (state: ItemEntitiesState, action: DeleteTagSuccessAction): ItemEntitiesState => (
    mapValues(state, (entity: ItemEntity) => ({
      ...entity,
      Tags: without(entity.Tags, action.payload.result.tag)
    }))
  )
}, {});
