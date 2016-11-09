// @flow
import uuid from "node-uuid";
import { identity } from "lodash";
import { createAction } from "redux-actions";

import type { Palette } from "../types/prop-types";
import type { BoardId } from "../types/board";
import type { TagId } from "../types/tag";
import type {
  ItemId,
  ItemEntity,
  ItemEntities,
  ItemVisibilityFilter,

  SetCurrentItemAction,

  SetItemVisibilityFilterAction,

  AddItemURLDialogOpenAction,
  AddItemURLDialogCloseAction,

  AddItemFileDialogOpenAction,
  AddItemFileDialogCloseAction,

  AddItemURLSuccessPayload,
  AddItemURLRequestAction,
  AddItemURLSuccessAction,
  AddItemURLFailureAction,

  AddItemFileSuccessPayload,
  AddItemFileRequestAction,
  AddItemFileSuccessAction,
  AddItemFileFailureAction,

  GotoAddedItemAction,

  DeleteItemSuccessPayload,
  DeleteItemRequestAction,
  DeleteItemSuccessAction,
  DeleteItemFailureAction,

  StarItemToggleSuccessPayload,
  StarItemToggleRequestAction,
  StarItemToggleSuccessAction,
  StarItemToggleFailureAction,

  MoveItemSelectBoardOpenAction,
  MoveItemSelectBoardCloseAction,

  MoveItemSuccessPayload,
  MoveItemRequestAction,
  MoveItemSuccessAction,
  MoveItemFailureAction,

  SelectItemToggleAction,

  SelectAllItemExecAction,
  SelectAllItemAction,

  UnselectAllItemExecAction,
  UnselectAllItemAction,

  SelectStarItemExecAction,
  SelectStarItemAction,

  SelectedItemsStarSuccessPayload,
  SelectedItemsStarRequestAction,
  SelectedItemsStarSuccessAction,
  SelectedItemsStarFailureAction,

  SelectedItemsMoveOpenAction,
  SelectedItemsMoveCloseAction,

  SelectedItemsMoveSuccessPayload,
  SelectedItemsMoveRequestAction,
  SelectedItemsMoveSuccessAction,
  SelectedItemsMoveFailureAction,

  SelectedItemsDeleteSuccessPayload,
  SelectedItemsDeleteRequestAction,
  SelectedItemsDeleteSuccessAction,
  SelectedItemsDeleteFailureAction
} from "../types/item";


// Set current
export const SET_CURRENT_ITEM = "SET_CURRENT_ITEM";
export const setCurrentItem = (id: ItemId): SetCurrentItemAction => (
  { type: SET_CURRENT_ITEM, payload: id }
);


// Set color
export const SET_ITEM_CURRENT_COLOR: string = "SET_ITEM_CURRENT_COLOR";
export const setItemCurrentColor = createAction(SET_ITEM_CURRENT_COLOR);


// Set visibility filters
export const SET_ITEM_VISIBILITY_FILTER = "SET_ITEM_VISIBILITY_FILTER";
export const setItemVisibilityFilter = (visibilityFilter: ItemVisibilityFilter): SetItemVisibilityFilterAction => (
  { type: SET_ITEM_VISIBILITY_FILTER, payload: visibilityFilter }
);


// Set image editing
export const SET_ITEM_IMAGE_EDITING: string = "SET_ITEM_IMAGE_EDITING";
export const setItemImageEditing = createAction(SET_ITEM_IMAGE_EDITING);


// Fetch
export const FETCH_ITEMS_REQUEST: string = "FETCH_ITEMS_REQUEST";
export const FETCH_ITEMS_SUCCESS: string = "FETCH_ITEMS_SUCCESS";
export const FETCH_ITEMS_FAILURE: string = "FETCH_ITEMS_FAILURE";

export const fetchItemsRequest = createAction(FETCH_ITEMS_REQUEST);
export const fetchItemsSuccess = createAction(FETCH_ITEMS_SUCCESS);
export const fetchItemsFailure = createAction(FETCH_ITEMS_FAILURE);


