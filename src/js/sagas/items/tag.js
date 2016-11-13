// @flow
import { takeEvery } from "redux-saga";
import { take, put, select } from "redux-saga/effects";
import { getItemEntityById } from "../../selectors/items";
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
  RemoveItemTagFailureAction,
  RegisterItemTagRequestAction,
  RegisterItemTagFailureAction
} from "../../types/item";
import type {
  AddTagSuccessAction,
  AddTagFailureAction
} from "../../types/tag";

type ItemTagFailureAction = AddItemTagFailureAction
  | RemoveItemTagFailureAction
  | RegisterItemTagFailureAction;


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


// Register
export function *handleRegisterItemTagRequest(action: RegisterItemTagRequestAction): Generator<any, *, *> {
  const failureMessage = "タグの追加に失敗しました";

  try {
    const entity: ?ItemEntity = yield select(getItemEntityById, action.payload.id);
    if (!entity) throw new Error(failureMessage);

    yield put(T.addTagRequest(action.payload.label));
    const res: ?AddTagSuccessAction | ?AddTagFailureAction = yield take([T.ADD_TAG_SUCCESS, T.ADD_TAG_FAILURE]);

    if (!res || res.error) {
      yield put(I.registerItemTagFailure(
        new Error(failureMessage),
        {
          ...action.payload,
          tagId: null
        }
      ));

      return;
    }

    yield put(I.addItemTagRequest(entity.id, res.payload.result.tag));

  } catch (error) {
    yield put(I.registerItemTagFailure(error, action.payload));
  }
}


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

    // Register tag
    takeEvery(I.REGISTER_ITEM_TAG_REQUEST, handleRegisterItemTagRequest),

    // Error
    takeEvery([
      I.ADD_ITEM_TAG_FAILURE,
      I.REMOVE_ITEM_TAG_FAILURE,
      I.REGISTER_ITEM_TAG_FAILURE
    ], handleItemTagFailureAction)
  ];
}
