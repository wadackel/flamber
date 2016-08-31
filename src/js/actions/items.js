import { createAction } from "redux-actions";


// Set color
export const SET_ITEM_CURRENT_COLOR = "SET_ITEM_CURRENT_COLOR";
export const setItemCurrentColor = createAction(SET_ITEM_CURRENT_COLOR);


// Ser visibility filters
export const SET_ITEM_VISIBILITY_FILTER = "SET_ITEM_VISIBILITY_FILTER";
export const setItemVisibilityFilter = createAction(SET_ITEM_VISIBILITY_FILTER);


// Background sync
export const BG_SYNC_ITEMS_START = "BG_SYNC_ITEMS_START";
export const BG_SYNC_ITEMS_STOP = "BG_SYNC_ITEMS_STOP";
export const BG_SYNC_ITEMS_REQUEST = "BG_SYNC_ITEMS_REQUEST";
export const BG_SYNC_ITEMS_SUCCESS = "BG_SYNC_ITEMS_SUCCESS";
export const BG_SYNC_ITEMS_FAILURE = "BG_SYNC_ITEMS_FAILURE";

export const bgSyncItemsStart = createAction(BG_SYNC_ITEMS_START);
export const bgSyncItemsStop = createAction(BG_SYNC_ITEMS_STOP);
export const bgSyncItemsRequest = createAction(BG_SYNC_ITEMS_REQUEST);
export const bgSyncItemsSuccess = createAction(BG_SYNC_ITEMS_SUCCESS);
export const bgSyncItemsFailure = createAction(BG_SYNC_ITEMS_FAILURE);


// Fetch
export const FETCH_ITEMS_REQUEST = "FETCH_ITEMS_REQUEST";
export const FETCH_ITEMS_SUCCESS = "FETCH_ITEMS_SUCCESS";
export const FETCH_ITEMS_FAILURE = "FETCH_ITEMS_FAILURE";

export const fetchItemsRequest = createAction(FETCH_ITEMS_REQUEST);
export const fetchItemsSuccess = createAction(FETCH_ITEMS_SUCCESS);
export const fetchItemsFailure = createAction(FETCH_ITEMS_FAILURE);


// Add (UI)
export const ADD_ITEM_DIALOG_OPEN = "ADD_ITEM_DIALOG_OPEN";
export const ADD_ITEM_DIALOG_CLOSE = "ADD_ITEM_DIALOG_CLOSE";

export const addItemDialogOpen = createAction(ADD_ITEM_DIALOG_OPEN);
export const addItemDialogClose = createAction(ADD_ITEM_DIALOG_CLOSE);


// Add
export const ADD_ITEM_REQUEST = "ADD_ITEM_REQUEST";
export const ADD_ITEM_SUCCESS = "ADD_ITEM_SUCCESS";
export const ADD_ITEM_FAILURE = "ADD_ITEM_FAILURE";

export const addItemRequest = createAction(ADD_ITEM_REQUEST);
export const addItemSuccess = createAction(ADD_ITEM_SUCCESS);
export const addItemFailure = createAction(ADD_ITEM_FAILURE);


// Goto added item
export const GOTO_ADDED_ITEM = "GOTO_ADDED_ITEM";
export const gotoAddedItem = createAction(GOTO_ADDED_ITEM);


// Star
export const STAR_ITEM_TOGGLE_REQUEST = "STAR_ITEM_TOGGLE_REQUEST";
export const STAR_ITEM_TOGGLE_SUCCESS = "STAR_ITEM_TOGGLE_SUCCESS";
export const STAR_ITEM_TOGGLE_FAILURE = "STAR_ITEM_TOGGLE_FAILURE";

export const starItemToggleRequest = createAction(STAR_ITEM_TOGGLE_REQUEST);
export const starItemToggleSuccess = createAction(STAR_ITEM_TOGGLE_SUCCESS);
export const starItemToggleFailure = createAction(STAR_ITEM_TOGGLE_FAILURE,
  null,
  (payload, id) => id
);


// Update name
function updateItemMetaCreator(error, payload) {
  return { ...payload };
}

