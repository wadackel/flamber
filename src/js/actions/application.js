// @flow
import { createAction } from "redux-actions";

import type {
  AppMenuOpenAction,
  AppMenuCloseAction,
  AppMenuToggleAction
} from "../types/application";


// Create
export const CREATE_APP_REQUEST: string = "CREATE_APP_REQUEST";
export const CREATE_APP_SUCCESS: string = "CREATE_APP_SUCCESS";
export const CREATE_APP_FAILURE: string = "CREATE_APP_FAILURE";

export const createAppRequest = createAction(CREATE_APP_REQUEST);
export const createAppSuccess = createAction(CREATE_APP_SUCCESS);
export const createAppFailure = createAction(CREATE_APP_FAILURE);


// Initialize
export const INITIALIZE_APP: string = "INITIALIZE_APP";
export const initializeApp = createAction(INITIALIZE_APP);


// Background sync
export const BACKGROUND_SYNC_APP_START: string = "BACKGROUND_SYNC_APP_START";
export const BACKGROUND_SYNC_APP_CANCEL = "BACKGROUND_SYNC_APP_CANCEL";

export const backgroundSyncAppStart = createAction(BACKGROUND_SYNC_APP_START);
export const backgroundSyncAppCancel = createAction(BACKGROUND_SYNC_APP_CANCEL);


// Delete
export const DELETE_APP_REQUEST: string = "DELETE_APP_REQUEST";
export const DELETE_APP_SUCCESS: string = "DELETE_APP_SUCCESS";
export const DELETE_APP_FAILURE: string = "DELETE_APP_FAILURE";

export const deleteAppRequest = createAction(DELETE_APP_REQUEST);
export const deleteAppSuccess = createAction(DELETE_APP_SUCCESS);
export const deleteAppFailure = createAction(DELETE_APP_FAILURE);


// Menu
export const APP_MENU_OPEN = "APP_MENU_OPEN";
export const APP_MENU_CLOSE = "APP_MENU_CLOSE";
export const APP_MENU_TOGGLE = "APP_MENU_TOGGLE";

export const appMenuOpen = (): AppMenuOpenAction => ({ type: APP_MENU_OPEN });
export const appMenuClose = (): AppMenuCloseAction => ({ type: APP_MENU_CLOSE });
export const appMenuToggle = (): AppMenuToggleAction => ({ type: APP_MENU_TOGGLE });
