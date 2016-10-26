// @flow
import type { TypeMap } from "./map";
import type { Action, PayloadAction, ErrorAction } from "./action";
import type { ArrayNormalized, SingleNormalized } from "./normalize";

export type TagId = string; // UUID

export type Tag = {
  id: TagId;
  name: string;
  updated_at: Date;
  created_at: Date;
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

export type TagEntitiesState = TypeMap<TagId, TagEntity>;


type SingleTag = SingleNormalized<"tags", "tag", TagEntity, TagId>;
type ArrayTag = ArrayNormalized<"tags", TagEntity, TagId>;


// Current
export type SetCurrentTagAction = PayloadAction<"SET_CURRENT_TAG", ?TagId>;


// Drawer
export type TagDrawerOpenAction = Action<"TAG_DRAWER_OPEN">;
export type TagDrawerCloseAction = Action<"TAG_DRAWER_CLOSE">;
export type TagDrawerToggleAction = Action<"TAG_DRAWER_TOGGLE">;


// Fetch
export type FetchTagsSuccessPayload = ArrayTag;
export type FetchTagsRequestAction = Action<"FETCH_TAGS_REQUEST">;
export type FetchTagsSuccessAction = PayloadAction<"FETCH_TAGS_SUCCESS", FetchTagsSuccessPayload>;
export type FetchTagsFailureAction = ErrorAction<"FETCH_TAGS_FAILURE", Error>;


// Add
export type AddTagSuccessPayload = SingleTag;
export type AddTagRequestAction = PayloadAction<"ADD_TAG_REQUEST", string>;
export type AddTagSuccessAction = PayloadAction<"ADD_TAG_SUCCESS", AddTagSuccessPayload>;
export type AddTagFailureAction = ErrorAction<"ADD_TAG_FAILURE", Error>;


// Update
export type UpdateTagRequestPayload = { id: TagId; name: string; };
export type UpdateTagSuccessPayload = SingleTag;
export type UpdateTagIfNeededAction = PayloadAction<"UPDATE_TAG_IF_NEEDED", UpdateTagRequestPayload>;
export type UpdateTagRequestAction = PayloadAction<"UPDATE_TAG_REQUEST", UpdateTagRequestPayload>;
export type UpdateTagSuccessAction = PayloadAction<"UPDATE_TAG_SUCCESS", UpdateTagSuccessPayload>;
export type UpdateTagFailureAction = ErrorAction<"UPDATE_TAG_FAILURE", Error>;


// Delete
export type DeleteTagSuccessPayload = SingleTag;
export type DeleteTagRequestAction = PayloadAction<"DELETE_TAG_REQUEST", TagId>;
export type DeleteTagSuccessAction = PayloadAction<"DELETE_TAG_SUCCESS", DeleteTagSuccessPayload>;
export type DeleteTagFailureAction = ErrorAction<"DELETE_TAG_FAILURE", Error>;