// Add from URL (UI)
export const ADD_ITEM_URL_DIALOG_OPEN = "ADD_ITEM_URL_DIALOG_OPEN";
export const ADD_ITEM_URL_DIALOG_CLOSE = "ADD_ITEM_URL_DIALOG_CLOSE";

export const addItemURLDialogOpen = (): AddItemURLDialogOpenAction => ({ type: ADD_ITEM_URL_DIALOG_OPEN });
export const addItemURLDialogClose = (): AddItemURLDialogCloseAction => ({ type: ADD_ITEM_URL_DIALOG_CLOSE });


// Add from File (UI)
export const ADD_ITEM_FILE_DIALOG_OPEN = "ADD_ITEM_FILE_DIALOG_OPEN";
export const ADD_ITEM_FILE_DIALOG_CLOSE = "ADD_ITEM_FILE_DIALOG_CLOSE";

export const addItemFileDialogOpen = (): AddItemFileDialogOpenAction => ({ type: ADD_ITEM_FILE_DIALOG_OPEN });
export const addItemFileDialogClose = (): AddItemFileDialogCloseAction => ({ type: ADD_ITEM_FILE_DIALOG_CLOSE });


// Add from URL
export const ADD_ITEM_URL_REQUEST = "ADD_ITEM_URL_REQUEST";
export const ADD_ITEM_URL_SUCCESS = "ADD_ITEM_URL_SUCCESS";
export const ADD_ITEM_URL_FAILURE = "ADD_ITEM_URL_FAILURE";

export const addItemURLRequest = (url: string, board: BoardId): AddItemURLRequestAction => (
  { type: ADD_ITEM_URL_REQUEST, payload: { url, board } }
);

export const addItemURLSuccess = (payload: AddItemURLSuccessPayload): AddItemURLSuccessAction => (
  { type: ADD_ITEM_URL_SUCCESS, payload }
);

export const addItemURLFailure = (error: Error): AddItemURLFailureAction => (
  { type: ADD_ITEM_URL_FAILURE, payload: error, error: true }
);


// Add from file
export const ADD_ITEM_FILE_REQUEST = "ADD_ITEM_FILE_REQUEST";
export const ADD_ITEM_FILE_SUCCESS = "ADD_ITEM_FILE_SUCCESS";
export const ADD_ITEM_FILE_FAILURE = "ADD_ITEM_FILE_FAILURE";

export const addItemFileRequest = (board: BoardId, file: File, palette: Palette): AddItemFileRequestAction => (
  { type: ADD_ITEM_FILE_REQUEST, payload: { board, file, palette } }
);

export const addItemFileSuccess = (payload: AddItemFileSuccessPayload): AddItemFileSuccessAction => (
  { type: ADD_ITEM_FILE_SUCCESS, payload }
);

export const addItemFileFailure = (error: Error): AddItemFileFailureAction => (
  { type: ADD_ITEM_FILE_FAILURE, payload: error, error: true }
);


// Goto added item
export const GOTO_ADDED_ITEM = "GOTO_ADDED_ITEM";
export const gotoAddedItem = (id: ItemId): GotoAddedItemAction => (
  { type: GOTO_ADDED_ITEM, payload: id }
);


// Star
export const STAR_ITEM_TOGGLE_REQUEST = "STAR_ITEM_TOGGLE_REQUEST";
export const STAR_ITEM_TOGGLE_SUCCESS = "STAR_ITEM_TOGGLE_SUCCESS";
export const STAR_ITEM_TOGGLE_FAILURE = "STAR_ITEM_TOGGLE_FAILURE";

export const starItemToggleRequest = (id: ItemId): StarItemToggleRequestAction => (
  { type: STAR_ITEM_TOGGLE_REQUEST, payload: id }
);

export const starItemToggleSuccess = (payload: StarItemToggleSuccessPayload): StarItemToggleSuccessAction => (
  { type: STAR_ITEM_TOGGLE_SUCCESS, payload }
);

export const starItemToggleFailure = (error: Error, id: ItemId): StarItemToggleFailureAction => (
  { type: STAR_ITEM_TOGGLE_FAILURE, payload: error, error: true, meta: id }
);


// Update name
function updateItemMetaCreator(error: Error, payload: Object): Object {
  return { ...payload };
}

