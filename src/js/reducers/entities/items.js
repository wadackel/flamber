/* eslint-disable */
import _ from "lodash";
import { handleActions } from "redux-actions";
import * as Boards from "../../actions/boards";
import * as Items from "../../actions/items";

export default handleActions({
  [Boards.FETCH_BOARDS_SUCCESS]: (state, { payload }) => (
    payload.entities.items || {}
  ),

  [Items.ADD_ITEM_SUCCESS]: (state, { payload }) => (
    _.assign(state, payload.entities.items)
  )
}, {});
