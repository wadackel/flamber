import { takeEvery } from "redux-saga";
import { fork, take, call, put, select } from "redux-saga/effects";
import * as Services from "../../services/items";
import * as Notifications from "../../actions/notifications";
import * as Items from "../../actions/items";
import { getItemEntityById, getSelectedItemEntities } from "../../selectors/items";


export function *handleDeleteItemRequest() {
  while (true) {
    const { payload } = yield take(Items.DELETE_ITEM_REQUEST);
    const entity = yield select(getItemEntityById, payload);

    try {
      yield call(Services.deleteItems, [entity]);
      yield put(Items.deleteItemSuccess(entity));
    } catch (error) {
      yield put(Items.deleteItemFailure(error, entity));
    }
  }
}

function *handleDeleteItemSuccess({ payload }) {
  yield put(Notifications.showNotify(`${payload.name}を削除しました`));
}

function *handleDeleteItemFailure() {
  // TODO: More error message
  yield put(Notifications.showNotify("アイテムの削除に失敗しました"));
}

export function *handleSelectedItemsDeleteRequest() {
  while (true) {
    yield take(Items.SELECTED_ITEMS_DELETE_REQUEST);
    const entities = yield select(getSelectedItemEntities);

    try {
      yield call(Services.deleteItems, entities);
      yield put(Items.selectedItemsDeleteSuccess(entities));
    } catch (error) {
      yield put(Items.selectedItemsDeleteFailure(error, entities));
    }
  }
}

function *handleSelectedItemsDeleteSuccess({ payload }) {
  yield put(Notifications.showNotify(`${payload.length}個のアイテムを削除しました`));
}

function *handleSelectedItemsDeleteFailure() {
  // TODO: More error message
  yield put(Notifications.showNotify("選択アイテムの削除に失敗しました"));
}


export default function *deleteItemSaga() {
  yield [
    fork(handleDeleteItemRequest),
    takeEvery(Items.DELETE_ITEM_SUCCESS, handleDeleteItemSuccess),
    takeEvery(Items.DELETE_ITEM_FAILURE, handleDeleteItemFailure),
    fork(handleSelectedItemsDeleteRequest),
    takeEvery(Items.SELECTED_ITEMS_DELETE_SUCCESS, handleSelectedItemsDeleteSuccess),
    takeEvery(Items.SELECTED_ITEMS_DELETE_FAILURE, handleSelectedItemsDeleteFailure)
  ];
}