export const UPDATE_ITEM_NAME_IF_NEEDED = "UPDATE_ITEM_NAME_IF_NEEDED";
export const UPDATE_ITEM_NAME_REQUEST = "UPDATE_ITEM_NAME_REQUEST";
export const UPDATE_ITEM_NAME_SUCCESS = "UPDATE_ITEM_NAME_SUCCESS";
export const UPDATE_ITEM_NAME_FAILURE = "UPDATE_ITEM_NAME_FAILURE";

function updateNamePayloadCreator(id: ItemId, name: string): Object {
  return { id, name };
}

export const updateItemNameIfNeeded = createAction(UPDATE_ITEM_NAME_IF_NEEDED, updateNamePayloadCreator);
export const updateItemNameRequest = createAction(UPDATE_ITEM_NAME_REQUEST, updateNamePayloadCreator);
export const updateItemNameSuccess = createAction(UPDATE_ITEM_NAME_SUCCESS);
export const updateItemNameFailure = createAction(UPDATE_ITEM_NAME_FAILURE,
  identity,
  updateItemMetaCreator
);


// Update description
export const UPDATE_ITEM_DESCRIPTION_REQUEST: string = "UPDATE_ITEM_DESCRIPTION_REQUEST";
export const UPDATE_ITEM_DESCRIPTION_SUCCESS: string = "UPDATE_ITEM_DESCRIPTION_SUCCESS";
export const UPDATE_ITEM_DESCRIPTION_FAILURE: string = "UPDATE_ITEM_DESCRIPTION_FAILURE";

export const updateItemDescriptionRequest = createAction(UPDATE_ITEM_DESCRIPTION_REQUEST,
  (id: ItemId, description: string): Object => ({ id, description })
);
export const updateItemDescriptionSuccess = createAction(UPDATE_ITEM_DESCRIPTION_SUCCESS);
export const updateItemDescriptionFailure = createAction(UPDATE_ITEM_DESCRIPTION_FAILURE,
  identity,
  updateItemMetaCreator
);


// Update palette
export const UPDATE_ITEM_PALETTE_REQUEST: string = "UPDATE_ITEM_PALETTE_REQUEST";
export const UPDATE_ITEM_PALETTE_SUCCESS: string = "UPDATE_ITEM_PALETTE_SUCCESS";
export const UPDATE_ITEM_PALETTE_FAILURE: string = "UPDATE_ITEM_PALETTE_FAILURE";

export const updateItemPaletteRequest = createAction(UPDATE_ITEM_PALETTE_REQUEST,
  (id: ItemId, palette: Palette): Object => ({ id, palette })
);
export const updateItemPaletteSuccess = createAction(UPDATE_ITEM_PALETTE_SUCCESS);
export const updateItemPaletteFailure = createAction(UPDATE_ITEM_PALETTE_FAILURE,
  identity,
  updateItemMetaCreator
);


// Update image
export const UPDATE_ITEM_IMAGE_REQUEST: string = "UPDATE_ITEM_IMAGE_REQUEST";
export const UPDATE_ITEM_IMAGE_SUCCESS: string = "UPDATE_ITEM_IMAGE_SUCCESS";
export const UPDATE_ITEM_IMAGE_FAILURE: string = "UPDATE_ITEM_IMAGE_FAILURE";

export const updateItemImageRequest = createAction(UPDATE_ITEM_IMAGE_REQUEST,
  (id: ItemId, image: string): Object => ({ id, image })
);
export const updateItemImageSuccess = createAction(UPDATE_ITEM_IMAGE_SUCCESS);
export const updateItemImageFailure = createAction(UPDATE_ITEM_IMAGE_FAILURE,
  identity,
  updateItemMetaCreator
);


// Add tag
export const ADD_ITEM_TAG_IF_NEEDED: string = "ADD_ITEM_TAG_IF_NEEDED";
export const ADD_ITEM_TAG_REQUEST: string = "ADD_ITEM_TAG_REQUEST";
export const ADD_ITEM_TAG_SUCCESS: string = "ADD_ITEM_TAG_SUCCESS";
export const ADD_ITEM_TAG_FAILURE: string = "ADD_ITEM_TAG_FAILURE";

