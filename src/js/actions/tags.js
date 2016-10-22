// @flow
import { identity } from "lodash";
import { createAction } from "redux-actions";

import type {
  TagId,
  Tag,

  AddTagSuccessPayload,
  AddTagRequestAction,
  AddTagSuccessAction,
  AddTagFailureAction
} from "../types/tag";


// Current
export const SET_CURRENT_TAG: string = "SET_CURRENT_TAG";
export const setCurrentTag = createAction(SET_CURRENT_TAG);


// Drawer
export const TAG_DRAWER_OPEN: string = "TAG_DRAWER_OPEN";
export const TAG_DRAWER_CLOSE: string = "TAG_DRAWER_CLOSE";
export const TAG_DRAWER_TOGGLE: string = "TAG_DRAWER_TOGGLE";

export const tagDrawerOpen = createAction(TAG_DRAWER_OPEN);
export const tagDrawerClose = createAction(TAG_DRAWER_CLOSE);
export const tagDrawerToggle = createAction(TAG_DRAWER_TOGGLE);


// Fetch
export const FETCH_TAGS_REQUEST: string = "FETCH_TAGS_REQUEST";
export const FETCH_TAGS_SUCCESS: string = "FETCH_TAGS_SUCCESS";
export const FETCH_TAGS_FAILURE: string = "FETCH_TAGS_FAILURE";

export const fetchTagsRequest = createAction(FETCH_TAGS_REQUEST);
export const fetchTagsSuccess = createAction(FETCH_TAGS_SUCCESS);
export const fetchTagsFailure = createAction(FETCH_TAGS_FAILURE);


// Add
export const ADD_TAG_REQUEST = "ADD_TAG_REQUEST";
export const ADD_TAG_SUCCESS = "ADD_TAG_SUCCESS";
export const ADD_TAG_FAILURE = "ADD_TAG_FAILURE";

export function addTagRequest(name: string): AddTagRequestAction {
  return { type: ADD_TAG_REQUEST, payload: name };
}

export function addTagSuccess(payload: AddTagSuccessPayload): AddTagSuccessAction {
  return { type: ADD_TAG_SUCCESS, payload };
}

export function addTagFailure(error: Error): AddTagFailureAction {
  return { type: ADD_TAG_FAILURE, payload: error, error: true };
}


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
