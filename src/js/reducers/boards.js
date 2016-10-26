// @flow
import { handleActions } from "redux-actions";
import * as A from "../actions/auth";
import * as B from "../actions/boards";

import type {
  BoardState,
  AddBoardSuccessAction,
  AddBoardFailureAction
} from "../types/board";


const initialState: BoardState = {
  isFetching: false,
  isAdding: false,
  results: [],
  currentBoardId: null,
  error: null,
  addDialogOpen: false
};

export default handleActions({
  // Fetch list
  [A.FETCH_CURRENT_USER_SUCCESS]: state => ({
    ...state,
    isFetching: true
  }),

  [B.FETCH_BOARDS_REQUEST]: state => ({
    ...state,
    isFetching: true
  }),

  [B.FETCH_BOARDS_SUCCESS]: (state, { payload }) => ({
    ...state,
    isFetching: false,
    results: payload.result.boards
  }),

  [B.FETCH_BOARDS_FAILURE]: (state, { payload }) => ({
    ...state,
    isFetching: false,
    error: payload
  }),


  // Add (UI)
  [B.ADD_BOARD_DIALOG_OPEN]: (state: BoardState): BoardState => ({
    ...state,
    addDialogOpen: true
  }),

  [B.ADD_BOARD_DIALOG_CLOSE]: (state: BoardState): BoardState => ({
    ...state,
    addDialogOpen: false
  }),


  // Add
  [B.ADD_BOARD_REQUEST]: (state: BoardState): BoardState => ({
    ...state,
    isAdding: true
  }),

  [B.ADD_BOARD_SUCCESS]: (state: BoardState, action: AddBoardSuccessAction): BoardState => ({
    ...state,
    isAdding: false,
    results: [...state.results, action.payload.result.board],
    addDialogOpen: false
  }),

  [B.ADD_BOARD_FAILURE]: (state: BoardState, action: AddBoardFailureAction): BoardState => ({
    ...state,
    isAdding: false,
    error: action.payload
  }),


  // Delete
  [B.DELETE_BOARD_REQUEST]: state => ({
    ...state,
    isDeleting: true
  }),

  [B.DELETE_BOARD_SUCCESS]: (state, { payload }) => ({
    ...state,
    isDeleting: false,
    results: state.results.filter(id => id !== payload.id)
  }),

  [B.DELETE_BOARD_FAILURE]: (state, { payload }) => ({
    ...state,
    isDeleting: false,
    error: payload
  }),


  // Current
  [B.SET_CURRENT_BOARD]: (state, { payload }) => ({
    ...state,
    currentBoardId: payload
  }),


  // Selected boards delete
  [B.SELECTED_BOARDS_DELETE_REQUEST]: state => ({
    ...state,
    isDeleting: true
  }),

  [B.SELECTED_BOARDS_DELETE_SUCCESS]: (state, { payload }) => ({
    ...state,
    isDeleting: false,
    results: state.results.filter(id => !payload.some(o => id === o.id))
  }),

  [B.SELECTED_BOARDS_DELETE_FAILURE]: (state, { payload }) => ({
    ...state,
    isDeleting: false,
    error: payload
  })
}, initialState);
