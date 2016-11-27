// @flow
import { values, orderBy } from "lodash";

import type { ConnectState } from "../types/redux";
import type { BoardId, BoardEntity, BoardEntities } from "../types/board";
import type { OrderBy, Order } from "../types/prop-types";


export const getRawBoardEntities = (state: ConnectState): BoardEntities => (
 values(state.entities.boards)
);

export const getBoardEntityById = (state: ConnectState, id: ?BoardId): ?BoardEntity => (
  id ? state.entities.boards[id] : null
);

export const getBoardEntities = (
  state: ConnectState,
  by: OrderBy = "created_at",
  order: Order = "asc"
): BoardEntities => {
  const entities = state.boards.results.map((id: BoardId): BoardEntity => state.entities.boards[id]);

  return orderBy(
    entities,
    [by],
    [order]
  );
};

export const getSelectedBoardEntities = (state: ConnectState): BoardEntities => (
  getBoardEntities(state).filter((entity: BoardEntity): boolean => entity.select)
);

export const getCurrentBoard = (state: ConnectState): ?BoardEntity => {
  const { currentId } = state.boards;
  return currentId != null ? state.entities.boards[currentId] : null;
};

export const getSelectingCoverBoardEntity = (state: ConnectState) => (
  getBoardEntityById(state, state.boards.selectCoverItemBoard)
);
