import { createAction } from "redux-actions";


// Fetch boards
export const FETCH_BOARDS_REQUEST = "FETCH_BOARDS_REQUEST";
export const FETCH_BOARDS_SUCCESS = "FETCH_BOARDS_SUCCESS";
export const FETCH_BOARDS_FAILURE = "FETCH_BOARDS_FAILURE";

export const fetchBoardsRequest = createAction(FETCH_BOARDS_REQUEST);
export const fetchBoardsSuccess = createAction(FETCH_BOARDS_SUCCESS);
export const fetchBoardsFailure = createAction(FETCH_BOARDS_FAILURE);
