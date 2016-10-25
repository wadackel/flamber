// @flow
import { normalize } from "normalizr";
import { takeEvery } from "redux-saga";
import { fork, take, put, call } from "redux-saga/effects";
import TagSchema from "../../schemas/tag";
import * as Services from "../../services/tags";
import { showNotify } from "../../actions/notifications";
import * as T from "../../actions/tags";

import type {
  Tag,
  TagEntity,
  DeleteTagRequestAction,
  DeleteTagSuccessAction,
  DeleteTagFailureAction
} from "../../types/tag";


export function *handleDeleteTagRequest(): Generator<any, *, *> {
  while (true) {
    const action: ?DeleteTagRequestAction = yield take(T.DELETE_TAG_REQUEST);

    try {
      if (!action) throw new Error("タグの削除に失敗しました");

      const response = yield call((): Promise<{ tag: Tag }> => Services.deleteTag(action.payload));
      if (!response) throw new Error("タグの削除に失敗しました");

      const normalized = normalize(response, {
        tag: TagSchema
      });
      yield put(T.deleteTagSuccess(normalized));

    } catch (error) {
      yield put(T.deleteTagFailure(error, action ? action.payload : null));
    }
  }
}

function *handleDeleteTagSuccess(action: DeleteTagSuccessAction): Generator<any, *, *> {
  const { payload } = action;
  const entity: TagEntity = payload.entities.tags[payload.result.tag];
  yield put(showNotify(`${entity.name} を削除しました`));
}

function *handleDeleteTagFailure(action: DeleteTagFailureAction): Generator<any, *, *> {
  yield put(showNotify(action.payload.message));
}


export default function *deleteTagSaga(): Generator<any, *, *> {
  yield [
    fork(handleDeleteTagRequest),
    takeEvery(T.DELETE_TAG_SUCCESS, handleDeleteTagSuccess),
    takeEvery(T.DELETE_TAG_FAILURE, handleDeleteTagFailure)
  ];
}
