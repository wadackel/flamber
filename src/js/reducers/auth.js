import assign from "object-assign";
import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from "../actions/auth";

export const initialState = {
  isFetching: false,
  authenticated: false,
  authenticateURL: "",
  user: null
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    // Login
    case LOGIN_REQUEST:
      return assign({}, state, {
        isFetching: true
      });

    case LOGIN_SUCCESS:
      return assign({}, state, {
        isFetching: false,
        authenticated: true,
        user: action.payload
      });

    case LOGIN_FAILURE:
      return assign({}, state, {
        isFetching: false,
        authenticated: false,
        user: null
      });

    // Logout
    case LOGOUT_REQUEST:
      return assign({}, state, {
        isFetching: true
      });

    case LOGOUT_SUCCESS:
      return assign({}, state, {
        isFetching: false,
        authenticated: false,
        user: null
      });

    case LOGOUT_FAILURE:
      return assign({}, state, {
        isFetching: false
      });

    default:
      return state;
  }
}
