import { takeLatest } from "redux-saga";
import { fork, take, put, call } from "redux-saga/effects";
import * as App from "../actions/application";

function *handleDeleteAppRequest() {
  while (true) {
    const action = yield take(App.DELETE_APP_REQUEST);

    // TODO:
    yield put(App.deleteAppFailure());
  }
}

export default function *rootSaga() {
  yield [
    fork(handleDeleteAppRequest)
  ];
}
