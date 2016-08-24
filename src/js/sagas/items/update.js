/* eslint-disable */
import { takeEvery } from "redux-saga";
import { put, select } from "redux-saga/effects";
import { getItemEntityById } from "../../selectors/items";
import * as Services from "../../services/items";
import * as Notifications from "../../actions/notifications";
import * as Items from "../../actions/items";


export function *handleUpdateItemNameIfNeeded({ payload }) {
  const entity = yield select(getItemEntityById, payload.id);

  if (entity.name !== payload.name) {
    yield put(Items.updateItemNameRequest(payload.id, payload.name));
  }
}

export function *handleUpdateItemNameRequest({ payload }) {
  const entity = yield select(getItemEntityById, payload.id);

  // TODO: Update name
}


export default function *updateItemSaga() {
  yield [
    takeEvery(Items.UPDATE_ITEM_NAME_IF_NEEDED, handleUpdateItemNameIfNeeded),
    takeEvery(Items.UPDATE_ITEM_NAME_REQUEST, handleUpdateItemNameRequest)
  ];
}
