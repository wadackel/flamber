// @flow
import uuid from "node-uuid";
import { identity } from "lodash";
import { createAction } from "redux-actions";
import type { Palette } from "../types/prop-types";
import type { BoardId } from "../types/board";
import type { ItemId, Item, Items } from "../types/item";
import type { TagId } from "../types/tag";


// TODO: Payload type definition


// Set color
export const SET_ITEM_CURRENT_COLOR: string = "SET_ITEM_CURRENT_COLOR";
export const setItemCurrentColor = createAction(SET_ITEM_CURRENT_COLOR);


// Ser visibility filters
export const SET_ITEM_VISIBILITY_FILTER: string = "SET_ITEM_VISIBILITY_FILTER";
export const setItemVisibilityFilter = createAction(SET_ITEM_VISIBILITY_FILTER);


// Background sync
export const BG_SYNC_ITEMS_START: string = "BG_SYNC_ITEMS_START";
export const BG_SYNC_ITEMS_STOP: string = "BG_SYNC_ITEMS_STOP";
export const BG_SYNC_ITEMS_REQUEST: string = "BG_SYNC_ITEMS_REQUEST";
export const BG_SYNC_ITEMS_SUCCESS: string = "BG_SYNC_ITEMS_SUCCESS";
export const BG_SYNC_ITEMS_FAILURE: string = "BG_SYNC_ITEMS_FAILURE";

export const bgSyncItemsStart = createAction(BG_SYNC_ITEMS_START);
export const bgSyncItemsStop = createAction(BG_SYNC_ITEMS_STOP);
export const bgSyncItemsRequest = createAction(BG_SYNC_ITEMS_REQUEST);
export const bgSyncItemsSuccess = createAction(BG_SYNC_ITEMS_SUCCESS);
export const bgSyncItemsFailure = createAction(BG_SYNC_ITEMS_FAILURE);


// Fetch
export const FETCH_ITEMS_REQUEST: string = "FETCH_ITEMS_REQUEST";
export const FETCH_ITEMS_SUCCESS: string = "FETCH_ITEMS_SUCCESS";
export const FETCH_ITEMS_FAILURE: string = "FETCH_ITEMS_FAILURE";

export const fetchItemsRequest = createAction(FETCH_ITEMS_REQUEST);
export const fetchItemsSuccess = createAction(FETCH_ITEMS_SUCCESS);
export const fetchItemsFailure = createAction(FETCH_ITEMS_FAILURE);


// Add from URL (UI)
export const ADD_ITEM_URL_DIALOG_OPEN: string = "ADD_ITEM_URL_DIALOG_OPEN";
export const ADD_ITEM_URL_DIALOG_CLOSE: string = "ADD_ITEM_URL_DIALOG_CLOSE";

export const addItemURLDialogOpen = createAction(ADD_ITEM_URL_DIALOG_OPEN);
export const addItemURLDialogClose = createAction(ADD_ITEM_URL_DIALOG_CLOSE);


// Add from File (UI)
export const ADD_ITEM_FILE_DIALOG_OPEN: string = "ADD_ITEM_FILE_DIALOG_OPEN";
export const ADD_ITEM_FILE_DIALOG_CLOSE: string = "ADD_ITEM_FILE_DIALOG_CLOSE";

export const addItemFileDialogOpen = createAction(ADD_ITEM_FILE_DIALOG_OPEN);
export const addItemFileDialogClose = createAction(ADD_ITEM_FILE_DIALOG_CLOSE);


// Add from URL
export const ADD_ITEM_URL_REQUEST: string = "ADD_ITEM_URL_REQUEST";
export const ADD_ITEM_URL_SUCCESS: string = "ADD_ITEM_URL_SUCCESS";
export const ADD_ITEM_URL_FAILURE: string = "ADD_ITEM_URL_FAILURE";

export const addItemURLRequest = createAction(ADD_ITEM_URL_REQUEST,
  (url: string, board: BoardId): Object => ({ url, board })
);
export const addItemURLSuccess = createAction(ADD_ITEM_URL_SUCCESS);
export const addItemURLFailure = createAction(ADD_ITEM_URL_FAILURE);


// Add from file
export const ADD_ITEM_FILE_REQUEST: string = "ADD_ITEM_FILE_REQUEST";
export const ADD_ITEM_FILE_SUCCESS: string = "ADD_ITEM_FILE_SUCCESS";
export const ADD_ITEM_FILE_FAILURE: string = "ADD_ITEM_FILE_FAILURE";

export const addItemFileRequest = createAction(ADD_ITEM_FILE_REQUEST,
  (board: BoardId, file: File, palette: Palette): Object => ({ board, file, palette })
);
export const addItemFileSuccess = createAction(ADD_ITEM_FILE_SUCCESS);
export const addItemFileFailure = createAction(ADD_ITEM_FILE_FAILURE);