function addItemTagPayloadCreator(id: ItemId, tagId: TagId): Object {
  return { id, tagId };
}

export const addItemTagIfNeeded = createAction(ADD_ITEM_TAG_IF_NEEDED, addItemTagPayloadCreator);
export const addItemTagRequest = createAction(ADD_ITEM_TAG_REQUEST, addItemTagPayloadCreator);
export const addItemTagSuccess = createAction(ADD_ITEM_TAG_SUCCESS);
export const addItemTagFailure = createAction(ADD_ITEM_TAG_FAILURE,
  identity,
  updateItemMetaCreator
);


// Remove tag
export const REMOVE_ITEM_TAG_REQUEST: string = "REMOVE_ITEM_TAG_REQUEST";
export const REMOVE_ITEM_TAG_SUCCESS: string = "REMOVE_ITEM_TAG_SUCCESS";
export const REMOVE_ITEM_TAG_FAILURE: string = "REMOVE_ITEM_TAG_FAILURE";

export const removeItemTagRequest = createAction(REMOVE_ITEM_TAG_REQUEST,
  (id: ItemId, tagId: TagId): Object => ({ id, tagId })
);
export const removeItemTagSuccess = createAction(REMOVE_ITEM_TAG_SUCCESS);
export const removeItemTagFailure = createAction(REMOVE_ITEM_TAG_FAILURE,
  identity,
  updateItemMetaCreator
);


// Register tag
export const REGISTER_ITEM_TAG_REQUEST: string = "REGISTER_ITEM_TAG_REQUEST";
export const REGISTER_ITEM_TAG_SUCCESS: string = "REGISTER_ITEM_TAG_SUCCESS";
export const REGISTER_ITEM_TAG_FAILURE: string = "REGISTER_ITEM_TAG_FAILURE";

export const registerItemTagRequest = createAction(REGISTER_ITEM_TAG_REQUEST,
  (id: ItemId, label: string): Object => ({ id, label, tagId: uuid.v4() })
);
export const registerItemTagSuccess = createAction(REGISTER_ITEM_TAG_SUCCESS,
  identity,
  (normalized, payload): Object => ({ ...payload })
);
export const registerItemTagFailure = createAction(REGISTER_ITEM_TAG_FAILURE,
  identity,
  updateItemMetaCreator
);


// Move board
export const MOVE_ITEM_SELECT_BOARD_OPEN = "MOVE_ITEM_SELECT_BOARD_OPEN";
export const MOVE_ITEM_SELECT_BOARD_CLOSE = "MOVE_ITEM_SELECT_BOARD_CLOSE";

export const moveItemSelectBoardOpen = (id: ItemId): MoveItemSelectBoardOpenAction => (
  { type: MOVE_ITEM_SELECT_BOARD_OPEN, payload: id }
);

export const moveItemSelectBoardClose = (): MoveItemSelectBoardCloseAction => (
  { type: MOVE_ITEM_SELECT_BOARD_CLOSE }
);

export const MOVE_ITEM_REQUEST = "MOVE_ITEM_REQUEST";
export const MOVE_ITEM_SUCCESS = "MOVE_ITEM_SUCCESS";
export const MOVE_ITEM_FAILURE = "MOVE_ITEM_FAILURE";

export const moveItemRequest = (boardId: BoardId): MoveItemRequestAction => (
  { type: MOVE_ITEM_REQUEST, payload: boardId }
);

export const moveItemSuccess = (payload: MoveItemSuccessPayload, prevBoard: BoardId): MoveItemSuccessAction => (
  { type: MOVE_ITEM_SUCCESS, payload, meta: prevBoard }
);

export const moveItemFailure = (
  error: Error,
  entity: ?ItemEntity,
  prevBoard: ?BoardId,
  nextBoard: ?BoardId
): MoveItemFailureAction => (
  { type: MOVE_ITEM_FAILURE, payload: error, error: true, meta: { entity, prevBoard, nextBoard } }
);


