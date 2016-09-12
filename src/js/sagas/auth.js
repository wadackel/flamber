import { replace } from "react-router-redux";
import { takeEvery } from "redux-saga";
import { fork, take, put, call } from "redux-saga/effects";
import * as C from "../constants/cookie";
import { authenticate } from "../services/auth";
import * as Auth from "../actions/auth";


export function *handleSignInRequest() {
  while (true) {
    const { payload } = yield take(Auth.SIGN_IN_REQUEST);

    try {
      const response = yield call(authenticate, payload);
      console.log(response);
    } catch (error) {
      yield put(Auth.signInFailure(error));
    }

    // try {
    //   const { token, user } = yield call(authenticate, action.payload);
    //
    //   // save token
    //   Cookies.set(C.CREDS_KEY, token, {
    //     path: C.PATH,
    //     expires: C.EXPIRES
    //   });
    //
    //   // save config
    //   /* eslint-disable camelcase */
    //   Cookies.set(C.CONFIG_KEY, {
    //     expiry_date: new Date(token.expiry_date)
    //   }, {
    //     path: C.PATH,
    //     expires: C.EXPIRES
    //   });
    //   /* eslint-enable camelcase */
    //
    //   yield put(Auth.signInSuccess(user));
    //
    // } catch (err) {
    //   yield put(Auth.signInFailure(err));
    // }
  }
}


export function *handleSignInSuccess() {
  yield take(Auth.SIGN_IN_SUCCESS);
  yield put(replace("/app/"));
}


export function *handleSignInFailure() {
  yield take(Auth.SIGN_IN_FAILURE);
  yield put(replace("/signin"));
}


export function *handleSignOutRequest() {
  while (true) {
    yield take(Auth.SIGN_OUT_REQUEST);

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

      yield put(Auth.signOutSuccess());

    } catch (err) {
      yield put(Auth.signOutFailure(err));
    }
  }
}


export function *handleSignOutSuccess() {
  yield take(Auth.SIGN_OUT_SUCCESS);
  yield put(replace("/signin"));
}

export function *handleSignOutFailure() {
  yield take(Auth.SIGN_OUT_FAILURE);
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
