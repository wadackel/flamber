import fetch, { fetchJSON } from "../utils/fetch";
import { API_ROOT } from "../constants/application";

export const SETTINGS_ENDPOINT = `${API_ROOT}/settings`;


export function fetchSettings() {
  return new Promise((resolve, reject) => {
    fetch(SETTINGS_ENDPOINT)
      .then(res => {
        if (res.status === "ok") {
          resolve(res.settings);
        } else {
          reject({ error: res.error });
        }
      })
      .catch(error => reject({ error }));
  });
}

export function updateSettings(settings) {
  return new Promise((resolve, reject) => {
    fetchJSON(SETTINGS_ENDPOINT, settings, "PUT")
      .then(res => {
        if (res.status === "ok") {
          resolve(res.settings);
        } else {
          reject({ error: res.error });
        }
      })
      .catch(error => reject({ error }));
  });
}
