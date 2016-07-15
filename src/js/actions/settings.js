import { createAction } from "redux-actions";


// Update settings
export const UPDATE_SETTINGS_REQUEST = "UPDATE_SETTINGS_REQUEST";
export const UPDATE_SETTINGS_SUCCESS = "UPDATE_SETTINGS_SUCCESS";
export const UPDATE_SETTINGS_FAILURE = "UPDATE_SETTINGS_FAILURE";

export const updateSettingsRequest = createAction(UPDATE_SETTINGS_REQUEST);
export const updateSettingsSuccess = createAction(UPDATE_SETTINGS_SUCCESS);
export const updateSettingsFailure = createAction(UPDATE_SETTINGS_FAILURE);
