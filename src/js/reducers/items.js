/* eslint-disable */
import _ from "lodash";
import { handleActions } from "redux-actions";
import * as Items from "../actions/items";

const initialState = {
  isFetching: false,
  isAdding: false,
  isUpdating: false,
  isDeleting: false,
  isMoving: false,
  currentItemId: null,
  entities: [],
  error: null
};

function mapItemToEntity(item) {
  return {
    select: false,
    isUpdating: false,
    isMoving: false,
    isDeleting: false,
    ...item
  };
}

export default handleActions({
}, initialState);
