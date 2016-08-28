/* eslint-disable */
import { normalize, arrayOf } from "normalizr";
import { takeEvery } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import ItemSchema from "../../schemas/item";
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
  const newEntity = { ...entity, name: payload.name };

  try {
    const response = yield call(Services.updateItems, [newEntity]);
    const normalized = normalize(response, {
      items: arrayOf(ItemSchema)
    });
    yield put(Items.updateItemNameSuccess(normalized));
  } catch (error) {
    yield put(Items.updateItemNameFailure(error, payload));
  }
}

function *handleUpdateItemNameFailure() {
  // TODO: More erro message
  yield put(Notifications.showNotify("アイテムの更新に失敗しました"));
}


export function *handleUpdateItemPaletteRequest({ payload }) {
  const entity = yield select(getItemEntityById, payload.id);
  const newEntity = { ...entity, palette: payload.palette };

  try {
    const response = yield call(Services.updateItems, [newEntity]);
    const normalized = normalize(response, {
      items: arrayOf(ItemSchema)
    });
    yield put(Items.updateItemPaletteSuccess(normalized));
  } catch (error) {
    yield put(Items.updateItemPaletteFailure(error, payload));
  }
}

function *handleUpdateItemPaletteFailure() {
  // TODO: More erro message
  yield put(Notifications.showNotify("アイテムの更新に失敗しました"));
}


export default function *updateItemSaga() {
  yield [
    takeEvery(Items.UPDATE_ITEM_NAME_IF_NEEDED, handleUpdateItemNameIfNeeded),
    takeEvery(Items.UPDATE_ITEM_NAME_REQUEST, handleUpdateItemNameRequest),
    takeEvery(Items.UPDATE_ITEM_NAME_FAILURE, handleUpdateItemNameFailure),

    takeEvery(Items.UPDATE_ITEM_PALETTE_REQUEST, handleUpdateItemPaletteRequest),
    takeEvery(Items.UPDATE_ITEM_PALETTE_FAILURE, handleUpdateItemPaletteFailure),
  ];
}
