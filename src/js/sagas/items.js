import { fork, take, put, call } from "redux-saga/effects";
import {
  fetchBoardItems,
  addItem
} from "../api/items";
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

function *handleFetchBoardItemsRequest() {
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

function *watchCurrentBoard() {
  while (true) {
    const action = yield take(Boards.CURRENT_BOARD);
    yield put(Items.fetchBoardItemsRequest(action.payload));
  }
}

export default function *rootSaga() {
  yield [
    fork(handleAddItemRequest),
    fork(handleFetchBoardItemsRequest),
    fork(watchCurrentBoard)
  ];
}
