// @flow
import { put, call, take, fork } from "redux-saga/effects";
import * as Options from "../../actions/options";
import * as Services from "../../services/profile";
import type {
  UpdateProfileRequestAction
} from "../../types/options";

export function *handleUpdateProfileRequest(): Generator<any, void, any> {
  while (true) {
    try {
      const action: UpdateProfileRequestAction = yield take(Options.UPDATE_PROFILE_REQUEST);
      const { id, photo, name } = action.payload;
      const { user } = yield call(() => Services.updateProfile(id, photo, name));
      yield put(Options.updateProfileSuccess(user));
    } catch (error) {
      yield put(Options.updateProfileFailure(error));
    }
  }
}

export default function *profileSaga(): Generator<any, void, void> {
  yield [
    fork(handleUpdateProfileRequest)
  ];
}
