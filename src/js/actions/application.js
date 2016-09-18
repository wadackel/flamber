import { createAction } from "redux-actions";


// Create
export const CREATE_APP_REQUEST = "CREATE_APP_REQUEST";
export const CREATE_APP_SUCCESS = "CREATE_APP_SUCCESS";
export const CREATE_APP_FAILURE = "CREATE_APP_FAILURE";

export const createAppRequest = createAction(CREATE_APP_REQUEST);
export const createAppSuccess = createAction(CREATE_APP_SUCCESS);
export const createAppFailure = createAction(CREATE_APP_FAILURE);


// Initialize
export const INITIALIZE_APP = "INITIALIZE_APP";
export const initializeApp = createAction(INITIALIZE_APP);


// Background sync
export const BACKGROUND_SYNC_APP_START = "BACKGROUND_SYNC_APP_START";
export const BACKGROUND_SYNC_APP_CANCEL = "BACKGROUND_SYNC_APP_CANCEL";

export const backgroundSyncAppStart = createAction(BACKGROUND_SYNC_APP_START);
export const backgroundSyncAppCancel = createAction(BACKGROUND_SYNC_APP_CANCEL);


// Delete
export const DELETE_APP_REQUEST = "DELETE_APP_REQUEST";
export const DELETE_APP_SUCCESS = "DELETE_APP_SUCCESS";
export const DELETE_APP_FAILURE = "DELETE_APP_FAILURE";

export const deleteAppRequest = createAction(DELETE_APP_REQUEST);
export const deleteAppSuccess = createAction(DELETE_APP_SUCCESS);
export const deleteAppFailure = createAction(DELETE_APP_FAILURE);
