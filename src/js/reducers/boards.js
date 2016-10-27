// @flow
import { handleActions } from "redux-actions";
import * as A from "../actions/auth";
import * as B from "../actions/boards";

import type {
  BoardId,
  BoardState,
  FetchBoardsSuccessAction,
  FetchBoardsFailureAction,
  AddBoardSuccessAction,
  AddBoardFailureAction,
  DeleteBoardSuccessAction,
  DeleteBoardFailureAction,
  SetCurrentBoardAction
} from "../types/board";


const initialState: BoardState = {
  isFetching: false,
  isAdding: false,
  results: [],
  currentId: null,
  error: null,
  addDialogOpen: false
};

export default handleActions({
  // Fetch list
  [A.FETCH_CURRENT_USER_SUCCESS]: (state: BoardState): BoardState => ({
    ...state,
    isFetching: true
  }),

  [B.FETCH_BOARDS_REQUEST]: (state: BoardState): BoardState => ({
    ...state,
    isFetching: true
  }),

  [B.FETCH_BOARDS_SUCCESS]: (state: BoardState, action: FetchBoardsSuccessAction): BoardState => ({
    ...state,
    isFetching: false,
    results: action.payload.result.boards
  }),

  [B.FETCH_BOARDS_FAILURE]: (state: BoardState, action: FetchBoardsFailureAction): BoardState => ({
    ...state,
    isFetching: false,
    error: action.payload
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
  [B.DELETE_BOARD_REQUEST]: (state: BoardState): BoardState => ({
    ...state,
    isDeleting: true
  }),

  [B.DELETE_BOARD_SUCCESS]: (state: BoardState, action: DeleteBoardSuccessAction): BoardState => ({
    ...state,
    isDeleting: false,
    results: state.results.filter((id: BoardId): boolean => id !== action.payload.result.board)
  }),

  [B.DELETE_BOARD_FAILURE]: (state: BoardState, action: DeleteBoardFailureAction): BoardState => ({
    ...state,
    isDeleting: false,
    error: action.payload
  }),


  // Current
  [B.SET_CURRENT_BOARD]: (state: BoardState, action: SetCurrentBoardAction) => ({
    ...state,
    currentId: action.payload
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
