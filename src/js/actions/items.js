import { createAction } from "redux-actions";


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
export const favoriteItemToggleFailure = createAction(FAVORITE_ITEM_TOGGLE_FAILURE);


// Move board
export const MOVE_ITEM_BOARD_REQUEST = "MOVE_ITEM_BOARD_REQUEST";
export const MOVE_ITEM_BOARD_SUCCESS = "MOVE_ITEM_BOARD_SUCCESS";
export const MOVE_ITEM_BOARD_FAILURE = "MOVE_ITEM_BOARD_FAILURE";

export const moveItemBoardRequest = createAction(MOVE_ITEM_BOARD_REQUEST);
export const moveItemBoardSuccess = createAction(MOVE_ITEM_BOARD_SUCCESS);
export const moveItemBoardFailure = createAction(MOVE_ITEM_BOARD_FAILURE);


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
export const SELECTED_ITEMS_MOVE_REQUEST = "SELECTED_ITEMS_MOVE_REQUEST";
export const SELECTED_ITEMS_MOVE_SUCCESS = "SELECTED_ITEMS_MOVE_SUCCESS";
export const SELECTED_ITEMS_MOVE_FAILURE = "SELECTED_ITEMS_MOVE_FAILURE";

export const selectedItemsMoveRequest = createAction(SELECTED_ITEMS_MOVE_REQUEST);
export const selectedItemsMoveSuccess = createAction(SELECTED_ITEMS_MOVE_SUCCESS);
export const selectedItemsMoveFailure = createAction(SELECTED_ITEMS_MOVE_FAILURE);


// Selected items favorite
export const SELECTED_ITEMS_FAVORITE_REQUEST = "SELECTED_ITEMS_FAVORITE_REQUEST";
export const SELECTED_ITEMS_FAVORITE_SUCCESS = "SELECTED_ITEMS_FAVORITE_SUCCESS";
export const SELECTED_ITEMS_FAVORITE_FAILURE = "SELECTED_ITEMS_FAVORITE_FAILURE";

export const selectedItemsFavoriteRequest = createAction(SELECTED_ITEMS_FAVORITE_REQUEST);
export const selectedItemsFavoriteSuccess = createAction(SELECTED_ITEMS_FAVORITE_SUCCESS);
export const selectedItemsFavoriteFailure = createAction(SELECTED_ITEMS_FAVORITE_FAILURE);


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


// Clear items
export const CLEAR_ITEMS = "CLEAR_ITEMS";
export const clearItems = createAction(CLEAR_ITEMS);


// Add board item
export const ADD_BOARD_ITEM = "ADD_BOARD_ITEM";
export const addBoardItem = createAction(ADD_BOARD_ITEM);


// Remove board item
export const REMOVE_BOARD_ITEM = "REMOVE_BOARD_ITEM";
export const removeBoardItem = createAction(REMOVE_BOARD_ITEM);

export const REMOVE_BOARD_ITEMS = "REMOVE_BOARD_ITEMS";
export const removeBoardItems = createAction(REMOVE_BOARD_ITEMS);
