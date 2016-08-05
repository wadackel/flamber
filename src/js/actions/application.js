import { createAction } from "redux-actions";


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
