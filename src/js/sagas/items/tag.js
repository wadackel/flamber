import { normalize, arrayOf } from "normalizr";
import { takeEvery } from "redux-saga";
import { take, call, put, select } from "redux-saga/effects";
import ItemSchema from "../../schemas/item";
import { getItemEntityById } from "../../selectors/items";
import * as Services from "../../services/items";
import * as Notifications from "../../actions/notifications";
import * as Items from "../../actions/items";
import * as Tags from "../../actions/tags";
import { callUpdateItem } from "./helpers";


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


// Register
export function *handleRegisterItemTagRequest({ payload }) {
  const entity = yield select(getItemEntityById, payload.id);

  yield put(Tags.addTagRequest(payload.label));
  const res = yield take([Tags.ADD_TAG_SUCCESS, Tags.ADD_TAG_FAILURE]);

  if (res.payload instanceof Error) {
    yield put(Items.registerItemTagFailure(res.payload, payload));
  }

  try {
    const newTagId = res.payload.result.tag;
    const newEntity = {
      ...entity,
      tags: entity.tags.map(id => id === payload.tagId ? newTagId : id)
    };

    const response = yield call(Services.updateItems, [newEntity]);
    const normalized = normalize(response, {
      items: arrayOf(ItemSchema)
    });

    yield put(Items.registerItemTagSuccess(normalized, payload));

  } catch (error) {
    yield put(Items.registerItemTagFailure(error, payload));
  }
}


export default function *tagItemSaga() {
  yield [
    // Add tag
    takeEvery(Items.ADD_ITEM_TAG_IF_NEEDED, handleAddItemTagIfNeeded),
    takeEvery(Items.ADD_ITEM_TAG_REQUEST, handleAddItemTagRequest),
    takeEvery(Items.ADD_ITEM_TAG_FAILURE, handleAddItemTagFailure),

    // Remove tag
    takeEvery(Items.REMOVE_ITEM_TAG_REQUEST, handleRemoveItemTagRequest),
    takeEvery(Items.REMOVE_ITEM_TAG_FAILURE, handleRemoveItemTagFailure),

    // Register tag
    takeEvery(Items.REGISTER_ITEM_TAG_REQUEST, handleRegisterItemTagRequest)
  ];
}
