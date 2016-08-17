/* eslint-disable */
import _ from "lodash";
import { handleActions } from "redux-actions";
import * as Boards from "../actions/boards";
import * as Items from "../actions/items";

const initialState = {
  isFetching: false,
  isAdding: false,
  isMoving: false,
  error: null,
  results: [],
  currentItemId: null,
  addDialogOpen: false,
  addSnackbarOpen: false,
  moveItems: [],
  selectBoardDialogOpen: false
};

export default handleActions({
  // Set results
  [Items.SET_ITEM_RESULTS]: (state, { payload }) => ({
    ...state,
    results: payload
  }),


  // Fetch
  [Items.FETCH_ITEMS_REQUEST]: state => ({
    ...state,
    isFetching: true,
    results: []
  }),

  [Items.FETCH_ITEMS_SUCCESS]: (state, { payload }) => ({
    ...state,
    isFetching: false,
    results: payload.result.items
  }),

  [Items.FETCH_ITEMS_FAILURE]: (state, { payload }) => ({
    ...state,
    isFetching: false,
    error: payload
  }),


  // Add (UI)
  [Items.ADD_ITEM_DIALOG_OPEN]: state => ({
    ...state,
    addDialogOpen: true,
    addSnackbarOpen: false
  }),

  [Items.ADD_ITEM_DIALOG_CLOSE]: state => ({
    ...state,
    addDialogOpen: false
  }),

  [Items.ADD_ITEM_SNACKBAR_CLOSE]: state => ({
    ...state,
    addSnackbarOpen: false
  }),


  // Add
  [Items.ADD_ITEM_REQUEST]: state => ({
    ...state,
    isAdding: true
  }),

  [Items.ADD_ITEM_SUCCESS]: (state, { payload }) => ({
    ...state,
    isAdding: false,
    error: null,
    addDialogOpen: false,
    addSnackbarOpen: true
  }),

  [Items.ADD_ITEM_FAILURE]: (state, { payload }) => ({
    ...state,
    isAdding: false,
    error: payload,
    addDialogOpen: false,
    addSnackbarOpen: true
  }),


  // Delete
  [Items.DELETE_ITEM_SUCCESS]: (state, { payload }) => ({
    ...state,
    results: state.results.filter(id => id !== payload.id)
  }),


  // Move
  [Items.MOVE_ITEM_SELECT_BOARD_OPEN]: (state, { payload }) => ({
    ...state,
    moveItems: [payload],
    selectBoardDialogOpen: true
  }),

  [Items.MOVE_ITEM_SELECT_BOARD_CLOSE]: (state, { payload }) => ({
    ...state,
    moveItems: [],
    selectBoardDialogOpen: false
  }),

  [Items.MOVE_ITEM_REQUEST]: state => ({
    ...state,
    isMoving: true
  }),

  [Items.MOVE_ITEM_SUCCESS]: state => ({
    ...state,
    isMoving: false,
    selectBoardDialogOpen: false
  }),

  [Items.MOVE_ITEM_FAILURE]: (state, { payload, meta }) => ({
    ...state,
    isMoving: false,
    selectBoardDialogOpen: false,
    error: payload
  }),


  // Selected move
  [Items.SELECTED_ITEMS_MOVE_OPEN]: state => ({
    ...state,
    selectBoardDialogOpen: true
  }),

  [Items.SELECTED_ITEMS_MOVE_CLOSE]: state => ({
    ...state,
    selectBoardDialogOpen: false
  }),

  [Items.SELECTED_ITEMS_MOVE_REQUEST]: (state, { payload }) => ({
    ...state,
    isMoving: true
  }),

  [Items.SELECTED_ITEMS_MOVE_SUCCESS]: (state, { payload }) => ({
    ...state,
    isMoving: false,
    error: null,
    selectBoardDialogOpen: false
  }),

  [Items.SELECTED_ITEMS_MOVE_FAILURE]: (state, { payload }) => ({
    ...state,
    isMoving: false,
    error: payload,
    selectBoardDialogOpen: false
  }),


  // Selected delete
  [Items.SELECTED_ITEMS_DELETE_SUCCESS]: (state, { payload }) => ({
    ...state,
    results: state.results.filter(id => !payload.some(o => o.id === id))
  })
}, initialState);
