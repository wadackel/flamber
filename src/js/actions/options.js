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

export const updateProfileRequest = (photo: ?File, name: ?string): UpdateProfileRequestAction => (
  { type: UPDATE_PROFILE_REQUEST, payload: { photo, name } }
);

export const updateProfileSuccess = (user: User): UpdateProfileSuccessAction => (
  { type: UPDATE_PROFILE_SUCCESS, payload: user }
);

export const updateProfileFailure = (error: Error): UpdateProfileFailureAction => (
  { type: UPDATE_PROFILE_FAILURE, error: true, payload: error }
);


// Theme
export const UPDATE_THEME_REQUEST = "UPDATE_THEME_REQUEST";
export const UPDATE_THEME_SUCCESS = "UPDATE_THEME_SUCCESS";
export const UPDATE_THEME_FAILURE = "UPDATE_THEME_FAILURE";

export const updateThemeRequest = (theme: Theme): UpdateThemeRequestAction => (
  { type: UPDATE_THEME_REQUEST, payload: theme }
);

export const updateThemeSuccess = (theme: Theme): UpdateThemeSuccessAction => (
  { type: UPDATE_THEME_SUCCESS, payload: theme }
);

export const updateThemeFailure = (error: Error): UpdateThemeFailureAction => (
  { type: UPDATE_THEME_FAILURE, payload: error, error: true }
);
