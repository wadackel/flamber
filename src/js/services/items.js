import queryString from "query-string";
import fetch, { fetchJSON } from "../utils/fetch";
import { API_ROOT } from "../constants/application";

export const ITEMS_ENDPOINT = `${API_ROOT}/items`;


export function fetchItems(query = {}) {
  const queryStr = queryString.stringify(query);
  return fetch(`${ITEMS_ENDPOINT}?${queryStr}`);
}


export function fetchBoardItems(boardId) {
  return fetch(`${ITEMS_ENDPOINT}/board/${boardId}`);
}


export function addItemByFile({ file, palette, boardId }) {
  const data = new FormData();
  data.append("file", file);
  data.append("boardId", boardId);
  data.append("palette", palette);

  const params = {
    method: "POST",
    body: data
  };

  return fetch(`${ITEMS_ENDPOINT}/file`, params);
}


export function updateItems(items) {
  return fetchJSON(ITEMS_ENDPOINT, items, "PUT");
}


export function deleteItems(items) {
  return fetchJSON(ITEMS_ENDPOINT, items, "DELETE");
}
