import queryString from "query-string";
import { API_ROOT } from "../constants/application";
import ExecutionEnvironment from "../constants/execution-environment";
import fetch, { fetchJSON } from "../utils/fetch";
const dataURLtoBlob = ExecutionEnvironment.canUseDOM ? require("blueimp-canvas-to-blob") : null;
import getImagePalette from "../utils/get-image-palette";

export const ITEMS_ENDPOINT = `${API_ROOT}/items`;


export function fetchItems(query = {}) {
  const queryStr = queryString.stringify(query);
  return fetch(`${ITEMS_ENDPOINT}?${queryStr}`);
}


export function fetchBoardItems(boardId) {
  return fetch(`${ITEMS_ENDPOINT}/board/${boardId}`);
}


export function addItemByFile({ file, palette, boardId }) {
  const data = new FormData();
  data.append("file", file);
  data.append("boardId", boardId);
  data.append("palette", palette);

  const params = {
    method: "POST",
    body: data
  };

  return fetch(`${ITEMS_ENDPOINT}/file`, params);
}


function takeScreenshotAndPalette(url) {
  const apiURL = `${API_ROOT}/screenshot/${encodeURIComponent(url)}`;

  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      const palette = getImagePalette(image);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0);

      resolve({
        image: canvas.toDataURL(),
        palette
      });
    };

    image.onerror = reject;

    image.src = apiURL;
  });
}

export function addItemByURL({ url, board }) {
  return takeScreenshotAndPalette(url)
    .then(({ image, palette }) => {
      const data = new FormData();
      data.append("file", dataURLtoBlob(image));
      data.append("url", url);
      data.append("board", board);
      data.append("palette", palette);

      const params = {
        method: "POST",
        body: data
      };

      return fetch(`${ITEMS_ENDPOINT}/url`, params);
    });
}


export function updateItems(items) {
  return fetchJSON(ITEMS_ENDPOINT, items, "PUT");
}


export function updateItemImage({ id, image }) {
  const data = new FormData();
  data.append("id", id);
  data.append("file", image);

  const params = {
    method: "PUT",
    body: data
  };

  return fetch(`${ITEMS_ENDPOINT}/image`, params);
}


export function deleteItems(items) {
  return fetchJSON(ITEMS_ENDPOINT, items, "DELETE");
}
