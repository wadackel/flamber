// @flow
/* eslint-disable no-unused-vars */
import { normalize, arrayOf } from "normalizr";
import { takeEvery } from "redux-saga";
import { take, call, put, select } from "redux-saga/effects";
import ItemSchema from "../../schemas/item";
import { getItemEntityById } from "../../selectors/items";
import * as Services from "../../services/items";
import { showNotify } from "../../actions/notifications";
import * as I from "../../actions/items";
import * as T from "../../actions/tags";
import { callUpdateItem } from "./helpers";

import type {
  ItemEntity,
  AddItemTagIfNeededAction,
  AddItemTagRequestAction,
  AddItemTagFailureAction,
  RemoveItemTagRequestAction,
  RemoveItemTagFailureAction
} from "../../types/item";

type ItemTagFailureAction = AddItemTagFailureAction
  | RemoveItemTagFailureAction;


// Add tag
export function *handleAddItemTagIfNeeded(action: AddItemTagIfNeededAction): Generator<any, *, *> {
  const { id, tagId } = action.payload;
  const entity: ?ItemEntity = yield select(getItemEntityById, id);

  if (entity && entity.Tags.indexOf(tagId) === -1) {
    yield put(I.addItemTagRequest(id, tagId));
  }
}

export function *handleAddItemTagRequest(action: AddItemTagRequestAction): Generator<any, *, *> {
  yield callUpdateItem(
    action.payload,
    I.addItemTagSuccess,
    I.addItemTagFailure
  );
}


// Remove tag
export function *handleRemoveItemTagRequest(action: RemoveItemTagRequestAction): Generator<any, *, *> {
  yield callUpdateItem(
    action.payload,
    I.removeItemTagSuccess,
    I.removeItemTagFailure
  );
}


// // Register
// export function *handleRegisterItemTagRequest({ payload }): Generator<any, *, *> {
//   const entity = yield select(getItemEntityById, payload.id);
//
//   yield put(T.addTagRequest(payload.label));
//   const res = yield take([T.ADD_TAG_SUCCESS, T.ADD_TAG_FAILURE]);
//
//   if (res.payload instanceof Error) {
//     yield put(I.registerItemTagFailure(res.payload, payload));
//   }
//
//   try {
//     const newTagId = res.payload.result.tag;
//     const newEntity = {
//       ...entity,
//       tags: entity.tags.map(id => id === payload.tagId ? newTagId : id)
//     };
//
//     const response = yield call(Services.updateItems, [newEntity]);
//     const normalized = normalize(response, {
//       items: arrayOf(ItemSchema)
//     });
//
//     yield put(I.registerItemTagSuccess(normalized, payload));
//
//   } catch (error) {
//     yield put(I.registerItemTagFailure(error, payload));
//   }
// }


function *handleItemTagFailureAction(action: ItemTagFailureAction): Generator<any, *, *> {
  yield put(showNotify(action.payload.message));
}


export default function *tagItemSaga(): Generator<any, *, *> {
  yield [
    // Add tag
    takeEvery(I.ADD_ITEM_TAG_IF_NEEDED, handleAddItemTagIfNeeded),
    takeEvery(I.ADD_ITEM_TAG_REQUEST, handleAddItemTagRequest),

    // Remove tag
    takeEvery(I.REMOVE_ITEM_TAG_REQUEST, handleRemoveItemTagRequest),

    // // Register tag
    // takeEvery(I.REGISTER_ITEM_TAG_REQUEST, handleRegisterItemTagRequest)

    // Error
    takeEvery([
      I.ADD_ITEM_TAG_FAILURE,
      I.REMOVE_ITEM_TAG_FAILURE
    ], handleItemTagFailureAction)
  ];
}
