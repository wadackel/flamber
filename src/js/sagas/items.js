import { takeLatest } from "redux-saga";
import { fork, take, put, call, select } from "redux-saga/effects";
import {
  fetchBoardItems,
  addItem,
  updateItem,
  deleteItem
} from "../api/items";
import { getCurrentBoard } from "../selectors/boards";
import { getItemById } from "../selectors/items";
import * as Boards from "../actions/boards";
import * as Items from "../actions/items";

export function *handleAddItemRequest() {
  while (true) {
    const action = yield take(Items.ADD_ITEM_REQUEST);

    try {
      const item = yield call(addItem, action.payload);
      yield put(Items.addItemSuccess(item));
    } catch (err) {
      yield put(Items.addItemFailure(err));
    }
  }
}

export function *handleAddItemSuccess() {
  while (true) {
    const action = yield take(Items.ADD_ITEM_SUCCESS);
    const board = yield select(getCurrentBoard);

    if (board && board._id === action.payload.boardId) {
      yield put(Items.addBoardItem(action.payload));
    }
  }
}

export function *handleFavoriteItemToggleRequest(action) {
  try {
    const item = yield select(getItemById, action.payload);
    item.favorite = !item.favorite;

    const newItem = yield call(updateItem, item);
    yield put(Items.favoriteItemToggleSuccess(newItem));
  } catch (err) {
    yield put(Items.favoriteItemToggleFailure(err));
  }
}

export function *watchFavoriteItemToggleRequest() {
  yield *takeLatest(Items.FAVORITE_ITEM_TOGGLE_REQUEST, handleFavoriteItemToggleRequest);
}

export function *handleMoveItemBoardRequest() {
  while (true) {
    const action = yield take(Items.MOVE_ITEM_BOARD_REQUEST);
    const { id, boardId } = action.payload;
    const item = yield select(getItemById, id);
    const prevBoardId = item.boardId;
    item.boardId = boardId;

    try {
      const updatedItem = yield call(updateItem, item);
      yield put(Items.moveItemBoardSuccess({
        item: updatedItem,
        prevBoardId
      }));
    } catch (err) {
      yield put(Items.moveItemBoardFailure(err));
    }
  }
}

export function *handleMoveItemBoardSuccess() {
  while (true) {
    const action = yield take(Items.MOVE_ITEM_BOARD_SUCCESS);
    const board = yield select(getCurrentBoard);

    if (board && board._id !== action.payload.boardId) {
      yield put(Items.deleteBoardItem(action.payload));
    }
  }
}

export function *handleFetchBoardItemsRequest() {
  while (true) {
    const action = yield take(Items.FETCH_BOARD_ITEMS_REQUEST);

    try {
      const items = yield call(fetchBoardItems, action.payload);
      yield put(Items.fetchBoardItemsSuccess(items));
    } catch (err) {
      yield put(Items.fetchBoardItemsFailure(err));
    }
  }
}

export function *watchCurrentBoard() {
  while (true) {
    const action = yield take(Boards.CURRENT_BOARD);
    yield put(Items.fetchBoardItemsRequest(action.payload));
  }
}

export function *handleDeleteItemRequest(action) {
  try {
    const item = yield call(deleteItem, action.payload);
    yield put(Items.deleteItemSuccess(item));
  } catch (err) {
    yield put(Items.deleteItemFailure(err));
  }
}

export function *watchDeleteItemRequest() {
  yield *takeLatest(Items.DELETE_ITEM_REQUEST, handleDeleteItemRequest);
}

export function *handleDeleteItemSuccess() {
  while (true) {
    const action = yield take(Items.DELETE_ITEM_SUCCESS);
    const board = yield select(getCurrentBoard);

    if (board && board._id === action.payload.boardId) {
      yield put(Items.deleteBoardItem(action.payload));
    }
  }
}

export default function *rootSaga() {
  yield [
    fork(handleAddItemRequest),
    fork(handleAddItemSuccess),
    fork(watchFavoriteItemToggleRequest),
    fork(handleFetchBoardItemsRequest),
    fork(handleMoveItemBoardRequest),
    fork(handleMoveItemBoardSuccess),
    fork(watchCurrentBoard),
    fork(watchDeleteItemRequest),
    fork(handleDeleteItemSuccess)
  ];
}
