// @flow
import type { PayloadAction } from "./action";
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
export type UpdateProfileRequestAction = PayloadAction<UpdateProfileRequestPayload>;
export type UpdateProfileSuccessAction = PayloadAction<User>;
export type UpdateProfileFailureAction = PayloadAction<Error>;
export type UpdateProfileAction =
  UpdateProfileRequestAction &
  UpdateProfileSuccessAction &
  UpdateProfileFailureAction;


// Update theme
export type UpdateThemeRequestAction = PayloadAction<Theme>;
export type UpdateThemeSuccessAction = PayloadAction<Theme>;
export type UpdateThemeFailureAction = PayloadAction<Error>;
