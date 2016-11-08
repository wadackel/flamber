// @flow
import type { User } from "../types/user";
import type {
  UpdateProfileRequestAction,
  UpdateProfileSuccessAction,
  UpdateProfileFailureAction,

  UpdateThemeRequestAction,
  UpdateThemeSuccessAction,
  UpdateThemeFailureAction,

  UpdateBoardsLayoutRequestAction,
  UpdateBoardsLayoutSuccessAction,
  UpdateBoardsLayoutFailureAction,

  UpdateBoardsOrderByRequestAction,
  UpdateBoardsOrderBySuccessAction,
  UpdateBoardsOrderByFailureAction,

  UpdateItemsLayoutRequestAction,
  UpdateItemsLayoutSuccessAction,
  UpdateItemsLayoutFailureAction,

  UpdateItemsSizeRequestAction,
  UpdateItemsSizeRequestDeboucedAction,
  UpdateItemsSizeSuccessAction,
  UpdateItemsSizeFailureAction,

  UpdateItemsOrderByRequestAction,
  UpdateItemsOrderBySuccessAction,
  UpdateItemsOrderByFailureAction,

  UpdateItemsOrderRequestAction,
  UpdateItemsOrderSuccessAction,
  UpdateItemsOrderFailureAction
} from "../types/options";
import type { Theme, BoardsLayout, ItemsLayout, OrderBy, Order } from "../types/prop-types";


// Profile
export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE";

export const updateProfileRequest = (photo: ?File, name: ?string): UpdateProfileRequestAction => (
  { type: UPDATE_PROFILE_REQUEST, payload: { photo, name } }
);

export const updateProfileSuccess = (user: User): UpdateProfileSuccessAction => (
  { type: UPDATE_PROFILE_SUCCESS, payload: user }
);

export const updateProfileFailure = (error: Error): UpdateProfileFailureAction => (
  { type: UPDATE_PROFILE_FAILURE, error: true, payload: error }
);


// Theme
export const UPDATE_THEME_REQUEST = "UPDATE_THEME_REQUEST";
export const UPDATE_THEME_SUCCESS = "UPDATE_THEME_SUCCESS";
export const UPDATE_THEME_FAILURE = "UPDATE_THEME_FAILURE";

export const updateThemeRequest = (theme: Theme): UpdateThemeRequestAction => (
  { type: UPDATE_THEME_REQUEST, payload: theme }
);

export const updateThemeSuccess = (theme: Theme): UpdateThemeSuccessAction => (
  { type: UPDATE_THEME_SUCCESS, payload: theme }
);

export const updateThemeFailure = (error: Error): UpdateThemeFailureAction => (
  { type: UPDATE_THEME_FAILURE, payload: error, error: true }
);


// Boards layout
export const UPDATE_BOARDS_LAYOUT_REQUEST = "UPDATE_BOARDS_LAYOUT_REQUEST";
export const UPDATE_BOARDS_LAYOUT_SUCCESS = "UPDATE_BOARDS_LAYOUT_SUCCESS";
export const UPDATE_BOARDS_LAYOUT_FAILURE = "UPDATE_BOARDS_LAYOUT_FAILURE";

export const updateBoardsLayoutRequest = (layout: BoardsLayout): UpdateBoardsLayoutRequestAction => (
  { type: UPDATE_BOARDS_LAYOUT_REQUEST, payload: layout }
);

export const updateBoardsLayoutSuccess = (layout: BoardsLayout): UpdateBoardsLayoutSuccessAction => (
  { type: UPDATE_BOARDS_LAYOUT_SUCCESS, payload: layout }
);

export const updateBoardsLayoutFailure = (error: Error): UpdateBoardsLayoutFailureAction => (
  { type: UPDATE_BOARDS_LAYOUT_FAILURE, payload: error, error: true }
);


// Boards orderBy
export const UPDATE_BOARDS_ORDER_BY_REQUEST = "UPDATE_BOARDS_ORDER_BY_REQUEST";
export const UPDATE_BOARDS_ORDER_BY_SUCCESS = "UPDATE_BOARDS_ORDER_BY_SUCCESS";
export const UPDATE_BOARDS_ORDER_BY_FAILURE = "UPDATE_BOARDS_ORDER_BY_FAILURE";

export const updateBoardsOrderByRequest = (orderBy: OrderBy): UpdateBoardsOrderByRequestAction => (
  { type: UPDATE_BOARDS_ORDER_BY_REQUEST, payload: orderBy }
);

export const updateBoardsOrderBySuccess = (orderBy: OrderBy): UpdateBoardsOrderBySuccessAction => (
  { type: UPDATE_BOARDS_ORDER_BY_SUCCESS, payload: orderBy }
);

