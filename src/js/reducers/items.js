/* eslint-disable */
import _ from "lodash";
import { handleActions } from "redux-actions";
import * as ItemVisibilityFilters from "../constants/item-visibility-filters";
import * as Boards from "../actions/boards";
import * as Items from "../actions/items";

const initialState = {
  isFetching: false,
  isAdding: false,
  isMoving: false,
  error: null,
  currentItem: null,
  currentColor: null,
  visibilityFilter: ItemVisibilityFilters.SHOW_ITEM_ALL,
  addDialogOpen: false,
  addSnackbarOpen: false,
  moveItems: [],
  selectBoardDialogOpen: false,
  detailDrawerOpen: false
};

export default handleActions({
  // Set current item
  [Items.SET_CURRENT_ITEM]: (state, { payload }) => ({
    ...state,
    currentItem: payload,
    detailDrawerOpen: true
  }),


  // Detail drawer
  [Items.ITEM_DETAIL_DRAWER_TOGGLE]: state => ({
    ...state,
    detailDrawerOpen: !state.detailDrawerOpen
  }),

  [Items.ITEM_DETAIL_DRAWER_OPEN]: state => ({
    ...state,
    detailDrawerOpen: true
  }),

  [Items.ITEM_DETAIL_DRAWER_CLOSE]: state => ({
    ...state,
    detailDrawerOpen: false
  }),


  // Set currentColor
  [Items.SET_ITEM_CURRENT_COLOR]: (state, { payload }) => ({
    ...state,
    currentColor: payload
  }),


  // Set visibility filter
  [Items.SET_ITEM_VISIBILITY_FILTER]: (state, { payload }) => ({
    ...state,
    visibilityFilter: payload
  }),


  // Fetch
  [Items.FETCH_ITEMS_REQUEST]: state => ({
    ...state,
    isFetching: true
  }),

  [Items.FETCH_ITEMS_SUCCESS]: (state, { payload }) => ({
    ...state,
    isFetching: false
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
  [Items.DELETE_ITEM_REQUEST]: (state, { payload }) => ({
    ...state,
    currentItem: null
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

  [Items.MOVE_ITEM_SUCCESS]: (state, { payload }) => ({
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
  })
}, initialState);
