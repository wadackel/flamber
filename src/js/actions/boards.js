// @flow
import type {
  BoardId,
  BoardEntity,

  FetchBoardsSuccessPayload,
  FetchBoardsRequestAction,
  FetchBoardsSuccessAction,
  FetchBoardsFailureAction,

  FetchBoardSuccessPayload,
  FetchBoardRequestAction,
  FetchBoardSuccessAction,
  FetchBoardFailureAction,

  AddBoardDialogOpenAction,
  AddBoardDialogCloseAction,

  AddBoardSuccessPayload,
  AddBoardRequestAction,
  AddBoardSuccessAction,
  AddBoardFailureAction,

  GotoAddedBoardAction,

  UpdateBoardSuccessPayload,
  UpdateBoardIfNeededAction,
  UpdateBoardRequestAction,
  UpdateBoardSuccessAction,
  UpdateBoardFailureAction,

  DeleteBoardSuccessPayload,
  DeleteBoardRequestAction,
  DeleteBoardSuccessAction,
  DeleteBoardFailureAction,

  SetCurrentBoardAction,

  SetSelectBoardsAction,
  SelectBoardToggleAction,
  SelectAllBoardAction,
  UnselectAllBoardAction,

  SelectedBoardsDeleteSuccessPayload,
  SelectedBoardsDeleteRequestAction,
  SelectedBoardsDeleteSuccessAction,
  SelectedBoardsDeleteFailureAction,

  SelectCoverItemSuccessPayload,
  SelectCoverItemDialogOpenAction,
  SelectCoverItemDialogCloseAction,
  SelectCoverItemRequestAction,
  SelectCoverItemSuccessAction,
  SelectCoverItemFailureAction
} from "../types/board";
import type { ItemId } from "../types/item";


// Fetch
export const FETCH_BOARDS_REQUEST = "FETCH_BOARDS_REQUEST";
export const FETCH_BOARDS_SUCCESS = "FETCH_BOARDS_SUCCESS";
export const FETCH_BOARDS_FAILURE = "FETCH_BOARDS_FAILURE";

export const fetchBoardsRequest = (): FetchBoardsRequestAction => (
  { type: FETCH_BOARDS_REQUEST }
);

export const fetchBoardsSuccess = (payload: FetchBoardsSuccessPayload): FetchBoardsSuccessAction => (
  { type: FETCH_BOARDS_SUCCESS, payload }
);

export const fetchBoardsFailure = (error: Error): FetchBoardsFailureAction => (
  { type: FETCH_BOARDS_FAILURE, payload: error, error: true }
);

export const FETCH_BOARD_REQUEST = "FETCH_BOARD_REQUEST";
export const FETCH_BOARD_SUCCESS = "FETCH_BOARD_SUCCESS";
export const FETCH_BOARD_FAILURE = "FETCH_BOARD_FAILURE";

export const fetchBoardRequest = (id: BoardId): FetchBoardRequestAction => (
  { type: FETCH_BOARD_REQUEST, payload: id }
);

export const fetchBoardSuccess = (payload: FetchBoardSuccessPayload): FetchBoardSuccessAction => (
  { type: FETCH_BOARD_SUCCESS, payload }
);

export const fetchBoardFailure = (error: Error): FetchBoardFailureAction => (
  { type: FETCH_BOARD_FAILURE, payload: error, error: true }
);


// Add (UI)
export const ADD_BOARD_DIALOG_OPEN = "ADD_BOARD_DIALOG_OPEN";
export const ADD_BOARD_DIALOG_CLOSE = "ADD_BOARD_DIALOG_CLOSE";

export const addBoardDialogOpen = (): AddBoardDialogOpenAction => (
  { type: ADD_BOARD_DIALOG_OPEN }
);

export const addBoardDialogClose = (): AddBoardDialogCloseAction => (
  { type: ADD_BOARD_DIALOG_CLOSE }
);


// Add
export const ADD_BOARD_REQUEST = "ADD_BOARD_REQUEST";
export const ADD_BOARD_SUCCESS = "ADD_BOARD_SUCCESS";
export const ADD_BOARD_FAILURE = "ADD_BOARD_FAILURE";

export const addBoardRequest = (name: string, secret: boolean): AddBoardRequestAction => (
  { type: ADD_BOARD_REQUEST, payload: { name, secret } }
);

export const addBoardSuccess = (payload: AddBoardSuccessPayload): AddBoardSuccessAction => (
  { type: ADD_BOARD_SUCCESS, payload }
);

export const addBoardFailure = (error: Error): AddBoardFailureAction => (
  { type: ADD_BOARD_FAILURE, payload: error, error: true }
);


// Goto added board
export const GOTO_ADDED_BOARD = "GOTO_ADDED_BOARD";
export const gotoAddedBoard = (id: BoardId): GotoAddedBoardAction => (
  { type: GOTO_ADDED_BOARD, payload: id }
);


// Update
export const UPDATE_BOARD_IF_NEEDED = "UPDATE_BOARD_IF_NEEDED";
export const UPDATE_BOARD_REQUEST = "UPDATE_BOARD_REQUEST";
export const UPDATE_BOARD_SUCCESS = "UPDATE_BOARD_SUCCESS";
export const UPDATE_BOARD_FAILURE = "UPDATE_BOARD_FAILURE";

export const updateBoardIfNeeded = (entity: BoardEntity): UpdateBoardIfNeededAction => (
  { type: UPDATE_BOARD_IF_NEEDED, payload: entity }
);

