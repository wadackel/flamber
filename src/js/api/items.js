import fetch, { fetchJSON } from "../utils/fetch";
import { API_ROOT } from "../constants/application";

export const ITEMS_ENDPOINT = `${API_ROOT}/items`;


export function fetchBoardItems(boardId) {
  return new Promise((resolve, reject) => {
    fetch(`${ITEMS_ENDPOINT}/board/${boardId}`)
      .then(res => {
        if (res.status === "ok") {
          resolve(res.items);
        } else {
          reject(res.error);
        }
      })
      .catch(error => reject({ error }));
  });
}


export function addItem({ file, palette, boardId }) {
  return new Promise((resolve, reject) => {
    const data = new FormData();
    data.append("file", file);
    data.append("palette", palette);
    data.append("boardId", boardId);

    const params = {
      method: "POST",
      body: data
    };

    fetch(ITEMS_ENDPOINT, params)
      .then(res => {
        if (res.status === "ok") {
          resolve(res.item);
        } else {
          reject({ error: res.error });
        }
      })
      .catch(error => reject({ error }));
  });
}

export function updateItem(item) {
  return new Promise((resolve, reject) => {
    fetchJSON(ITEMS_ENDPOINT, item, "PUT")
      .then(res => {
        if (res.status === "ok") {
          resolve(res.item);
        } else {
          reject({ error: res.error });
        }
      })
      .catch(error => reject({ error }));
  });
}

export function deleteItem(id) {
  return new Promise((resolve, reject) => {
    fetchJSON(ITEMS_ENDPOINT, { _id: id }, "DELETE")
      .then(res => {
        if (res.status === "ok") {
          resolve(res.item);
        } else {
          reject({ error: res.error });
        }
      })
      .catch(error => reject({ error }));
  });
}

