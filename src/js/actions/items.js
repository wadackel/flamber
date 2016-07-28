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


// Fetch board items
export const FETCH_BOARD_ITEMS_REQUEST = "FETCH_BOARD_ITEMS_REQUEST";
export const FETCH_BOARD_ITEMS_SUCCESS = "FETCH_BOARD_ITEMS_SUCCESS";
export const FETCH_BOARD_ITEMS_FAILURE = "FETCH_BOARD_ITEMS_FAILURE";

export const fetchBoardItemsRequest = createAction(FETCH_BOARD_ITEMS_REQUEST);
export const fetchBoardItemsSuccess = createAction(FETCH_BOARD_ITEMS_SUCCESS);
export const fetchBoardItemsFailure = createAction(FETCH_BOARD_ITEMS_FAILURE);


// Add board items
export const ADD_BOARD_ITEM = "ADD_BOARD_ITEM";
export const addBoardItem = createAction(ADD_BOARD_ITEM);


// Delete board items
export const DELETE_BOARD_ITEM = "DELETE_BOARD_ITEM";
export const deleteBoardItem = createAction(DELETE_BOARD_ITEM);
