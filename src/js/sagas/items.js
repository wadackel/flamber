import { fork, take, put, call } from "redux-saga/effects";
import {
  addItem
} from "../api/items";
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

export default function *rootSaga() {
  yield [
    fork(handleAddItemRequest)
  ];
}
