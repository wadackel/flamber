// @flow
import ApiClient from "../utils/api-client";
import type {
  BoardId,
  Board
} from "../types/board";

const apiClient = new ApiClient("/boards");


export function fetchBoard(id: BoardId) {
  return apiClient.get(`/${id}`);
}

export function addBoard(name: string, secret: boolean): Promise<{ board: Board }> {
  return apiClient.post("/", { body: { name, secret } });
}

export function fetchBoards() {
  return apiClient.get("/");
}

// TODO
export function updateBoards(boards: any) {
  return apiClient.put("/", { body: boards });
}

// TODO
export function deleteBoards(boards: any) {
  return apiClient.delete("/", { body: boards })
    .then(() => boards);
}