export const updateBoardsOrderByFailure = (error: Error): UpdateBoardsOrderByFailureAction => (
  { type: UPDATE_BOARDS_ORDER_BY_FAILURE, payload: error, error: true }
);


// Items layout
export const UPDATE_ITEMS_LAYOUT_REQUEST = "UPDATE_ITEMS_LAYOUT_REQUEST";
export const UPDATE_ITEMS_LAYOUT_SUCCESS = "UPDATE_ITEMS_LAYOUT_SUCCESS";
export const UPDATE_ITEMS_LAYOUT_FAILURE = "UPDATE_ITEMS_LAYOUT_FAILURE";

export const updateItemsLayoutRequest = (layout: ItemsLayout): UpdateItemsLayoutRequestAction => (
  { type: UPDATE_ITEMS_LAYOUT_REQUEST, payload: layout }
);

export const updateItemsLayoutSuccess = (layout: ItemsLayout): UpdateItemsLayoutSuccessAction => (
  { type: UPDATE_ITEMS_LAYOUT_SUCCESS, payload: layout }
);

export const updateItemsLayoutFailure = (error: Error): UpdateItemsLayoutFailureAction => (
  { type: UPDATE_ITEMS_LAYOUT_FAILURE, payload: error, error: true }
);


// Items size
export const UPDATE_ITEMS_SIZE_REQUEST = "UPDATE_ITEMS_SIZE_REQUEST";
export const UPDATE_ITEMS_SIZE_REQUEST_DEBOUNCED = "UPDATE_ITEMS_SIZE_REQUEST_DEBOUNCED";
export const UPDATE_ITEMS_SIZE_SUCCESS = "UPDATE_ITEMS_SIZE_SUCCESS";
export const UPDATE_ITEMS_SIZE_FAILURE = "UPDATE_ITEMS_SIZE_FAILURE";

export const updateItemsSizeRequest = (size: number): UpdateItemsSizeRequestAction => (
  { type: UPDATE_ITEMS_SIZE_REQUEST, payload: size }
);

export const updateItemsSizeRequestDebounced = (size: number): UpdateItemsSizeRequestDeboucedAction => (
  { type: UPDATE_ITEMS_SIZE_REQUEST_DEBOUNCED, payload: size }
);

export const updateItemsSizeSuccess = (size: number): UpdateItemsSizeSuccessAction => (
  { type: UPDATE_ITEMS_SIZE_SUCCESS, payload: size }
);

export const updateItemsSizeFailure = (error: Error): UpdateItemsSizeFailureAction => (
  { type: UPDATE_ITEMS_SIZE_FAILURE, payload: error, error: true }
);


// Items orderBy
export const UPDATE_ITEMS_ORDER_BY_REQUEST = "UPDATE_ITEMS_ORDER_BY_REQUEST";
export const UPDATE_ITEMS_ORDER_BY_SUCCESS = "UPDATE_ITEMS_ORDER_BY_SUCCESS";
export const UPDATE_ITEMS_ORDER_BY_FAILURE = "UPDATE_ITEMS_ORDER_BY_FAILURE";

export const updateItemsOrderByRequest = (orderBy: OrderBy): UpdateItemsOrderByRequestAction => (
  { type: UPDATE_ITEMS_ORDER_BY_REQUEST, payload: orderBy }
);

export const updateItemsOrderBySuccess = (orderBy: OrderBy): UpdateItemsOrderBySuccessAction => (
  { type: UPDATE_ITEMS_ORDER_BY_SUCCESS, payload: orderBy }
);

export const updateItemsOrderByFailure = (error: Error): UpdateItemsOrderByFailureAction => (
  { type: UPDATE_ITEMS_ORDER_BY_FAILURE, payload: error, error: true }
);


// Items order
export const UPDATE_ITEMS_ORDER_REQUEST = "UPDATE_ITEMS_ORDER_REQUEST";
export const UPDATE_ITEMS_ORDER_SUCCESS = "UPDATE_ITEMS_ORDER_SUCCESS";
export const UPDATE_ITEMS_ORDER_FAILURE = "UPDATE_ITEMS_ORDER_FAILURE";

export const updateItemsOrderRequest = (order: Order): UpdateItemsOrderRequestAction => (
  { type: UPDATE_ITEMS_ORDER_REQUEST, payload: order }
);

export const updateItemsOrderSuccess = (order: Order): UpdateItemsOrderSuccessAction => (
  { type: UPDATE_ITEMS_ORDER_SUCCESS, payload: order }
);

export const updateItemsOrderFailure = (error: Error): UpdateItemsOrderFailureAction => (
  { type: UPDATE_ITEMS_ORDER_FAILURE, payload: error, error: true }
);
