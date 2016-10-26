// @flow
import { identity } from "lodash";
import { createAction } from "redux-actions";

import type {
  BoardId,
  Board,
  Boards,

  AddBoardDialogOpenAction,
  AddBoardDialogCloseAction,

  AddBoardSuccessPayload,
  AddBoardRequestAction,
  AddBoardSuccessAction,
  AddBoardFailureAction,

  GotoAddedBoardAction
} from "../types/board";


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

export const addBoardDialogOpen = (): AddBoardDialogOpenAction => (
  { type: ADD_BOARD_DIALOG_OPEN }
);

export const addBoardDialogClose = (): AddBoardDialogCloseAction => (
  { type: ADD_BOARD_DIALOG_CLOSE }
);


// Add
export const ADD_BOARD_REQUEST = "ADD_BOARD_REQUEST";
export const ADD_BOARD_SUCCESS = "ADD_BOARD_SUCCESS";
export const ADD_BOARD_FAILURE = "ADD_BOARD_FAILURE";

export const addBoardRequest = (name: string, secret: boolean): AddBoardRequestAction => (
  { type: ADD_BOARD_REQUEST, payload: { name, secret } }
);

export const addBoardSuccess = (payload: AddBoardSuccessPayload): AddBoardSuccessAction => (
  { type: ADD_BOARD_SUCCESS, payload }
);

export const addBoardFailure = (error: Error): AddBoardFailureAction => (
  { type: ADD_BOARD_FAILURE, payload: error, error: true }
);


// Goto added board
export const GOTO_ADDED_BOARD = "GOTO_ADDED_BOARD";
export const gotoAddedBoard = (id: BoardId): GotoAddedBoardAction => (
  { type: GOTO_ADDED_BOARD, payload: id }
);


// Update
export const UPDATE_BOARD_IF_NEEDED: string = "UPDATE_BOARD_IF_NEEDED";
export const UPDATE_BOARD_REQUEST: string = "UPDATE_BOARD_REQUEST";
export const UPDATE_BOARD_SUCCESS: string = "UPDATE_BOARD_SUCCESS";
export const UPDATE_BOARD_FAILURE: string = "UPDATE_BOARD_FAILURE";

export const updateBoardIfNeeded = createAction(UPDATE_BOARD_IF_NEEDED);
export const updateBoardRequest = createAction(UPDATE_BOARD_REQUEST);
export const updateBoardSuccess = createAction(UPDATE_BOARD_SUCCESS);
export const updateBoardFailure = createAction(UPDATE_BOARD_FAILURE,
  identity,
  (payload: Object, entity: Boards): Array<any> => entity
);


// Delete
export const DELETE_BOARD_REQUEST: string = "DELETE_BOARD_REQUEST";
export const DELETE_BOARD_SUCCESS: string = "DELETE_BOARD_SUCCESS";
export const DELETE_BOARD_FAILURE: string = "DELETE_BOARD_FAILURE";

export const deleteBoardRequest = createAction(DELETE_BOARD_REQUEST);
export const deleteBoardSuccess = createAction(DELETE_BOARD_SUCCESS);
export const deleteBoardFailure = createAction(DELETE_BOARD_FAILURE,
  identity,
  (payload: Object, entity: Board): Object => entity
);


// Current
export const SET_CURRENT_BOARD: string = "SET_CURRENT_BOARD";
export const setCurrentBoard = createAction(SET_CURRENT_BOARD);


// Select
export const SELECT_BOARD_TOGGLE: string = "SELECT_BOARD_TOGGLE";
export const selectBoardToggle = createAction(SELECT_BOARD_TOGGLE);


// Selected boards delete
export const SELECTED_BOARDS_DELETE_REQUEST: string = "SELECTED_BOARDS_DELETE_REQUEST";
export const SELECTED_BOARDS_DELETE_SUCCESS: string = "SELECTED_BOARDS_DELETE_SUCCESS";
export const SELECTED_BOARDS_DELETE_FAILURE: string = "SELECTED_BOARDS_DELETE_FAILURE";

export const selectedBoardsDeleteRequest = createAction(SELECTED_BOARDS_DELETE_REQUEST);
export const selectedBoardsDeleteSuccess = createAction(SELECTED_BOARDS_DELETE_SUCCESS);
export const selectedBoardsDeleteFailure = createAction(SELECTED_BOARDS_DELETE_FAILURE,
  identity,
  (payload: Object, entities: Boards): Boards => entities
);
