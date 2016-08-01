import { takeLatest } from "redux-saga";
import { fork, take, put, call, select } from "redux-saga/effects";
import * as Services from "../services/items";
import { getCurrentBoard } from "../selectors/boards";
import { getSelectedItems, getItemById } from "../selectors/items";
import * as Boards from "../actions/boards";
import * as Items from "../actions/items";

export function *handleAddItemRequest() {
  while (true) {
    const { payload } = yield take(Items.ADD_ITEM_REQUEST);

    try {
      const item = yield call(Services.addItem, payload);
      yield put(Items.addItemSuccess(item));
    } catch (error) {
      yield put(Items.addItemFailure(error));
    }
  }
}

export function *handleAddItemSuccess() {
  while (true) {
    const { payload } = yield take(Items.ADD_ITEM_SUCCESS);
    const board = yield select(getCurrentBoard);

    if (board && board._id === payload.boardId) {
      yield put(Items.addBoardItem(payload));
    }
  }
}

export function *handleFavoriteItemToggleRequest({ payload }) {
  try {
    const item = yield select(getItemById, payload);
    item.favorite = !item.favorite;

    const [newItem] = yield call(Services.updateItems, [item]);
    yield put(Items.favoriteItemToggleSuccess(newItem));
  } catch (error) {
    yield put(Items.favoriteItemToggleFailure(error));
  }
}

export function *watchFavoriteItemToggleRequest() {
  yield *takeLatest(Items.FAVORITE_ITEM_TOGGLE_REQUEST, handleFavoriteItemToggleRequest);
}

export function *handleMoveItemBoardRequest() {
  while (true) {
    const { payload } = yield take(Items.MOVE_ITEM_BOARD_REQUEST);
    const { id, boardId } = payload;
    const item = yield select(getItemById, id);
    const prevBoardId = item.boardId;
    const newItem = { ...item, boardId };

    try {
      const [updatedItem] = yield call(Services.updateItems, [newItem]);
      yield put(Items.moveItemBoardSuccess({
        item: updatedItem,
        prevBoardId
      }));
    } catch (error) {
      yield put(Items.moveItemBoardFailure(error));
    }
  }
}

export function *handleMoveItemBoardSuccess() {
  while (true) {
    const { payload } = yield take(Items.MOVE_ITEM_BOARD_SUCCESS);
    const board = yield select(getCurrentBoard);

    if (board && board._id !== payload.item.boardId) {
      yield put(Items.removeBoardItem(payload.item));
    }
  }
}

export function *handleFetchBoardItemsRequest() {
  while (true) {
    const { payload } = yield take(Items.FETCH_BOARD_ITEMS_REQUEST);

    try {
      const items = yield call(Services.fetchBoardItems, payload);
      yield put(Items.fetchBoardItemsSuccess(items));
    } catch (error) {
      yield put(Items.fetchBoardItemsFailure(error));
    }
  }
}

export function *watchCurrentBoard() {
  while (true) {
    const { payload } = yield take(Boards.CURRENT_BOARD);
    yield put(Items.fetchBoardItemsRequest(payload));
  }
}

export function *handleDeleteItemRequest({ payload }) {
  try {
    const item = yield select(getItemById, payload);
    const [deletedItem] = yield call(Services.deleteItems, [item]);
    yield put(Items.deleteItemSuccess(deletedItem));
  } catch (error) {
    yield put(Items.deleteItemFailure(error));
  }
}

export function *watchDeleteItemRequest() {
  yield *takeLatest(Items.DELETE_ITEM_REQUEST, handleDeleteItemRequest);
}

export function *handleDeleteItemSuccess() {
  while (true) {
    const { payload } = yield take(Items.DELETE_ITEM_SUCCESS);
    const board = yield select(getCurrentBoard);

    if (board && board._id === payload.boardId) {
      yield put(Items.removeBoardItem(payload));
    }
  }
}

export function *handleSelectedItemsMoveRequest() {
  while (true) {
    const { payload } = yield take(Items.SELECTED_ITEMS_MOVE_REQUEST);
    const boardId = payload;
    const selectedItems = yield select(getSelectedItems);
    const newItems = selectedItems.map(item => ({ ...item, boardId }));

    try {
      const updatedItems = yield call(Services.updateItems, newItems);
      yield put(Items.selectedItemsMoveSuccess({
        items: updatedItems,
        prevItems: selectedItems
      }));
    } catch (error) {
      yield put(Items.selectedItemsMoveFailure(error));
    }
  }
}

export function *handleSelectedItemsMoveSuccess() {
  while (true) {
    const { payload } = yield take(Items.SELECTED_ITEMS_MOVE_SUCCESS);
    const { prevItems } = payload;
    const board = yield select(getCurrentBoard);
    if (!board) continue;

    const removeItems = prevItems.filter(item => item.boardId === board._id);
    if (removeItems.length === 0) continue;

    yield put(Items.removeBoardItems(removeItems));
  }
}

export function *handleSelectedItemsFavoriteRequest() {
  while (true) {
    const { payload } = yield take(Items.SELECTED_ITEMS_FAVORITE_REQUEST);
    const selectedItems = yield select(getSelectedItems);
    const newItems = selectedItems.map(item => ({ ...item, favorite: payload }));

    try {
      const updatedItems = yield call(Services.updateItems, newItems);
      yield put(Items.selectedItemsFavoriteSuccess({
        items: updatedItems,
        favorite: payload
      }));
    } catch (error) {
      yield put(Items.selectedItemsFavoriteFailure(error));
    }
  }
}

export function *handleSelectedItemsDeleteRequest() {
  while (true) {
    yield take(Items.SELECTED_ITEMS_DELETE_REQUEST);
    const selectedItems = yield select(getSelectedItems);

    try {
      const items = yield call(Services.deleteItems, selectedItems);
      yield put(Items.selectedItemsDeleteSuccess(items));
    } catch (error) {
      yield put(Items.selectedItemsDeleteFailure(error));
    }
  }
}

export function *handleSelectedItemsDeleteSuccess() {
  while (true) {
    const { payload } = yield take(Items.SELECTED_ITEMS_DELETE_SUCCESS);
    const board = yield select(getCurrentBoard);
    if (!board) continue;

    const removeItems = payload.filter(item => item.boardId === board._id);
    if (removeItems.length === 0) continue;

    yield put(Items.removeBoardItems(removeItems));
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
    fork(handleSelectedItemsFavoriteRequest),
    fork(handleSelectedItemsDeleteRequest),
    fork(handleSelectedItemsDeleteSuccess)
  ];
}
