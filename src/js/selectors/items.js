/* eslint-disable */
import _ from "lodash";
import * as ItemVisibilityFilters from "../constants/item-visibility-filters";
import * as OrderBy from "../constants/order-by";
import * as Order from "../constants/order";
import { getBoardEntityById } from "./boards";

function getOrderByProp(orderBy) {
  switch (orderBy) {
    case OrderBy.CREATED:
      return "created";
    case OrderBy.NAME:
      return "name";
    case OrderBy.LAST_VIEW:
      return "lastView";
    default:
      return "created";
  }
}

function sortEntities(entities, orderBy, order) {
  return _.orderBy(
    entities,
    [getOrderByProp(orderBy)],
    [Order.StringMap[order]]
  );
}

export function getItemEntityById(state, id) {
  return state.entities.items[id];
}

export function getItemEntities(state) {
  return _.values(state.entities.items);
}

export function getVisibleItemEntities(state) {
  const { items, boards } = state;
  const { visibilityFilter, currentColor } = items;
  const { currentBoardId } = boards;
  let entities = getItemEntities(state);
  entities = currentColor ? entities.filter(entity => entity.palette.indexOf(currentColor) > -1) : entities;

  switch (visibilityFilter) {
    case ItemVisibilityFilters.SHOW_ITEM_ALL:
      return entities;

    case ItemVisibilityFilters.SHOW_ITEM_CURRENT_BOARD:
      return entities.filter(entity => entity.board === currentBoardId);

    case ItemVisibilityFilters.SHOW_ITEM_STAR:
      return entities.filter(entity => entity.star);
  }
}

export function getItemEntitiesByBoardId(state, boardId) {
  const { itemsOrderBy, itemsOrder } = state.settings;
  const board = getBoardEntityById(state, boardId);
  const entities = !board ? [] : board.items.map(id => state.entities.items[id]);
  return sortEntities(entities, itemsOrderBy, itemsOrder);
}

export function getSelectedItemEntities(state) {
  return _.values(state.entities.items).filter(entity => entity.select);
}

export function getSelectedItemEntitiesByBoardId(state, boardId) {
  const entities = getItemEntitiesByBoardId(state, boardId);
  return entities.filter(entity => entity.select);
}

export function getMoveItemEntities(state) {
  return state.items.moveItems.map(id => getItemEntityById(state, id));
}
