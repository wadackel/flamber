// @flow
import { values, orderBy } from "lodash";
import * as ItemVisibilityFilters from "../constants/item-visibility-filters";
import { getBoardEntityById } from "./boards";

import type { ConnectState } from "../types/redux";
import type { BoardId } from "../types/board";
import type {
  ItemId,
  ItemEntity,
  ItemEntities
} from "../types/item";
import type { Order, OrderBy } from "../types/prop-types";


function sortEntities(entities: ItemEntities, by: OrderBy, order: Order): ItemEntities {
  return orderBy(entities, [by], [order]);
}

export function getItemEntityById(state: ConnectState, id: ?ItemId): ?ItemEntity {
  return id ? state.entities.items[id] : null;
}

export function getItemEntities(state: ConnectState): ItemEntities {
  return values(state.entities.items);
}

export function getVisibleItemEntities(state: ConnectState): ItemEntities {
  const { items, boards, tags, options } = state;
  const { visibilityFilter, currentColor } = items;
  const { currentId } = boards;
  const { currentTag } = tags;
  const { itemsOrderBy, itemsOrder } = options;
  let entities = getItemEntities(state);
  entities = currentColor ? entities.filter(entity => entity.palette.indexOf(currentColor) > -1) : entities;
  entities = sortEntities(entities, itemsOrderBy, itemsOrder);

  switch (visibilityFilter) {
    case ItemVisibilityFilters.ALL:
      return entities;

    case ItemVisibilityFilters.STAR:
      return entities.filter((entity: ItemEntity): boolean => entity.star);

    case ItemVisibilityFilters.CURRENT_BOARD:
      return entities.filter((entity: ItemEntity): boolean => entity.board_id === currentId);

    case ItemVisibilityFilters.CURRENT_TAG:
      return currentTag
        ? entities.filter((entity: ItemEntity): boolean => entity.Tags.indexOf(currentTag) > -1)
        : [];

    default:
      return [];
  }
}

export function getItemEntitiesByBoardId(state: ConnectState, boardId: BoardId): ItemEntities {
  const { itemsOrderBy, itemsOrder } = state.options;
  const board = getBoardEntityById(state, boardId);
  const entities = !board ? [] : board.Items.map(id => state.entities.items[id]);

  return sortEntities(entities, itemsOrderBy, itemsOrder);
}

export function getSelectedItemEntities(state: ConnectState): ItemEntities {
  return values(state.entities.items).filter(entity => entity.select);
}

export function getSelectedItemEntitiesByBoardId(state: ConnectState, boardId: BoardId): ItemEntities {
  const entities = getItemEntitiesByBoardId(state, boardId);
  return entities.filter(entity => entity.select);
}

export function getMoveItemEntities(state: ConnectState): ItemEntities {
  return state.items.moveItems.map(id => state.entities.items[id]);
}

export function getCurrentItem(state: ConnectState): ?ItemEntity {
  return getItemEntityById(state, state.items.currentItem);
}
