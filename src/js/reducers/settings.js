import { handleActions } from "redux-actions";
import * as OrderBy from "../constants/order-by";
import * as Order from "../constants/order";
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
  isItemsSizeUpdating: false,

  itemsOrderBy: OrderBy.CREATED,
  isItemsOrderByUpdating: false,

  itemsOrder: Order.ASC,
  isItemsOrderUpdating: false
};

export default handleActions({
  // Fetch
  [Settings.FETCH_SETTINGS_REQUEST]: state => ({
    ...state,
    isFetching: true
  }),

  [Settings.FETCH_SETTINGS_SUCCESS]: (state, { payload }) => ({
    ...state,
    ...payload,
    isFetching: false,
    error: null
  }),

  [Settings.FETCH_SETTINGS_FAILURE]: (state, { payload }) => ({
    ...state,
    isFetching: false,
    error: payload
  }),


  // Update theme
  [Settings.UPDATE_THEME_REQUEST]: (state, { payload }) => ({
    ...state,
    isThemeUpdating: true,
    theme: payload
  }),

  [Settings.UPDATE_THEME_SUCCESS]: (state, { payload }) => ({
    ...state,
    isThemeUpdating: false,
    theme: payload
  }),

  [Settings.UPDATE_THEME_FAILURE]: (state, { payload }) => ({
    ...state,
    isThemeUpdating: false,
    error: payload
  }),


  // Update boardsLayout
  [Settings.UPDATE_BOARDS_LAYOUT_REQUEST]: (state, { payload }) => ({
    ...state,
    isBoardsLayoutUpdaing: true,
    boardsLayout: payload
  }),

  [Settings.UPDATE_BOARDS_LAYOUT_SUCCESS]: (state, { payload }) => ({
    ...state,
    isBoardsLayoutUpdaing: false,
    boardsLayout: payload
  }),

  [Settings.UPDATE_BOARDS_LAYOUT_FAILURE]: (state, { payload }) => ({
    ...state,
    isBoardsLayoutUpdaing: false,
    error: payload
  }),


  // Update itemsLayout
  [Settings.UPDATE_ITEMS_LAYOUT_REQUEST]: (state, { payload }) => ({
    ...state,
    isItemsLayoutUpdating: true,
    itemsLayout: payload
  }),

  [Settings.UPDATE_ITEMS_LAYOUT_SUCCESS]: (state, { payload }) => ({
    ...state,
    isItemsLayoutUpdating: false,
    itemsLayout: payload
  }),

  [Settings.UPDATE_ITEMS_LAYOUT_FAILURE]: (state, { payload }) => ({
    ...state,
    isItemsLayoutUpdating: false,
    error: payload
  }),


  // Update size
  [Settings.UPDATE_ITEMS_SIZE_REQUEST]: (state, { payload }) => ({
    ...state,
    isItemsSizeUpdating: true,
    itemsSize: payload
  }),

  [Settings.UPDATE_ITEMS_SIZE_SUCCESS]: (state, { payload }) => ({
    ...state,
    isItemsSizeUpdating: false,
    itemsSize: payload
  }),

  [Settings.UPDATE_ITEMS_SIZE_FAILURE]: (state, { payload }) => ({
    ...state,
    isItemsSizeUpdating: false,
    error: payload
  }),


  // Update itemsOrderBy
  [Settings.UPDATE_ITEMS_ORDER_BY_REQUEST]: (state, { payload }) => ({
    ...state,
    isItemsOrderByUpdating: true,
    itemsOrderBy: payload
  }),

  [Settings.UPDATE_ITEMS_ORDER_BY_SUCCESS]: (state, { payload }) => ({
    ...state,
    isItemsOrderByUpdating: false,
    itemsOrderBy: payload
  }),

  [Settings.UPDATE_ITEMS_ORDER_BY_FAILURE]: (state, { payload }) => ({
    ...state,
    isItemsOrderByUpdating: false,
    error: payload
  }),


  // Update itemsOrder
  [Settings.UPDATE_ITEMS_ORDER_REQUEST]: (state, { payload }) => ({
    ...state,
    isItemsOrderUpdating: true,
    itemsOrder: payload
  }),

  [Settings.UPDATE_ITEMS_ORDER_SUCCESS]: (state, { payload }) => ({
    ...state,
    isItemsOrderUpdating: false,
    itemsOrder: payload
  }),

  [Settings.UPDATE_ITEMS_ORDER_FAILURE]: (state, { payload }) => ({
    ...state,
    isItemsOrderUpdating: false,
    error: payload
  })
}, initialState);
