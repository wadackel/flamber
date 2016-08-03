/* eslint-disable */
import { handleActions } from "redux-actions";
import * as Boards from "../../actions/boards";

export default handleActions({
  [Boards.FETCH_BOARDS_SUCCESS]: (state, { payload }) => (
    payload.entities.boards
  )
}, []);
