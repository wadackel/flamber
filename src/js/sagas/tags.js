/* eslint-disable */
import { normalize, arrayOf } from "normalizr";
import { takeEvery } from "redux-saga";
import { fork, take, put, call } from "redux-saga/effects";
import TagSchema from "../schemas/tag";
import * as Services from "../services/tags";
import * as Notifications from "../actions/notifications";
import * as Tags from "../actions/tags";

export function *handleAddTagRequest() {
  while (true) {
    const { payload } = yield take(Tags.ADD_TAG_REQUEST);

    try {
      const response = yield call(Services.addTag, payload);
      const normalized = normalize(response, {
        tag: TagSchema
      });
      yield put(Tags.addTagSuccess(normalized));
    } catch (error) {
      yield put(Tags.addTagFailure(error));
    }
  }
}

function *handleAddTagFailure() {
  // TODO: More error message
  yield put(Notifications.showNotify("タグの追加に失敗しました"));
}

export function *addTagSaga() {
  yield [
    fork(handleAddTagRequest),
    takeEvery(Tags.ADD_TAG_FAILURE, handleAddTagFailure)
  ];
}

export default function *tagsSaga() {
  yield [
    fork(addTagSaga)
  ];
}
