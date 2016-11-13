// @flow
import ApiClient from "../utils/api-client";
import type { TagId, Tag, Tags, UpdateTagRequestPayload } from "../types/tag";

const apiClient = new ApiClient("/tags");


type ResponseTag = Promise<{ tag: Tag }>;
type ResponseArrayTag = Promise<{ tags: Tags }>;

export function fetchTags(): ResponseArrayTag {
  return apiClient.get("/");
}

export function addTag(name: string): ResponseTag {
  return apiClient.post("/", { body: { name } });
}

export function updateTag(payload: UpdateTagRequestPayload): ResponseTag {
  return apiClient.put("/", { body: payload });
}

export function deleteTag(id: TagId): ResponseTag {
  return apiClient.delete("/", { body: { id } });
}