// Goto added item
export const GOTO_ADDED_ITEM: string = "GOTO_ADDED_ITEM";
export const gotoAddedItem = createAction(GOTO_ADDED_ITEM);


// Star
export const STAR_ITEM_TOGGLE_REQUEST: string = "STAR_ITEM_TOGGLE_REQUEST";
export const STAR_ITEM_TOGGLE_SUCCESS: string = "STAR_ITEM_TOGGLE_SUCCESS";
export const STAR_ITEM_TOGGLE_FAILURE: string = "STAR_ITEM_TOGGLE_FAILURE";

export const starItemToggleRequest = createAction(STAR_ITEM_TOGGLE_REQUEST);
export const starItemToggleSuccess = createAction(STAR_ITEM_TOGGLE_SUCCESS);
export const starItemToggleFailure = createAction(STAR_ITEM_TOGGLE_FAILURE,
  identity,
  (payload: Object, id: ItemId): Object => id
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
export const MOVE_ITEM_SELECT_BOARD_OPEN: string = "MOVE_ITEM_SELECT_BOARD_OPEN";
export const MOVE_ITEM_SELECT_BOARD_CLOSE: string = "MOVE_ITEM_SELECT_BOARD_CLOSE";
export const MOVE_ITEM_REQUEST: string = "MOVE_ITEM_REQUEST";
export const MOVE_ITEM_SUCCESS: string = "MOVE_ITEM_SUCCESS";
export const MOVE_ITEM_FAILURE: string = "MOVE_ITEM_FAILURE";

export const moveItemSelectBoardOpen = createAction(MOVE_ITEM_SELECT_BOARD_OPEN);
export const moveItemSelectBoardClose = createAction(MOVE_ITEM_SELECT_BOARD_CLOSE);
export const moveItemRequest = createAction(MOVE_ITEM_REQUEST);
export const moveItemSuccess = createAction(MOVE_ITEM_SUCCESS,
  identity,
  (payload: Object, prevBoard: BoardId): Object => ({ prevBoard })
);
export const moveItemFailure = createAction(MOVE_ITEM_FAILURE,
  identity,
  (payload: Object, item: Item, prevBoard: BoardId, nextBoard: BoardId): Object => ({ item, prevBoard, nextBoard })
);


// Goto after board
export const GOTO_AFTER_MOVE_ITEM_BOARD: string = "GOTO_AFTER_MOVE_ITEM_BOARD";
export const gotoAfterMoveItemBoard = createAction(GOTO_AFTER_MOVE_ITEM_BOARD);


// Delete
export const DELETE_ITEM_REQUEST: string = "DELETE_ITEM_REQUEST";
export const DELETE_ITEM_SUCCESS: string = "DELETE_ITEM_SUCCESS";
export const DELETE_ITEM_FAILURE: string = "DELETE_ITEM_FAILURE";

export const deleteItemRequest = createAction(DELETE_ITEM_REQUEST);
export const deleteItemSuccess = createAction(DELETE_ITEM_SUCCESS);
export const deleteItemFailure = createAction(DELETE_ITEM_FAILURE,
  identity,
  (payload: Object, entity: Item): Object => ({ entity })
);


// Select
export const SELECT_ITEM_TOGGLE: string = "SELECT_ITEM_TOGGLE";
export const selectItemToggle = createAction(SELECT_ITEM_TOGGLE);


// Select all
export const SELECT_ALL_ITEM_EXEC: string = "SELECT_ALL_ITEM_EXEC";
export const SELECT_ALL_ITEM: string = "SELECT_ALL_ITEM";
export const selectAllItemExec = createAction(SELECT_ALL_ITEM_EXEC);
export const selectAllItem = createAction(SELECT_ALL_ITEM,
  identity,
  (): Function => selectAllItemExec
);


// Unselect all
export const UNSELECT_ALL_ITEM_EXEC = "UNSELECT_ALL_ITEM_EXEC";
export const UNSELECT_ALL_ITEM = "UNSELECT_ALL_ITEM";
export const unselectAllItemExec = createAction(UNSELECT_ALL_ITEM_EXEC);
export const unselectAllItem = createAction(UNSELECT_ALL_ITEM,
  identity,
  (): Function => unselectAllItemExec
);


// Select star items
export const SELECT_STAR_ITEM_EXEC: string = "SELECT_STAR_ITEM_EXEC";
export const SELECT_STAR_ITEM: string = "SELECT_STAR_ITEM";
export const selectStarItemExec = createAction(SELECT_STAR_ITEM_EXEC);
export const selectStarItem = createAction(SELECT_STAR_ITEM,
  identity,
  (): Function => selectStarItemExec
);


// Selected items move
export const SELECTED_ITEMS_MOVE_OPEN: string = "SELECTED_ITEMS_MOVE_OPEN";
export const SELECTED_ITEMS_MOVE_CLOSE: string = "SELECTED_ITEMS_MOVE_CLOSE";
export const SELECTED_ITEMS_MOVE_REQUEST: string = "SELECTED_ITEMS_MOVE_REQUEST";
export const SELECTED_ITEMS_MOVE_SUCCESS: string = "SELECTED_ITEMS_MOVE_SUCCESS";
export const SELECTED_ITEMS_MOVE_FAILURE: string = "SELECTED_ITEMS_MOVE_FAILURE";

export const selectedItemsMoveOpen = createAction(SELECTED_ITEMS_MOVE_OPEN);
export const selectedItemsMoveClose = createAction(SELECTED_ITEMS_MOVE_CLOSE);
export const selectedItemsMoveRequest = createAction(SELECTED_ITEMS_MOVE_REQUEST);
export const selectedItemsMoveSuccess = createAction(SELECTED_ITEMS_MOVE_SUCCESS,
  identity,
  (payload: Object, prevBoards: Array<BoardId>): Object => ({ prevBoards })
);
export const selectedItemsMoveFailure = createAction(SELECTED_ITEMS_MOVE_FAILURE,
  identity,
  (
    payload: Object,
    items: Items,
    prevBoards: Array<BoardId>,
    nextBoard: BoardId
  ): Object => ({ items, prevBoards, nextBoard })
);


// Selected items star
export const SELECTED_ITEMS_STAR_REQUEST: string = "SELECTED_ITEMS_STAR_REQUEST";
export const SELECTED_ITEMS_STAR_SUCCESS: string = "SELECTED_ITEMS_STAR_SUCCESS";
export const SELECTED_ITEMS_STAR_FAILURE: string = "SELECTED_ITEMS_STAR_FAILURE";

export const selectedItemsStarRequest = createAction(SELECTED_ITEMS_STAR_REQUEST);
export const selectedItemsStarSuccess = createAction(SELECTED_ITEMS_STAR_SUCCESS);
export const selectedItemsStarFailure = createAction(SELECTED_ITEMS_STAR_FAILURE,
  identity,
  (payload: Object, entities: Items): Object => ({ entities })
);


// Selected items delete
export const SELECTED_ITEMS_DELETE_REQUEST: string = "SELECTED_ITEMS_DELETE_REQUEST";
export const SELECTED_ITEMS_DELETE_SUCCESS: string = "SELECTED_ITEMS_DELETE_SUCCESS";
export const SELECTED_ITEMS_DELETE_FAILURE: string = "SELECTED_ITEMS_DELETE_FAILURE";

export const selectedItemsDeleteRequest = createAction(SELECTED_ITEMS_DELETE_REQUEST);
export const selectedItemsDeleteSuccess = createAction(SELECTED_ITEMS_DELETE_SUCCESS);
export const selectedItemsDeleteFailure = createAction(SELECTED_ITEMS_DELETE_FAILURE,
  identity,
  (payload: Object, entities: Items): Object => ({ entities })
);


// Fetch board items
export const FETCH_BOARD_ITEMS_REQUEST: string = "FETCH_BOARD_ITEMS_REQUEST";
export const FETCH_BOARD_ITEMS_SUCCESS: string = "FETCH_BOARD_ITEMS_SUCCESS";
export const FETCH_BOARD_ITEMS_FAILURE: string = "FETCH_BOARD_ITEMS_FAILURE";

export const fetchBoardItemsRequest = createAction(FETCH_BOARD_ITEMS_REQUEST);
export const fetchBoardItemsSuccess = createAction(FETCH_BOARD_ITEMS_SUCCESS);
export const fetchBoardItemsFailure = createAction(FETCH_BOARD_ITEMS_FAILURE);


// Current
export const SET_CURRENT_ITEM: string = "SET_CURRENT_ITEM";
export const setCurrentItem = createAction(SET_CURRENT_ITEM);


// Image editing
export const SET_ITEM_IMAGE_EDITING: string = "SET_ITEM_IMAGE_EDITING";
export const setItemImageEditing = createAction(SET_ITEM_IMAGE_EDITING);


// Detail drawer
export const ITEM_DETAIL_DRAWER_TOGGLE: string = "ITEM_DETAIL_DRAWER_TOGGLE";
export const ITEM_DETAIL_DRAWER_OPEN: string = "ITEM_DETAIL_DRAWER_OPEN";
export const ITEM_DETAIL_DRAWER_CLOSE: string = "ITEM_DETAIL_DRAWER_CLOSE";

export const itemDetailDrawerToggle = createAction(ITEM_DETAIL_DRAWER_TOGGLE);
export const itemDetailDrawerOpen = createAction(ITEM_DETAIL_DRAWER_OPEN);
export const itemDetailDrawerClose = createAction(ITEM_DETAIL_DRAWER_CLOSE);
