/* eslint-disable */
import _ from "lodash";
import * as OrderBy from "../constants/order-by";
import * as Order from "../constants/order";
import { getBoardEntityById } from "./boards";

const Default = {
  OrderBy: OrderBy.CREATED,
  Order: Order.ASC
};

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

export function getItemEntityById(state, id) {
  return state.entities.items[id];
}

export function getItemEntities(state, orderBy = Default.OrderBy, order = Default.Order) {
  const entities = state.items.results.map(id => getItemEntityById(state, id));

  return _.orderBy(
    entities,
    [getOrderByProp(orderBy)],
    [Order.StringMap[order]]
  );
}

export function getItemEntitiesByBoardId(state, boardId) {
  const board = getBoardEntityById(state, boardId);
  return !board ? [] : board.items.map(id => state.entities.items[id]);
}

export function getItemEntitiesByColor(state, color, orderBy = Default.OrderBy, order = Default.Order) {
  return getItemEntities(state, orderBy, order).filter(entity => entity.palette.indexOf(color) > -1);
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
