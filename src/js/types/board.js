// @flow
import type { TypeMap } from "./map";
import type { Action, PayloadAction, ErrorAction } from "./action";
import type { ArrayNormalized, SingleNormalized } from "./normalize";

export type BoardId = string; // UUID

export type Board = {
  id: BoardId;
  name: string;
  secret: boolean;
  updated_at: Date;
  created_at: Date;
};

export type BoardEntity = $All<Board, {
  isUpdating: boolean;
  isDeleting: boolean;
}>;

export type Boards = Array<Board>;

export type BoardEntities = Array<BoardEntity>;

export type BoardState = {
  isFetching: boolean;
  isAdding: boolean;
  results: Array<BoardId>;
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
