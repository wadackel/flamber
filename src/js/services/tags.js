import fetch, { fetchJSON } from "../utils/fetch";
import { API_ROOT } from "../constants/application";

export const TAGS_ENDPOINT = `${API_ROOT}/tags`;


export function fetchTags() {
  return fetch(TAGS_ENDPOINT);
}

export function addTag(name) {
  return fetchJSON(TAGS_ENDPOINT, { name });
}

export function updateTag(newProps) {
  return fetchJSON(TAGS_ENDPOINT, newProps, "PUT");
}

export function deleteTag(id) {
  return fetchJSON(TAGS_ENDPOINT, { id }, "DELETE");
}
