// @flow
import type { SingleNormalized } from "./normalize";
import type { Action, PayloadAction, ErrorAction } from "./action";
import type { TypeMap } from "./map";
import type { BoardId } from "./board";
import type { Palette } from "./prop-types";

export type ItemId = string;

export type Item = {
  id: ItemId;
  board_id: BoardId;
  file_id: string;
  name: string;
  description: string;
  url: string;
  size: number;
  type: string;
  image: string;
  width: number;
  height: number;
  thumbnail: string;
  palette: string;
  star: boolean;
  views: number;
  viewed_at: Date;
  created_at: Date;
  updated_at: Date;
};

export type ItemEntity = $All<Item, {
  select: boolean;
  isUpdating: boolean;
  isMoving: boolean;
  isDeleting: boolean;
  isNameUpdating: boolean;
  isDescriptionUpdating: boolean;
  isImageUpdating: boolean;
  isTagAdding: boolean;
}>;

export type Items = Array<Item>;

export type ItemEntities = Array<ItemEntity>;

export type ItemVisibilityFilter =
  "SHOW_ITEM_ALL" |
  "SHOW_ITEM_CURRENT_BOARD" |
  "SHOW_ITEM_STAR" |
  "SHOW_ITEM_CURRENT_TAG";


export type ItemState = {
  isFetching: boolean;
  isAdding: boolean;
  isMoving: boolean;
  isImageEditing: boolean;
  error: ?Error;
  currentItem: ?ItemId;
  currentColor: ?string;
  visibilityFilter: ItemVisibilityFilter;
  addURLDialogOpen: boolean;
  addFileDialogOpen: boolean;
  selectBoardDialogOpen: boolean;
  detailDrawerOpen: boolean;
  moveItems: Array<ItemId>;
};

export type ItemEntitiesState = TypeMap<ItemId, ItemEntity>;


type SingleItem = SingleNormalized<"items", "item", ItemEntity, ItemId>;
// type ArrayItem = ArrayNormalized<"items", ItemEntity, ItemId>;


// Add from URL (UI)
export type AddItemURLDialogOpenAction = Action<"ADD_ITEM_URL_DIALOG_OPEN">;
export type AddItemURLDialogCloseAction = Action<"ADD_ITEM_URL_DIALOG_CLOSE">;


// Add from File (UI)
export type AddItemFileDialogOpenAction = Action<"ADD_ITEM_FILE_DIALOG_OPEN">;
export type AddItemFileDialogCloseAction = Action<"ADD_ITEM_FILE_DIALOG_CLOSE">;


// Add from URL
export type AddItemURLRequestPayload = { url: string; board: BoardId; };
export type AddItemURLSuccessPayload = SingleItem;
export type AddItemURLRequestAction = PayloadAction<"ADD_ITEM_URL_REQUEST", AddItemURLRequestPayload>;
export type AddItemURLSuccessAction = PayloadAction<"ADD_ITEM_URL_SUCCESS", AddItemURLSuccessPayload>;
export type AddItemURLFailureAction = ErrorAction<"ADD_ITEM_URL_FAILURE", Error>;


// Add from File
export type AddItemFileRequestPayload = { board: BoardId; file: File; palette: Palette; };
export type AddItemFileSuccessPayload = SingleItem;
export type AddItemFileRequestAction = PayloadAction<"ADD_ITEM_FILE_REQUEST", AddItemFileRequestPayload>;
export type AddItemFileSuccessAction = PayloadAction<"ADD_ITEM_FILE_SUCCESS", AddItemFileSuccessPayload>;
export type AddItemFileFailureAction = ErrorAction<"ADD_ITEM_FILE_FAILURE", Error>;


// Goto added item
export type GotoAddedItemAction = PayloadAction<"GOTO_ADDED_ITEM", ItemId>;
