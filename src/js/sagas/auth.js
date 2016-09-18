import { replace } from "react-router-redux";
import { takeEvery } from "redux-saga";
import { fork, take, put, call } from "redux-saga/effects";
import * as cookie from "../utils/cookie";
import { authenticate, fetchUser } from "../services/auth";
import * as Notifications from "../actions/notifications";
import * as Auth from "../actions/auth";


// Sign in
export function *handleSignInRequest() {
  while (true) {
    const { payload } = yield take(Auth.SIGN_IN_REQUEST);

    try {
      const { user, token } = yield call(authenticate, payload);

      cookie.saveToken(token);

      yield put(Auth.signInSuccess(user));

    } catch (error) {
      yield put(Auth.signInFailure(error));
    }
  }
}

export function *handleSignInSuccess({ payload: user }) {
  yield put(replace("/app/"));

  if (user.installed) {
    yield put(Auth.fetchCurrentUserRequest());
  }
}

export function *handleSignInFailure() {
  yield put(replace("/signin"));
  yield put(Notifications.showNotify("ログインに失敗しました"));
}


// Sign out
export function *handleSignOutRequest() {
  while (true) {
    yield take(Auth.SIGN_OUT_REQUEST);

    cookie.removeToken();

    yield put(Auth.signOutSuccess());
  }
}

export function *handleSignOutSuccess() {
  yield put(replace("/signin"));
  yield put(Notifications.showNotify("ログアウトしました"));
}

export function *handleSignOutFailure() {
  yield put(replace("/"));
  yield put(Notifications.showNotify("ログアウトに失敗しました"));
}


// Fetch
export function *handleFetchCurrentUserRequest() {
  while (true) {
    yield take(Auth.FETCH_CURRENT_USER_REQUEST);

    try {
      const jwtToken = cookie.loadToken();
      const { user, token } = yield call(fetchUser, jwtToken);

      cookie.saveToken(token);

      yield put(Auth.fetchCurrentUserSuccess(user));

    } catch (error) {
      yield put(Auth.fetchCurrentUserFailure(error));
    }
  }
}

export function *handleFetchCurrentUserFailure() {
  yield put(replace("/signin"));
  yield put(Notifications.showNotify("ユーザーの取得に失敗しました"));
}


export default function *rootSaga() {
  yield [
    // Sign in
    fork(handleSignInRequest),
    takeEvery(Auth.SIGN_IN_SUCCESS, handleSignInSuccess),
    takeEvery(Auth.SIGN_IN_FAILURE, handleSignInFailure),

    // Sign out
    fork(handleSignOutRequest),
    takeEvery(Auth.SIGN_OUT_SUCCESS, handleSignOutSuccess),
    takeEvery(Auth.SIGN_OUT_FAILURE, handleSignOutFailure),

    // Fetch
    fork(handleFetchCurrentUserRequest),
    takeEvery(Auth.FETCH_CURRENT_USER_FAILURE, handleFetchCurrentUserFailure)
  ];
}
