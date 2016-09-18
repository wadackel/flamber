import { takeEvery } from "redux-saga";
import { fork, take, put, call, select } from "redux-saga/effects";
import * as App from "../actions/application";
import * as Auth from "../actions/auth";
import * as Settings from "../actions/settings";
import { createApp, deleteApp } from "../services/application";
import { getUser } from "../selectors/auth";


export function *handleSignInSuccess({ payload: user }) {
  if (!user.installed) {
    yield put(App.createAppRequest());
  }
}

export function *handleCreateAppRequest() {
  while (true) {
    yield take(App.CREATE_APP_REQUEST);

    try {
      const response = yield call(createApp);
      yield put(App.createAppSuccess(response));

    } catch (error) {
      yield put(App.createAppFailure());
    }
  }
}


export function *watchCreateInitializeApp() {
  const user = yield select(getUser);

  if (!user || (user && !user.installed)) {
    yield put(App.initializeApp());
  }
}


export function *handleInitializeApp() {
  yield put(Auth.fetchCurrentUserRequest());
  yield put(Settings.fetchSettingsRequest());
}


export function *handleDeleteAppRequest() {
  while (true) {
    yield take(App.DELETE_APP_REQUEST);

    try {
      yield call(deleteApp);
      yield put(App.deleteAppSuccess());

    } catch (error) {
      yield put(App.deleteAppFailure(error));
    }
  }
}


export default function *rootSaga() {
  yield [
    takeEvery(Auth.SIGN_IN_SUCCESS, handleSignInSuccess),
    takeEvery(App.INITIALIZE_APP, handleInitializeApp),
    fork(watchCreateInitializeApp),
    fork(handleCreateAppRequest),
    fork(handleDeleteAppRequest)
  ];
}