export const UPDATE_ITEM_NAME_IF_NEEDED = "UPDATE_ITEM_NAME_IF_NEEDED";
export const UPDATE_ITEM_NAME_REQUEST = "UPDATE_ITEM_NAME_REQUEST";
export const UPDATE_ITEM_NAME_SUCCESS = "UPDATE_ITEM_NAME_SUCCESS";
export const UPDATE_ITEM_NAME_FAILURE = "UPDATE_ITEM_NAME_FAILURE";

function updateNamePayloadCreator(id, name) {
  return { id, name };
}

export const updateItemNameIfNeeded = createAction(UPDATE_ITEM_NAME_IF_NEEDED, updateNamePayloadCreator);
export const updateItemNameRequest = createAction(UPDATE_ITEM_NAME_REQUEST, updateNamePayloadCreator);
export const updateItemNameSuccess = createAction(UPDATE_ITEM_NAME_SUCCESS);
export const updateItemNameFailure = createAction(UPDATE_ITEM_NAME_FAILURE,
  null,
  updateItemMetaCreator
);


// Update description
export const UPDATE_ITEM_DESCRIPTION_REQUEST = "UPDATE_ITEM_DESCRIPTION_REQUEST";
export const UPDATE_ITEM_DESCRIPTION_SUCCESS = "UPDATE_ITEM_DESCRIPTION_SUCCESS";
export const UPDATE_ITEM_DESCRIPTION_FAILURE = "UPDATE_ITEM_DESCRIPTION_FAILURE";

export const updateItemDescriptionRequest = createAction(UPDATE_ITEM_DESCRIPTION_REQUEST,
  (id, description) => ({ id, description })
);
export const updateItemDescriptionSuccess = createAction(UPDATE_ITEM_DESCRIPTION_SUCCESS);
export const updateItemDescriptionFailure = createAction(UPDATE_ITEM_DESCRIPTION_FAILURE,
  null,
  updateItemMetaCreator
);


// Update palette
export const UPDATE_ITEM_PALETTE_REQUEST = "UPDATE_ITEM_PALETTE_REQUEST";
export const UPDATE_ITEM_PALETTE_SUCCESS = "UPDATE_ITEM_PALETTE_SUCCESS";
export const UPDATE_ITEM_PALETTE_FAILURE = "UPDATE_ITEM_PALETTE_FAILURE";

export const updateItemPaletteRequest = createAction(UPDATE_ITEM_PALETTE_REQUEST,
  (id, palette) => ({ id, palette })
);
export const updateItemPaletteSuccess = createAction(UPDATE_ITEM_PALETTE_SUCCESS);
export const updateItemPaletteFailure = createAction(UPDATE_ITEM_PALETTE_FAILURE,
  null,
  updateItemMetaCreator
);


// Add tag
export const ADD_ITEM_TAG_IF_NEEDED = "ADD_ITEM_TAG_IF_NEEDED";
export const ADD_ITEM_TAG_REQUEST = "ADD_ITEM_TAG_REQUEST";
export const ADD_ITEM_TAG_SUCCESS = "ADD_ITEM_TAG_SUCCESS";
export const ADD_ITEM_TAG_FAILURE = "ADD_ITEM_TAG_FAILURE";

function addItemTagPayloadCreator(id, tagId) {
  return { id, tagId };
}

export const addItemTagIfNeeded = createAction(ADD_ITEM_TAG_IF_NEEDED, addItemTagPayloadCreator);
export const addItemTagRequest = createAction(ADD_ITEM_TAG_REQUEST, addItemTagPayloadCreator);
export const addItemTagSuccess = createAction(ADD_ITEM_TAG_SUCCESS);
export const addItemTagFailure = createAction(ADD_ITEM_TAG_FAILURE,
  null,
  updateItemMetaCreator
);


// Remove tag
export const REMOVE_ITEM_TAG_REQUEST = "REMOVE_ITEM_TAG_REQUEST";
export const REMOVE_ITEM_TAG_SUCCESS = "REMOVE_ITEM_TAG_SUCCESS";
export const REMOVE_ITEM_TAG_FAILURE = "REMOVE_ITEM_TAG_FAILURE";

