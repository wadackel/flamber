// @flow
import { createAction } from "redux-actions";
import type { UserId } from "../types/user";


// Profile
export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE";


export const updateProfileRequest = createAction(UPDATE_PROFILE_REQUEST,
  (id: UserId, photo: ?File, name: ?string) => ({ id, photo, name })
);

export type UpdateProfileSuccessPayload = any;
export const updateProfileSuccess = createAction(UPDATE_PROFILE_SUCCESS);

export type UpdateProfileFailurePayload = any;
export const updateProfileFailure = createAction(UPDATE_PROFILE_FAILURE);
