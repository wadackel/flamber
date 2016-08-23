import _ from "lodash";
import * as OrderBy from "../constants/order-by";
import * as Order from "../constants/order";

function getOrderByProp(orderBy) {
  switch (orderBy) {
    case OrderBy.CREATED:
      return "created";
    case OrderBy.MODIFIED:
      return "modified";
    case OrderBy.NAME:
      return "name";
    default:
      return "created";
  }
}

export function getRawBoardEntities(state) {
  return _.values(state.entities.boards);
}

export function getBoardEntityById(state, id) {
  return state.entities.boards[id];
}

export function getBoardEntities(state, orderBy = OrderBy.CREATED, order = Order.ASC) {
  const entities = state.boards.results.map(id => getBoardEntityById(state, id));

  return _.orderBy(
    entities,
    [getOrderByProp(orderBy)],
    [Order.StringMap[order]]
  );
}

export function getSelectedBoardEntities(state) {
  return getBoardEntities(state).filter(entity => entity.select);
}

export function getCurrentBoard(state) {
  return state.entities.boards[state.boards.currentBoardId];
}
