/* eslint-disable */
import { normalize, arrayOf } from "normalizr";
import { takeEvery, takeLatest } from "redux-saga";
import { fork, take, put, call } from "redux-saga/effects";
import TagSchema from "../schemas/tag";
import * as Services from "../services/tags";
import * as Notifications from "../actions/notifications";
import * as Tags from "../actions/tags";


export function *handleFetchTagsRequest() {
  try {
    const response = yield call(Services.fetchTags);
    const normalized = normalize(response, {
      tags: arrayOf(TagSchema)
    });
    yield put(Tags.fetchTagsSuccess(normalized));
  } catch (error) {
    yield put(Tags.fetchTagsFailure(error));
  }
}

function *handleFetchTagsFailure() {
  // TODO: More error message
  yield put(Notifications.showNotify("タグの取得に失敗しました"));
}

export function *fetchTagsSaga() {
  yield [
    takeLatest(Tags.FETCH_TAGS_REQUEST, handleFetchTagsRequest),
    takeEvery(Tags.FETCH_TAGS_FAILURE, handleFetchTagsFailure)
  ];
}


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


export function *handleDeleteTagRequest() {
  while (true) {
    const { payload } = yield take(Tags.DELETE_TAG_REQUEST);

    try {
      yield call(Services.deleteTag, payload);
      yield put(Tags.deleteTagSuccess(payload));
    } catch (error) {
      yield put(Tags.deleteTagFailure(error, payload));
    }
  }
}

function *handleDeleteTagFailure() {
  // TODO: More error message
  yield put(Notifications.showNotify("タグの削除に失敗しました"));
}

export function *deleteTagSaga() {
  yield [
    fork(handleDeleteTagRequest),
    takeEvery(Tags.DELETE_TAG_FAILURE, handleDeleteTagFailure)
  ];
}

export default function *tagsSaga() {
  yield [
    fork(fetchTagsSaga),
    fork(addTagSaga),
    fork(deleteTagSaga)
  ];
}
