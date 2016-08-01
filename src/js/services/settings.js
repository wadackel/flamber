import fetch, { fetchJSON } from "../utils/fetch";
import { API_ROOT } from "../constants/application";

export const SETTINGS_ENDPOINT = `${API_ROOT}/settings`;


export function fetchSettings() {
  return fetch(SETTINGS_ENDPOINT)
    .then(res => res.settings);
}

export function updateSettings(settings) {
  return fetchJSON(SETTINGS_ENDPOINT, settings, "PUT")
    .then(res => res.settings);
}
