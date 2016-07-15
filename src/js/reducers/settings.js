import assign from "object-assign";
import * as Themes from "../constants/themes";
import {
  UPDATE_SETTINGS_REQUEST,
  UPDATE_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_FAILURE
} from "../actions/settings";

export const initialState = {
  isFetching: false,
  theme: Themes.DARK
};

export default function settings(state = initialState, action) {
  switch (action.type) {

    case UPDATE_SETTINGS_REQUEST:
      return assign({}, state, {
        isFetching: true
      });

    case UPDATE_SETTINGS_SUCCESS:
      return assign({}, state, {
        isFetching: false,
        theme: action.payload.theme
      });

    case UPDATE_SETTINGS_FAILURE:
      return assign({}, state, {
        isFetching: false
      });

    default:
      return state;
  }
}
