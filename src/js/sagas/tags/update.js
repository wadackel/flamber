// @flow
import { normalize } from "normalizr";
import { takeEvery } from "redux-saga";
import { put, call, select } from "redux-saga/effects";
import TagSchema from "../../schemas/tag";
import * as Services from "../../services/tags";
import { showNotify } from "../../actions/notifications";
import * as T from "../../actions/tags";
import { getTagEntityByName } from "../../selectors/tags";

import type {
  Tag,
  TagEntity,
  UpdateTagIfNeededAction,
  UpdateTagRequestAction,
  UpdateTagFailureAction
} from "../../types/tag";


export function *handleUpdateTagIfNeeded(action: UpdateTagIfNeededAction): Generator<any, *, *> {
  const entity: ?TagEntity = yield select(getTagEntityByName, action.payload.name);

  if (entity) {
    yield put(T.updateTagFailure(new Error(`${action.payload.name} は既に登録済みです`)));

  } else {
    const { id, name } = action.payload;
    yield put(T.updateTagRequest(id, name));
  }
}


export function *handleUpdateTagRequest(action: UpdateTagRequestAction): Generator<any, *, *> {
  try {
    const response = yield call((): Promise<{ tag: Tag }> => Services.updateTag(action.payload));
    if (!response) throw new Error("タグの更新に失敗しました");

    const normalized = normalize(response, { tag: TagSchema });
    yield put(T.updateTagSuccess(normalized));

  } catch (error) {
    yield put(T.updateTagFailure(error, action.payload));
  }
}

function *handleUpdateTagFailure(action: UpdateTagFailureAction): Generator<any, *, *> {
  yield put(showNotify(action.payload.message));
}


export default function *updateTagSaga(): Generator<any, *, *> {
  yield [
    takeEvery(T.UPDATE_TAG_IF_NEEDED, handleUpdateTagIfNeeded),
    takeEvery(T.UPDATE_TAG_REQUEST, handleUpdateTagRequest),
    takeEvery(T.UPDATE_TAG_FAILURE, handleUpdateTagFailure)
  ];
}
