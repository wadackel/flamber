// @flow
import { values, orderBy } from "lodash";

import type { ConnectState } from "../types/redux";
import type { BoardId, BoardEntity, BoardEntities } from "../types/board";
import type { OrderBy, Order } from "../types/prop-types";


export function getRawBoardEntities(state: ConnectState): BoardEntities {
  return values(state.entities.boards);
}

export function getBoardEntityById(state: ConnectState, id: BoardId): ?BoardEntity {
  return state.entities.boards[id];
}

export function getBoardEntities(state: ConnectState, by: OrderBy = "created_at", order: Order = "asc"): BoardEntities {
  const entities = state.boards.results.map((id: BoardId): BoardEntity => state.entities.boards[id]);

  return orderBy(
    entities,
    [by],
    [order]
  );
}

export function getSelectedBoardEntities(state: ConnectState): BoardEntities {
  return getBoardEntities(state).filter((entity: BoardEntity): boolean => entity.select);
}

export function getCurrentBoard(state: ConnectState): ?BoardEntity {
  const { currentId } = state.boards;
  return currentId != null ? state.entities.boards[currentId] : null;
}
