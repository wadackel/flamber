import { createAction } from "redux-actions";


// Fetch
export const FETCH_BOARDS_REQUEST = "FETCH_BOARDS_REQUEST";
export const FETCH_BOARDS_SUCCESS = "FETCH_BOARDS_SUCCESS";
export const FETCH_BOARDS_FAILURE = "FETCH_BOARDS_FAILURE";

export const fetchBoardsRequest = createAction(FETCH_BOARDS_REQUEST);
export const fetchBoardsSuccess = createAction(FETCH_BOARDS_SUCCESS);
export const fetchBoardsFailure = createAction(FETCH_BOARDS_FAILURE);


// Add (UI)
export const ADD_BOARD_DIALOG_OPEN = "ADD_BOARD_DIALOG_OPEN";
export const ADD_BOARD_DIALOG_CLOSE = "ADD_BOARD_DIALOG_CLOSE";
export const ADD_BOARD_SNACKBAR_CLOSE = "ADD_BOARD_SNACKBAR_CLOSE";

export const addBoardDialogOpen = createAction(ADD_BOARD_DIALOG_OPEN);
export const addBoardDialogClose = createAction(ADD_BOARD_DIALOG_CLOSE);
export const addBoardSnackbarClose = createAction(ADD_BOARD_SNACKBAR_CLOSE);


// Add
export const ADD_BOARD_REQUEST = "ADD_BOARD_REQUEST";
export const ADD_BOARD_SUCCESS = "ADD_BOARD_SUCCESS";
export const ADD_BOARD_FAILURE = "ADD_BOARD_FAILURE";

export const addBoardRequest = createAction(ADD_BOARD_REQUEST);
export const addBoardSuccess = createAction(ADD_BOARD_SUCCESS);
export const addBoardFailure = createAction(ADD_BOARD_FAILURE);


// Update
export const UPDATE_BOARD_IF_NEEDED = "UPDATE_BOARD_IF_NEEDED";
export const UPDATE_BOARD_REQUEST = "UPDATE_BOARD_REQUEST";
export const UPDATE_BOARD_SUCCESS = "UPDATE_BOARD_SUCCESS";
export const UPDATE_BOARD_FAILURE = "UPDATE_BOARD_FAILURE";

export const updateBoardIfNeeded = createAction(UPDATE_BOARD_IF_NEEDED);
export const updateBoardRequest = createAction(UPDATE_BOARD_REQUEST);
export const updateBoardSuccess = createAction(UPDATE_BOARD_SUCCESS);
export const updateBoardFailure = createAction(UPDATE_BOARD_FAILURE);


// Delete
export const DELETE_BOARD_REQUEST = "DELETE_BOARD_REQUEST";
export const DELETE_BOARD_SUCCESS = "DELETE_BOARD_SUCCESS";
export const DELETE_BOARD_FAILURE = "DELETE_BOARD_FAILURE";

export const deleteBoardRequest = createAction(DELETE_BOARD_REQUEST);
export const deleteBoardSuccess = createAction(DELETE_BOARD_SUCCESS);
export const deleteBoardFailure = createAction(DELETE_BOARD_FAILURE,
  null,
  (payload, entity) => entity
);


// Current
export const SET_CURRENT_BOARD = "SET_CURRENT_BOARD";
export const setCurrentBoard = createAction(SET_CURRENT_BOARD);


// Select
export const SELECT_BOARD_TOGGLE = "SELECT_BOARD_TOGGLE";
export const selectBoardToggle = createAction(SELECT_BOARD_TOGGLE);


// Selected boards delete
export const SELECTED_BOARDS_DELETE_REQUEST = "SELECTED_BOARDS_DELETE_REQUEST";
export const SELECTED_BOARDS_DELETE_SUCCESS = "SELECTED_BOARDS_DELETE_SUCCESS";
export const SELECTED_BOARDS_DELETE_FAILURE = "SELECTED_BOARDS_DELETE_FAILURE";

export const selectedBoardsDeleteRequest = createAction(SELECTED_BOARDS_DELETE_REQUEST);
export const selectedBoardsDeleteSuccess = createAction(SELECTED_BOARDS_DELETE_SUCCESS);
export const selectedBoardsDeleteFailure = createAction(SELECTED_BOARDS_DELETE_FAILURE,
  null,
  (payload, entities) => entities
);
