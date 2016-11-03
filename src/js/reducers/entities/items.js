// @flow
import { assign, mapValues, union, without, pickBy } from "lodash";
import { handleActions } from "redux-actions";
import * as B from "../../actions/boards";
import * as I from "../../actions/items";

import type {
  ItemId,
  ItemEntity,
  ItemEntitiesState,
  AddItemURLSuccessAction,
  AddItemFileSuccessAction,
  DeleteItemRequestAction,
  DeleteItemSuccessAction,
  DeleteItemFailureAction,
  StarItemToggleRequestAction,
  StarItemToggleSuccessAction,
  StarItemToggleFailureAction,
  SelectItemToggleAction,
  SelectAllItemExecAction,
  UnselectAllItemExecAction,
  SelectStarItemExecAction,
  SelectedItemsStarSuccessAction,
  SelectedItemsStarFailureAction,
  SelectedItemsDeleteSuccessAction,
  SelectedItemsDeleteFailureAction
} from "../../types/item";


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
  [I.FETCH_ITEMS_SUCCESS]: (state, { payload }) => (
    mergeEntities(state, payload.entities.items)
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
  [I.UPDATE_ITEM_NAME_REQUEST]: (state, { payload }) => (
    mapValues(state, entity =>
      entity.id !== payload.id ? entity : {
        ...entity,
        name: payload.name,
        isUpdating: true,
        isNameUpdating: true
      }
    )
  ),

  [I.UPDATE_ITEM_NAME_SUCCESS]: (state, { payload }) => (
    mapValues(state, entity =>
      payload.result.items.indexOf(entity.id) < 0 ? entity : {
        ...entity,
        name: payload.entities.items[entity.id].name,
        isUpdating: false,
        isNameUpdating: false
      }
    )
  ),

  [I.UPDATE_ITEM_NAME_FAILURE]: (state, { meta }) => (
    mapValues(state, entity =>
      entity.id !== meta.id ? entity : {
        ...entity,
        isUpdating: false,
        isNameUpdating: false
      }
    )
  ),


  // Update description
  [I.UPDATE_ITEM_DESCRIPTION_REQUEST]: (state, { payload }) => (
    mapValues(state, entity =>
      entity.id !== payload.id ? entity : {
        ...entity,
        description: payload.description,
        isUpdating: true,
        isDescriptionUpdating: true
      }
    )
  ),

  [I.UPDATE_ITEM_DESCRIPTION_SUCCESS]: (state, { payload }) => (
    mapValues(state, entity =>
      payload.result.items.indexOf(entity.id) < 0 ? entity : {
        ...entity,
        description: payload.entities.items[entity.id].description,
        isUpdating: false,
        isDescriptionUpdating: false
      }
    )
  ),

  [I.UPDATE_ITEM_DESCRIPTION_FAILURE]: (state, { meta }) => (
    mapValues(state, entity =>
      entity.id === meta.id ? entity : {
        ...entity,
        isUpdating: false,
        isDescriptionUpdating: false
      }
    )
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
  [I.UPDATE_ITEM_IMAGE_REQUEST]: (state, { payload }) => (
    mapValues(state, entity =>
      entity.id !== payload.id ? entity : {
        ...entity,
        isImageUpdating: true
      }
    )
  ),

  [I.UPDATE_ITEM_IMAGE_SUCCESS]: (state, { payload }) => (
    mergeEntities(state, payload.entities.items)
  ),

  [I.UPDATE_ITEM_IMAGE_FAILURE]: (state, { meta }) => (
    mapValues(state, entity =>
      entity.id !== meta.id ? entity : {
        ...entity,
        isImageUpdating: false
      }
    )
  ),


  // Add tag
  [I.ADD_ITEM_TAG_REQUEST]: (state, { payload }) => (
    mapValues(state, entity =>
      entity.id !== payload.id ? entity : {
        ...entity,
        tags: [...entity.tags, payload.tagId],
        isUpdating: true,
        isTagAdding: true
      }
    )
  ),

  [I.ADD_ITEM_TAG_SUCCESS]: (state, { payload }) => (
    mapValues(state, entity =>
      payload.result.items.indexOf(entity.id) < 0 ? entity : {
        ...entity,
        isUpdating: false,
        isTagAdding: false
      }
    )
  ),

  [I.ADD_ITEM_TAG_FAILURE]: (state, { meta }) => (
    mapValues(state, entity =>
      entity.id !== meta.id ? entity : {
        ...entity,
        isUpdating: false,
        isTagAdding: false
      }
    )
  ),


  // Remove tag
  [I.REMOVE_ITEM_TAG_REQUEST]: (state, { payload }) => (
    mapValues(state, entity =>
      entity.id !== payload.id ? entity : {
        ...entity,
        tags: entity.tags.filter(tagId => payload.tagId !== tagId),
        isUpdating: true,
        isTagRemoveing: true
      }
    )
  ),

  [I.REMOVE_ITEM_TAG_SUCCESS]: (state, { payload }) => (
    mapValues(state, entity =>
      payload.result.items.indexOf(entity.id) < 0 ? entity : {
        ...entity,
        isUpdating: false,
        isTagRemoveing: false
      }
    )
  ),

  [I.REMOVE_ITEM_TAG_FAILURE]: (state, { meta }) => (
    mapValues(state, entity =>
      entity.id !== meta.id ? entity : {
        ...entity,
        isUpdating: false,
        isTagRemoveing: false
      }
    )
  ),


  // Register tag
  [I.REGISTER_ITEM_TAG_REQUEST]: (state, { payload }) => (
    mapValues(state, entity =>
      entity.id !== payload.id ? entity : {
        ...entity,
        tags: [...entity.tags, payload.tagId],
        isUpdating: true,
        isTagAdding: true
      }
    )
  ),

  [I.REGISTER_ITEM_TAG_SUCCESS]: (state, { payload, meta }) => (
    mapValues(state, entity =>
      entity.id !== meta.id ? entity : {
        ...entity,
        tags: union(
          without(entity.tags, meta.tagId),
          payload.entities.items[payload.result.items[0]].tags
        ),
        isUpdating: false,
        isTagAdding: false
      }
    )
  ),

  [I.REGISTER_ITEM_TAG_FAILURE]: (state, { meta }) => (
    mapValues(state, entity =>
      entity.id !== meta.id ? entity : {
        ...entity,
        tags: without(entity.tags, meta.tagId),
        isUpdating: false,
        isTagAdding: false
      }
    )
  ),


  // Move
  [I.MOVE_ITEM_SUCCESS]: (state, { payload }) => (
    mergeEntities(state, payload.entities.items)
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
  [I.SELECTED_ITEMS_MOVE_REQUEST]: (state, { payload }) => (
    mapValues(state, entity =>
      entity.board !== payload || !entity.select ? entity : {
        ...entity,
        isMoving: true
      }
    )
  ),

  [I.SELECTED_ITEMS_MOVE_SUCCESS]: (state, { payload }) => (
    mergeEntities(state, payload.entities.items)
  ),

  [I.SELECTED_ITEMS_MOVE_FAILURE]: (state, { meta }) => (
    mapValues(state, entity =>
      meta.prevBoards.indexOf(entity.board) < 0 ? entity : {
        ...entity,
        isMoving: false
      }
    )
  ),


  // Boards
  [B.FETCH_BOARDS_SUCCESS]: (state, { payload }) => (
    mergeEntities(state, payload.entities.items)
  )
}, {});
