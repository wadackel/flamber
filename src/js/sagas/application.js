import { fork, take, put, call } from "redux-saga/effects";
import * as App from "../actions/application";
import { deleteApp } from "../services/application";

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
    fork(handleDeleteAppRequest)
  ];
}
