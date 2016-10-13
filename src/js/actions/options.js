// @flow
import type {
  UpdateProfileRequestPayload,
  UpdateProfileRequestAction,
  UpdateProfileSuccessPayload,
  UpdateProfileSuccessAction,
  UpdateProfileFailureAction
} from "../types/options";


// Profile
export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE";

export function updateProfileRequest(payload: UpdateProfileRequestPayload): UpdateProfileRequestAction {
  return { type: UPDATE_PROFILE_REQUEST, payload };
}

export function updateProfileSuccess(payload: UpdateProfileSuccessPayload): UpdateProfileSuccessAction {
  return { type: UPDATE_PROFILE_SUCCESS, payload };
}

export function updateProfileFailure(payload: Error): UpdateProfileFailureAction {
  return { type: UPDATE_PROFILE_FAILURE, error: true, payload };
}
