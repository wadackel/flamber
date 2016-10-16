// @flow
import type { UserId, User } from "../types/user";
import type {
  UpdateProfileRequestAction,
  UpdateProfileSuccessAction,
  UpdateProfileFailureAction
} from "../types/options";


// Profile
export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE";

export function updateProfileRequest(id: UserId, photo: ?File, name: ?string): UpdateProfileRequestAction {
  return { type: UPDATE_PROFILE_REQUEST, payload: { id, photo, name } };
}

export function updateProfileSuccess(user: User): UpdateProfileSuccessAction {
  return { type: UPDATE_PROFILE_SUCCESS, payload: user };
}

export function updateProfileFailure(error: Error): UpdateProfileFailureAction {
  return { type: UPDATE_PROFILE_FAILURE, error: true, payload: error };
}
