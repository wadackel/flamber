import { normalize } from "normalizr";
import { takeEvery } from "redux-saga";
import { fork, take, call, put, select } from "redux-saga/effects";
import ItemSchema from "../../schemas/item";
import * as Services from "../../services/items";
import * as Notifications from "../../actions/notifications";
import * as Items from "../../actions/items";
import { getBoardEntityById } from "../../selectors/boards";


export function *handleAddItemFileRequest() {
  while (true) {
    const { payload } = yield take(Items.ADD_ITEM_FILE_REQUEST);

    try {
      const response = yield call(Services.addItemByFile, payload);
      const normalized = normalize(response, {
        item: ItemSchema
      });
      yield put(Items.addItemFileSuccess(normalized));
    } catch (error) {
      yield put(Items.addItemFileFailure(error));
    }
  }
}

export function *handleAddItemFileSuccess({ payload }) {
  const item = payload.entities.items[payload.result.item];
  const board = yield select(getBoardEntityById, item.board);

  yield put(Notifications.showNotify(`${board.name}にアイテムを追加しました`, {
    type: Items.GOTO_ADDED_ITEM,
    text: "Show"
  }));
}

function *handleAddItemFileFailure() {
  // TODO: More error message
  yield put(Notifications.showNotify("アイテムの追加に失敗しました"));
}


export function *handleAddItemURLRequest() {
  while (true) {
    const { payload } = yield take(Items.ADD_ITEM_URL_REQUEST);

    try {
      const response = yield call(Services.addItemByURL, payload);
      const normalized = normalize(response, {
        item: ItemSchema
      });
      yield put(Items.addItemURLSuccess(normalized));
    } catch (error) {
      yield put(Items.addItemURLFailure(error));
    }
  }
}

export function *handleAddItemURLSuccess({ payload }) {
  const item = payload.entities.items[payload.result.item];
  const board = yield select(getBoardEntityById, item.board);

  yield put(Notifications.showNotify(`${board.name}にアイテムを追加しました`, {
    type: Items.GOTO_ADDED_ITEM,
    text: "Show"
  }));
}

function *handleAddItemURLFailure() {
  // TODO: More error message
  yield put(Notifications.showNotify("アイテムの追加に失敗しました"));
}


/* eslint-disable */
function *handleGotoAddedItem() {
  // TODO
  console.log("ADD TODO");
}
/* eslint-enable */


export default function *addItemSaga() {
  yield [
    // File
    fork(handleAddItemFileRequest),
    takeEvery(Items.ADD_ITEM_FILE_SUCCESS, handleAddItemFileSuccess),
    takeEvery(Items.ADD_ITEM_FILE_FAILURE, handleAddItemFileFailure),

    // URL
    fork(handleAddItemURLRequest),
    takeEvery(Items.ADD_ITEM_URL_SUCCESS, handleAddItemURLSuccess),
    takeEvery(Items.ADD_ITEM_URL_FAILURE, handleAddItemURLFailure),

    takeEvery(Items.GOTO_ADDED_ITEM, handleGotoAddedItem)
  ];
}
