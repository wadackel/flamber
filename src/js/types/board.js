// @flow
import type { TypeMap } from "./map";
import type { Action, PayloadAction, ErrorAction } from "./action";
import type { ArrayNormalized, SingleNormalized } from "./normalize";
import type { ItemId } from "./item";

export type BoardId = string; // UUID

export type Board = {
  id: BoardId;
  name: string;
  secret: boolean;
  updated_at: Date;
  created_at: Date;
};

export type BoardEntity = $All<Board, {
  Items: Array<ItemId>;
  select: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
}>;

export type Boards = Array<Board>;

export type BoardEntities = Array<BoardEntity>;

export type BoardState = {
  isFetching: boolean;
  isAdding: boolean;
  results: Array<BoardId>;
  currentId: ?BoardId;
  error: ?Error;
  addDialogOpen: boolean;
};

export type BoardEntitiesState = TypeMap<BoardId, BoardEntity>;


type SingleBoard = SingleNormalized<"boards", "board", BoardEntity, BoardId>;
type ArrayBoard = ArrayNormalized<"boards", BoardEntity, BoardId>;


// Fetch
export type FetchBoardsSuccessPayload = ArrayBoard;
export type FetchBoardsRequestAction = Action<"FETCH_BOARDS_REQUEST">;
export type FetchBoardsSuccessAction = PayloadAction<"FETCH_BOARDS_SUCCESS", FetchBoardsSuccessPayload>;
export type FetchBoardsFailureAction = ErrorAction<"FETCH_BOARDS_FAILURE", Error>;


// Add UI
export type AddBoardDialogOpenAction = Action<"ADD_BOARD_DIALOG_OPEN">;
export type AddBoardDialogCloseAction = Action<"ADD_BOARD_DIALOG_CLOSE">;

// Add
export type AddBoardRequestPayload = { name: string; secret: boolean };
export type AddBoardSuccessPayload = SingleBoard;
export type AddBoardRequestAction = PayloadAction<"ADD_BOARD_REQUEST", AddBoardRequestPayload>;
export type AddBoardSuccessAction = PayloadAction<"ADD_BOARD_SUCCESS", AddBoardSuccessPayload>;
export type AddBoardFailureAction = ErrorAction<"ADD_BOARD_FAILURE", Error>;


// Goto added board
export type GotoAddedBoardAction = PayloadAction<"GOTO_ADDED_BOARD", BoardId>;


// Update
export type UpdateBoardSuccessPayload = SingleBoard;
export type UpdateBoardIfNeededAction = PayloadAction<"UPDATE_BOARD_IF_NEEDED", BoardEntity>;
export type UpdateBoardRequestAction = PayloadAction<"UPDATE_BOARD_REQUEST", BoardEntity>;
export type UpdateBoardSuccessAction = PayloadAction<"UPDATE_BOARD_SUCCESS", UpdateBoardSuccessPayload>;
export type UpdateBoardFailureAction = ErrorAction<"UPDATE_BOARD_FAILURE", Error>;


// Delete
export type DeleteBoardSuccessPayload = SingleBoard;
export type DeleteBoardRequestAction = PayloadAction<"DELETE_BOARD_REQUEST", BoardId>;
export type DeleteBoardSuccessAction = PayloadAction<"DELETE_BOARD_SUCCESS", DeleteBoardSuccessPayload>;
export type DeleteBoardFailureAction = ErrorAction<"DELETE_BOARD_FAILURE", Error>;


// Set current
export type SetCurrentBoardAction = PayloadAction<"SET_CURRENT_BOARD", BoardId>;


// Select toggle
export type SelectBoardToggleAction = PayloadAction<"SELECT_BOARD_TOGGLE", BoardId>;


// Selected boards delete
export type SelectedBoardsDeleteSuccessPayload = ArrayBoard;
export type SelectedBoardsDeleteRequestAction = Action<"SELECTED_BOARDS_DELETE_REQUEST">;
export type SelectedBoardsDeleteSuccessAction = PayloadAction<"SELECTED_BOARDS_DELETE_SUCCESS",
  SelectedBoardsDeleteSuccessPayload>;
export type SelectedBoardsDeleteFailureAction = ErrorAction<"SELECTED_BOARDS_DELETE_FAILURE", Error>;