// Goto after board
export const GOTO_AFTER_MOVE_ITEM_BOARD: string = "GOTO_AFTER_MOVE_ITEM_BOARD";
export const gotoAfterMoveItemBoard = createAction(GOTO_AFTER_MOVE_ITEM_BOARD);


// Delete
export const DELETE_ITEM_REQUEST = "DELETE_ITEM_REQUEST";
export const DELETE_ITEM_SUCCESS = "DELETE_ITEM_SUCCESS";
export const DELETE_ITEM_FAILURE = "DELETE_ITEM_FAILURE";

export const deleteItemRequest = (id: ItemId): DeleteItemRequestAction => (
  { type: DELETE_ITEM_REQUEST, payload: id }
);
export const deleteItemSuccess = (payload: DeleteItemSuccessPayload): DeleteItemSuccessAction => (
  { type: DELETE_ITEM_SUCCESS, payload }
);
export const deleteItemFailure = (error: Error, entity: ?ItemEntity): DeleteItemFailureAction => (
  { type: DELETE_ITEM_FAILURE, payload: error, error: true, meta: entity }
);


// Select
export const SELECT_ITEM_TOGGLE = "SELECT_ITEM_TOGGLE";
export const selectItemToggle = (id: ItemId): SelectItemToggleAction => (
  { type: SELECT_ITEM_TOGGLE, payload: id }
);


// Select all
export const SELECT_ALL_ITEM_EXEC = "SELECT_ALL_ITEM_EXEC";
export const SELECT_ALL_ITEM = "SELECT_ALL_ITEM";
export const selectAllItemExec = (entities: ItemEntities): SelectAllItemExecAction => (
  { type: SELECT_ALL_ITEM_EXEC, payload: entities }
);
export const selectAllItem = (): SelectAllItemAction => (
  { type: SELECT_ALL_ITEM, meta: selectAllItemExec }
);


// Unselect all
export const UNSELECT_ALL_ITEM_EXEC = "UNSELECT_ALL_ITEM_EXEC";
export const UNSELECT_ALL_ITEM = "UNSELECT_ALL_ITEM";
export const unselectAllItemExec = (entities: ItemEntities): UnselectAllItemExecAction => (
  { type: UNSELECT_ALL_ITEM_EXEC, payload: entities }
);
export const unselectAllItem = (): UnselectAllItemAction => (
  { type: UNSELECT_ALL_ITEM, meta: unselectAllItemExec }
);


// Select star item
export const SELECT_STAR_ITEM_EXEC = "SELECT_STAR_ITEM_EXEC";
export const SELECT_STAR_ITEM = "SELECT_STAR_ITEM";
export const selectStarItemExec = (entities: ItemEntities): SelectStarItemExecAction => (
  { type: SELECT_STAR_ITEM_EXEC, payload: entities }
);
export const selectStarItem = (): SelectStarItemAction => (
  { type: SELECT_STAR_ITEM, meta: selectStarItemExec }
);


// Selected items move
export const SELECTED_ITEMS_MOVE_OPEN = "SELECTED_ITEMS_MOVE_OPEN";
export const SELECTED_ITEMS_MOVE_CLOSE = "SELECTED_ITEMS_MOVE_CLOSE";

export const selectedItemsMoveOpen = (): SelectedItemsMoveOpenAction => (
  { type: SELECTED_ITEMS_MOVE_OPEN }
);

export const selectedItemsMoveClose = (): SelectedItemsMoveCloseAction => (
  { type: SELECTED_ITEMS_MOVE_CLOSE }
);

export const SELECTED_ITEMS_MOVE_REQUEST = "SELECTED_ITEMS_MOVE_REQUEST";
export const SELECTED_ITEMS_MOVE_SUCCESS = "SELECTED_ITEMS_MOVE_SUCCESS";
export const SELECTED_ITEMS_MOVE_FAILURE = "SELECTED_ITEMS_MOVE_FAILURE";

export const selectedItemsMoveRequest = (boardId: BoardId): SelectedItemsMoveRequestAction => (
  { type: SELECTED_ITEMS_MOVE_REQUEST, payload: boardId }
);

