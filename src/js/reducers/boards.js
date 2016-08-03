/* eslint-disable */
import { handleActions } from "redux-actions";
import * as Boards from "../actions/boards";

const initialState = {
  isFetching: false,
  isAdding: false,
  currentBoardId: null,
  results: [],
  error: null
};

export default handleActions({
  // Fetch list
  [Boards.FETCH_BOARDS_REQUEST]: state => ({
    ...state,
    isFetching: true
  }),

  [Boards.FETCH_BOARDS_SUCCESS]: (state, { payload }) => ({
    ...state,
    isFetching: false,
    results: payload.result
  }),

  [Boards.FETCH_BOARDS_FAILURE]: (state, { payload }) => ({
    ...state,
    isFetching: false,
    error: payload
  }),


  // Add
  [Boards.ADD_BOARD_REQUEST]: state => ({
    ...state,
    isAdding: true
  }),

  [Boards.ADD_BOARD_SUCCESS]: (state, { payload }) => ({
    ...state,
    isAdding: false,
    results: [...state.results, payload.result]
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
}, initialState);
