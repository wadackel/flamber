import { createAction } from "redux-actions";


// Delete
export const DELETE_APP_REQUEST = "DELETE_APP_REQUEST";
export const DELETE_APP_SUCCESS = "DELETE_APP_SUCCESS";
export const DELETE_APP_FAILURE = "DELETE_APP_FAILURE";

export const deleteAppRequest = createAction(DELETE_APP_REQUEST);
export const deleteAppSuccess = createAction(DELETE_APP_SUCCESS);
export const deleteAppFailure = createAction(DELETE_APP_FAILURE);
