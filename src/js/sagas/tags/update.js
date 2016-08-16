import { normalize } from "normalizr";
import { takeEvery } from "redux-saga";
import { put, call } from "redux-saga/effects";
import TagSchema from "../../schemas/tag";
import * as Services from "../../services/tags";
import * as Notifications from "../../actions/notifications";
import * as Tags from "../../actions/tags";


export function *handleUpdateTagRequest({ payload }) {
  try {
    const response = yield call(Services.updateTag, payload);
    const normalized = normalize(response, {
      tag: TagSchema
    });
    yield put(Tags.updateTagSuccess(normalized));
  } catch (error) {
    yield put(Tags.updateTagFailure(error, payload));
  }
}

function *handleUpdateTagFailure() {
  // TODO: More error message
  yield put(Notifications.showNotify("タグの更新に失敗しました"));
}


export default function *updateTagSaga() {
  yield [
    takeEvery(Tags.UPDATE_TAG_REQUEST, handleUpdateTagRequest),
    takeEvery(Tags.UPDATE_TAG_FAILURE, handleUpdateTagFailure)
  ];
}
