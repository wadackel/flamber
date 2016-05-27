"use strict";

import Cookies from "js-cookie";
import { fork, take, put, call } from "redux-saga/effects";
import * as C from "../constants/cookie";
import { authenticate } from "../api/auth";
import {
  AUTH_REQUEST,
  AUTH_COMPLETE,
  AUTH_ERROR,
  authRequest,
  authComplete,
  authError
} from "../actions/auth";


export function* handleAuthRequest() {
  while (true) {
    const action = yield take(AUTH_REQUEST);

    try {
      const token = yield call(authenticate, action.payload);

      // save token
      Cookies.set(C.CREDS_KEY, token, {
        path: C.PATH,
        expires: new Date(token.expiry_date)
      });

      yield put(authComplete(token));

    } catch (err) {
      yield put(authError(err));
    }
  }
}

export default function* rootSaga() {
  yield [
    fork(handleAuthRequest)
  ];
}
