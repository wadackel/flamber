// @flow
import type { Action } from "./action";

export type AppState = {
  isCreating: boolean;
  isDeleting: boolean;
  isMenuOpen: boolean;
  error: ?Error;
};


// Menu
export type AppMenuOpenAction = Action<"APP_MENU_OPEN">;
export type AppMenuCloseAction = Action<"APP_MENU_CLOSE">;
export type AppMenuToggleAction = Action<"APP_MENU_TOGGLE">;
