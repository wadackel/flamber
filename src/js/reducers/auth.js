import assign from "object-assign";
import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE
} from "../actions/auth";

const initialState = {
  isFetching: false,
  authenticated: false,
  authenticateURL: ""
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return assign({}, state, {
        isFetching: true
      });

    case LOGIN_SUCCESS:
      return assign({}, state, {
        isFetching: false,
        authenticated: true
      });

    case LOGIN_FAILURE:
      return assign({}, state, {
        isFetching: false,
        authenticated: false
      });

    default:
      return state;
  }
}
