// @flow
import { createAction } from "redux-actions";
import type { Action } from "../types/action";
import type { UserId } from "../types/user";


// Profile
export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE";

export type UpdateProfileRequestPayload = {
  id: UserId;
  photo: ?File;
  name: ?string;
};
export const updateProfileRequest: Action<UpdateProfileRequestPayload> = createAction(UPDATE_PROFILE_REQUEST,
  (id: UserId, photo: ?File, name: ?string): UpdateProfileRequestPayload => ({ id, photo, name })
);

export type UpdateProfileSuccessPayload = any;
export const updateProfileSuccess: Action<UpdateProfileSuccessPayload> = createAction(UPDATE_PROFILE_SUCCESS);

export type UpdateProfileFailurePayload = any;
export const updateProfileFailure: Action<UpdateProfileFailurePayload> = createAction(UPDATE_PROFILE_FAILURE);
