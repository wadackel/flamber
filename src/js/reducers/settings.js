import { handleActions } from "redux-actions";
import * as Themes from "../constants/themes";
import * as Layout from "../constants/layouts";
import * as Settings from "../actions/settings";

const initialState = {
  isFetching: false,

  theme: Themes.DEFAULT,
  isThemeUpdating: false,

  boardsLayout: Layout.GRID,
  isBoardsLayoutUpdating: false,

  itemsLayout: Layout.GRID,
  isItemsLayoutUpdating: false,

  itemsSize: 280,
  isItemsSizeUpdating: false
};

export default handleActions({
  // Fetch
  [Settings.FETCH_SETTINGS_REQUEST]: state => ({
    ...state,
    isFetching: true
  }),

  [Settings.FETCH_SETTINGS_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
    isFetching: false,
    error: null
  }),

  [Settings.FETCH_SETTINGS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload
  }),

  // Update theme
  [Settings.UPDATE_THEME_REQUEST]: (state, action) => ({
    ...state,
    isThemeUpdating: true,
    theme: action.payload
  }),

  [Settings.UPDATE_THEME_SUCCESS]: (state, action) => ({
    ...state,
    isThemeUpdating: false,
    theme: action.payload
  }),

  [Settings.UPDATE_THEME_FAILURE]: (state, action) => ({
    ...state,
    isThemeUpdating: false,
    error: action.payload
  }),

  // Update boardsLayout
  [Settings.UPDATE_BOARDS_LAYOUT_REQUEST]: (state, action) => ({
    ...state,
    isBoardsLayoutUpdaing: true,
    boardsLayout: action.payload
  }),

  [Settings.UPDATE_BOARDS_LAYOUT_SUCCESS]: (state, action) => ({
    ...state,
    isBoardsLayoutUpdaing: false,
    boardsLayout: action.payload
  }),

  [Settings.UPDATE_BOARDS_LAYOUT_FAILURE]: (state, action) => ({
    ...state,
    isBoardsLayoutUpdaing: false,
    error: action.payload
  }),

  // Update itemsLayout
  [Settings.UPDATE_ITEMS_LAYOUT_REQUEST]: (state, action) => ({
    ...state,
    isItemsLayoutUpdating: true,
    itemsLayout: action.payload
  }),

  [Settings.UPDATE_ITEMS_LAYOUT_SUCCESS]: (state, action) => ({
    ...state,
    isItemsLayoutUpdating: false,
    itemsLayout: action.payload
  }),

  [Settings.UPDATE_ITEMS_LAYOUT_FAILURE]: (state, action) => ({
    ...state,
    isItemsLayoutUpdating: false,
    error: action.payload
  }),

  // Update size
  [Settings.UPDATE_ITEMS_SIZE_REQUEST]: (state, action) => ({
    ...state,
    isItemsSizeUpdating: true,
    itemsSize: action.payload
  }),

  [Settings.UPDATE_ITEMS_SIZE_SUCCESS]: (state, action) => ({
    ...state,
    isItemsSizeUpdating: false,
    itemsSize: action.payload
  }),

  [Settings.UPDATE_ITEMS_SIZE_FAILURE]: (state, action) => ({
    ...state,
    isItemsSizeUpdating: false,
    error: action.payload
  })
}, initialState);
