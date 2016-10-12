import type { Action } from "./action";
import type { UserId } from "./user";

export type UpdateProfileRequestPayload = {
  id: UserId;
  photo: ?File;
  name: ?string;
};

export type UpdateProfileRequestAction = Action<UpdateProfileRequestPayload>;
