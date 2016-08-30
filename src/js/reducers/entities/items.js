/* eslint-disable */
import _ from "lodash";
import { handleActions } from "redux-actions";
import * as Boards from "../../actions/boards";
import * as Items from "../../actions/items";
import ItemSchema from "../../schemas/item";

// TODO: Refactor


function mergeEntities(state, entities) {
  return _.assign(state, entities || {});
}

export default handleActions({
  // Background sync
  [Items.BG_SYNC_ITEMS_SUCCESS]: (state, { payload }) => {
    const newItems = payload.entities.items || {};

    return _.assign(state, _.mapValues(newItems, nextEntity => {
      if (!state.hasOwnProperty(nextEntity.id)) return nextEntity;

      const prevEntity = state[nextEntity.id];
      if (prevEntity.isUpdating) return prevEntity;

      const frontOnlyProps = _.keys(ItemSchema._defaults);

      return _.assignWith(prevEntity, nextEntity, (prev, next, key) => {
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


  // Update name
  [Items.UPDATE_ITEM_NAME_REQUEST]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload.id ? entity : {
        ...entity,
        name: payload.name,
        isUpdating: true,
        isNameUpdating: true
      }
    )
  ),

  [Items.UPDATE_ITEM_NAME_SUCCESS]: (state, { payload }) => (
    _.mapValues(state, entity =>
      payload.result.items.indexOf(entity.id) < 0 ? entity : {
        ...entity,
        name: payload.entities.items[entity.id].name,
        isUpdating: false,
        isNameUpdating: false
      }
    )
  ),

  [Items.UPDATE_ITEM_NAME_FAILURE]: (state, { meta }) => (
    _.mapValues(state, entity =>
      entity.id !== meta.id ? entity : {
        ...entity,
        isUpdating: false,
        isNameUpdating: false
      }
    )
  ),


  // Update description
  [Items.UPDATE_ITEM_DESCRIPTION_REQUEST]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload.id ? entity : {
        ...entity,
        description: payload.description,
        isUpdating: true,
        isDescriptionUpdating: true
      }
    )
  ),

  [Items.UPDATE_ITEM_DESCRIPTION_SUCCESS]: (state, { payload }) => (
    _.mapValues(state, entity =>
      payload.result.items.indexOf(entity.id) < 0 ? entity : {
        ...entity,
        description: payload.entities.items[entity.id].description,
        isUpdating: false,
        isDescriptionUpdating: false
      }
    )
  ),

  [Items.UPDATE_ITEM_DESCRIPTION_FAILURE]: (state, { meta }) => (
    _.mapValues(state, entity =>
      entity.id === meta.id ? entity : {
        ...entity,
        isUpdating: false,
        isDescriptionUpdating: false
      }
    )
  ),


  // Update palette
  [Items.UPDATE_ITEM_PALETTE_REQUEST]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload.id ? entity : {
        ...entity,
        palette: payload.palette,
        isUpdating: true,
        isPaletteUpdating: true
      }
    )
  ),

  [Items.UPDATE_ITEM_PALETTE_SUCCESS]: (state, { payload }) => (
    _.mapValues(state, entity =>
      payload.result.items.indexOf(entity.id) < 0 ? entity : {
        ...entity,
        palette: payload.entities.items[entity.id].palette,
        isUpdating: false,
        isPaletteUpdating: false
      }
    )
  ),

  [Items.UPDATE_ITEM_PALETTE_FAILURE]: (state, { meta }) => (
    _.mapValues(state, entity =>
      entity.id === meta.id ? entity : {
        ...entity,
        isUpdating: false,
        isPaletteUpdating: false
      }
    )
  ),


  // Add tag
  [Items.ADD_ITEM_TAG_REQUEST]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload.id ? entity : {
        ...entity,
        tags: [...entity.tags, payload.tagId],
        isUpdating: true,
        isTagAdding: true
      }
    )
  ),

  [Items.ADD_ITEM_TAG_SUCCESS]: (state, { payload }) => (
    _.mapValues(state, entity =>
      payload.result.items.indexOf(entity.id) < 0 ? entity : {
        ...entity,
        tags: payload.entities.items[entity.id].tags,
        isUpdating: false,
        isTagAdding: false
      }
    )
  ),

  [Items.ADD_ITEM_TAG_FAILURE]: (state, { meta }) => (
    _.mapValues(state, entity =>
      entity.id !== meta.id ? entity : {
        ...entity,
        isUpdating: false,
        isTagAdding: false
      }
    )
  ),


  // Remove tag
  [Items.REMOVE_ITEM_TAG_REQUEST]: (state, { payload }) => (
    _.mapValues(state, entity =>
      entity.id !== payload.id ? entity : {
        ...entity,
        tags: entity.tags.filter(tagId => payload.tagId !== tagId),
        isUpdating: true,
        isTagRemoveing: true
      }
    )
  ),

  [Items.REMOVE_ITEM_TAG_SUCCESS]: (state, { payload }) => (
    _.mapValues(state, entity =>
      payload.result.items.indexOf(entity.id) < 0 ? entity : {
        ...entity,
        tags: payload.entities.items[entity.id].tags,
        isUpdating: false,
        isTagRemoveing: false
      }
    )
  ),

  [Items.REMOVE_ITEM_TAG_FAILURE]: (state, { meta }) => (
    _.mapValues(state, entity =>
      entity.id !== meta.id ? entity : {
        ...entity,
        isUpdating: false,
        isTagRemoveing: false
      }
    )
  ),


  // Move
  [Items.MOVE_ITEM_SUCCESS]: (state, { payload }) => (
    mergeEntities(state, payload.entities.items)
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
      !payload.some(o => o.id === entity.id) ? entity : {
        ...entity,
        select: true
      }
    )
  ),


  // Unselect all
  [Items.UNSELECT_ALL_ITEM_EXEC]: (state, { payload }) => (
    _.mapValues(state, entity =>
      !payload.some(o => o.id === entity.id) ? entity : {
        ...entity,
        select: false
      }
    )
  ),


  // Select star item
  [Items.SELECT_STAR_ITEM_EXEC]: (state, { payload }) => (
    _.mapValues(state, entity =>
      !payload.some(o => o.id === entity.id) ? entity : {
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

  [Items.SELECTED_ITEMS_MOVE_SUCCESS]: (state, { payload }) => (
    mergeEntities(state, payload.entities.items)
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
