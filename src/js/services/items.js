import queryString from "query-string";
import libFetch from "isomorphic-fetch";
import { API_ROOT } from "../constants/application";
import ExecutionEnvironment from "../constants/execution-environment";
import { checkStatus } from "../utils/fetch";
import * as cookie from "../utils/cookie";
import ApiClient from "../utils/api-client";
const dataURLtoBlob = ExecutionEnvironment.canUseDOM ? require("blueimp-canvas-to-blob") : null;
import getImagePalette from "../utils/get-image-palette";

const apiClient = new ApiClient("/items");


export function fetchItems(query = {}) {
  const qs = queryString.stringify(query);
  return apiClient.get(`?${qs}`);
}


export function fetchBoardItems(boardId) {
  return apiClient.get(`/board/${boardId}`);
}


export function addItemByFile({ file, palette, board }) {
  const data = new FormData();
  data.append("file", file);
  data.append("board", board);
  data.append("palette", palette);

  return apiClient.post("/file", { body: data });
}


// TODO: Refactor
function takeScreenshotAndPalette(url) {
  return new Promise((resolve, reject) => {
    const screenshotURL = `${API_ROOT}/screenshot/${encodeURIComponent(url)}`;

    libFetch(screenshotURL, {
      headers: {
        Authorization: `Bearer ${cookie.loadToken()}`
      }
    })
      .then(checkStatus)
      .then(res => res.blob())
      .then(blob => {
        const image = new Image();

        console.log("START");
        image.onload = () => {
          console.log("LOAD");
          const palette = getImagePalette(image);
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = image.naturalWidth;
          canvas.height = image.naturalHeight;
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(image, 0, 0);

          resolve({
            image: canvas.toDataURL("image/jpeg"),
            palette
          });
        };

        image.onerror = reject;

        image.src = URL.createObjectURL(blob);
      });
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

      return apiClient.post("/url", { body: data });
    });
}


export function updateItems(items) {
  return apiClient.put("/", { body: items });
}


export function updateItemImage({ id, image }) {
  const data = new FormData();
  data.append("id", id);
  data.append("file", image);

  return apiClient.put("/image", { body: data });
}


export function deleteItems(items) {
  return apiClient.delete("/", { body: items });
}