export const removeItemTagRequest = createAction(REMOVE_ITEM_TAG_REQUEST, (id, tagId) => ({ id, tagId }));
export const removeItemTagSuccess = createAction(REMOVE_ITEM_TAG_SUCCESS);
export const removeItemTagFailure = createAction(REMOVE_ITEM_TAG_FAILURE,
  null,
  updateItemMetaCreator
);


// Move board
export const MOVE_ITEM_SELECT_BOARD_OPEN = "MOVE_ITEM_SELECT_BOARD_OPEN";
export const MOVE_ITEM_SELECT_BOARD_CLOSE = "MOVE_ITEM_SELECT_BOARD_CLOSE";
export const MOVE_ITEM_REQUEST = "MOVE_ITEM_REQUEST";
export const MOVE_ITEM_SUCCESS = "MOVE_ITEM_SUCCESS";
export const MOVE_ITEM_FAILURE = "MOVE_ITEM_FAILURE";

export const moveItemSelectBoardOpen = createAction(MOVE_ITEM_SELECT_BOARD_OPEN);
export const moveItemSelectBoardClose = createAction(MOVE_ITEM_SELECT_BOARD_CLOSE);
export const moveItemRequest = createAction(MOVE_ITEM_REQUEST);
export const moveItemSuccess = createAction(MOVE_ITEM_SUCCESS,
  null,
  (payload, prevBoard) => ({ prevBoard })
);
export const moveItemFailure = createAction(MOVE_ITEM_FAILURE,
  null,
  (payload, item, prevBoard, nextBoard) => ({ item, prevBoard, nextBoard })
);


// Goto after board
export const GOTO_AFTER_MOVE_ITEM_BOARD = "GOTO_AFTER_MOVE_ITEM_BOARD";
export const gotoAfterMoveItemBoard = createAction(GOTO_AFTER_MOVE_ITEM_BOARD);


// Delete
export const DELETE_ITEM_REQUEST = "DELETE_ITEM_REQUEST";
export const DELETE_ITEM_SUCCESS = "DELETE_ITEM_SUCCESS";
export const DELETE_ITEM_FAILURE = "DELETE_ITEM_FAILURE";

export const deleteItemRequest = createAction(DELETE_ITEM_REQUEST);
export const deleteItemSuccess = createAction(DELETE_ITEM_SUCCESS);
export const deleteItemFailure = createAction(DELETE_ITEM_FAILURE,
  null,
  (payload, entity) => ({ entity })
);


// Select
export const SELECT_ITEM_TOGGLE = "SELECT_ITEM_TOGGLE";
export const selectItemToggle = createAction(SELECT_ITEM_TOGGLE);


// Select all
export const SELECT_ALL_ITEM_EXEC = "SELECT_ALL_ITEM_EXEC";
export const SELECT_ALL_ITEM = "SELECT_ALL_ITEM";
export const selectAllItemExec = createAction(SELECT_ALL_ITEM_EXEC);
export const selectAllItem = createAction(SELECT_ALL_ITEM,
  null,
  () => selectAllItemExec
);


// Unselect all
export const UNSELECT_ALL_ITEM_EXEC = "UNSELECT_ALL_ITEM_EXEC";
export const UNSELECT_ALL_ITEM = "UNSELECT_ALL_ITEM";
export const unselectAllItemExec = createAction(UNSELECT_ALL_ITEM_EXEC);
export const unselectAllItem = createAction(UNSELECT_ALL_ITEM,
  null,
  () => unselectAllItemExec
);


// Select star items
export const SELECT_STAR_ITEM_EXEC = "SELECT_STAR_ITEM_EXEC";
export const SELECT_STAR_ITEM = "SELECT_STAR_ITEM";
export const selectStarItemExec = createAction(SELECT_STAR_ITEM_EXEC);
export const selectStarItem = createAction(SELECT_STAR_ITEM,
  null,
  () => selectStarItemExec
);


// Selected items move
export const SELECTED_ITEMS_MOVE_OPEN = "SELECTED_ITEMS_MOVE_OPEN";
export const SELECTED_ITEMS_MOVE_CLOSE = "SELECTED_ITEMS_MOVE_CLOSE";
export const SELECTED_ITEMS_MOVE_REQUEST = "SELECTED_ITEMS_MOVE_REQUEST";
export const SELECTED_ITEMS_MOVE_SUCCESS = "SELECTED_ITEMS_MOVE_SUCCESS";
export const SELECTED_ITEMS_MOVE_FAILURE = "SELECTED_ITEMS_MOVE_FAILURE";

