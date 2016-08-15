import { createAction } from "redux-actions";


// Drawer
export const TAG_DRAWER_OPEN = "TAG_DRAWER_OPEN";
export const TAG_DRAWER_CLOSE = "TAG_DRAWER_CLOSE";
export const TAG_DRAWER_TOGGLE = "TAG_DRAWER_TOGGLE";

export const tagDrawerOpen = createAction(TAG_DRAWER_OPEN);
export const tagDrawerClose = createAction(TAG_DRAWER_CLOSE);
export const tagDrawerToggle = createAction(TAG_DRAWER_TOGGLE);


// Fetch
export const FETCH_TAGS_REQUEST = "FETCH_TAGS_REQUEST";
export const FETCH_TAGS_SUCCESS = "FETCH_TAGS_SUCCESS";
export const FETCH_TAGS_FAILURE = "FETCH_TAGS_FAILURE";

export const fetchTagsRequest = createAction(FETCH_TAGS_REQUEST);
export const fetchTagsSuccess = createAction(FETCH_TAGS_SUCCESS);
export const fetchTagsFailure = createAction(FETCH_TAGS_FAILURE);


// Add
export const ADD_TAG_REQUEST = "ADD_TAG_REQUEST";
export const ADD_TAG_SUCCESS = "ADD_TAG_SUCCESS";
export const ADD_TAG_FAILURE = "ADD_TAG_FAILURE";

export const addTagRequest = createAction(ADD_TAG_REQUEST);
export const addTagSuccess = createAction(ADD_TAG_SUCCESS);
export const addTagFailure = createAction(ADD_TAG_FAILURE);


// Update
export const UPDATE_TAG_REQUEST = "UPDATE_TAG_REQUEST";
export const UPDATE_TAG_SUCCESS = "UPDATE_TAG_SUCCESS";
export const UPDATE_TAG_FAILURE = "UPDATE_TAG_FAILURE";

export const updateTagRequest = createAction(UPDATE_TAG_REQUEST);
export const updateTagSuccess = createAction(UPDATE_TAG_SUCCESS);
export const updateTagFailure = createAction(UPDATE_TAG_FAILURE,
  null,
  (payload, entity) => ({ entity })
);


// Delete
export const DELETE_TAG_REQUEST = "DELETE_TAG_REQUEST";
export const DELETE_TAG_SUCCESS = "DELETE_TAG_SUCCESS";
export const DELETE_TAG_FAILURE = "DELETE_TAG_FAILURE";

export const deleteTagRequest = createAction(DELETE_TAG_REQUEST);
export const deleteTagSuccess = createAction(DELETE_TAG_SUCCESS);
export const deleteTagFailure = createAction(DELETE_TAG_FAILURE,
  null,
  (payload, id) => ({ id })
);
