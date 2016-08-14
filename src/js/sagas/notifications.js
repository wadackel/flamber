import _ from "lodash";
import { takeLatest } from "redux-saga";
import { put, select } from "redux-saga/effects";
import { createAction } from "redux-actions";
import * as Notifications from "../actions/notifications";

export function *handleNotifyAction() {
  const { action } = yield select(state => state.notifications);

  if (_.isPlainObject(action)) {
    const actionCreator = createAction(action.type);
    yield put(actionCreator());
  }
}

export default function *rootSaga() {
  yield [
    takeLatest(Notifications.NOTIFY_ACTION, handleNotifyAction)
  ];
}