export const selectedItemsMoveOpen = createAction(SELECTED_ITEMS_MOVE_OPEN);
export const selectedItemsMoveClose = createAction(SELECTED_ITEMS_MOVE_CLOSE);
export const selectedItemsMoveRequest = createAction(SELECTED_ITEMS_MOVE_REQUEST);
export const selectedItemsMoveSuccess = createAction(SELECTED_ITEMS_MOVE_SUCCESS,
  null,
  (payload, prevBoards) => ({ prevBoards })
);
export const selectedItemsMoveFailure = createAction(SELECTED_ITEMS_MOVE_FAILURE,
  null,
  (payload, items, prevBoards, nextBoard) => ({ items, prevBoards, nextBoard })
);


// Selected items star
export const SELECTED_ITEMS_STAR_REQUEST = "SELECTED_ITEMS_STAR_REQUEST";
export const SELECTED_ITEMS_STAR_SUCCESS = "SELECTED_ITEMS_STAR_SUCCESS";
export const SELECTED_ITEMS_STAR_FAILURE = "SELECTED_ITEMS_STAR_FAILURE";

export const selectedItemsStarRequest = createAction(SELECTED_ITEMS_STAR_REQUEST);
export const selectedItemsStarSuccess = createAction(SELECTED_ITEMS_STAR_SUCCESS);
export const selectedItemsStarFailure = createAction(SELECTED_ITEMS_STAR_FAILURE,
  null,
  (payload, entities) => ({ entities })
);


// Selected items delete
export const SELECTED_ITEMS_DELETE_REQUEST = "SELECTED_ITEMS_DELETE_REQUEST";
export const SELECTED_ITEMS_DELETE_SUCCESS = "SELECTED_ITEMS_DELETE_SUCCESS";
export const SELECTED_ITEMS_DELETE_FAILURE = "SELECTED_ITEMS_DELETE_FAILURE";

export const selectedItemsDeleteRequest = createAction(SELECTED_ITEMS_DELETE_REQUEST);
export const selectedItemsDeleteSuccess = createAction(SELECTED_ITEMS_DELETE_SUCCESS);
export const selectedItemsDeleteFailure = createAction(SELECTED_ITEMS_DELETE_FAILURE,
  null,
  (payload, entities) => ({ entities })
);


// Fetch board items
export const FETCH_BOARD_ITEMS_REQUEST = "FETCH_BOARD_ITEMS_REQUEST";
export const FETCH_BOARD_ITEMS_SUCCESS = "FETCH_BOARD_ITEMS_SUCCESS";
export const FETCH_BOARD_ITEMS_FAILURE = "FETCH_BOARD_ITEMS_FAILURE";

export const fetchBoardItemsRequest = createAction(FETCH_BOARD_ITEMS_REQUEST);
export const fetchBoardItemsSuccess = createAction(FETCH_BOARD_ITEMS_SUCCESS);
export const fetchBoardItemsFailure = createAction(FETCH_BOARD_ITEMS_FAILURE);


// Current
export const SET_CURRENT_ITEM = "SET_CURRENT_ITEM";
export const setCurrentItem = createAction(SET_CURRENT_ITEM);


// Detail drawer
export const ITEM_DETAIL_DRAWER_TOGGLE = "ITEM_DETAIL_DRAWER_TOGGLE";
export const ITEM_DETAIL_DRAWER_OPEN = "ITEM_DETAIL_DRAWER_OPEN";
export const ITEM_DETAIL_DRAWER_CLOSE = "ITEM_DETAIL_DRAWER_CLOSE";

export const itemDetailDrawerToggle = createAction(ITEM_DETAIL_DRAWER_TOGGLE);
export const itemDetailDrawerOpen = createAction(ITEM_DETAIL_DRAWER_OPEN);
export const itemDetailDrawerClose = createAction(ITEM_DETAIL_DRAWER_CLOSE);
