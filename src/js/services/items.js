// @flow
import queryString from "query-string";
import ApiClient from "../utils/api-client";
import { imageElementToBlob, getImagePalette } from "../utils/image";

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


export function addItemByURL(board: BoardId, image: HTMLImageElement, url: string): ResponseItem {
  const palette = getImagePalette(image);
  const data = new FormData();
  data.append("file", imageElementToBlob(image));
  data.append("url", url);
  data.append("board", board);
  data.append("palette", palette);

  return apiClient.post("/url", { body: data });
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
