/* eslint-disable */
import { handleActions } from "redux-actions";
import * as Auth from "../actions/auth";
import * as Boards from "../actions/boards";

const initialState = {
  isFetching: false,
  isAdding: false,
  results: [],
  currentBoardId: null,
  error: null,
  addDialogOpen: false,
  addSnackbarOpen: false
};

export default handleActions({
  // Fetch list
  [Auth.FETCH_CURRENT_USER_SUCCESS]: state => ({
    ...state,
    isFetching: true
  }),

  [Boards.FETCH_BOARDS_REQUEST]: state => ({
    ...state,
    isFetching: true
  }),

  [Boards.FETCH_BOARDS_SUCCESS]: (state, { payload }) => ({
    ...state,
    isFetching: false,
    results: payload.result.boards
  }),

  [Boards.FETCH_BOARDS_FAILURE]: (state, { payload }) => ({
    ...state,
    isFetching: false,
    error: payload
  }),


  // Add (UI)
  [Boards.ADD_BOARD_DIALOG_OPEN]: state => ({
    ...state,
    addDialogOpen: true,
    addSnackbarOpen: false
  }),

  [Boards.ADD_BOARD_DIALOG_CLOSE]: state => ({
    ...state,
    addDialogOpen: false
  }),

  [Boards.ADD_BOARD_SNACKBAR_CLOSE]: state => ({
    ...state,
    addSnackbarOpen: false
  }),


  // Add
  [Boards.ADD_BOARD_REQUEST]: state => ({
    ...state,
    isAdding: true
  }),

  [Boards.ADD_BOARD_SUCCESS]: (state, { payload }) => ({
    ...state,
    isAdding: false,
    results: [...state.results, payload.result.board],
    addDialogOpen: false,
    addSnackbarOpen: true
  }),

  [Boards.ADD_BOARD_FAILURE]: (state, { payload }) => ({
    ...state,
    isAdding: false,
    error: payload
  }),


  // Delete
  [Boards.DELETE_BOARD_REQUEST]: (state, { payload }) => ({
    ...state,
    isDeleting: true
  }),

  [Boards.DELETE_BOARD_SUCCESS]: (state, { payload }) => ({
    ...state,
    isDeleting: false,
    results: state.results.filter(id => id !== payload.id)
  }),

  [Boards.DELETE_BOARD_FAILURE]: (state, { payload }) => ({
    ...state,
    isDeleting: false,
    error: payload
  }),


  // Current
  [Boards.SET_CURRENT_BOARD]: (state, { payload }) => ({
    ...state,
    currentBoardId: payload
  }),


  // Selected boards delete
  [Boards.SELECTED_BOARDS_DELETE_REQUEST]: state => ({
    ...state,
    isDeleting: true
  }),

  [Boards.SELECTED_BOARDS_DELETE_SUCCESS]: (state, { payload }) => ({
    ...state,
    isDeleting: false,
    results: state.results.filter(id => !payload.some(o => id === o.id))
  }),

  [Boards.SELECTED_BOARDS_DELETE_FAILURE]: (state, { payload }) => ({
    ...state,
    isDeleting: false,
    error: payload
  })
}, initialState);
