import Cookies from "js-cookie";
import { push } from "react-router-redux";
import { fork, take, put, call } from "redux-saga/effects";
import * as C from "../constants/cookie";
import { authenticate } from "../api/auth";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  loginRequest,
  loginSuccess,
  loginFailure
} from "../actions/auth";


export function* handleLoginRequest() {
  while (true) {
    const action = yield take(LOGIN_REQUEST);

    try {
      const token = yield call(authenticate, action.payload);

      // save token
      Cookies.set(C.CREDS_KEY, token, {
        path: C.PATH,
        expires: new Date(token.expiry_date)
      });

      yield put(loginSuccess(token));

    } catch (err) {
      yield put(loginFailure(err));
    }
  }
}


export function* handleLoginSuccess() {
  while (true) {
    yield take(LOGIN_SUCCESS);
    yield put(push("/"));
  }
}


export function* handleLoginFailure() {
  while (true) {
    yield take(LOGIN_FAILURE);
    yield put(push("/login"));
  }
}


export default function* rootSaga() {
  yield [
    fork(handleLoginRequest),
    fork(handleLoginSuccess),
    fork(handleLoginFailure)
  ];
}
