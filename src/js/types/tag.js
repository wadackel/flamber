// @flow
import type { PayloadAction, ErrorAction } from "./action";
import type { SingleNormalized } from "./normalize";

export type TagId = number;

export type Tag = {
  id: TagId;
  name: string;
};

export type Tags = Array<Tag>;

export type TagEntity = $All<Tag, {
  isUpdating: boolean;
  isDeleting: boolean;
}>;

export type TagEntities = Array<TagEntity>;

export type TagState = {
  isFetching: boolean;
  isAdding: boolean;
  results: Array<TagId>;
  currentTag: ?TagId;
  error: ?Error;
  drawerOpen: boolean;
};

export type TagEntitiesState = { [key: TagId]: TagEntity };


// Add
export type AddTagSuccessPayload = SingleNormalized<"tags", "tag", TagEntity, TagId>;
export type AddTagRequestAction = PayloadAction<"ADD_TAG_REQUEST", string>;
export type AddTagSuccessAction = PayloadAction<"ADD_TAG_SUCCESS", AddTagSuccessPayload>;
export type AddTagFailureAction = ErrorAction<"ADD_TAG_FAILURE", Error>;
