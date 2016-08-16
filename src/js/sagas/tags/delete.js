import { takeEvery } from "redux-saga";
import { fork, take, put, call } from "redux-saga/effects";
import * as Services from "../../services/tags";
import * as Notifications from "../../actions/notifications";
import * as Tags from "../../actions/tags";


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


export default function *deleteTagSaga() {
  yield [
    fork(handleDeleteTagRequest),
    takeEvery(Tags.DELETE_TAG_FAILURE, handleDeleteTagFailure)
  ];
}
