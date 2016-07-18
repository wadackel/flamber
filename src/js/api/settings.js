import fetch from "../utils/fetch";
import { API_ROOT } from "../constants/application";

export const SETTINGS_ENDPOINT = `${API_ROOT}/settings`;


export function fetchSettings() {
  return new Promise((resolve, reject) => {
    fetch(SETTINGS_ENDPOINT)
      .then(res => {
        if (res.status === "ok") {
          resolve(res.settings);
        } else {
          reject({ error: res.err });
        }
      })
      .catch(error => reject({ error }));
  });
}

export function updateSettings(settings) {
  return new Promise((resolve, reject) => {
    const params = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(settings)
    };

    fetch(`${SETTINGS_ENDPOINT}`, params)
      .then(res => {
        if (res.status === "ok") {
          resolve(res.settings);
        } else {
          reject({ error: res.err });
        }
      })
      .catch(error => reject({ error }));
  });
}
