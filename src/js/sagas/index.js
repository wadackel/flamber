import Cookies from "js-cookie";
import { replace } from "react-router-redux";
import { fork, take, put, call } from "redux-saga/effects";
import * as C from "../constants/cookie";
import { authenticate, revokeCredentials } from "../api/auth";
import {
  SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE,
  SIGN_OUT_REQUEST, SIGN_OUT_SUCCESS, SIGN_OUT_FAILURE,
  signInSuccess, signInFailure,
  signOutSuccess, signOutFailure
} from "../actions/auth";


export function *handleSignInRequest() {
  while (true) {
    const action = yield take(SIGN_IN_REQUEST);

    try {
      const { token, user } = yield call(authenticate, action.payload);

      // save token
      Cookies.set(C.CREDS_KEY, token, {
        path: C.PATH,
        expires: C.EXPIRES
      });

      // save config
      /* eslint-disable camelcase */
      Cookies.set(C.CONFIG_KEY, {
        expiry_date: new Date(token.expiry_date)
      }, {
        path: C.PATH,
        expires: C.EXPIRES
      });
      /* eslint-enable camelcase */

      yield put(signInSuccess(user));

    } catch (err) {
      yield put(signInFailure(err));
    }
  }
}


export function *handleSignInSuccess() {
  while (true) {
    yield take(SIGN_IN_SUCCESS);
    yield put(replace("/"));
  }
}


export function *handleSignInFailure() {
  while (true) {
    yield take(SIGN_IN_FAILURE);
    yield put(replace("/signin"));
  }
}


export function *handleSignOutRequest() {
  while (true) {
    yield take(SIGN_OUT_REQUEST);

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

      yield put(signOutSuccess());

    } catch (err) {
      yield put(signOutFailure(err));
    }
  }
}


export function *handleSignOutSuccess() {
  while (true) {
    yield take(SIGN_OUT_SUCCESS);
    yield put(replace("/signin"));
  }
}

export function *handleSignOutFailure() {
  while (true) {
    yield take(SIGN_OUT_FAILURE);
    yield put(replace("/"));
  }
}


export default function *rootSaga() {
  yield [
    fork(handleSignInRequest),
    fork(handleSignInSuccess),
    fork(handleSignInFailure),
    fork(handleSignOutRequest),
    fork(handleSignOutSuccess),
    fork(handleSignOutFailure)
  ];
}
