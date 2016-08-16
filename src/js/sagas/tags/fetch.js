import { normalize, arrayOf } from "normalizr";
import { takeLatest, takeEvery } from "redux-saga";
import { put, call } from "redux-saga/effects";
import TagSchema from "../../schemas/tag";
import * as Services from "../../services/tags";
import * as Notifications from "../../actions/notifications";
import * as Tags from "../../actions/tags";


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


export default function *fetchTagSaga() {
  yield [
    takeLatest(Tags.FETCH_TAGS_REQUEST, handleFetchTagsRequest),
    takeEvery(Tags.FETCH_TAGS_FAILURE, handleFetchTagsFailure)
  ];
}
