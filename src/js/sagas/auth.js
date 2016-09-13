import { replace } from "react-router-redux";
import { takeEvery } from "redux-saga";
import { fork, take, put, call } from "redux-saga/effects";
import moment from "moment";
import cookie from "react-cookie";
import * as C from "../constants/cookie";
import { authenticate } from "../services/auth";
import * as Auth from "../actions/auth";


export function *handleSignInRequest() {
  while (true) {
    const { payload } = yield take(Auth.SIGN_IN_REQUEST);

    try {
      const { user, token } = yield call(authenticate, payload);

      cookie.save(C.TOKEN_KEY, token, {
        path: C.PATH,
        expires: moment().add(C.EXPIRES, "days").toDate()
      });

      yield put(Auth.signInSuccess(user));

    } catch (error) {
      yield put(Auth.signInFailure(error));
    }
  }
}


export function *handleSignInSuccess() {
  yield put(replace("/app/"));
}


export function *handleSignInFailure() {
  yield put(replace("/signin"));
}


export function *handleSignOutRequest() {
  while (true) {
    yield take(Auth.SIGN_OUT_REQUEST);

    cookie.remove(C.TOKEN_KEY, {
      path: C.PATH
    });

    yield put(Auth.signOutSuccess());
  }
}


export function *handleSignOutSuccess() {
  yield put(replace("/signin"));
}

export function *handleSignOutFailure() {
  yield put(replace("/"));
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
    takeEvery(Auth.SIGN_OUT_FAILURE, handleSignOutFailure)
  ];
}
