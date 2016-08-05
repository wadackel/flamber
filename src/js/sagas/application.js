import { fork, take, put, call } from "redux-saga/effects";
import * as App from "../actions/application";
import { deleteApp } from "../services/application";


function *backgroundSyncSaga() {
  while (true) {
    const { type } = yield take("*");
    const match = type.match(/^(.+)_(REQUEST|SUCCESS|FAILURE)$/);
    if (!match) continue;

    switch (match[2]) {
      case "REQUEST":
        yield put(App.backgroundSyncAppCancel());
        break;
      case "SUCCESS":
      case "FAILURE":
        yield put(App.backgroundSyncAppStart());
        break;
    }
  }
}

function *handleDeleteAppRequest() {
  while (true) {
    yield take(App.DELETE_APP_REQUEST);

    try {
      yield call(deleteApp);
      yield put(App.deleteAppSuccess());
    } catch (err) {
      yield put(App.deleteAppFailure(err));
    }
  }
}

export default function *rootSaga() {
  yield [
    fork(backgroundSyncSaga),
    fork(handleDeleteAppRequest)
  ];
}
