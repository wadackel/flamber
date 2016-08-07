/* eslint-disable */
import _ from "lodash";
import { getBoardEntityById } from "./boards";

export function getItemEntityById(state, id) {
  return state.entities.items[id];
}

export function getItemEntities(state) {
  return state.items.results.map(id => getItemEntityById(state, id));
}

export function getItemEntitiesByBoardId(state, boardId) {
  const board = getBoardEntityById(state, boardId);
  return !board ? [] : board.items.map(id => state.entities.items[id]);
}

export function getSelectedItemEntities(state) {
  return _.values(state.entities.items).filter(entity => entity.select);
}

export function getSelectedItemEntitiesByBoardId(state, boardId) {
  const entities = getItemEntitiesByBoardId(state, boardId);
  return entities.filter(entity => entity.select);
}
