// @flow
import type { PayloadAction, ErrorAction } from "./action";
import type { User } from "./user";
import type { Theme, BoardsLayout, ItemsLayout, OrderBy, Order } from "./prop-types";

export type Options = {
  theme: Theme;
  boardsLayout: BoardsLayout;
  boardsOrderBy: OrderBy;
  boardsOrder: Order;
  itemsLayout: ItemsLayout;
  itemsSize: number;
  itemsOrderBy: OrderBy;
  itemsOrder: Order;
};

export type OptionsState = $All<Options, {
  isProfileUpdating: boolean;
  isThemeUpdating: boolean;
  isBoardsLayoutUpdating: boolean;
  isBoardsOrderByUpdating: boolean;
  isBoardsOrderUpdating: boolean;
  isItemsLayoutUpdating: boolean;
  isItemsSizeUpdating: boolean;
  isItemsOrderByUpdating: boolean;
  isItemsOrderUpdating: boolean;
}>;


// Update profile
export type UpdateProfileRequestPayload = {
  photo: ?File;
  name: ?string;
};
export type UpdateProfileRequestAction = PayloadAction<"UPDATE_PROFILE_REQUEST", UpdateProfileRequestPayload>;
export type UpdateProfileSuccessAction = PayloadAction<"UPDATE_PROFILE_SUCCESS", User>;
export type UpdateProfileFailureAction = ErrorAction<"UPDATE_PROFILE_FAILURE", Error>;


// Update theme
export type UpdateThemeRequestAction = PayloadAction<"UPDATE_THEME_REQUEST", Theme>;
export type UpdateThemeSuccessAction = PayloadAction<"UPDATE_THEME_SUCCESS", Theme>;
export type UpdateThemeFailureAction = ErrorAction<"UPDATE_THEME_FAILURE", Error>;


// Update boards layout
export type UpdateBoardsLayoutRequestAction = PayloadAction<"UPDATE_BOARDS_LAYOUT_REQUEST", BoardsLayout>;
export type UpdateBoardsLayoutSuccessAction = PayloadAction<"UPDATE_BOARDS_LAYOUT_SUCCESS", BoardsLayout>;
export type UpdateBoardsLayoutFailureAction = ErrorAction<"UPDATE_BOARDS_LAYOUT_FAILURE", Error>;


// Update boards orderBy
export type UpdateBoardsOrderByRequestAction = PayloadAction<"UPDATE_BOARDS_ORDER_BY_REQUEST", OrderBy>;
export type UpdateBoardsOrderBySuccessAction = PayloadAction<"UPDATE_BOARDS_ORDER_BY_SUCCESS", OrderBy>;
export type UpdateBoardsOrderByFailureAction = ErrorAction<"UPDATE_BOARDS_ORDER_BY_FAILURE", Error>;


// Update boards order
export type UpdateBoardsOrderRequestAction = PayloadAction<"UPDATE_BOARDS_ORDER_REQUEST", Order>;
export type UpdateBoardsOrderSuccessAction = PayloadAction<"UPDATE_BOARDS_ORDER_SUCCESS", Order>;
export type UpdateBoardsOrderFailureAction = ErrorAction<"UPDATE_BOARDS_ORDER_FAILURE", Error>;


// Update items layout
export type UpdateItemsLayoutRequestAction = PayloadAction<"UPDATE_ITEMS_LAYOUT_REQUEST", ItemsLayout>;
export type UpdateItemsLayoutSuccessAction = PayloadAction<"UPDATE_ITEMS_LAYOUT_SUCCESS", ItemsLayout>;
export type UpdateItemsLayoutFailureAction = ErrorAction<"UPDATE_ITEMS_LAYOUT_FAILURE", Error>;


// Update items size
export type UpdateItemsSizeRequestAction = PayloadAction<"UPDATE_ITEMS_SIZE_REQUEST", number>;
export type UpdateItemsSizeRequestDeboucedAction = PayloadAction<"UPDATE_ITEMS_SIZE_REQUEST_DEBOUNCED", number>;
export type UpdateItemsSizeSuccessAction = PayloadAction<"UPDATE_ITEMS_SIZE_SUCCESS", number>;
export type UpdateItemsSizeFailureAction = ErrorAction<"UPDATE_ITEMS_SIZE_FAILURE", Error>;


// Update items orderBy
export type UpdateItemsOrderByRequestAction = PayloadAction<"UPDATE_ITEMS_ORDER_BY_REQUEST", OrderBy>;
export type UpdateItemsOrderBySuccessAction = PayloadAction<"UPDATE_ITEMS_ORDER_BY_SUCCESS", OrderBy>;
export type UpdateItemsOrderByFailureAction = ErrorAction<"UPDATE_ITEMS_ORDER_BY_FAILURE", Error>;


// Update items order
export type UpdateItemsOrderRequestAction = PayloadAction<"UPDATE_ITEMS_ORDER_REQUEST", Order>;
export type UpdateItemsOrderSuccessAction = PayloadAction<"UPDATE_ITEMS_ORDER_SUCCESS", Order>;
export type UpdateItemsOrderFailureAction = ErrorAction<"UPDATE_ITEMS_ORDER_FAILURE", Error>;
