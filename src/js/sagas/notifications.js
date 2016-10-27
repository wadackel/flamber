// @flow
import _ from "lodash";
import { takeLatest, takeEvery } from "redux-saga";
import { put, select } from "redux-saga/effects";
import * as N from "../actions/notifications";

import type { ConnectState } from "../types/redux";
import type {
  NotificationState,
  StoreNotifyAction
} from "../types/notification";


export function *handleNotifyAction(): Generator<any, *, *> {
  const notifications: ?NotificationState = yield select((state: ConnectState) => state.notifications);
  if (!notifications) return;

  const action: ?StoreNotifyAction = notifications.action;
  if (!action) return;

  if (_.isPlainObject(action)) {
    const { type, payload } = action;
    const payloadAction: StoreNotifyAction = { type, payload: payload.value };
    yield put(payloadAction);
  }
}

function *handleLocationChange(): Generator<any, *, *> {
  yield put(N.hideNotify());
}


export default function *rootSaga(): Generator<any, *, *> {
  yield [
    takeLatest(N.NOTIFY_ACTION, handleNotifyAction),
    takeEvery("@@router/LOCATION_CHANGE", handleLocationChange)
  ];
}
