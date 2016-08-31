/* eslint-disable */
import { normalize, arrayOf } from "normalizr";
import { takeEvery } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import ItemSchema from "../../schemas/item";
import { getItemEntityById } from "../../selectors/items";
import * as Services from "../../services/items";
import * as Notifications from "../../actions/notifications";
import * as Items from "../../actions/items";


function *callUpdateItem(payload, success, failure) {
  const entity = yield select(getItemEntityById, payload.id);
  const {
    id, // eslint-disable-line no-unused-vars
    ...props
  } = payload;
  const newEntity = { ...entity, ...props };

  try {
    const response = yield call(Services.updateItems, [newEntity]);
    const normalized = normalize(response, {
      items: arrayOf(ItemSchema)
    });
    yield put(success(normalized));
  } catch (error) {
    yield put(failure(error, payload));
  }
}


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


// Add tag
export function *handleAddItemTagIfNeeded({ payload }) {
  const { id, tagId } = payload;
  const entity = yield select(getItemEntityById, id);

  if (entity && entity.tags.indexOf(tagId) === -1) {
    yield put(Items.addItemTagRequest(id, tagId));
  }
}

export function *handleAddItemTagRequest({ payload }) {
  yield callUpdateItem(
    payload,
    Items.addItemTagSuccess,
    Items.addItemTagFailure
  );
}

function *handleAddItemTagFailure() {
  // TODO: More erro message
  yield put(Notifications.showNotify("アイテムの更新に失敗しました"));
}


// Remove tag
export function *handleRemoveItemTagRequest({ payload }) {
  yield callUpdateItem(
    payload,
    Items.removeItemTagSuccess,
    Items.removeItemTagFailure
  );
}

function *handleRemoveItemTagFailure() {
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

    // Add tag
    takeEvery(Items.ADD_ITEM_TAG_IF_NEEDED, handleAddItemTagIfNeeded),
    takeEvery(Items.ADD_ITEM_TAG_REQUEST, handleAddItemTagRequest),
    takeEvery(Items.ADD_ITEM_TAG_FAILURE, handleAddItemTagFailure),

    // Remove tag
    takeEvery(Items.REMOVE_ITEM_TAG_REQUEST, handleRemoveItemTagRequest),
    takeEvery(Items.REMOVE_ITEM_TAG_FAILURE, handleRemoveItemTagFailure)
  ];
}
