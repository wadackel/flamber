/* eslint-disable */
import _ from "lodash";
import { handleActions } from "redux-actions";
import * as Boards from "../../actions/boards";
import * as Items from "../../actions/items";
import ItemSchema from "../../schemas/item";

export default handleActions({
  // Background sync
  [Items.BG_SYNC_ITEMS_SUCCESS]: (state, { payload }) => {
    const newItems = payload.entities.items || {};

    return _.assign(state, _.mapValues(newItems, entity => {
      if (!state.hasOwnProperty(entity.id)) return entity;

      const frontOnlyProps = _.keys(ItemSchema._defaults);

      return _.assignWith(state[entity.id], entity, (prev, next, key) => {
        if (frontOnlyProps.indexOf(key) > -1) {
          return prev;
        }
      });
    }));
  },


  // Add
  [Items.ADD_ITEM_SUCCESS]: (state, { payload }) => (
    _.assign(state, payload.entities.items || {})
  ),


  // Delete
  [Items.DELETE_ITEM_REQUEST]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload ? entity : {
        ...entity,
        isDeleting: true
      }
    )
  ),

  [Items.DELETE_ITEM_SUCCESS]: (state, { payload }) => (
    _.pickBy(state, (entity, id) =>
      id !== payload.id
    )
  ),


  // Favorite
  [Items.FAVORITE_ITEM_TOGGLE_REQUEST]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload ? entity : {
        ...entity,
        favorite: !entity.favorite
      }
    )
  ),

  [Items.FAVORITE_ITEM_TOGGLE_SUCCESS]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload.id ? entity : {
        ...entity,
        favorite: payload.favorite
      }
    )
  ),

  [Items.FAVORITE_ITEM_TOGGLE_FAILURE]: (state, { meta }) => (
    _.mapValues(state, entity =>
      entity.id !== meta ? entity : {
        ...entity,
        favorite: !entity.favorite
      }
    )
  ),


  // Select
  [Items.SELECT_ITEM_TOGGLE]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload ? entity : {
        ...entity,
        select: !entity.select
      }
    )
  ),


  // Selected delete
  [Items.SELECTED_ITEMS_DELETE_REQUEST]: state => (
    _.mapValues(state, entity =>
      !entity.select ? entity : {
        ...entity,
        isDeleting: true
      }
    )
  ),

  [Items.SELECTED_ITEMS_DELETE_SUCCESS]: (state, { payload }) => (
    _.pickBy(state, (entity, id) =>
      !payload.some(o => o.id === id)
    )
  ),


  // Boards
  [Boards.FETCH_BOARDS_SUCCESS]: (state, { payload }) => (
    _.assign(state, payload.entities.items || {})
  ),
}, {});
