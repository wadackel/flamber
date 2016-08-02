import fetch, { fetchJSON } from "../utils/fetch";
import { API_ROOT } from "../constants/application";

export const BOARDS_ENDPOINT = `${API_ROOT}/boards`;


export function fetchBoards() {
  return fetch(BOARDS_ENDPOINT)
    .then(res => res.boards);
}

export function fetchBoard(id) {
  return fetch(`${BOARDS_ENDPOINT}/${id}`)
    .then(res => res.board);
}

export function addBoard(name) {
  return fetchJSON(BOARDS_ENDPOINT, { name })
    .then(res => res.board);
}

export function updateBoard(board) {
  return fetchJSON(BOARDS_ENDPOINT, board, "PUT")
    .then(res => res.board);
}

export function deleteBoard(id) {
  return fetchJSON(BOARDS_ENDPOINT, { id }, "DELETE")
    .then(() => id);
}
