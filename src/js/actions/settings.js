import { createAction } from "redux-actions";


// Fetch settings
export const FETCH_SETTINGS_REQUEST = "FETCH_SETTINGS_REQUEST";
export const FETCH_SETTINGS_SUCCESS = "FETCH_SETTINGS_SUCCESS";
export const FETCH_SETTINGS_FAILURE = "FETCH_SETTINGS_FAILURE";

export const fetchSettingsRequest = createAction(FETCH_SETTINGS_REQUEST);
export const fetchSettingsSuccess = createAction(FETCH_SETTINGS_SUCCESS);
export const fetchSettingsFailure = createAction(FETCH_SETTINGS_FAILURE);


// Update theme
export const UPDATE_THEME_REQUEST = "UPDATE_THEME_REQUEST";
export const UPDATE_THEME_SUCCESS = "UPDATE_THEME_SUCCESS";
export const UPDATE_THEME_FAILURE = "UPDATE_THEME_FAILURE";

export const updateThemeRequest = createAction(UPDATE_THEME_REQUEST);
export const updateThemeSuccess = createAction(UPDATE_THEME_SUCCESS);
export const updateThemeFailure = createAction(UPDATE_THEME_FAILURE);


// Update boardsLayout
export const UPDATE_BOARDS_LAYOUT_REQUEST = "UPDATE_BOARDS_LAYOUT_REQUEST";
export const UPDATE_BOARDS_LAYOUT_SUCCESS = "UPDATE_BOARDS_LAYOUT_SUCCESS";
export const UPDATE_BOARDS_LAYOUT_FAILURE = "UPDATE_BOARDS_LAYOUT_FAILURE";

export const updateBoardsLayoutRequest = createAction(UPDATE_BOARDS_LAYOUT_REQUEST);
export const updateBoardsLayoutSuccess = createAction(UPDATE_BOARDS_LAYOUT_SUCCESS);
export const updateBoardsLayoutFailure = createAction(UPDATE_BOARDS_LAYOUT_FAILURE);


// Update itemsLayout
export const UPDATE_ITEMS_LAYOUT_REQUEST = "UPDATE_ITEMS_LAYOUT_REQUEST";
export const UPDATE_ITEMS_LAYOUT_SUCCESS = "UPDATE_ITEMS_LAYOUT_SUCCESS";
export const UPDATE_ITEMS_LAYOUT_FAILURE = "UPDATE_ITEMS_LAYOUT_FAILURE";

export const updateItemsLayoutRequest = createAction(UPDATE_ITEMS_LAYOUT_REQUEST);
export const updateItemsLayoutSuccess = createAction(UPDATE_ITEMS_LAYOUT_SUCCESS);
export const updateItemsLayoutFailure = createAction(UPDATE_ITEMS_LAYOUT_FAILURE);


// Update itemsSize
export const UPDATE_ITEMS_SIZE_REQUEST_DEBOUNCE = "UPDATE_ITEMS_SIZE_REQUEST_DEBOUNCE";
export const UPDATE_ITEMS_SIZE_REQUEST = "UPDATE_ITEMS_SIZE_REQUEST";
export const UPDATE_ITEMS_SIZE_SUCCESS = "UPDATE_ITEMS_SIZE_SUCCESS";
export const UPDATE_ITEMS_SIZE_FAILURE = "UPDATE_ITEMS_SIZE_FAILURE";

export const updateItemsSizeRequestDebounce = createAction(UPDATE_ITEMS_SIZE_REQUEST_DEBOUNCE);
export const updateItemsSizeRequest = createAction(UPDATE_ITEMS_SIZE_REQUEST);
export const updateItemsSizeSuccess = createAction(UPDATE_ITEMS_SIZE_SUCCESS);
export const updateItemsSizeFailure = createAction(UPDATE_ITEMS_SIZE_FAILURE);


// Update itemsOrderBy
export const UPDATE_ITEMS_ORDER_BY_REQUEST = "UPDATE_ITEMS_ORDER_BY_REQUEST";
export const UPDATE_ITEMS_ORDER_BY_SUCCESS = "UPDATE_ITEMS_ORDER_BY_SUCCESS";
export const UPDATE_ITEMS_ORDER_BY_FAILURE = "UPDATE_ITEMS_ORDER_BY_FAILURE";

export const updateItemsOrderByRequest = createAction(UPDATE_ITEMS_ORDER_BY_REQUEST);
export const updateItemsOrderBySuccess = createAction(UPDATE_ITEMS_ORDER_BY_SUCCESS);
export const updateItemsOrderByFailure = createAction(UPDATE_ITEMS_ORDER_BY_FAILURE);


// Update itemsOrder
export const UPDATE_ITEMS_ORDER_REQUEST = "UPDATE_ITEMS_ORDER_REQUEST";
export const UPDATE_ITEMS_ORDER_SUCCESS = "UPDATE_ITEMS_ORDER_SUCCESS";
export const UPDATE_ITEMS_ORDER_FAILURE = "UPDATE_ITEMS_ORDER_FAILURE";

export const updateItemsOrderRequest = createAction(UPDATE_ITEMS_ORDER_REQUEST);
export const updateItemsOrderSuccess = createAction(UPDATE_ITEMS_ORDER_SUCCESS);
export const updateItemsOrderFailure = createAction(UPDATE_ITEMS_ORDER_FAILURE);
