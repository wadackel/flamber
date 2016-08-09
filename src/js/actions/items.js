import { createAction } from "redux-actions";


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


// Add (UI)
export const ADD_ITEM_DIALOG_OPEN = "ADD_ITEM_DIALOG_OPEN";
export const ADD_ITEM_DIALOG_CLOSE = "ADD_ITEM_DIALOG_CLOSE";
export const ADD_ITEM_SNACKBAR_CLOSE = "ADD_ITEM_SNACKBAR_CLOSE";

export const addItemDialogOpen = createAction(ADD_ITEM_DIALOG_OPEN);
export const addItemDialogClose = createAction(ADD_ITEM_DIALOG_CLOSE);
export const addItemSnackbarClose = createAction(ADD_ITEM_SNACKBAR_CLOSE);


// Add
export const ADD_ITEM_REQUEST = "ADD_ITEM_REQUEST";
export const ADD_ITEM_SUCCESS = "ADD_ITEM_SUCCESS";
export const ADD_ITEM_FAILURE = "ADD_ITEM_FAILURE";

export const addItemRequest = createAction(ADD_ITEM_REQUEST);
export const addItemSuccess = createAction(ADD_ITEM_SUCCESS);
export const addItemFailure = createAction(ADD_ITEM_FAILURE);


// Favorite
export const FAVORITE_ITEM_TOGGLE_REQUEST = "FAVORITE_ITEM_TOGGLE_REQUEST";
export const FAVORITE_ITEM_TOGGLE_SUCCESS = "FAVORITE_ITEM_TOGGLE_SUCCESS";
export const FAVORITE_ITEM_TOGGLE_FAILURE = "FAVORITE_ITEM_TOGGLE_FAILURE";

export const favoriteItemToggleRequest = createAction(FAVORITE_ITEM_TOGGLE_REQUEST);
export const favoriteItemToggleSuccess = createAction(FAVORITE_ITEM_TOGGLE_SUCCESS);
export const favoriteItemToggleFailure = createAction(FAVORITE_ITEM_TOGGLE_FAILURE,
  null,
  (payload, id) => id
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


// Delete
export const DELETE_ITEM_REQUEST = "DELETE_ITEM_REQUEST";
export const DELETE_ITEM_SUCCESS = "DELETE_ITEM_SUCCESS";
export const DELETE_ITEM_FAILURE = "DELETE_ITEM_FAILURE";

export const deleteItemRequest = createAction(DELETE_ITEM_REQUEST);
export const deleteItemSuccess = createAction(DELETE_ITEM_SUCCESS);
export const deleteItemFailure = createAction(DELETE_ITEM_FAILURE);


// Select
export const SELECT_ITEM_TOGGLE = "SELECT_ITEM_TOGGLE";
export const selectItemToggle = createAction(SELECT_ITEM_TOGGLE);


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


// Selected items favorite
export const SELECTED_ITEMS_FAVORITE_REQUEST = "SELECTED_ITEMS_FAVORITE_REQUEST";
export const SELECTED_ITEMS_FAVORITE_SUCCESS = "SELECTED_ITEMS_FAVORITE_SUCCESS";
export const SELECTED_ITEMS_FAVORITE_FAILURE = "SELECTED_ITEMS_FAVORITE_FAILURE";

export const selectedItemsFavoriteRequest = createAction(SELECTED_ITEMS_FAVORITE_REQUEST);
export const selectedItemsFavoriteSuccess = createAction(SELECTED_ITEMS_FAVORITE_SUCCESS);
export const selectedItemsFavoriteFailure = createAction(SELECTED_ITEMS_FAVORITE_FAILURE,
  null,
  (payload, entities) => entities
);


// Selected items delete
export const SELECTED_ITEMS_DELETE_REQUEST = "SELECTED_ITEMS_DELETE_REQUEST";
export const SELECTED_ITEMS_DELETE_SUCCESS = "SELECTED_ITEMS_DELETE_SUCCESS";
export const SELECTED_ITEMS_DELETE_FAILURE = "SELECTED_ITEMS_DELETE_FAILURE";

export const selectedItemsDeleteRequest = createAction(SELECTED_ITEMS_DELETE_REQUEST);
export const selectedItemsDeleteSuccess = createAction(SELECTED_ITEMS_DELETE_SUCCESS);
export const selectedItemsDeleteFailure = createAction(SELECTED_ITEMS_DELETE_FAILURE);


// Fetch board items
export const FETCH_BOARD_ITEMS_REQUEST = "FETCH_BOARD_ITEMS_REQUEST";
export const FETCH_BOARD_ITEMS_SUCCESS = "FETCH_BOARD_ITEMS_SUCCESS";
export const FETCH_BOARD_ITEMS_FAILURE = "FETCH_BOARD_ITEMS_FAILURE";

export const fetchBoardItemsRequest = createAction(FETCH_BOARD_ITEMS_REQUEST);
export const fetchBoardItemsSuccess = createAction(FETCH_BOARD_ITEMS_SUCCESS);
export const fetchBoardItemsFailure = createAction(FETCH_BOARD_ITEMS_FAILURE);
