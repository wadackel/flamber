// @flow
import { normalize } from "normalizr";
import { takeEvery } from "redux-saga";
import { fork, take, call, put, select } from "redux-saga/effects";
import ItemSchema from "../../schemas/item";
import * as Services from "../../services/items";
import { showNotify } from "../../actions/notifications";
import * as I from "../../actions/items";
import { getBoardEntityById } from "../../selectors/boards";

import type { BoardEntity } from "../../types/board";
import type {
  Item,
  AddItemFileRequestAction,
  AddItemFileSuccessAction,
  AddItemFileFailureAction,
  AddItemURLRequestAction,
  AddItemURLSuccessAction,
  AddItemURLFailureAction
} from "../../types/item";


export function *handleAddItemFileRequest(): Generator<any, *, *> {
  while (true) {
    try {
      const action: ?AddItemFileRequestAction = yield take(I.ADD_ITEM_FILE_REQUEST);
      if (!action) throw new Error("アイテムの追加に失敗しました");

      const { board, file, palette } = action.payload;
      const response = yield call((): Promise<{ item: Item }> => Services.addItemByFile(board, file, palette));
      if (!response) throw new Error("アイテムの追加に失敗しました");

      const normalized = normalize(response, { item: ItemSchema });
      yield put(I.addItemFileSuccess(normalized));

    } catch (error) {
      yield put(I.addItemFileFailure(error));
    }
  }
}

function *handleAddItemFileSuccess(action: AddItemFileSuccessAction): Generator<any, *, *> {
  const { entities, result } = action.payload;
  const item = entities.items[result.item];
  const board: ?BoardEntity = yield select(getBoardEntityById, item.board_id);
  if (!board) return;

  yield put(showNotify(`${board.name}にアイテムを追加しました`, {
    type: I.GOTO_ADDED_ITEM,
    payload: {
      text: "Show",
      value: result.item
    }
  }));
}

function *handleAddItemFileFailure(action: AddItemFileFailureAction): Generator<any, *, *> {
  yield put(showNotify(action.payload.message));
}


export function *handleAddItemURLRequest(): Generator<any, *, *> {
  while (true) {

    try {
      const action: ?AddItemURLRequestAction = yield take(I.ADD_ITEM_URL_REQUEST);
      if (!action) throw new Error("ボードの追加に失敗しました");

      const { board, url } = action.payload;
      const response = yield call((): Promise<{ item: Item }> => Services.addItemByURL(board, url));
      if (!response) throw new Error("ボードの追加に失敗しました");

      const normalized = normalize(response, { item: ItemSchema });
      yield put(I.addItemURLSuccess(normalized));

    } catch (error) {
      yield put(I.addItemURLFailure(error));
    }
  }
}

function *handleAddItemURLSuccess(action: AddItemURLSuccessAction): Generator<any, *, *> {
  const { entities, result } = action.payload;
  const item = entities.items[result.item];
  const board: ?BoardEntity = yield select(getBoardEntityById, item.board_id);
  if (!board) return;

  yield put(showNotify(`${board.name}にアイテムを追加しました`, {
    type: I.GOTO_ADDED_ITEM,
    payload: {
      text: "Show",
      value: result.item
    }
  }));
}

function *handleAddItemURLFailure(action: AddItemURLFailureAction): Generator<any, *, *> {
  yield put(showNotify(action.payload.message));
}


/* eslint-disable */
function *handleGotoAddedItem(): Generator<any, *, *> {
  // TODO
  console.log("Goto item!!");
}
/* eslint-enable */


export default function *addItemSaga(): Generator<any, *, *> {
  yield [
    fork(handleAddItemFileRequest),
    takeEvery(I.ADD_ITEM_FILE_SUCCESS, handleAddItemFileSuccess),
    takeEvery(I.ADD_ITEM_FILE_FAILURE, handleAddItemFileFailure),

    fork(handleAddItemURLRequest),
    takeEvery(I.ADD_ITEM_URL_SUCCESS, handleAddItemURLSuccess),
    takeEvery(I.ADD_ITEM_URL_FAILURE, handleAddItemURLFailure),

    takeEvery(I.GOTO_ADDED_ITEM, handleGotoAddedItem)
  ];
}
