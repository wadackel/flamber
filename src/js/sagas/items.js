/* eslint-disable */
import { normalize, arrayOf } from "normalizr";
import { takeEvery, takeLatest } from "redux-saga";
import { fork, take, put, call, select } from "redux-saga/effects";
import ItemSchema from "../schemas/item";
import * as Services from "../services/items";
import * as Boards from "../actions/boards";
import * as Items from "../actions/items";


export function *handleAddItemRequest() {
  while (true) {
    const { payload } = yield take(Items.ADD_ITEM_REQUEST);

    try {
      const response = yield call(Services.addItemByFile, payload);
      const normalized = normalize(response, {
        item: ItemSchema
      });
      yield put(Items.addItemSuccess(normalized));
    } catch (error) {
      yield put(Items.addItemFailure(error));
    }
  }
}

export function *addItemSaga() {
  yield [
    fork(handleAddItemRequest)
  ]
}


export default function *itemsSaga() {
  yield [
    fork(addItemSaga)
  ];
}
