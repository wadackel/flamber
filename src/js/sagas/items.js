import { takeLatest } from "redux-saga";
import { fork, take, put, call, select } from "redux-saga/effects";
import {
  fetchBoardItems,
  addItem,
  updateItem,
  updateItems,
  deleteItem
} from "../api/items";
import { getCurrentBoard } from "../selectors/boards";
import { getSelectedItems, getItemById } from "../selectors/items";
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
    const newItem = { ...item, boardId };

    try {
      const updatedItem = yield call(updateItem, newItem);
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

    if (board && board._id !== action.payload.item.boardId) {
      yield put(Items.removeBoardItem(action.payload.item));
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
      yield put(Items.removeBoardItem(action.payload));
    }
  }
}

export function *handleSelectedItemsMoveRequest() {
  while (true) {
    const action = yield take(Items.SELECTED_ITEMS_MOVE_REQUEST);
    const boardId = action.payload;
    const selectedItems = yield select(getSelectedItems);
    const newItems = selectedItems.map(item => ({ ...item, boardId }));

    try {
      const updatedItems = yield call(updateItems, newItems);
      yield put(Items.selectedItemsMoveSuccess({
        items: updatedItems,
        prevItems: selectedItems
      }));
    } catch (err) {
      yield put(Items.selectedItemsMoveFailure(err));
    }
  }
}

export function *handleSelectedItemsMoveSuccess() {
  while (true) {
    const action = yield take(Items.SELECTED_ITEMS_MOVE_SUCCESS);
    const { prevItems } = action.payload;
    const board = yield select(getCurrentBoard);
    if (!board) continue;

    const removeItems = prevItems.filter(item => item.boardId === board._id);
    if (removeItems.length === 0) continue;

    yield put(Items.removeBoardItems(removeItems));
  }
}

export function *handleSelectedItemsFavoriteRequest() {
  while (true) {
    const action = yield take(Items.SELECTED_ITEMS_FAVORITE_REQUEST);
    const selectedItems = yield select(getSelectedItems);
    const newItems = selectedItems.map(item => ({ ...item, favorite: action.payload }));

    try {
      const updatedItems = yield call(updateItems, newItems);
      yield put(Items.selectedItemsFavoriteSuccess({
        items: updatedItems,
        favorite: action.payload
      }));
    } catch (err) {
      yield put(Items.selectedItemsFavoriteFailure(err));
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
    fork(handleDeleteItemSuccess),
    fork(handleSelectedItemsMoveRequest),
    fork(handleSelectedItemsMoveSuccess),
    fork(handleSelectedItemsFavoriteRequest)
  ];
}
