// @flow
/* eslint-disable no-unused-vars */
import { normalize } from "normalizr";
import { takeEvery } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import { getItemEntityById } from "../../selectors/items";
import ItemSchema from "../../schemas/item";
import * as Services from "../../services/items";
import { showNotify } from "../../actions/notifications";
import * as I from "../../actions/items";
import { callUpdateItem } from "./helpers";

import type {
  ItemEntity,
  UpdateItemNameIfNeededAction,
  UpdateItemNameRequestAction,
  UpdateItemNameFailureAction
} from "../../types/item";

type UpdateItemErrorAction = UpdateItemNameFailureAction;


function *handleUpdateError(action: UpdateItemErrorAction): Generator<any, *, *> {
  yield put(showNotify(action.payload.message));
}


// Name
export function *handleUpdateItemNameIfNeeded(action: UpdateItemNameIfNeededAction): Generator<any, *, *> {
  const { id, name } = action.payload;
  const entity: ?ItemEntity = yield select(getItemEntityById, id);

  if (entity && entity.name !== name) {
    yield put(I.updateItemNameRequest(id, name));
  }
}

export function *handleUpdateItemNameRequest(action: UpdateItemNameRequestAction): Generator<any, *, *> {
  yield callUpdateItem(
    action.payload,
    I.updateItemNameSuccess,
    I.updateItemNameFailure
  );
}


// // Description
// export function *handleUpdateItemDescriptionRequest({ payload }) {
//   yield callUpdateItem(
//     payload,
//     I.updateItemDescriptionSuccess,
//     I.updateItemDescriptionFailure
//   );
// }
//
// function *handleUpdateItemDescriptionFailure() {
//   // TODO: More error message
//   yield put(showNotify("アイテムの更新に失敗しました"));
// }
//
//
// // Palette
// export function *handleUpdateItemPaletteRequest({ payload }) {
//   yield callUpdateItem(
//     payload,
//     I.updateItemPaletteSuccess,
//     I.updateItemPaletteFailure
//   );
// }
//
// function *handleUpdateItemPaletteFailure() {
//   // TODO: More erro message
//   yield put(showNotify("アイテムの更新に失敗しました"));
// }
//
//
// // Image
// export function *handleUpdateItemImageRequest({ payload }) {
//   try {
//     const response = yield call(Services.updateItemImage, payload);
//     const normalized = normalize(response, {
//       item: ItemSchema
//     });
//     yield put(I.updateItemImageSuccess(normalized));
//   } catch (error) {
//     yield put(I.updateItemImageFailure(error, payload));
//   }
// }
//
// export function *handleUpdateItemImageSuccess() {
//   yield put(I.setItemImageEditing(false));
// }
//
// function *handleUpdateItemImageFailure() {
//   // TODO: More erro message
//   yield put(showNotify("アイテムの更新に失敗しました"));
// }


export default function *updateItemSaga(): Generator<any, *, *> {
  yield [
    // Name
    takeEvery(I.UPDATE_ITEM_NAME_IF_NEEDED, handleUpdateItemNameIfNeeded),
    takeEvery(I.UPDATE_ITEM_NAME_REQUEST, handleUpdateItemNameRequest),

    takeEvery([
      I.UPDATE_ITEM_NAME_FAILURE
    ], handleUpdateError)

    // // Description
    // takeEvery(I.UPDATE_ITEM_DESCRIPTION_REQUEST, handleUpdateItemDescriptionRequest),
    // takeEvery(I.UPDATE_ITEM_DESCRIPTION_FAILURE, handleUpdateItemDescriptionFailure),
    //
    // // Palette
    // takeEvery(I.UPDATE_ITEM_PALETTE_REQUEST, handleUpdateItemPaletteRequest),
    // takeEvery(I.UPDATE_ITEM_PALETTE_FAILURE, handleUpdateItemPaletteFailure),
    //
    // // Image
    // takeEvery(I.UPDATE_ITEM_IMAGE_REQUEST, handleUpdateItemImageRequest),
    // takeEvery(I.UPDATE_ITEM_IMAGE_SUCCESS, handleUpdateItemImageSuccess),
    // takeEvery(I.UPDATE_ITEM_IMAGE_FAILURE, handleUpdateItemImageFailure)
  ];
}
