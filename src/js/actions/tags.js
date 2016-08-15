import { createAction } from "redux-actions";


// Drawer
export const TAG_DRAWER_OPEN = "TAG_DRAWER_OPEN";
export const TAG_DRAWER_CLOSE = "TAG_DRAWER_CLOSE";
export const TAG_DRAWER_TOGGLE = "TAG_DRAWER_TOGGLE";

export const tagDrawerOpen = createAction(TAG_DRAWER_OPEN);
export const tagDrawerClose = createAction(TAG_DRAWER_CLOSE);
export const tagDrawerToggle = createAction(TAG_DRAWER_TOGGLE);


// Add
export const ADD_TAG_REQUEST = "ADD_TAG_REQUEST";
export const ADD_TAG_SUCCESS = "ADD_TAG_SUCCESS";
export const ADD_TAG_FAILURE = "ADD_TAG_FAILURE";

export const addTagRequest = createAction(ADD_TAG_REQUEST);
export const addTagSuccess = createAction(ADD_TAG_SUCCESS);
export const addTagFailure = createAction(ADD_TAG_FAILURE);
