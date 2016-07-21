import { createAction } from "redux-actions";


// Fetch boards
export const FETCH_BOARDS_REQUEST = "FETCH_BOARDS_REQUEST";
export const FETCH_BOARDS_SUCCESS = "FETCH_BOARDS_SUCCESS";
export const FETCH_BOARDS_FAILURE = "FETCH_BOARDS_FAILURE";

export const fetchBoardsRequest = createAction(FETCH_BOARDS_REQUEST);
export const fetchBoardsSuccess = createAction(FETCH_BOARDS_SUCCESS);
export const fetchBoardsFailure = createAction(FETCH_BOARDS_FAILURE);


// Add board
export const ADD_BOARD_REQUEST = "ADD_BOARD_REQUEST";
export const ADD_BOARD_SUCCESS = "ADD_BOARD_SUCCESS";
export const ADD_BOARD_FAILURE = "ADD_BOARD_FAILURE";

export const addBoardRequest = createAction(ADD_BOARD_REQUEST);
export const addBoardSuccess = createAction(ADD_BOARD_SUCCESS);
export const addBoardFailure = createAction(ADD_BOARD_FAILURE);


// Delete
export const DELETE_BOARD_REQUEST = "DELETE_BOARD_REQUEST";
export const DELETE_BOARD_SUCCESS = "DELETE_BOARD_SUCCESS";
export const DELETE_BOARD_FAILURE = "DELETE_BOARD_FAILURE";

export const deleteBoardRequest = createAction(DELETE_BOARD_REQUEST);
export const deleteBoardSuccess = createAction(DELETE_BOARD_SUCCESS);
export const deleteBoardFailure = createAction(DELETE_BOARD_FAILURE);
