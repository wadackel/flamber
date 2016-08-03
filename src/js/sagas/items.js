/* eslint-disable */
import { takeEvery, takeLatest } from "redux-saga";
import { fork, take, put, call, select } from "redux-saga/effects";
import * as Services from "../services/items";
import { getCurrentBoard } from "../selectors/boards";
import { getSelectedItems, getItemById } from "../selectors/items";
import * as Boards from "../actions/boards";
import * as Items from "../actions/items";



export function *handleAddItemRequest({ payload }) {
  console.log(payload);
}

export function *handleAddItemSuccess({ payload }) {
  // TODO:
}

export function *addItemSaga() {
  yield [
    takeEvery(Items.ADD_ITEM_REQUEST, handleAddItemRequest),
    takeEvery(Items.ADD_ITEM_SUCCESS, handleAddItemSuccess),
  ];
}


export default function *itemsSaga() {
  yield [
    fork(addItemSaga)
  ];
}
