import { normalize } from "normalizr";
import { takeEvery } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import { getItemEntityById } from "../../selectors/items";
import ItemSchema from "../../schemas/item";
import * as Services from "../../services/items";
import * as Notifications from "../../actions/notifications";
import * as Items from "../../actions/items";
import { callUpdateItem } from "./helpers";


// Name
export function *handleUpdateItemNameIfNeeded({ payload }) {
  const entity = yield select(getItemEntityById, payload.id);

  if (entity.name !== payload.name) {
    yield put(Items.updateItemNameRequest(payload.id, payload.name));
  }
}

export function *handleUpdateItemNameRequest({ payload }) {
  yield callUpdateItem(
    payload,
    Items.updateItemNameSuccess,
    Items.updateItemNameFailure
  );
}

function *handleUpdateItemNameFailure() {
  // TODO: More erro message
  yield put(Notifications.showNotify("アイテムの更新に失敗しました"));
}


// Description
export function *handleUpdateItemDescriptionRequest({ payload }) {
  yield callUpdateItem(
    payload,
    Items.updateItemDescriptionSuccess,
    Items.updateItemDescriptionFailure
  );
}

function *handleUpdateItemDescriptionFailure() {
  // TODO: More erro message
  yield put(Notifications.showNotify("アイテムの更新に失敗しました"));
}


// Palette
export function *handleUpdateItemPaletteRequest({ payload }) {
  yield callUpdateItem(
    payload,
    Items.updateItemPaletteSuccess,
    Items.updateItemPaletteFailure
  );
}

function *handleUpdateItemPaletteFailure() {
  // TODO: More erro message
  yield put(Notifications.showNotify("アイテムの更新に失敗しました"));
}


// Image
export function *handleUpdateItemImageRequest({ payload }) {
  try {
    const response = yield call(Services.updateItemImage, payload);
    const normalized = normalize(response, {
      item: ItemSchema
    });
    yield put(Items.updateItemImageSuccess(normalized));
  } catch (error) {
    yield put(Items.updateItemImageFailure(error, payload));
  }
}

export function *handleUpdateItemImageSuccess() {
  yield put(Items.setItemImageEditing(false));
}

function *handleUpdateItemImageFailure() {
  // TODO: More erro message
  yield put(Notifications.showNotify("アイテムの更新に失敗しました"));
}


export default function *updateItemSaga() {
  yield [
    // Name
    takeEvery(Items.UPDATE_ITEM_NAME_IF_NEEDED, handleUpdateItemNameIfNeeded),
    takeEvery(Items.UPDATE_ITEM_NAME_REQUEST, handleUpdateItemNameRequest),
    takeEvery(Items.UPDATE_ITEM_NAME_FAILURE, handleUpdateItemNameFailure),

    // Description
    takeEvery(Items.UPDATE_ITEM_DESCRIPTION_REQUEST, handleUpdateItemDescriptionRequest),
    takeEvery(Items.UPDATE_ITEM_DESCRIPTION_FAILURE, handleUpdateItemDescriptionFailure),

    // Palette
    takeEvery(Items.UPDATE_ITEM_PALETTE_REQUEST, handleUpdateItemPaletteRequest),
    takeEvery(Items.UPDATE_ITEM_PALETTE_FAILURE, handleUpdateItemPaletteFailure),

    // Image
    takeEvery(Items.UPDATE_ITEM_IMAGE_REQUEST, handleUpdateItemImageRequest),
    takeEvery(Items.UPDATE_ITEM_IMAGE_SUCCESS, handleUpdateItemImageSuccess),
    takeEvery(Items.UPDATE_ITEM_IMAGE_FAILURE, handleUpdateItemImageFailure)
  ];
}
