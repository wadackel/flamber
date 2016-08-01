import fetch from "../utils/fetch";
import { API_ROOT } from "../constants/application";

export const APP_ENDPOINT = `${API_ROOT}/application`;


export function deleteApp() {
  return new Promise((resolve, reject) => {
    fetch(APP_ENDPOINT, { method: "DELETE" })
      .then(res => {
        if (res.status === "ok") {
          resolve();
        } else {
          reject({ error: res.error });
        }
      })
      .catch(error => reject({ error }));
  });
}