export const selectedItemsMoveSuccess = (
  payload: SelectedItemsMoveSuccessPayload,
  prevBoards: Array<BoardId>
): SelectedItemsMoveSuccessAction => (
  { type: SELECTED_ITEMS_MOVE_SUCCESS, payload, meta: prevBoards }
);

export const selectedItemsMoveFailure = (
  error: Error,
  entities: ?ItemEntities,
  prevBoards: Array<BoardId>,
  nextBoard: BoardId
): SelectedItemsMoveFailureAction => (
  { type: SELECTED_ITEMS_MOVE_FAILURE, payload: error, error: true, meta: { entities, prevBoards, nextBoard } }
);


// Selected items star
export const SELECTED_ITEMS_STAR_REQUEST = "SELECTED_ITEMS_STAR_REQUEST";
export const SELECTED_ITEMS_STAR_SUCCESS = "SELECTED_ITEMS_STAR_SUCCESS";
export const SELECTED_ITEMS_STAR_FAILURE = "SELECTED_ITEMS_STAR_FAILURE";

export const selectedItemsStarRequest = (star: boolean): SelectedItemsStarRequestAction => (
  { type: SELECTED_ITEMS_STAR_REQUEST, payload: star }
);
export const selectedItemsStarSuccess = (payload: SelectedItemsStarSuccessPayload): SelectedItemsStarSuccessAction => (
  { type: SELECTED_ITEMS_STAR_SUCCESS, payload }
);
export const selectedItemsStarFailure = (error: Error, entities?: ?ItemEntities): SelectedItemsStarFailureAction => (
  { type: SELECTED_ITEMS_STAR_FAILURE, payload: error, error: true, meta: entities }
);


// Selected items delete
export const SELECTED_ITEMS_DELETE_REQUEST = "SELECTED_ITEMS_DELETE_REQUEST";
export const SELECTED_ITEMS_DELETE_SUCCESS = "SELECTED_ITEMS_DELETE_SUCCESS";
export const SELECTED_ITEMS_DELETE_FAILURE = "SELECTED_ITEMS_DELETE_FAILURE";

export const selectedItemsDeleteRequest = (): SelectedItemsDeleteRequestAction => (
  { type: SELECTED_ITEMS_DELETE_REQUEST }
);
export const selectedItemsDeleteSuccess =
  (payload: SelectedItemsDeleteSuccessPayload): SelectedItemsDeleteSuccessAction => (
  { type: SELECTED_ITEMS_DELETE_SUCCESS, payload }
);
export const selectedItemsDeleteFailure = (error: Error, entities: ?ItemEntities): SelectedItemsDeleteFailureAction => (
  { type: SELECTED_ITEMS_DELETE_FAILURE, payload: error, error: true, meta: entities }
);


// Fetch board items
export const FETCH_BOARD_ITEMS_REQUEST: string = "FETCH_BOARD_ITEMS_REQUEST";
export const FETCH_BOARD_ITEMS_SUCCESS: string = "FETCH_BOARD_ITEMS_SUCCESS";
export const FETCH_BOARD_ITEMS_FAILURE: string = "FETCH_BOARD_ITEMS_FAILURE";

export const fetchBoardItemsRequest = createAction(FETCH_BOARD_ITEMS_REQUEST);
export const fetchBoardItemsSuccess = createAction(FETCH_BOARD_ITEMS_SUCCESS);
export const fetchBoardItemsFailure = createAction(FETCH_BOARD_ITEMS_FAILURE);


// Detail drawer
export const ITEM_DETAIL_DRAWER_TOGGLE: string = "ITEM_DETAIL_DRAWER_TOGGLE";
export const ITEM_DETAIL_DRAWER_OPEN: string = "ITEM_DETAIL_DRAWER_OPEN";
export const ITEM_DETAIL_DRAWER_CLOSE: string = "ITEM_DETAIL_DRAWER_CLOSE";

export const itemDetailDrawerToggle = createAction(ITEM_DETAIL_DRAWER_TOGGLE);
export const itemDetailDrawerOpen = createAction(ITEM_DETAIL_DRAWER_OPEN);
export const itemDetailDrawerClose = createAction(ITEM_DETAIL_DRAWER_CLOSE);
