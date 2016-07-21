import fetch, { fetchJSON } from "../utils/fetch";
import { API_ROOT } from "../constants/application";

export const BOARDS_ENDPOINT = `${API_ROOT}/boards`;


export function fetchBoards() {
  return new Promise((resolve, reject) => {
    fetch(BOARDS_ENDPOINT)
      .then(res => {
        if (res.status === "ok") {
          resolve(res.boards);
        } else {
          reject({ error: res.error });
        }
      })
      .catch(error => reject({ error }));
  });
}

export function addBoard(name) {
  return new Promise((resolve, reject) => {
    fetchJSON(BOARDS_ENDPOINT, { name })
      .then(res => {
        if (res.status === "ok") {
          resolve(res.board);
        } else {
          reject({ error: res.error });
        }
      })
      .catch(error => reject({ error }));
  });
}

export function deleteBoard(id) {
  return new Promise((resolve, reject) => {
    fetchJSON(BOARDS_ENDPOINT, { id }, "DELETE")
      .then(res => {
        if (res.status === "ok") {
          resolve(res.id);
        } else {
          reject({ error: res.error });
        }
      })
      .catch(error => reject({ error }));
  });
}
