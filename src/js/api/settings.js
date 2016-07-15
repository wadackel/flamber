import fetch from "../utils/fetch";

export const UPDATE_SETTINGS_ENDPOINT = "/api/settings";

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

    fetch(`${UPDATE_SETTINGS_ENDPOINT}`, params)
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
