// @flow
import uuid from "node-uuid";
import { normalize } from "normalizr";
import TagSchema from "../schemas/tag";

import type {
  TagId,
  TagEntity,

  SetCurrentTagAction,

  TagDrawerOpenAction,
  TagDrawerCloseAction,
  TagDrawerToggleAction,

  FetchTagsSuccessPayload,
  FetchTagsRequestAction,
  FetchTagsSuccessAction,
  FetchTagsFailureAction,

  AddTagSuccessPayload,
  AddTagRequestAction,
  AddTagSuccessAction,
  AddTagFailureAction,

  UpdateTagSuccessPayload,
  UpdateTagIfNeededAction,
  UpdateTagRequestAction,
  UpdateTagSuccessAction,
  UpdateTagFailureAction,

  DeleteTagSuccessPayload,
  DeleteTagRequestAction,
  DeleteTagSuccessAction,
  DeleteTagFailureAction
} from "../types/tag";


// Current
export const SET_CURRENT_TAG = "SET_CURRENT_TAG";
export const setCurrentTag = (id: ?TagId): SetCurrentTagAction => (
  { type: SET_CURRENT_TAG, payload: id }
);


// Drawer
export const TAG_DRAWER_OPEN = "TAG_DRAWER_OPEN";
export const TAG_DRAWER_CLOSE = "TAG_DRAWER_CLOSE";
export const TAG_DRAWER_TOGGLE = "TAG_DRAWER_TOGGLE";

export const tagDrawerOpen = (): TagDrawerOpenAction => ({ type: TAG_DRAWER_OPEN });
export const tagDrawerClose = (): TagDrawerCloseAction => ({ type: TAG_DRAWER_CLOSE });
export const tagDrawerToggle = (): TagDrawerToggleAction => ({ type: TAG_DRAWER_TOGGLE });


// Fetch
export const FETCH_TAGS_REQUEST = "FETCH_TAGS_REQUEST";
export const FETCH_TAGS_SUCCESS = "FETCH_TAGS_SUCCESS";
export const FETCH_TAGS_FAILURE = "FETCH_TAGS_FAILURE";

export const fetchTagsRequest = (): FetchTagsRequestAction => (
  { type: FETCH_TAGS_REQUEST }
);

export const fetchTagsSuccess = (payload: FetchTagsSuccessPayload): FetchTagsSuccessAction => (
  { type: FETCH_TAGS_SUCCESS, payload }
);

export const fetchTagsFailure = (error: Error): FetchTagsFailureAction => (
  { type: FETCH_TAGS_FAILURE, payload: error, error: true }
);


// Add
export const ADD_TAG_REQUEST = "ADD_TAG_REQUEST";
export const ADD_TAG_SUCCESS = "ADD_TAG_SUCCESS";
export const ADD_TAG_FAILURE = "ADD_TAG_FAILURE";

export const addTagRequest = (name: string): AddTagRequestAction => {
  const normalized = normalize({
    id: uuid.v4(),
    created_at: new Date(),
    updated_at: new Date(),
    isSaved: false,
    name
  }, TagSchema);

  return {
    type: ADD_TAG_REQUEST,
    payload: normalized.entities.tags[normalized.result]
  };
};

export const addTagSuccess = (payload: AddTagSuccessPayload, tmpEntity: TagEntity): AddTagSuccessAction => (
  { type: ADD_TAG_SUCCESS, payload, meta: tmpEntity }
);

export const addTagFailure = (error: Error, entity: ?TagEntity): AddTagFailureAction => (
  { type: ADD_TAG_FAILURE, payload: error, error: true, meta: entity }
);


// Update
export const UPDATE_TAG_IF_NEEDED = "UPDATE_TAG_IF_NEEDED";
export const UPDATE_TAG_REQUEST = "UPDATE_TAG_REQUEST";
export const UPDATE_TAG_SUCCESS = "UPDATE_TAG_SUCCESS";
export const UPDATE_TAG_FAILURE = "UPDATE_TAG_FAILURE";

export const updateTagIfNeeded = (id: TagId, name: string): UpdateTagIfNeededAction => (
  { type: UPDATE_TAG_IF_NEEDED, payload: { id, name } }
);

export const updateTagRequest = (id: TagId, name: string): UpdateTagRequestAction => (
  { type: UPDATE_TAG_REQUEST, payload: { id, name } }
);

export const updateTagSuccess = (payload: UpdateTagSuccessPayload): UpdateTagSuccessAction => (
  { type: UPDATE_TAG_SUCCESS, payload }
);

export const updateTagFailure = (error: Error, props: ?{ id: TagId; name: string }): UpdateTagFailureAction => (
  { type: UPDATE_TAG_FAILURE, payload: error, error: true, meta: { ...props } }
);


// Delete
export const DELETE_TAG_REQUEST = "DELETE_TAG_REQUEST";
export const DELETE_TAG_SUCCESS = "DELETE_TAG_SUCCESS";
export const DELETE_TAG_FAILURE = "DELETE_TAG_FAILURE";

export const deleteTagRequest = (id: TagId): DeleteTagRequestAction => (
  { type: DELETE_TAG_REQUEST, payload: id }
);

export const deleteTagSuccess = (payload: DeleteTagSuccessPayload): DeleteTagSuccessAction => (
  { type: DELETE_TAG_SUCCESS, payload }
);

export const deleteTagFailure = (error: Error, id: ?TagId): DeleteTagFailureAction => (
  { type: DELETE_TAG_FAILURE, payload: error, error: true, meta: id }
);
