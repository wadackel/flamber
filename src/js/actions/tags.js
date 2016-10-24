// @flow
import { identity } from "lodash";
import { createAction } from "redux-actions";

import type {
  TagId,
  Tag,

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
  AddTagFailureAction
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

export const addTagRequest = (name: string): AddTagRequestAction => (
  { type: ADD_TAG_REQUEST, payload: name }
);

export const addTagSuccess = (payload: AddTagSuccessPayload): AddTagSuccessAction => (
  { type: ADD_TAG_SUCCESS, payload }
);

export const addTagFailure = (error: Error): AddTagFailureAction => (
  { type: ADD_TAG_FAILURE, payload: error, error: true }
);


// Update
export const UPDATE_TAG_REQUEST: string = "UPDATE_TAG_REQUEST";
export const UPDATE_TAG_SUCCESS: string = "UPDATE_TAG_SUCCESS";
export const UPDATE_TAG_FAILURE: string = "UPDATE_TAG_FAILURE";

export const updateTagRequest = createAction(UPDATE_TAG_REQUEST);
export const updateTagSuccess = createAction(UPDATE_TAG_SUCCESS);
export const updateTagFailure = createAction(UPDATE_TAG_FAILURE,
  identity,
  (payload: Object, entity: Tag): Object => ({ entity })
);


// Delete
export const DELETE_TAG_REQUEST: string = "DELETE_TAG_REQUEST";
export const DELETE_TAG_SUCCESS: string = "DELETE_TAG_SUCCESS";
export const DELETE_TAG_FAILURE: string = "DELETE_TAG_FAILURE";

export const deleteTagRequest = createAction(DELETE_TAG_REQUEST);
export const deleteTagSuccess = createAction(DELETE_TAG_SUCCESS);
export const deleteTagFailure = createAction(DELETE_TAG_FAILURE,
  identity,
  (payload: Object, id: TagId): Object => ({ id })
);
