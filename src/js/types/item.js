// @flow
import type { SingleNormalized, ArrayNormalized } from "./normalize";
import type {
  Action,
  MetaAction,
  PayloadAction,
  PayloadWithMetaAction,
  ErrorAction,
  ErrorWithMetaAction
} from "./action";
import type { TypeMap } from "./map";
import type { BoardId } from "./board";
import type { TagId } from "./tag";
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
  Tags: Array<TagId>;
  select: boolean;
  isUpdating: boolean;
  isMoving: boolean;
  isDeleting: boolean;
  isNameUpdating: boolean;
  isDescriptionUpdating: boolean;
  isImageUpdating: boolean;
  isTagAdding: boolean;
  isTagRemoving: boolean;
}>;

export type Items = Array<Item>;

export type ItemEntities = Array<ItemEntity>;

export type ItemVisibilityFilter = "ALL" | "STAR" | "CURRENT_BOARD" | "CURRENT_TAG";


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
type ArrayItem = ArrayNormalized<"items", ItemEntity, ItemId>;


// Set current
export type SetCurrentItemAction = PayloadAction<"SET_CURRENT_ITEM", ItemId>;


// Set item visibilityFilter
export type SetItemVisibilityFilterAction = PayloadAction<"SET_ITEM_VISIBILITY_FILTER", ItemVisibilityFilter>;


// Set item image editing
export type SetItemImageEditingAction = PayloadAction<"SET_ITEM_IMAGE_EDITING", boolean>;


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


// Delete
export type DeleteItemSuccessPayload = SingleItem;
export type DeleteItemRequestAction = PayloadAction<"DELETE_ITEM_REQUEST", ItemId>;
export type DeleteItemSuccessAction = PayloadAction<"DELETE_ITEM_SUCCESS", DeleteItemSuccessPayload>;
export type DeleteItemFailureAction = ErrorWithMetaAction<"DELETE_ITEM_FAILURE", Error, ?ItemEntity>;


// Star
export type StarItemToggleSuccessPayload = SingleItem;
export type StarItemToggleRequestAction = PayloadAction<"STAR_ITEM_TOGGLE_REQUEST", ItemId>;
export type StarItemToggleSuccessAction = PayloadAction<"STAR_ITEM_TOGGLE_SUCCESS", StarItemToggleSuccessPayload>;
export type StarItemToggleFailureAction = ErrorWithMetaAction<"STAR_ITEM_TOGGLE_FAILURE", Error, ItemId>;


// Update name
export type UpdateItemNameSuccessPayload = SingleItem;
export type UpdateItemNameIfNeededAction = PayloadAction<"UPDATE_ITEM_NAME_IF_NEEDED", { id: ItemId; name: string; }>;
export type UpdateItemNameRequestAction = PayloadAction<"UPDATE_ITEM_NAME_REQUEST", { id: ItemId; name: string; }>;
export type UpdateItemNameSuccessAction = PayloadAction<"UPDATE_ITEM_NAME_SUCCESS", UpdateItemNameSuccessPayload>;
export type UpdateItemNameFailureAction = ErrorWithMetaAction<"UPDATE_ITEM_NAME_FAILURE",
  Error, { id: ItemId; name: string; }>;


// Update description
export type UpdateItemDescriptionSuccessPayload = SingleItem;
export type UpdateItemDescriptionRequestAction = PayloadAction<"UPDATE_ITEM_DESCRIPTION_REQUEST",
  { id: ItemId; description: string; }>;
export type UpdateItemDescriptionSuccessAction = PayloadAction<"UPDATE_ITEM_DESCRIPTION_SUCCESS",
  UpdateItemDescriptionSuccessPayload>;
export type UpdateItemDescriptionFailureAction = ErrorWithMetaAction<"UPDATE_ITEM_DESCRIPTION_FAILURE",
  Error, { id: ItemId; description: string; }>;


// Update image
export type UpdateItemImageSuccessPayload = SingleItem;
export type UpdateItemImageRequestAction = PayloadAction<"UPDATE_ITEM_IMAGE_REQUEST", { id: ItemId; image: File; }>;
export type UpdateItemImageSuccessAction = PayloadAction<"UPDATE_ITEM_IMAGE_SUCCESS", UpdateItemImageSuccessPayload>;
export type UpdateItemImageFailureAction = ErrorWithMetaAction<"UPDATE_ITEM_IMAGE_FAILURE",
  Error, { id: ItemId; image: File; }>;


// Add item tag
export type AddItemTagSuccessPayload = SingleItem;
export type AddItemTagIfNeededAction = PayloadAction<"ADD_ITEM_TAG_IF_NEEDED", { id: ItemId; tagId: TagId; }>;
export type AddItemTagRequestAction = PayloadAction<"ADD_ITEM_TAG_REQUEST", { id: ItemId; tagId: TagId; }>;
export type AddItemTagSuccessAction = PayloadAction<"ADD_ITEM_TAG_SUCCESS", AddItemTagSuccessPayload>;
export type AddItemTagFailureAction = ErrorWithMetaAction<"ADD_ITEM_TAG_FAILURE", Error, { id: ItemId; tagId: TagId; }>


