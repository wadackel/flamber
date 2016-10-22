// @flow
import { normalize } from "normalizr";
import { takeEvery } from "redux-saga";
import { fork, take, put, call, select } from "redux-saga/effects";
import TagSchema from "../../schemas/tag";
import * as Services from "../../services/tags";
import * as Notifications from "../../actions/notifications";
import * as T from "../../actions/tags";
import { getTagEntityByName } from "../../selectors/tags";

import type {
  Tag,
  TagEntity,

  AddTagRequestAction,
  AddTagFailureAction
} from "../../types/tag";


export function *handleAddTagRequest(): Generator<any, *, *> {
  while (true) {
    try {
      const action: ?AddTagRequestAction = yield take(T.ADD_TAG_REQUEST);
      if (!action) throw new Error("タグの追加に失敗しました");

      const entity: ?TagEntity = yield select(getTagEntityByName, action.payload);
      if (entity) throw new Error(`${action.payload} は既に登録済みです`);

      const response = yield call((): Promise<{ tag: Tag }> => Services.addTag(action.payload));
      if (!response) throw new Error("タグの追加に失敗しました");

      const normalized = normalize(response, {
        tag: TagSchema
      });
      yield put(T.addTagSuccess(normalized));

    } catch (error) {
      yield put(T.addTagFailure(error));
    }
  }
}

function *handleAddTagFailure(action: AddTagFailureAction): Generator<any, *, *> {
  yield put(Notifications.showNotify(action.payload.message));
}


export default function *addTagSaga(): Generator<any, *, *> {
  yield [
    fork(handleAddTagRequest),
    takeEvery(T.ADD_TAG_FAILURE, handleAddTagFailure)
  ];
}
