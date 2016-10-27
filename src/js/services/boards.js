// @flow
import ApiClient from "../utils/api-client";
import type {
  BoardId,
  Board,
  Boards,
  BoardEntities
} from "../types/board";

const apiClient = new ApiClient("/boards");


type ResponseBoard = { board: Board };
type ResponseArrayBoard = { boards: Boards };

export function fetchBoard(id: BoardId): Promise<ResponseBoard> {
  return apiClient.get(`/${id}`);
}

export function addBoard(name: string, secret: boolean): Promise<ResponseBoard> {
  return apiClient.post("/", { body: { name, secret } });
}

export function fetchBoards(): Promise<ResponseArrayBoard> {
  return apiClient.get("/");
}

export function updateBoards(boards: BoardEntities): Promise<ResponseArrayBoard> {
  return apiClient.put("/", { body: boards });
}

export function deleteBoards(boards: BoardEntities): Promise<ResponseArrayBoard> {
  return apiClient.delete("/", { body: boards });
}
