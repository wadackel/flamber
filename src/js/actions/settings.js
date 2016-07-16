import { createAction } from "redux-actions";


// Fetch settings
export const FETCH_SETTINGS_REQUEST = "FETCH_SETTINGS_REQUEST";
export const FETCH_SETTINGS_SUCCESS = "FETCH_SETTINGS_SUCCESS";
export const FETCH_SETTINGS_FAILURE = "FETCH_SETTINGS_FAILURE";

export const fetchSettingsRequest = createAction(FETCH_SETTINGS_REQUEST);
export const fetchSettingsSuccess = createAction(FETCH_SETTINGS_SUCCESS);
export const fetchSettingsFailure = createAction(FETCH_SETTINGS_FAILURE);


// Update settings
export const UPDATE_SETTINGS_REQUEST = "UPDATE_SETTINGS_REQUEST";
export const UPDATE_SETTINGS_SUCCESS = "UPDATE_SETTINGS_SUCCESS";
export const UPDATE_SETTINGS_FAILURE = "UPDATE_SETTINGS_FAILURE";

export const updateSettingsRequest = createAction(UPDATE_SETTINGS_REQUEST);
export const updateSettingsSuccess = createAction(UPDATE_SETTINGS_SUCCESS);
export const updateSettingsFailure = createAction(UPDATE_SETTINGS_FAILURE);
