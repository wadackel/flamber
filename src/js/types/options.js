// @flow
import type { PayloadAction, ErrorAction } from "./action";
import type { User } from "./user";
import type {
  Theme,
  BoardsLayout,
  ItemsLayout
} from "./prop-types";

export type OptionsState = {
  isProfileUpdating: boolean;
  theme: Theme;
  isThemeUpdating: boolean;
  boardsLayout: BoardsLayout;
  isBoardsLayoutUpdating: boolean;
  itemsLayout: ItemsLayout;
  isItemsLayoutUpdating: boolean;
  itemsSize: number;
  isItemsSizeUpdating: boolean;
};


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


// Update items layout
export type UpdateItemsLayoutRequestAction = PayloadAction<"UPDATE_ITEMS_LAYOUT_REQUEST", ItemsLayout>;
export type UpdateItemsLayoutSuccessAction = PayloadAction<"UPDATE_ITEMS_LAYOUT_SUCCESS", ItemsLayout>;
export type UpdateItemsLayoutFailureAction = ErrorAction<"UPDATE_ITEMS_LAYOUT_FAILURE", Error>;


// Update items size
export type UpdateItemsSizeRequestAction = PayloadAction<"UPDATE_ITEMS_SIZE_REQUEST", number>;
export type UpdateItemsSizeRequestDeboucedAction = PayloadAction<"UPDATE_ITEMS_SIZE_REQUEST_DEBOUNCED", number>;
export type UpdateItemsSizeSuccessAction = PayloadAction<"UPDATE_ITEMS_SIZE_SUCCESS", number>;
export type UpdateItemsSizeFailureAction = ErrorAction<"UPDATE_ITEMS_SIZE_FAILURE", Error>;
