import fetch, { fetchJSON } from "../utils/fetch";
import { API_ROOT } from "../constants/application";

export const BOARDS_ENDPOINT = `${API_ROOT}/boards`;


export function fetchBoard(id) {
  return fetch(`${BOARDS_ENDPOINT}/${id}`)
    .then(res => res.board);
}

export function addBoard(name) {
  return fetchJSON(BOARDS_ENDPOINT, { name })
    .then(res => res.board);
}

export function fetchBoards() {
  return fetch(BOARDS_ENDPOINT)
    .then(res => res);
}

export function updateBoards(boards) {
  return fetchJSON(BOARDS_ENDPOINT, boards, "PUT")
    .then(res => res);
}

export function deleteBoards(boards) {
  return fetchJSON(BOARDS_ENDPOINT, boards, "DELETE")
    .then(() => boards);
}
