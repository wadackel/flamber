import fetch from "../utils/fetch";
import { API_ROOT } from "../constants/application";

export const BOARDS_ENDPOINT = `${API_ROOT}/boards`;


export function fetchBoards() {
  return new Promise((resolve, reject) => {
    fetch(BOARDS_ENDPOINT)
      .then(res => {
        resolve(res.boards);
      })
      .catch(error => reject({ error }));
  });
}
