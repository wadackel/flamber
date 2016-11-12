// @flow
import queryString from "query-string";
import libFetch from "isomorphic-fetch";
import { API_ROOT } from "../constants/application";
import ExecutionEnvironment from "../constants/execution-environment";
import { checkStatus } from "../utils/fetch";
import * as cookie from "../utils/cookie";
import ApiClient from "../utils/api-client";
const dataURLtoBlob = ExecutionEnvironment.canUseDOM ? require("blueimp-canvas-to-blob") : null;
import getImagePalette from "../utils/get-image-palette";

import type { BoardId } from "../types/board";
import type { ItemId, Item, Items, ItemEntities } from "../types/item";
import type { Palette } from "../types/prop-types";


const apiClient = new ApiClient("/items");

type ResponseItem = Promise<{ item: Item }>;
type ResponseArrayItem = Promise<{ items: Items }>;


export function fetchItems(query: Object = {}): ResponseArrayItem {
  const qs = queryString.stringify(query);
  return apiClient.get(`?${qs}`);
}


export function fetchBoardItems(board: BoardId) {
  return apiClient.get(`/board/${board}`);
}


export function addItemByFile(board: BoardId, file: File, palette: Palette): ResponseItem {
  const data = new FormData();
  data.append("board", board);
  data.append("file", file);
  data.append("palette", palette);

  return apiClient.post("/file", { body: data });
}


// TODO: Refactor
function takeScreenshotAndPalette(url: string) {
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

        image.onload = () => {
          const palette = getImagePalette(image);
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) return reject();

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

export function addItemByURL(board: BoardId, url: string) {
  return takeScreenshotAndPalette(url)
    .then(({ image, palette }) => {
      if (typeof dataURLtoBlob !== "function") throw new Error("Please run in the browser");

      const data = new FormData();
      data.append("file", dataURLtoBlob(image));
      data.append("url", url);
      data.append("board", board);
      data.append("palette", palette);

      return apiClient.post("/url", { body: data });
    });
}


export function updateItems(items: ItemEntities): ResponseArrayItem {
  return apiClient.put("/", { body: items });
}


export function updateItemImage(id: ItemId, image: File): ResponseItem {
  const data = new FormData();
  data.append("id", id);
  data.append("file", image);

  return apiClient.put("/image", { body: data });
}


export function deleteItems(items: ItemEntities): ResponseArrayItem {
  return apiClient.delete("/", { body: items });
}