export const updateBoardRequest = (entity: BoardEntity): UpdateBoardRequestAction => (
  { type: UPDATE_BOARD_REQUEST, payload: entity }
);

export const updateBoardSuccess = (payload: UpdateBoardSuccessPayload): UpdateBoardSuccessAction => (
  { type: UPDATE_BOARD_SUCCESS, payload }
);

export const updateBoardFailure = (error: Error, entity: ?BoardEntity): UpdateBoardFailureAction => (
  { type: UPDATE_BOARD_FAILURE, payload: error, error: true, meta: entity }
);


// Delete
export const DELETE_BOARD_REQUEST = "DELETE_BOARD_REQUEST";
export const DELETE_BOARD_SUCCESS = "DELETE_BOARD_SUCCESS";
export const DELETE_BOARD_FAILURE = "DELETE_BOARD_FAILURE";

export const deleteBoardRequest = (id: BoardId): DeleteBoardRequestAction => (
  { type: DELETE_BOARD_REQUEST, payload: id }
);

export const deleteBoardSuccess = (payload: DeleteBoardSuccessPayload): DeleteBoardSuccessAction => (
  { type: DELETE_BOARD_SUCCESS, payload }
);

export const deleteBoardFailure = (error: Error, entity: ?BoardEntity): DeleteBoardFailureAction => (
  { type: DELETE_BOARD_FAILURE, payload: error, error: true, meta: entity }
);


// Current
export const SET_CURRENT_BOARD = "SET_CURRENT_BOARD";
export const setCurrentBoard = (id: BoardId): SetCurrentBoardAction => (
  { type: SET_CURRENT_BOARD, payload: id }
);


// Set select
export const SET_SELECT_BOARDS = "SET_SELECT_BOARDS";
export const setSelectBoards = (ids: Array<BoardId>): SetSelectBoardsAction => (
  { type: SET_SELECT_BOARDS, payload: ids }
);


// Select
export const SELECT_BOARD_TOGGLE = "SELECT_BOARD_TOGGLE";
export const selectBoardToggle = (id: BoardId): SelectBoardToggleAction => (
  { type: SELECT_BOARD_TOGGLE, payload: id }
);


// Select & Unselect all
export const SELECT_ALL_BOARD = "SELECT_ALL_BOARD";
export const UNSELECT_ALL_BOARD = "UNSELECT_ALL_BOARD";

export const selectAllBoard = (): SelectAllBoardAction => (
  { type: SELECT_ALL_BOARD }
);

export const unselectAllBoard = (): UnselectAllBoardAction => (
  { type: UNSELECT_ALL_BOARD }
);


// Select delete
export const SELECTED_BOARDS_DELETE_REQUEST = "SELECTED_BOARDS_DELETE_REQUEST";
export const SELECTED_BOARDS_DELETE_SUCCESS = "SELECTED_BOARDS_DELETE_SUCCESS";
export const SELECTED_BOARDS_DELETE_FAILURE = "SELECTED_BOARDS_DELETE_FAILURE";

export const selectedBoardsDeleteRequest = (): SelectedBoardsDeleteRequestAction => (
  { type: SELECTED_BOARDS_DELETE_REQUEST }
);

/* eslint-disable max-len */
export const selectedBoardsDeleteSuccess = (payload: SelectedBoardsDeleteSuccessPayload): SelectedBoardsDeleteSuccessAction => (
  { type: SELECTED_BOARDS_DELETE_SUCCESS, payload }
);
/* eslint-enable max-len */

export const selectedBoardsDeleteFailure = (error: Error): SelectedBoardsDeleteFailureAction => (
  { type: SELECTED_BOARDS_DELETE_FAILURE, payload: error, error: true }
);


// Select cover item
export const SELECT_COVER_ITEM_DIALOG_OPEN = "SELECT_COVER_ITEM_DIALOG_OPEN";
export const SELECT_COVER_ITEM_DIALOG_CLOSE = "SELECT_COVER_ITEM_DIALOG_CLOSE";
export const SELECT_COVER_ITEM_REQUEST = "SELECT_COVER_ITEM_REQUEST";
export const SELECT_COVER_ITEM_SUCCESS = "SELECT_COVER_ITEM_SUCCESS";
export const SELECT_COVER_ITEM_FAILURE = "SELECT_COVER_ITEM_FAILURE";

export const selectCoverItemDialogOpen = (id: BoardId): SelectCoverItemDialogOpenAction => (
  { type: SELECT_COVER_ITEM_DIALOG_OPEN, payload: id }
);

export const selectCoverItemDialogClose = (): SelectCoverItemDialogCloseAction => (
  { type: SELECT_COVER_ITEM_DIALOG_CLOSE }
);

export const selectCoverItemRequest = (id: BoardId, item: ItemId): SelectCoverItemRequestAction => (
  { type: SELECT_COVER_ITEM_REQUEST, payload: { id, item } }
);

export const selectCoverItemSuccess = (payload: SelectCoverItemSuccessPayload): SelectCoverItemSuccessAction => (
  { type: SELECT_COVER_ITEM_SUCCESS, payload }
);

export const selectCoverItemFailure = (error: Error, id: BoardId): SelectCoverItemFailureAction => (
  { type: SELECT_COVER_ITEM_FAILURE, payload: error, error: true, meta: id }
);
