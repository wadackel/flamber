// @flow
import type { PayloadAction } from "./action";
import type { UserId, User } from "./user";

export type OptionsState = {
  isProfileUpdating: boolean;
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
