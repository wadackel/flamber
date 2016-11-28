import { normalize, arrayOf } from "normalizr";
import { takeLatest, takeEvery } from "redux-saga";
import { put, call } from "redux-saga/effects";
import TagSchema from "../../schemas/tag";
import * as Services from "../../services/tags";
import * as Notifications from "../../actions/notifications";
import * as A from "../../actions/auth";
import * as T from "../../actions/tags";


export function *handleFetchTagsRequest() {
  try {
    const response = yield call(Services.fetchTags);
    const normalized = normalize(response, {
      tags: arrayOf(TagSchema)
    });
    yield put(T.fetchTagsSuccess(normalized));

  } catch (error) {
    yield put(T.fetchTagsFailure(error));
  }
}

function *handleFetchTagsFailure() {
  // TODO: More error message
  yield put(Notifications.showNotify("タグの取得に失敗しました"));
}


export default function *fetchTagSaga() {
  yield [
    takeLatest([
      A.FETCH_CURRENT_USER_SUCCESS,
      T.FETCH_TAGS_REQUEST
    ], handleFetchTagsRequest),
    takeEvery(T.FETCH_TAGS_FAILURE, handleFetchTagsFailure)
  ];
}