// Remove item tag
export type RemoveItemTagSuccessPayload = SingleItem;
export type RemoveItemTagRequestAction = PayloadAction<"REMOVE_ITEM_TAG_REQUEST", { id: ItemId; tagId: TagId }>;
export type RemoveItemTagSuccessAction = PayloadAction<"REMOVE_ITEM_TAG_SUCCESS", RemoveItemTagSuccessPayload>;
export type RemoveItemTagFailureAction = ErrorWithMetaAction<"REMOVE_ITEM_TAG_FAILURE",
  Error, { id: ItemId; tagId: TagId }>;


// Register tag
export type RegisterItemTagSuccessPayload = SingleItem;
export type RegisterItemTagRequestAction = PayloadAction<"REGISTER_ITEM_TAG_REQUEST",
  { id: ItemId; tagId: TagId; label: string; }>;
export type RegisterItemTagSuccessAction = PayloadWithMetaAction<"REGISTER_ITEM_TAG_SUCCESS",
  RegisterItemTagSuccessPayload, TagId>;
export type RegisterItemTagFailureAction = ErrorWithMetaAction<"REGISTER_ITEM_TAG_FAILURE",
  Error, { id: ItemId; tagId: TagId; label: string; }>;


// Move board
export type MoveItemSelectBoardOpenAction = PayloadAction<"MOVE_ITEM_SELECT_BOARD_OPEN", ItemId>;
export type MoveItemSelectBoardCloseAction = Action<"MOVE_ITEM_SELECT_BOARD_CLOSE">;

export type MoveItemSuccessPayload = SingleItem;
export type MoveItemRequestAction = PayloadAction<"MOVE_ITEM_REQUEST", BoardId>;
export type MoveItemSuccessAction = PayloadWithMetaAction<"MOVE_ITEM_SUCCESS", MoveItemSuccessPayload, BoardId>;
export type MoveItemFailureAction = ErrorWithMetaAction<"MOVE_ITEM_FAILURE", Error, {
  entity: ?ItemEntity;
  prevBoard: ?BoardId;
  nextBoard: ?BoardId;
}>;


// Goto after move
export type GotoAfterMoveItemBoardAction = PayloadAction<"GOTO_AFTER_MOVE_ITEM_BOARD", BoardId>;


// Select
export type SelectItemToggleAction = PayloadAction<"SELECT_ITEM_TOGGLE", ItemId>;


// Select all
export type SelectAllItemExecAction = PayloadAction<"SELECT_ALL_ITEM_EXEC", ItemEntities>;
export type SelectAllItemAction = MetaAction<"SELECT_ALL_ITEM",
  (entities: ItemEntities) => SelectAllItemExecAction>;


// Unselect all
export type UnselectAllItemExecAction = PayloadAction<"UNSELECT_ALL_ITEM_EXEC", ItemEntities>;
export type UnselectAllItemAction = MetaAction<"UNSELECT_ALL_ITEM",
  (entities: ItemEntities) => UnselectAllItemExecAction>;


// Select star item
export type SelectStarItemExecAction = PayloadAction<"SELECT_STAR_ITEM_EXEC", ItemEntities>;
export type SelectStarItemAction = MetaAction<"SELECT_STAR_ITEM",
  (entities: ItemEntities) => SelectStarItemExecAction>;


// Selected items star
export type SelectedItemsStarSuccessPayload = ArrayItem;
export type SelectedItemsStarRequestAction = PayloadAction<"SELECTED_ITEMS_STAR_REQUEST", boolean>;
export type SelectedItemsStarSuccessAction = PayloadAction<"SELECTED_ITEMS_STAR_SUCCESS",
  SelectedItemsStarSuccessPayload>;
export type SelectedItemsStarFailureAction = ErrorWithMetaAction<"SELECTED_ITEMS_STAR_FAILURE", Error, ?ItemEntities>;


// Selected items move
export type SelectedItemsMoveOpenAction = Action<"SELECTED_ITEMS_MOVE_OPEN">;
export type SelectedItemsMoveCloseAction = Action<"SELECTED_ITEMS_MOVE_CLOSE">;

export type SelectedItemsMoveSuccessPayload = ArrayItem;
export type SelectedItemsMoveRequestAction = PayloadAction<"SELECTED_ITEMS_MOVE_REQUEST", BoardId>;
export type SelectedItemsMoveSuccessAction = PayloadWithMetaAction<"SELECTED_ITEMS_MOVE_SUCCESS",
  SelectedItemsMoveSuccessPayload, Array<BoardId>>;
export type SelectedItemsMoveFailureAction = ErrorWithMetaAction<"SELECTED_ITEMS_MOVE_FAILURE", Error, {
  entities: ?ItemEntities;
  prevBoards: Array<BoardId>;
  nextBoard: BoardId;
}>;


// Selected items delete
export type SelectedItemsDeleteSuccessPayload = ArrayItem;
export type SelectedItemsDeleteRequestAction = Action<"SELECTED_ITEMS_DELETE_REQUEST">;
export type SelectedItemsDeleteSuccessAction = PayloadAction<"SELECTED_ITEMS_DELETE_SUCCESS",
  SelectedItemsDeleteSuccessPayload>;
export type SelectedItemsDeleteFailureAction = ErrorWithMetaAction<"SELECTED_ITEMS_DELETE_FAILURE",
  Error, ?ItemEntities>;


// Detail drawer
export type ItemDetailDrawerToggleAction = Action<"ITEM_DETAIL_DRAWER_TOGGLE">;
export type ItemDetailDrawerOpenAction = Action<"ITEM_DETAIL_DRAWER_OPEN">;
export type ItemDetailDrawerCloseAction = Action<"ITEM_DETAIL_DRAWER_CLOSE">;
