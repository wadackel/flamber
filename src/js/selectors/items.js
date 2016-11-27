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


const sortEntities = (entities: ItemEntities, by: OrderBy, order: Order): ItemEntities => (
  orderBy(entities, [by], [order])
);

const filterColors = (entities: ItemEntities, colors: Array<string>): ItemEntities => (
  entities.filter((entity: ItemEntity) =>
    entity.palette.some(color => colors.indexOf(color) > -1)
  )
);

export const getItemEntityById = (state: ConnectState, id: ?ItemId): ?ItemEntity => (
  id ? state.entities.items[id] : null
);

export const getItemEntities = (state: ConnectState): ItemEntities => (
  values(state.entities.items)
);

export const getVisibleItemEntities = (state: ConnectState): ItemEntities => {
  const { items, boards, tags, options } = state;
  const { visibilityFilter, currentColors } = items;
  const { currentId } = boards;
  const { currentTag } = tags;
  const { itemsOrderBy, itemsOrder } = options;
  let entities = getItemEntities(state);
  entities = currentColors.length > 0 ? filterColors(entities, currentColors) : entities;
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
};

export const getItemEntitiesByBoardId = (state: ConnectState, boardId: ?BoardId): ItemEntities => {
  const { itemsOrderBy, itemsOrder } = state.options;
  const board = getBoardEntityById(state, boardId);
  const entities = !board ? [] : board.Items.map(id => state.entities.items[id]);

  return sortEntities(entities, itemsOrderBy, itemsOrder);
};

export const getSelectedItemEntities = (state: ConnectState): ItemEntities => (
  values(state.entities.items).filter(entity => entity.select)
);

export const getSelectedItemEntitiesByBoardId = (state: ConnectState, boardId: BoardId): ItemEntities => {
  const entities = getItemEntitiesByBoardId(state, boardId);
  return entities.filter(entity => entity.select);
};

export const getMoveItemEntities = (state: ConnectState): ItemEntities => (
  state.items.moveItems.map(id => state.entities.items[id])
);

export const getCurrentItem = (state: ConnectState): ?ItemEntity => (
  getItemEntityById(state, state.items.currentItem)
);

export const getItemEntitiesBySelectingCover = (state: ConnectState): ItemEntities => (
  getItemEntitiesByBoardId(state, state.boards.selectCoverItemBoard)
);
