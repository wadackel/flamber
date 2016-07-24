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

export function updateBoard(board) {
  return new Promise((resolve, reject) => {
    fetchJSON(`${BOARDS_ENDPOINT}/${board.id}`, board, "PUT")
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

export function detailBoard(id) {
  return new Promise((resolve, reject) => {
    fetch(`${BOARDS_ENDPOINT}/${id}`)
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

export function addItem({ file, palette, boardId}) {
  return new Promise((resolve, reject) => {
    const data = new FormData();
    data.append("file", file);
    data.append("palette", palette);

    fetch(`${BOARDS_ENDPOINT}/${boardId}`, {
        method: "POST",
        body: data
      })
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
    fetchJSON(`${BOARDS_ENDPOINT}/item`, { id }, "DELETE")
      .then(res => {
        if (res.status === "ok") {
          resolve({
            id: res.id,
            boardId: res.boardId
          });
        } else {
          reject({ error: res.error });
        }
      })
      .catch(error => reject({ error }));
  });
}
