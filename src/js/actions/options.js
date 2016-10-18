// @flow
import type { Theme } from "../types/prop-types";
import type { User } from "../types/user";
import type {
  UpdateProfileRequestAction,
  UpdateProfileSuccessAction,
  UpdateProfileFailureAction,

  UpdateThemeRequestAction,
  UpdateThemeSuccessAction,
  UpdateThemeFailureAction
} from "../types/options";


// Profile
export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE";

export function updateProfileRequest(photo: ?File, name: ?string): UpdateProfileRequestAction {
  return { type: UPDATE_PROFILE_REQUEST, payload: { photo, name } };
}

export function updateProfileSuccess(user: User): UpdateProfileSuccessAction {
  return { type: UPDATE_PROFILE_SUCCESS, payload: user };
}

export function updateProfileFailure(error: Error): UpdateProfileFailureAction {
  return { type: UPDATE_PROFILE_FAILURE, error: true, payload: error };
}


// Theme
export const UPDATE_THEME_REQUEST = "UPDATE_THEME_REQUEST";
export const UPDATE_THEME_SUCCESS = "UPDATE_THEME_SUCCESS";
export const UPDATE_THEME_FAILURE = "UPDATE_THEME_FAILURE";

export function updateThemeRequest(theme: Theme): UpdateThemeRequestAction {
  return { type: UPDATE_THEME_REQUEST, payload: theme };
}

export function updateThemeSuccess(theme: Theme): UpdateThemeSuccessAction {
  return { type: UPDATE_THEME_SUCCESS, payload: theme };
}

export function updateThemeFailure(error: Error): UpdateThemeFailureAction {
  return { type: UPDATE_THEME_FAILURE, payload: error, error: true };
}
