// @flow
import type { PayloadAction } from "./action";
import type { UserId, User } from "./user";
import type { Theme } from "./prop-types";

export type OptionsState = {
  isProfileUpdating: boolean;
  theme: "dark" | "light";
  isThemeUpdating: boolean;
};


// Update profile
export type UpdateProfileRequestPayload = {
  id: UserId;
  photo: ?File;
  name: ?string;
};

export type UpdateProfileRequestAction = PayloadAction<UpdateProfileRequestPayload>;

export type UpdateProfileSuccessPayload = User;

export type UpdateProfileSuccessAction = PayloadAction<UpdateProfileSuccessPayload>;

export type UpdateProfileFailureAction = PayloadAction<Error>;

export type UpdateProfileAction =
  UpdateProfileRequestAction &
  UpdateProfileSuccessAction &
  UpdateProfileFailureAction;


// Update theme
export type UpdateThemeRequestPayload = Theme;
