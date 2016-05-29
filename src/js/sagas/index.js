import Cookies from "js-cookie";
import { replace } from "react-router-redux";
import { fork, take, put, call } from "redux-saga/effects";
import * as C from "../constants/cookie";
import { authenticate, revokeCredentials } from "../api/auth";
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
  loginRequest, loginSuccess, loginFailure,
  logoutRequest, logoutSuccess, logoutFailure
} from "../actions/auth";


export function* handleLoginRequest() {
  while (true) {
    const action = yield take(LOGIN_REQUEST);

    try {
      const { token, user } = yield call(authenticate, action.payload);

      // save token
      Cookies.set(C.CREDS_KEY, token, {
        path: C.PATH,
        expires: C.EXPIRES
      });

      // save config
      Cookies.set(C.CONFIG_KEY, {
        expiry_date: new Date(token.expiry_date)
      }, {
        path: C.PATH,
        expires: C.EXPIRES
      });

      yield put(loginSuccess(user));

    } catch (err) {
      yield put(loginFailure(err));
    }
  }
}


export function* handleLoginSuccess() {
  while (true) {
    yield take(LOGIN_SUCCESS);
    yield put(replace("/"));
  }
}


export function* handleLoginFailure() {
  while (true) {
    yield take(LOGIN_FAILURE);
    yield put(replace("/login"));
  }
}


export function* handleLogoutRequest() {
  while (true) {
    yield take(LOGOUT_REQUEST);

    try {
      yield call(revokeCredentials);

      // destroy token
      Cookies.remove(C.CREDS_KEY, {
        path: C.PATH
      });

      // destroy config
      Cookies.remove(C.CONFIG_KEY, {
        path: C.PATH
      });

      yield put(logoutSuccess());

    } catch (err) {
      yield put(logoutFailure(err));
    }
  }
}


export function* handleLogoutSuccess() {
  while (true) {
    yield take(LOGOUT_SUCCESS);
    yield put(replace("/login"));
  }
}

export function* handleLogoutFailure() {
  while (true) {
    yield take(LOGOUT_FAILURE);
    yield put(replace("/"));
  }
}


export default function* rootSaga() {
  yield [
    fork(handleLoginRequest),
    fork(handleLoginSuccess),
    fork(handleLoginFailure),
    fork(handleLogoutRequest),
    fork(handleLogoutSuccess),
    fork(handleLogoutFailure)
  ];
}
