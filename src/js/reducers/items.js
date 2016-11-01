// @flow
import { handleActions } from "redux-actions";
import * as ItemVisibilityFilters from "../constants/item-visibility-filters";
import * as I from "../actions/items";

import type {
  ItemState,

  SetCurrentItemAction,
  SetItemVisibilityFilterAction,
  AddItemURLFailureAction,
  AddItemFileFailureAction
} from "../types/item";


const initialState: ItemState = {
  isFetching: false,
  isAdding: false,
  isMoving: false,
  isImageEditing: false,
  error: null,
  currentItem: null,
  currentColor: null,
  visibilityFilter: ItemVisibilityFilters.ALL,
  addFileDialogOpen: false,
  addURLDialogOpen: false,
  addSnackbarOpen: false,
  moveItems: [],
  selectBoardDialogOpen: false,
  detailDrawerOpen: false
};

export default handleActions({
  // Set current item
  [I.SET_CURRENT_ITEM]: (state: ItemState, action: SetCurrentItemAction): ItemState => ({
    ...state,
    currentItem: action.payload,
    detailDrawerOpen: true
  }),


  // Set currentColor
  [I.SET_ITEM_CURRENT_COLOR]: (state, { payload }) => ({
    ...state,
    currentColor: payload
  }),


  // Set visibility filter
  [I.SET_ITEM_VISIBILITY_FILTER]: (state: ItemState, action: SetItemVisibilityFilterAction): ItemState => ({
    ...state,
    visibilityFilter: action.payload
  }),


  // // Image editing
  // [I.SET_ITEM_IMAGE_EDITING]: (state, { payload }) => ({
  //   ...state,
  //   isImageEditing: payload,
  //   detailDrawerOpen: !payload
  // }),
  //
  //
  // // Detail drawer
  // [I.ITEM_DETAIL_DRAWER_TOGGLE]: state => ({
  //   ...state,
  //   detailDrawerOpen: !state.detailDrawerOpen
  // }),
  //
  // [I.ITEM_DETAIL_DRAWER_OPEN]: state => ({
  //   ...state,
  //   detailDrawerOpen: true
  // }),
  //
  // [I.ITEM_DETAIL_DRAWER_CLOSE]: state => ({
  //   ...state,
  //   detailDrawerOpen: false
  // }),
  //
  //
  // // Fetch
  // [I.FETCH_ITEMS_REQUEST]: state => ({
  //   ...state,
  //   isFetching: true
  // }),
  //
  // [I.FETCH_ITEMS_SUCCESS]: (state, { payload }) => ({
  //   ...state,
  //   isFetching: false
  // }),
  //
  // [I.FETCH_ITEMS_FAILURE]: (state, { payload }) => ({
  //   ...state,
  //   isFetching: false,
  //   error: payload
  // }),


  // Add from URL (UI)
  [I.ADD_ITEM_URL_DIALOG_OPEN]: state => ({
    ...state,
    addURLDialogOpen: true,
    addSnackbarOpen: false
  }),

  [I.ADD_ITEM_URL_DIALOG_CLOSE]: state => ({
    ...state,
    addURLDialogOpen: false
  }),


  // Add from File (UI)
  [I.ADD_ITEM_FILE_DIALOG_OPEN]: state => ({
    ...state,
    addFileDialogOpen: true,
    addSnackbarOpen: false
  }),

  [I.ADD_ITEM_FILE_DIALOG_CLOSE]: state => ({
    ...state,
    addFileDialogOpen: false
  }),


  // Add from URL
  [I.ADD_ITEM_URL_REQUEST]: (state: ItemState): ItemState => ({
    ...state,
    isAdding: true
  }),

  [I.ADD_ITEM_URL_SUCCESS]: (state: ItemState): ItemState => ({
    ...state,
    isAdding: false,
    error: null,
    addURLDialogOpen: false,
    addSnackbarOpen: true
  }),

  [I.ADD_ITEM_URL_FAILURE]: (state, action: AddItemURLFailureAction): ItemState => ({
    ...state,
    isAdding: false,
    error: action.payload,
    addURLDialogOpen: false,
    addSnackbarOpen: true
  }),


  // Add from file
  [I.ADD_ITEM_FILE_REQUEST]: (state: ItemState): ItemState => ({
    ...state,
    isAdding: true
  }),

  [I.ADD_ITEM_FILE_SUCCESS]: (state: ItemState): ItemState => ({
    ...state,
    isAdding: false,
    error: null,
    addFileDialogOpen: false,
    addSnackbarOpen: true
  }),

  [I.ADD_ITEM_FILE_FAILURE]: (state: ItemState, action: AddItemFileFailureAction): ItemState => ({
    ...state,
    isAdding: false,
    error: action.payload,
    addFileDialogOpen: false,
    addSnackbarOpen: true
  })


  // // Update name
  // [I.UPDATE_ITEM_NAME_FAILURE]: (state, { payload }) => ({
  //   ...state,
  //   error: payload
  // }),


  // // Delete
  // [I.DELETE_ITEM_REQUEST]: (state, { payload }) => ({
  //   ...state,
  //   currentItem: null
  // }),
  //
  //
  // // Move
  // [I.MOVE_ITEM_SELECT_BOARD_OPEN]: (state, { payload }) => ({
  //   ...state,
  //   moveItems: [payload],
  //   selectBoardDialogOpen: true
  // }),
  //
  // [I.MOVE_ITEM_SELECT_BOARD_CLOSE]: (state, { payload }) => ({
  //   ...state,
  //   moveItems: [],
  //   selectBoardDialogOpen: false
  // }),
  //
  // [I.MOVE_ITEM_REQUEST]: state => ({
  //   ...state,
  //   isMoving: true
  // }),
  //
  // [I.MOVE_ITEM_SUCCESS]: (state, { payload }) => ({
  //   ...state,
  //   isMoving: false,
  //   selectBoardDialogOpen: false
  // }),
  //
  // [I.MOVE_ITEM_FAILURE]: (state, { payload, meta }) => ({
  //   ...state,
  //   isMoving: false,
  //   selectBoardDialogOpen: false,
  //   error: payload
  // }),
  //
  //
  // // Selected move
  // [I.SELECTED_ITEMS_MOVE_OPEN]: state => ({
  //   ...state,
  //   selectBoardDialogOpen: true
  // }),
  //
  // [I.SELECTED_ITEMS_MOVE_CLOSE]: state => ({
  //   ...state,
  //   selectBoardDialogOpen: false
  // }),
  //
  // [I.SELECTED_ITEMS_MOVE_REQUEST]: (state, { payload }) => ({
  //   ...state,
  //   isMoving: true
  // }),
  //
  // [I.SELECTED_ITEMS_MOVE_SUCCESS]: (state, { payload }) => ({
  //   ...state,
  //   isMoving: false,
  //   error: null,
  //   selectBoardDialogOpen: false
  // }),
  //
  // [I.SELECTED_ITEMS_MOVE_FAILURE]: (state, { payload }) => ({
  //   ...state,
  //   isMoving: false,
  //   error: payload,
  //   selectBoardDialogOpen: false
  // })
}, initialState);
