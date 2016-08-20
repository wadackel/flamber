/* eslint-disable */
import _ from "lodash";
import { handleActions } from "redux-actions";
import * as Boards from "../../actions/boards";
import * as Items from "../../actions/items";
import ItemSchema from "../../schemas/item";

function mergeEntities(state, entities) {
  return _.assign(state, entities || {});
}

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


  // Fetch
  [Items.FETCH_ITEMS_SUCCESS]: (state, { payload }) => (
    mergeEntities(state, payload.entities.items)
  ),


  // Add
  [Items.ADD_ITEM_SUCCESS]: (state, { payload }) => (
    mergeEntities(state, payload.entities.items)
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

  [Items.DELETE_ITEM_FAILURE]: (state, { meta }) => (
    _.mapValues(state, entity =>
      entity.id !== meta.entity.id ? entity : {
        ...entity,
        isDeleting: false
      }
    )
  ),


  // Star
  [Items.STAR_ITEM_TOGGLE_REQUEST]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload ? entity : {
        ...entity,
        star: !entity.star
      }
    )
  ),

  [Items.STAR_ITEM_TOGGLE_SUCCESS]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload.id ? entity : {
        ...entity,
        star: payload.star
      }
    )
  ),

  [Items.STAR_ITEM_TOGGLE_FAILURE]: (state, { meta }) => (
    _.mapValues(state, entity =>
      entity.id !== meta ? entity : {
        ...entity,
        star: !entity.star
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


  // Select all
  [Items.SELECT_ALL_ITEM_EXEC]: (state, { payload }) => (
    _.mapValues(state, entity =>
      payload.indexOf(entity.id) < 0 ? entity : {
        ...entity,
        select: true
      }
    )
  ),


  // Unselect all
  [Items.UNSELECT_ALL_ITEM_EXEC]: (state, { payload }) => (
    _.mapValues(state, entity =>
      payload.indexOf(entity.id) < 0 ? entity : {
        ...entity,
        select: false
      }
    )
  ),


  // Select star item
  [Items.SELECT_STAR_ITEM_EXEC]: (state, { payload }) => (
    _.mapValues(state, entity =>
      payload.indexOf(entity.id) < 0 ? entity : {
        ...entity,
        select: entity.star
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

  [Items.SELECTED_ITEMS_DELETE_FAILURE]: (state, { meta }) => (
    _.mapValues(state, entity =>
      !meta.entities.indexOf(entity.id) < 0 ? entiy : {
        ...entity,
        isDeleting: false
      }
    )
  ),


  // Selected star
  [Items.SELECTED_ITEMS_STAR_REQUEST]: (state, { payload }) => (
    _.mapValues(state, entity =>
      !entity.select ? entity : {
        ...entity,
        isUpdating: true
      }
    )
  ),

  [Items.SELECTED_ITEMS_STAR_SUCCESS]: (state, { payload }) => (
    _.mapValues(state, entity =>
      !payload.entities.items.hasOwnProperty(entity.id) ? entity : {
        ...entity,
        select: false,
        isUpdating: false,
        star: payload.entities.items[entity.id].star
      }
    )
  ),

  [Items.SELECTED_ITEMS_STAR_FAILURE]: (state, { meta }) => (
    _.mapValues(state, entity => {
      const index = _.findIndex(meta.entities, o => o.id === entity.id);
      return index < 0 ? entity : {
        ...meta.entities[index],
        isUpdating: false
      }
    })
  ),


  // Selected move
  [Items.SELECTED_ITEMS_MOVE_REQUEST]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.board !== payload || !entity.select ? entity : {
        ...entity,
        isMoving: true
      }
    )
  ),

  [Items.SELECTED_ITEMS_MOVE_SUCCESS]: (state, { payload, meta }) => (
    _.mapValues(state, entity =>
      payload.result.items.indexOf(entity.id) < 0 ? entity : {
        ...entity,
        board: payload.entities.items[entity.id].board,
        select: false,
        isMoving: false
      }
    )
  ),

  [Items.SELECTED_ITEMS_MOVE_FAILURE]: (state, { payload, meta }) => (
    _.mapValues(state, entity =>
      meta.prevBoards.indexOf(entity.board) < 0 ? entity : {
        ...entity,
        isMoving: false
      }
    )
  ),


  // Boards
  [Boards.FETCH_BOARDS_SUCCESS]: (state, { payload }) => (
    _.assign(state, payload.entities.items || {})
  ),
}, {});
