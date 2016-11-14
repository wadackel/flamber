// @flow
import { normalize } from "normalizr";
import { takeEvery, takeLatest } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import ItemSchema from "../../schemas/item";
import * as Services from "../../services/items";
import { takeScreenshot } from "../../services/screenshot";
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

type AddItemFailureAction = AddItemFileFailureAction | AddItemURLFailureAction;


export function *handleAddItemFileRequest(action: AddItemFileRequestAction): Generator<any, *, *> {
  try {
    const { board, file, palette } = action.payload;
    const response = yield call((): Promise<{ item: Item }> => Services.addItemByFile(board, file, palette));
    if (!response) throw new Error("アイテムの追加に失敗しました");

    const normalized = normalize(response, { item: ItemSchema });
    yield put(I.addItemFileSuccess(normalized));

  } catch (error) {
    yield put(I.addItemFileFailure(error));
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


export function *handleAddItemURLRequest(action: AddItemURLRequestAction): Generator<any, *, *> {
  try {
    const { board, url } = action.payload;

    yield put(I.takeScreenshotStart());
    const image: ?HTMLImageElement = yield call((): Promise<HTMLImageElement> => takeScreenshot(url));
    yield put(I.takeScreenshotEnd());

    if (!image) throw new Error("スクリーンショットの撮影に失敗しました");

    const response = yield call((): Promise<{ item: Item }> => Services.addItemByURL(board, image, url));
    if (!response) throw new Error("アイテムの追加に失敗しました");

    const normalized = normalize(response, { item: ItemSchema });
    yield put(I.addItemURLSuccess(normalized));

  } catch (error) {
    yield put(I.addItemURLFailure(error));
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


/* eslint-disable */
function *handleGotoAddedItem(): Generator<any, *, *> {
  // TODO
  console.log("Goto item!!");
}
/* eslint-enable */


function *handleAddItemFailure(action: AddItemFailureAction): Generator<any, *, *> {
  yield put(showNotify(action.payload.message));
}


export default function *addItemSaga(): Generator<any, *, *> {
  yield [
    takeLatest(I.ADD_ITEM_FILE_REQUEST, handleAddItemFileRequest),
    takeEvery(I.ADD_ITEM_FILE_SUCCESS, handleAddItemFileSuccess),

    takeLatest(I.ADD_ITEM_URL_REQUEST, handleAddItemURLRequest),
    takeEvery(I.ADD_ITEM_URL_SUCCESS, handleAddItemURLSuccess),

    takeEvery(I.GOTO_ADDED_ITEM, handleGotoAddedItem),

    takeEvery([
      I.ADD_ITEM_FILE_FAILURE,
      I.ADD_ITEM_URL_FAILURE
    ], handleAddItemFailure)
  ];
}
