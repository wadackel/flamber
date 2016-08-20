import { normalize } from "normalizr";
import { takeEvery } from "redux-saga";
import { fork, take, call, put, select } from "redux-saga/effects";
import ItemSchema from "../../schemas/item";
import * as Services from "../../services/items";
import * as Notifications from "../../actions/notifications";
import * as Items from "../../actions/items";
import { getBoardEntityById } from "../../selectors/boards";


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

export function *handleAddItemSuccess({ payload }) {
  const item = payload.entities.items[payload.result.item];
  const board = yield select(getBoardEntityById, item.board);

  yield put(Notifications.showNotify(`${board.name}にアイテムを追加しました`, {
    type: Items.GOTO_ADDED_ITEM,
    text: "Show"
  }));
}

function *handleGotoAddedItem() {
  // TODO
  console.log("ADD TODO");
}

function *handleAddItemFailure() {
  // TODO: More error message
  yield put(Notifications.showNotify("アイテムの追加に失敗しました"));
}

export default function *addItemSaga() {
  yield [
    fork(handleAddItemRequest),
    takeEvery(Items.ADD_ITEM_SUCCESS, handleAddItemSuccess),
    takeEvery(Items.GOTO_ADDED_ITEM, handleGotoAddedItem),
    takeEvery(Items.ADD_ITEM_FAILURE, handleAddItemFailure)
  ];
}
