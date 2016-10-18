// @flow
import type { PayloadAction, ErrorAction } from "./action";
import type { User } from "./user";
import type { Theme } from "./prop-types";

export type OptionsState = {
  isProfileUpdating: boolean;
  theme: Theme;
  isThemeUpdating: boolean;
};


// Update profile
export type UpdateProfileRequestPayload = {
  photo: ?File;
  name: ?string;
};
export type UpdateProfileRequestAction = PayloadAction<"UPDATE_PROFILE_REQUEST", UpdateProfileRequestPayload>;
export type UpdateProfileSuccessAction = PayloadAction<"UPDATE_PROFILE_SUCCESS", User>;
export type UpdateProfileFailureAction = ErrorAction<"UPDATE_PROFILE_FAILURE", Error>;


// Update theme
export type UpdateThemeRequestAction = PayloadAction<"UPDATE_THEME_REQUEST", Theme>;
export type UpdateThemeSuccessAction = PayloadAction<"UPDATE_THEME_SUCCESS", Theme>;
export type UpdateThemeFailureAction = ErrorAction<"UPDATE_THEME_FAILURE", Error>;
